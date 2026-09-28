# Daily BreadBox

Daily business operating system: **TIME → MOVES → RESULTS → BREAD**.

- **Stack:** Next.js, React, TypeScript, Tailwind, Supabase, Vercel, Stripe (paid beta)
- **Docs:** [`docs/00-TECHNICAL-SPEC-V1.md`](docs/00-TECHNICAL-SPEC-V1.md), [`docs/BUILD-PACKS.md`](docs/BUILD-PACKS.md)

## Local development

```bash
cp .env.example .env.local
# Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |

## Deploy (Vercel)

1. Push to GitHub.
2. Import project in Vercel.
3. Set environment variables from `.env.example`.
4. Verify preview URL and `/api/health`.

## Cursor / agents

Read `docs/00-TECHNICAL-SPEC-V1.md` before substantial changes. Use one Build Pack at a time; update `docs/BUILD-XX.md` when a pack is completed.
