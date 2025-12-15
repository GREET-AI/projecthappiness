-- ============================================
-- COMPLETE FIX FOR CANDIDATES RLS
-- ============================================
-- Run this to ensure RLS is enabled and policies are correct
-- ============================================

-- 1. Enable RLS on candidates table (if not already enabled)
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can insert candidates" ON candidates;
DROP POLICY IF EXISTS "Anyone can view verified candidates" ON candidates;

-- 3. Create INSERT policy (allows anyone to insert)
CREATE POLICY "Anyone can insert candidates"
  ON candidates
  FOR INSERT
  TO public
  WITH CHECK (true);

-- 4. Create SELECT policy (allows viewing verified candidates)
CREATE POLICY "Anyone can view verified candidates"
  ON candidates
  FOR SELECT
  TO public
  USING (status = 'verified');

-- 5. Verify everything is correct
SELECT 
  'RLS Status' as check_type,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_tables 
      WHERE tablename = 'candidates' AND rowsecurity = true
    ) THEN 'RLS is ENABLED ✓'
    ELSE 'RLS is DISABLED ✗'
  END as status
UNION ALL
SELECT 
  'INSERT Policy' as check_type,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'candidates' 
      AND cmd = 'INSERT' 
      AND with_check = 'true'
    ) THEN 'INSERT Policy EXISTS ✓'
    ELSE 'INSERT Policy MISSING ✗'
  END as status
UNION ALL
SELECT 
  'SELECT Policy' as check_type,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'candidates' 
      AND cmd = 'SELECT'
    ) THEN 'SELECT Policy EXISTS ✓'
    ELSE 'SELECT Policy MISSING ✗'
  END as status;

