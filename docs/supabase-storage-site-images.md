# Supabase Storage: site-images

Use this bucket for public website marketing images edited from `/admin`.

Do not store private client job/report photos here. Future Live Reset Report photos should use a separate bucket, for example `job-photos`, with stricter access rules.

## Create Bucket

1. Open Supabase Dashboard.
2. Go to Storage.
3. Create a bucket named `site-images`.
4. Set the bucket to public for this MVP.
5. Keep uploaded files organized by date folders. The admin upload API writes paths like:
   `2026-06-25/example-image-uuid.webp`

## Allowed Uploads

- JPG / JPEG
- PNG
- WebP

Maximum file size in the app: 5 MB.

Recommended image prep before upload:

- Use WebP where possible.
- Keep large hero images under 2500px wide.
- Keep card and before/after images around 1600px wide.
- Avoid uploading private client documents, faces, addresses, keys, invoices or sensitive photos.

## Required Environment Variables

These must be set on Vercel and locally when testing uploads:

```env
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

The service role key is used only server-side in `/api/upload`. Never expose it in browser/client code.
