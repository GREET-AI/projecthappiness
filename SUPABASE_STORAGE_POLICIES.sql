-- ============================================
-- SUPABASE STORAGE POLICIES FOR VIDEOS BUCKET
-- ============================================
-- ⚠️ WICHTIG: Diese SQL funktioniert NICHT direkt!
-- Storage Policies müssen über das Dashboard erstellt werden.
-- Siehe: SUPABASE_STORAGE_POLICIES.md für Anleitung
-- ============================================

-- Diese Datei dient nur als Referenz.
-- Gehe stattdessen zu: Storage → Policies → videos → New Policy

-- Policy 1: Public Uploads
-- Name: "Allow public uploads to videos bucket"
-- Operation: INSERT
-- Role: public
-- WITH CHECK: bucket_id = 'videos'

-- Policy 2: Public Reads  
-- Name: "Allow public reads from videos bucket"
-- Operation: SELECT
-- Role: public
-- USING: bucket_id = 'videos'

-- ============================================
-- ALTERNATIVE: Versuche es mit dieser SQL (wenn du Admin-Rechte hast)
-- ============================================
-- Führe diese SQL aus, wenn du Service-Role-Key verwendest
-- oder wenn du über die Supabase CLI arbeitest

-- Enable RLS (sollte bereits aktiviert sein)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public uploads
-- CREATE POLICY "Allow public uploads to videos bucket"
-- ON storage.objects
-- FOR INSERT
-- TO public
-- WITH CHECK (bucket_id = 'videos');

-- Policy: Allow public reads
-- CREATE POLICY "Allow public reads from videos bucket"
-- ON storage.objects
-- FOR SELECT
-- TO public
-- USING (bucket_id = 'videos');

