# BUILD 01 — Authentication

**Status:** Implemented (pending Supabase project setup + migration)

## Objective

Supabase Auth for signup, login, logout, password reset, session persistence, protected `/app` routes, and automatic `profiles` initialization.

## Scope

| In | Out (BUILD 02+) |
|----|-----------------|
| `profiles` table, trigger, RLS | `accounts`, `breadboxes` |
| Auth UI + server actions | Onboarding flows |
| Middleware session refresh | Business logic |

## Routes

| Route | Purpose |
|-------|---------|
| `/signup` | Create account |
| `/login` | Sign in |
| `/forgot-password` | Request reset email |
| `/reset-password` | Set new password (recovery session) |
| `/auth/callback` | OAuth / email / recovery code exchange |
| `/app` | Protected shell (session + profile check) |

Route protection uses Next.js 16 **`src/proxy.ts`** (not deprecated `middleware.ts`).

## Database

Migration: [`supabase/migrations/20250928180000_build_01_profiles.sql`](../supabase/migrations/20250928180000_build_01_profiles.sql)

Manual Supabase steps: [`BUILD-01-SUPABASE-SETUP.md`](./BUILD-01-SUPABASE-SETUP.md)

## Acceptance

- [ ] New user signs up and receives a `profiles` row (trigger)
- [ ] Session persists across refresh; proxy protects `/app`
- [ ] Logout clears session; login restores access
- [ ] Password reset email → `/reset-password` → new password
- [ ] Unauthenticated users cannot access `/app`

## Verification commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```
