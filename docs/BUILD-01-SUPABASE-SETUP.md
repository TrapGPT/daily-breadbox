# BUILD 01 — Manual Supabase configuration

Do **not** commit `.env.local`. Copy from [`.env.example`](../.env.example).

## 1. Create project

1. [Supabase Dashboard](https://supabase.com/dashboard) → New project.
2. Note **Project URL** and **anon public** key → `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Optional (server-only, never in browser): `SUPABASE_SERVICE_ROLE_KEY` for admin tasks later — **not required for BUILD 01**.

## 2. Run migration

**Option A — SQL Editor**

1. Dashboard → SQL → New query.
2. Paste contents of `supabase/migrations/20250928180000_build_01_profiles.sql`.
3. Run.

**Option B — Supabase CLI**

```bash
supabase link --project-ref <your-ref>
supabase db push
```

Confirm `public.profiles` exists and trigger `on_auth_user_created` is on `auth.users`.

## 3. Auth URL configuration

Dashboard → **Authentication** → **URL Configuration**

| Setting | Local dev | Production |
|---------|-----------|------------|
| **Site URL** | `http://localhost:3000` | Your Vercel URL |
| **Redirect URLs** | `http://localhost:3000/auth/callback` | `https://<your-domain>/auth/callback` |

Also allow reset flow (same callback with `next=/reset-password`):

- `http://localhost:3000/auth/callback**` (wildcard if offered)
- Or explicitly add `http://localhost:3000/auth/callback?next=%2Freset-password` pattern per Supabase version

Set `NEXT_PUBLIC_APP_URL` in `.env.local` / Vercel to match Site URL (no trailing slash).

## 4. Email provider

Dashboard → **Authentication** → **Providers** → **Email** → enabled.

**Confirm email** (project setting):

- **Disabled** — signup returns an immediate session; fastest for local Alpha testing.
- **Enabled** — user must click confirmation link before login; signup shows “check your email”.

Configure SMTP (or use Supabase default) for password reset and confirmation emails.

## 5. Email templates (optional)

Customize “Reset password” and “Confirm signup” templates; ensure links use your Site URL and hit `/auth/callback`.

## 6. Verify

1. `npm run dev`
2. Sign up → confirm profile on `/app` (after login / email confirm)
3. Log out → visit `/app` → redirected to `/login`
4. Forgot password → email link → `/reset-password` → update password → `/app`

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Redirect loop or “invalid redirect” | Redirect URL not allowlisted |
| Profile missing on `/app` | Migration/trigger not applied |
| “Email not confirmed” | Enable confirm or click email link |
| `/login?error=config` | Missing `NEXT_PUBLIC_*` env vars |
