-- ============================================
-- FIX CANDIDATES INSERT POLICY
-- ============================================
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Anyone can insert candidates" ON candidates;

-- Recreate with correct WITH CHECK condition
CREATE POLICY "Anyone can insert candidates"
  ON candidates
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'candidates'
ORDER BY policyname;

