-- ============================================
-- FIX RLS POLICIES FOR CANDIDATES TABLE
-- ============================================
-- Run this in Supabase SQL Editor if INSERT fails
-- ============================================

-- First, drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can insert candidates" ON candidates;
DROP POLICY IF EXISTS "Anyone can view verified candidates" ON candidates;

-- Recreate the INSERT policy (allows anyone to insert)
CREATE POLICY "Anyone can insert candidates"
  ON candidates FOR INSERT
  WITH CHECK (true);

-- Recreate the SELECT policy (allows viewing verified candidates)
CREATE POLICY "Anyone can view verified candidates"
  ON candidates FOR SELECT
  USING (status = 'verified');

-- ============================================
-- ALTERNATIVE: If the above doesn't work, try this:
-- ============================================
-- This allows INSERT without any restrictions
-- CREATE POLICY "Allow public inserts to candidates"
--   ON candidates FOR INSERT
--   TO public
--   WITH CHECK (true);

