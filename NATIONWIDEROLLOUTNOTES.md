# Nationwide rollout — follow-ups outside this repo

The frontend (`index.html`, `order.html`) now supports pickup from any of the
36 states + FCT, not just Lagos, and computes a delivery tier from the
pickup/delivery state pair:

- **local** — same state (e.g. Lagos → Lagos): Same-day / Next-day options
- **regional** — same geopolitical zone, different state (e.g. Lagos → Ogun)
- **interstate** — different zone (e.g. Lagos → Kano)

Two systems outside this repo need matching updates. This repo doesn't have
access to either, so nothing here was changed automatically.

## 1. Pricing API (`swiftfifteen-api.vercel.app`)

`order.html` now sends `pickup_state`, `delivery_state`, and `tier` alongside
`pickup_address`/`delivery_address` in the `POST /api/estimate` request body.
The endpoint can safely ignore the new fields today (frontend still applies
its own tier-weighted margin on top of `kwikpik_price`), but for accurate
nationwide pricing it should eventually:

- Use `pickup_state`/`delivery_state` to route to the right Kwikpik zone
  (Kwikpik coverage/pricing outside Lagos may differ or need a different
  Kwikpik product/endpoint — verify with Kwikpik's docs).
- Return a price appropriate to `tier` rather than a single flat rate, since
  `local`/`regional`/`interstate` now cover very different distances.

Until then, the frontend's fallback prices (`FALLBACK_PRICES` in
`order.html`) are **placeholder estimates** — ₦3,000/₦2,500 (local),
₦4,000 (regional), ₦6,000 (interstate) — business should sanity-check these
against actual Kwikpik nationwide rates and adjust.

`POST /api/verify-payment` dispatch should also be checked against Kwikpik's
actual pickup coverage per state — if Kwikpik can't service a given pickup
city yet, `dispatch_status` should reflect that so the order falls into the
existing "Paid — Manual Dispatch Needed" path instead of silently failing.

## 2. Make.com scenario

The order-confirmation webhook payload gained three new fields:
`Pickup_State`, `Delivery_Tier` (and the lead-capture form is unchanged).
If the Make.com scenario maps fields by name to a spreadsheet/CRM, add
columns for these so they're not silently dropped.

## 3. Numbers worth a second look

- `isLaunchOfferActive()` / the countdown banner reference a June 2026
  launch-offer window that has already passed — currently inert (offer
  banner won't show), safe to leave or remove.
