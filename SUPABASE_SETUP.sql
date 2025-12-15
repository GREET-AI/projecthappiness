-- ============================================
-- SUPABASE DATABASE SETUP FOR $HAPPINESS
-- ============================================
-- Copy and paste this into Supabase SQL Editor
-- ============================================

-- 1. Create candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  x_handle TEXT NOT NULL,
  story TEXT NOT NULL,
  why_happiness TEXT NOT NULL,
  video_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'verified', 'rejected'))
);

-- 2. Create votes table
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  vote_power INTEGER NOT NULL CHECK (vote_power > 0),
  ip_address TEXT
);

-- 3. Create daily_winners table
CREATE TABLE IF NOT EXISTS daily_winners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  amount_sol NUMERIC(18, 9) NOT NULL,
  amount_happiness NUMERIC(18, 9) NOT NULL,
  tx_hash TEXT,
  UNIQUE(candidate_id, date)
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_winners ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for candidates
-- Everyone can read verified candidates
CREATE POLICY "Anyone can view verified candidates"
  ON candidates FOR SELECT
  USING (status = 'verified');

-- Only authenticated users can insert (optional - adjust as needed)
CREATE POLICY "Anyone can insert candidates"
  ON candidates FOR INSERT
  WITH CHECK (true);

-- 6. RLS Policies for votes
-- Everyone can read votes (for vote counts)
CREATE POLICY "Anyone can view votes"
  ON votes FOR SELECT
  USING (true);

-- Anyone can insert votes (will be validated by app logic)
CREATE POLICY "Anyone can insert votes"
  ON votes FOR INSERT
  WITH CHECK (true);

-- Users can only see their own votes (optional)
CREATE POLICY "Users can view own votes"
  ON votes FOR SELECT
  USING (auth.uid()::text = wallet_address OR true); -- Adjust based on your auth setup

-- 7. RLS Policies for daily_winners
-- Everyone can read winners
CREATE POLICY "Anyone can view daily winners"
  ON daily_winners FOR SELECT
  USING (true);

-- 8. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_candidates_status ON candidates(status);
CREATE INDEX IF NOT EXISTS idx_candidates_created_at ON candidates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_votes_candidate_id ON votes(candidate_id);
CREATE INDEX IF NOT EXISTS idx_votes_wallet_address ON votes(wallet_address);
CREATE INDEX IF NOT EXISTS idx_votes_created_at ON votes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_daily_winners_date ON daily_winners(date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_winners_candidate_id ON daily_winners(candidate_id);

-- Create IMMUTABLE function for date extraction (required for unique index)
CREATE OR REPLACE FUNCTION date_only(TIMESTAMPTZ)
RETURNS DATE AS $$
  SELECT DATE($1);
$$ LANGUAGE SQL IMMUTABLE;

-- Unique constraint: One vote per wallet per candidate per day (using functional index)
CREATE UNIQUE INDEX IF NOT EXISTS idx_votes_unique_daily 
ON votes(candidate_id, wallet_address, date_only(created_at));

-- 9. Enable Realtime for votes and candidates
ALTER PUBLICATION supabase_realtime ADD TABLE votes;
ALTER PUBLICATION supabase_realtime ADD TABLE candidates;

-- 10. Create function to get vote count per candidate
CREATE OR REPLACE FUNCTION get_vote_count(candidate_uuid UUID)
RETURNS INTEGER AS $$
  SELECT COALESCE(SUM(vote_power), 0)::INTEGER
  FROM votes
  WHERE candidate_id = candidate_uuid;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- STORAGE SETUP (Run in Supabase Dashboard)
-- ============================================
-- Go to Storage > Create Bucket
-- Name: "videos"
-- Public: true (or false for signed URLs)
-- File size limit: 50MB (Supabase Free Plan limit)
-- Allowed MIME types: video/*
-- ============================================

