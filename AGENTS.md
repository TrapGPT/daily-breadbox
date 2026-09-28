# Daily BreadBox — Agent Instructions

- **Canonical spec:** [`docs/00-TECHNICAL-SPEC-V1.md`](docs/00-TECHNICAL-SPEC-V1.md)
- **Build order:** [`docs/BUILD-PACKS.md`](docs/BUILD-PACKS.md) — one Build Pack per session; no massive unrelated diffs.
- **Entitlements & money math:** centralize (spec §64–§65); enforce plan limits server-side (§53, §91).
- **Do not** expose `SUPABASE_SERVICE_ROLE_KEY` to the client.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
