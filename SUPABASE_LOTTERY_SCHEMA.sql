-- Lottery System Tables

-- Lottery Tickets Table
CREATE TABLE IF NOT EXISTS lottery_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  week DATE NOT NULL, -- Week start date (Sunday)
  source TEXT NOT NULL CHECK (source IN ('vote', 'referral', 'wheel-win', 'holdings-bonus')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_lottery_tickets_wallet_week ON lottery_tickets(wallet_address, week);
CREATE INDEX IF NOT EXISTS idx_lottery_tickets_week ON lottery_tickets(week);

-- Lottery Winners Table
CREATE TABLE IF NOT EXISTS lottery_winners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  week DATE NOT NULL,
  prize_amount DECIMAL(10, 2) NOT NULL,
  ticket_count INTEGER NOT NULL,
  drawn_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_lottery_winners_week ON lottery_winners(week);
CREATE INDEX IF NOT EXISTS idx_lottery_winners_wallet ON lottery_winners(wallet_address);

-- Enable RLS
ALTER TABLE lottery_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE lottery_winners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lottery_tickets
-- Allow anyone to insert tickets
CREATE POLICY "Allow public inserts to lottery_tickets"
  ON lottery_tickets
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read tickets (for transparency)
CREATE POLICY "Allow public reads from lottery_tickets"
  ON lottery_tickets
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for lottery_winners
-- Allow anyone to read winners (public)
CREATE POLICY "Allow public reads from lottery_winners"
  ON lottery_winners
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users (admins) can insert winners
CREATE POLICY "Allow authenticated users to insert lottery_winners"
  ON lottery_winners
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

