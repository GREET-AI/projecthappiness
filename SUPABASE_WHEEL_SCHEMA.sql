-- Wheel of Happiness Tables

-- Wheel Spins Table
CREATE TABLE IF NOT EXISTS wheel_spins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  spin_date DATE NOT NULL,
  prize_type TEXT NOT NULL CHECK (prize_type IN ('sol', 'merchandise', 'vip-access', 'extra-spin', 'nothing')),
  prize_value DECIMAL(10, 2) NOT NULL DEFAULT 0,
  is_paid BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_wheel_spins_wallet_date ON wheel_spins(wallet_address, spin_date);
CREATE INDEX IF NOT EXISTS idx_wheel_spins_date ON wheel_spins(spin_date);

-- Wheel Prizes Configuration Table (for admin)
CREATE TABLE IF NOT EXISTS wheel_prizes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prize_type TEXT NOT NULL CHECK (prize_type IN ('sol', 'merchandise', 'vip-access', 'extra-spin', 'nothing')),
  prize_label TEXT NOT NULL,
  prize_value DECIMAL(10, 2) NOT NULL DEFAULT 0,
  probability DECIMAL(5, 4) NOT NULL CHECK (probability >= 0 AND probability <= 1),
  color TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE wheel_spins ENABLE ROW LEVEL SECURITY;
ALTER TABLE wheel_prizes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for wheel_spins
-- Allow anyone to insert their own spins
CREATE POLICY "Allow public inserts to wheel_spins"
  ON wheel_spins
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read all spins (for transparency)
CREATE POLICY "Allow public reads from wheel_spins"
  ON wheel_spins
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for wheel_prizes
-- Allow anyone to read active prizes
CREATE POLICY "Allow public reads from wheel_prizes"
  ON wheel_prizes
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- Only authenticated users (admins) can modify prizes
CREATE POLICY "Allow authenticated users to modify wheel_prizes"
  ON wheel_prizes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

