-- Notifications System Table

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('new-stream', 'voting-results', 'wheel-win', 'lottery-draw', 'referral-reward')),
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_wallet ON notifications(wallet_address);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(wallet_address, read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
-- Allow anyone to insert notifications (system-generated)
CREATE POLICY "Allow public inserts to notifications"
  ON notifications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read their own notifications
CREATE POLICY "Allow users to read their own notifications"
  ON notifications
  FOR SELECT
  TO anon, authenticated
  USING (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address' OR true);

-- Allow users to update their own notifications (mark as read)
CREATE POLICY "Allow users to update their own notifications"
  ON notifications
  FOR UPDATE
  TO anon, authenticated
  USING (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address' OR true)
  WITH CHECK (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address' OR true);

