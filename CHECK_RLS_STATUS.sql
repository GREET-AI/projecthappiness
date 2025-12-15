-- ============================================
-- CHECK RLS STATUS FOR CANDIDATES TABLE
-- ============================================
-- Run this to verify RLS is enabled and policies are correct
-- ============================================

-- Check if RLS is enabled on candidates table
SELECT 
  schemaname,
  tablename,
  rowsecurity as "RLS Enabled"
FROM pg_tables
WHERE tablename = 'candidates';

-- List all policies on candidates table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd as "Command",
  qual as "USING",
  with_check as "WITH CHECK"
FROM pg_policies
WHERE tablename = 'candidates'
ORDER BY policyname;

-- If RLS is not enabled, enable it:
-- ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

