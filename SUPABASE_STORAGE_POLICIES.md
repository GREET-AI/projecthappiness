# Supabase Storage Policies Setup

## Problem
Storage Policies können nicht direkt über SQL erstellt werden (Permission Error: "must be owner of table objects").

## Lösung: Über das Dashboard

### Schritt 1: Gehe zu Storage Policies
1. Öffne Supabase Dashboard
2. Gehe zu **Storage** → **Policies** (nicht Buckets!)
3. Wähle den Bucket **"videos"** aus dem Dropdown

### Schritt 2: Erstelle Policy 1 - Public Uploads
1. Klicke auf **"New Policy"**
2. Wähle **"Create a policy from scratch"**
3. **Policy Name:** `Allow public uploads to videos bucket`
4. **Allowed Operation:** `INSERT`
5. **Target Roles:** `public`
6. **USING expression:** (leer lassen)
7. **WITH CHECK expression:** 
   ```sql
   bucket_id = 'videos'
   ```
8. Klicke auf **"Review"** und dann **"Save Policy"**

### Schritt 3: Erstelle Policy 2 - Public Reads
1. Klicke auf **"New Policy"**
2. Wähle **"Create a policy from scratch"**
3. **Policy Name:** `Allow public reads from videos bucket`
4. **Allowed Operation:** `SELECT`
5. **Target Roles:** `public`
6. **USING expression:**
   ```sql
   bucket_id = 'videos'
   ```
7. **WITH CHECK expression:** (leer lassen)
8. Klicke auf **"Review"** und dann **"Save Policy"**

## Alternative: SQL (wenn du Admin-Rechte hast)

Falls du Admin-Zugriff hast, kannst du versuchen, die Policies über die Supabase CLI oder mit einem Service-Role-Key zu erstellen. Aber die Dashboard-Methode ist einfacher.

## Nach dem Setup

1. Gehe zurück zu **Storage** → **Buckets** → **videos**
2. Stelle sicher, dass der Bucket **PUBLIC** ist (nicht private)
3. Teste den Upload auf `/apply`

## Troubleshooting

- **"Bucket not found"**: Stelle sicher, dass der Bucket-Name genau "videos" ist (kleingeschrieben)
- **"Permission denied"**: Überprüfe, ob beide Policies erstellt wurden
- **"File too large"**: Überprüfe die File Size Limit im Bucket (sollte 50MB sein - Supabase Free Plan Limit)

