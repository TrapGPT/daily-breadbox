# DAILY BREADBOX V1 — Technical Build Specification

**Product:** Daily BreadBox  
**Version:** V1 / Alpha-to-Paid-Beta Foundation  
**Primary Platform:** Responsive Progressive Web App (PWA)  
**Stack:** Next.js · React · TypeScript · Tailwind · Supabase · Vercel · Stripe  

**Slogan:** Make Moves. Make Bread. Know the Score.

---

## 1. Product purpose

Operating loop: **TIME → MOVES → RESULTS → BREAD**.

Behavioral cycle: Open the Box → Make Moves → Make Bread → Know the Score → Close the Box → Adjust → Repeat.

---

## 2. V1 product boundary

One complete Full BreadBox in UI; architecture supports multiple BreadBoxes.

**In scope:** Auth, BreadBox, products, offers, contacts, missions, bread runs, daily boxes, open/close, Big 3, moves, Gru$tle bag, sales/payments/expenses, scoreboard, receipts, vault, entitlements, BreadBox switching, mobile-first UI.

**Out of scope (V1):** Full CRM, inventory, bank feeds, native apps, AI advisor, marketplace — without DB redesign.

---

## 3. Account hierarchy

`ACCOUNT → USERS → BREADBOXES → optional BRANDS → MISSIONS → BREAD RUNS → DAILY BOXES → MOVES → RESULTS`

Financial: `BREADBOX → PRODUCTS → OFFERS → CONTACTS → SALES → SALE ITEMS → PAYMENTS → EXPENSES`

---

## 4. Core terminology

BreadBox, Mission, Mission Template (incl. **10 Days 2 $10K**), Bread Run, Bread Goal, Move, Big 3, Bread / Collected / Outstanding / Burn / Kept, Daily Box, Open/Close Box, Bread Receipt, Gru$tle Bag (86,400 s/day), Mission Clock — as defined in the full product spec.

---

## 5. Subscription model

| Tier | Price | Highlights |
|------|-------|------------|
| FREE | $0 | 1 Box, 2 reusable mission lanes, 10D→$10K permanent, 1 custom mission |
| PRO | $10/mo · $100/yr | Unlimited custom missions & runs, advanced money/reports |
| MULTI | $20/mo · $200/yr | Up to 3 Boxes, portfolio dashboard |
| BUSINESS | $30/mo · $300/yr | Up to 6 Boxes |
| TEAM | $49+/mo · $490+/yr | Team users, roles, higher automation/AI |

---

## 6. Database conventions

UUID PKs; `timestamptz`; money as `NUMERIC`; `created_at` / `updated_at` / `created_by`; prefer soft delete.

---

## 7–29. Schema (tables)

See [`01-DATABASE-SCHEMA.md`](./01-DATABASE-SCHEMA.md) for field-level definitions:

- profiles, accounts, account_members  
- breadboxes, breadbox_members, brands  
- products, offers, offer_items, contacts  
- mission_templates, missions, bread_runs  
- daily_boxes, moves, move_results  
- sales, sale_items, payments, expenses  
- power_blocks, bread_receipts, plan_entitlements  

Required system template: `10D_10K` — **10 Days 2 $10K** (revenue, $10,000, 10 days, min plan free).

---

## 30–37. Core calculations

Centralize in services (`money.ts`, `missions.ts`, `dailyBox.ts`, `time.ts`):

- Bread, Collected, Outstanding, Burn, Kept, Kept margin  
- Goal progress & gap (incl. over-goal display)  
- Mission progress, required pace, mission pace, pace gap  
- Gru$tle bag & mission countdown (computed client-side; no per-second DB writes)  
- Execution score (max 100): goal 40, Big 3 30, pipeline 20 (or redistribute in V1), discipline 10  

---

## 38. Streaks

Box, Bread, Goal, Big 3, Kept Bread — derived from daily boxes and transactions.

---

## 39. Application routes

`/`, `/login`, `/signup`, `/onboarding/*`, `/app`, `/app/[breadboxId]/*`, `/app/all-boxes`, `/settings/*` — per spec §39.

---

## 40–51. UX surfaces

Mobile nav: Home | Money | **Bread** | Gru$tle | More. Home scoreboard, open/close flows, quick add sale/expense, money & Gru$tle dashboards, bread receipt, vault, amend closed days.

---

## 52–56. Multi-box, RLS, security, timezone, PWA

BreadBox-scoped data + RLS; never trust client `breadbox_id`. Daily boundaries use BreadBox timezone. PWA install for Alpha shell.

---

## 57–58. Design system & icons

Gold/bread, green/kept, dark brown/box, cream background, distinct burn treatment.

---

## 59–60. Analytics & KPIs

Events from signup through subscription; measure habit and execution, not only revenue outcomes.

---

## 61–65. Activation, free mission rules, Stripe, entitlements, calculation services

Book activation path for 10D→$10K; free flagship + one custom lane (reusable, history preserved); Stripe webhooks authoritative; `getAccountEntitlements(accountId)`.

---

## 66–69. Components, state, performance, DB views

Reusable UI list in spec §66; server truth for money; views `v_daily_money_summary`, `v_mission_progress`, `v_daily_execution`.

---

## 70–72. Environments, GitHub, Cursor build rule

`main` / `develop` / feature branches; **tightly scoped Build Packs only**.

---

## 73–95. Build order

Indexed in [`BUILD-PACKS.md`](./BUILD-PACKS.md). BUILD 00 = foundation; BUILD 01 = auth; … BUILD 22 = security/QA.

---

## 96–100. Milestones & north star

**Alpha:** full day loop through receipt and next-day repeat (§96).  
**Paid beta:** Stripe, entitlements, polish, legal, monitoring (§97).  
**Post-V1:** Market, People, Operations, BreadFlow, Intelligence, AI (§98–99).  
**North star:** simple daily experience — OPEN → MOVES → BREAD → CLOSE → RECEIPT → REPEAT (§100).

---

*Field-level table definitions: [`01-DATABASE-SCHEMA.md`](./01-DATABASE-SCHEMA.md). Verbatim section-by-section copy of the bootstrap specification is maintained alongside this index; if you imported from chat, paste the full §1–§100 text here or replace this file with your master export.*
