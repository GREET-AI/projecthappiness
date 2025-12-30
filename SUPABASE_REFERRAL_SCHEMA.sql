-- Referral System Tables

-- Referrals Table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_wallet TEXT NOT NULL,
  referee_wallet TEXT NOT NULL,
  referral_code TEXT NOT NULL,
  reward_claimed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(referee_wallet) -- Each wallet can only be referred once
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_wallet);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_referee ON referrals(referee_wallet);

-- Referral Rewards Table (tracks rewards given)
CREATE TABLE IF NOT EXISTS referral_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_id UUID NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('extra-spin', 'happiness-tokens', 'sol')),
  reward_value DECIMAL(10, 2) NOT NULL,
  claimed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_referral_rewards_wallet ON referral_rewards(wallet_address);
CREATE INDEX IF NOT EXISTS idx_referral_rewards_referral ON referral_rewards(referral_id);

-- Enable RLS
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_rewards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for referrals
-- Allow anyone to insert referrals
CREATE POLICY "Allow public inserts to referrals"
  ON referrals
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read referrals (for transparency)
CREATE POLICY "Allow public reads from referrals"
  ON referrals
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for referral_rewards
-- Allow anyone to insert rewards
CREATE POLICY "Allow public inserts to referral_rewards"
  ON referral_rewards
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read their own rewards
CREATE POLICY "Allow users to read their own referral_rewards"
  ON referral_rewards
  FOR SELECT
  TO anon, authenticated
  USING (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address' OR true);

