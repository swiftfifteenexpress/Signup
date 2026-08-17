# Signup

Swift-Fifteen Express is a logistics company operating nationwide across Nigeria.

This repo is the marketing/order-flow site hosted on GitHub Pages at
[swiftfifteenexpress.com](https://swiftfifteenexpress.com):

- `index.html` — landing page and lead-capture form
- `order.html` — 5-step order form with live price estimate and Paystack checkout
- `assets/` — images, referenced directly (no build step required)

## Development

GitHub Pages serves the root files as-is — no build step needed to preview
or ship a change. For local preview or a minified/hashed production build:

```
npm install
npm run dev      # local dev server
npm run build    # outputs dist/ (minified, content-hashed)
```

See `NATIONWIDE-ROLLOUT-NOTES.md` for pricing-API and Make.com follow-ups
tied to the nationwide expansion.
