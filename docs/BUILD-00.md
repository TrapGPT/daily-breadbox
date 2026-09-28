# BUILD 00 — Repository / Foundation

**Status:** Complete (local scaffold)

## Objective

Bootstrap Daily BreadBox as a deployable Next.js PWA foundation with Supabase wiring and a shared UI layer.

## Delivered

- Next.js 16 (App Router) + React + TypeScript
- Tailwind CSS v4 with BreadBox brand tokens (`cream`, `box-brown`, `bread-gold`, `growth-green`, `burn`)
- Reusable UI primitives: `Button`, `Card` (`src/components/ui/`)
- Supabase browser + server clients (`src/lib/supabase/`)
- `.env.example` for Supabase and Stripe (future)
- `GET /api/health` for deploy smoke checks
- Marketing shell at `/` with placeholder auth links
- Canonical product spec: `docs/00-TECHNICAL-SPEC-V1.md`
- Build pack index: `docs/BUILD-PACKS.md`

## Acceptance

- [x] `npm run build` succeeds
- [x] `npm run lint` succeeds
- [x] `npm run dev` — `/` and `/api/health` respond (Supabase optional until `.env.local` is set)
- [x] No secrets committed — only `.env.example` placeholders; `.env.local` gitignored
- [ ] Vercel preview connected (manual: import repo, set env vars)
- [ ] Supabase project created and env vars set in Vercel + local `.env.local`

## Non-goals (BUILD 00)

- Authentication, database migrations, RLS, Stripe, PWA manifest (later build packs)

## Manual setup

1. Copy `.env.example` → `.env.local` and fill Supabase URL + anon key.
2. Create GitHub repo and push this directory.
3. Import to Vercel; add the same env vars; confirm `/api/health` returns `supabase: configured`.
