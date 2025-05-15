# Peanut Payment Links – Take-Home Submission  
_Facundo Bozzi – May 2025_

---

## 1. Overview

This Next.js (App Router) project implements Peanut’s **send** and **request** payment-link previews:

| Feature | Status |
|---------|--------|
| **Send links** (`/claim/[id]`) | ✔ Implemented with mocked API |
| **Request links** (`/[username]/[amount]`) | ✔ Implemented (extra 1) |
| **Link states** – loading, unclaimed, claimed, expired, cancelled | ✔ Implemented (extra 2) |
| Responsive UI matching Figma | ⚠️ _Partially done_ – visual polish missing due to time |
| Jest unit tests | ⚠️ Added but currently failing (see § 5) |
| Lint-clean code | ✔ ESLint passes |
| Production build | ⚠️ Some build errors remain; works fine in dev |

---

## 2. Running the project locally

```bash
npm install
npm run dev          # http://localhost:3000
````

### Quick test links

| Scenario                                       | URL                                                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Unclaimed send link                            | `http://localhost:3000/claim/abc123`                                                      |
| Claimed send link                              | `http://localhost:3000/claim/xyz789`                                                      |
| Expired send link                              | `http://localhost:3000/claim/foo456`                                                      |
| Non-existent ID (shows “link not found” modal) | any other `/claim/<id>`                                                                   |
| Request link                                   | `http://localhost:3000/<username>/<amount>` <br>e.g. `http://localhost:3000/kkonrad/6969` |

---

## 3. How it works

| Layer         | File/Dir                                                          | Notes                                                       |
| ------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| **API Mock**  | `app/api/payment/[id]/route.ts`                                   | In-memory record simulating a DB lookup.                    |
| **Data Hook** | `lib/usePaymentLink.ts`                                           | Fetches payment-link JSON and returns status flags.         |
| **UI**        | `components/PaymentCard.tsx`                                      | Stateless card that maps `link.status` → colour / wording.  |
| **Pages**     | `app/claim/[id]/page.tsx` <br> `app/[username]/[amount]/page.tsx` | Dynamically compose the card for send & request links.      |
| **Styling**   | Tailwind CSS                                                      | Font outline achieved with Tailwind `shadow-[...]` utility. |

---

## 4. Branching & Git workflow

> *Worked in separate branches to keep a clean working history.*

1. Feature branches (e.g. `feat/ui-styling`, `feat/request-links`, `fix/lint`)
2. Merged into `dev` as milestones were finished (`git merge <branch>` – no PRs, solo dev).
3. Final merge `dev → main` at delivery.

---

## 5. Known limitations / trade-offs

| Area              | Explanation                                                                                                       | Production plan                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Visual polish** | Couldn’t finish gradients / exact typography in time. Font outline is a Tailwind drop-shadow hack.                | Replace with approved Peanut design-system tokens & local font loading. |
| **Build errors**  | ESLint warnings fixed, but a couple of Next build errors (fonts and image optimisation) remain; dev run is OK.    | Investigate failing imports, upgrade `next/font/local` usage.           |
| **Jest failing**  | Added a starter test for `PaymentCard`, but Jest throws a config error I couldn’t debug within the 3-hour window. | Diagnose Jest + ESM interplay, add more RTL + Playwright tests.         |
| **Local fonts**   | Next.js `next/font/local` kept crashing on me, so I imported fonts via classic `<link>` to keep moving.           | Convert to proper local font loading, preload & subset.                 |
| **No Loom video** | Didn’t record due to time; happy to create one if you enable it.                                                  |                                                                         |

---

## 6. Next steps if this were production

* Replace mock API with real DB (Prisma + Postgres), cache at edge.
* Generate Open-Graph images via `/api/og` for rich previews.
* Add analytics for link views / claims.
* Harden security – sign link payloads or use server-side auth.
* Automated CI (lint, test, type-check) + Preview deployments on Vercel.


---

## 7. Closing notes

Thanks for reading!
I’m available to record a Loom walkthrough or dive deeper into any section.