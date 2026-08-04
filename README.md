# 🌾 Shuddha Millets

A fully-functional organic millet e-commerce storefront built with **React + Vite**.
100% organic, stone-ground millet powders and flours — "From Traditional Farms to Your Kitchen".

**Live demo:** https://shuddha-millets.netlify.app
**Repo:** https://github.com/Satvik2813/MarkivProject

---

## ✨ Features

- **7 pages** with client-side routing (React Router):
  - **Home** — hero, bestsellers, why-fresh-millets, process teaser, testimonials
  - **Our Farm** — heritage story + 4-step "farm to kitchen" process
  - **Shop (PLP)** — category sidebar, price slider, sort, quick-filter chips
  - **Product (PDP)** — image gallery, pack size, quantity, buy now, benefits, reviews
  - **Checkout** — delivery form + pincode check, payment options, coupons, order summary
  - **Benefits** — nutrition breakdown + comparison table
  - **Recipes** — expandable millet recipes
- **Working shopping cart** — slide-out drawer, quantity controls, remove, free-shipping progress bar, persisted in `localStorage`
- **Search** across product name / category / description
- **Filters** — category, price range, quick chips (Gluten-Free, Low GI, Baby Food, Weight Loss), and sort
- **Checkout logic** — form validation, 6-digit pincode → auto city lookup, working coupons, dynamic totals, order-success screen
- **Branded product imagery** — kraft-pouch rendering with each product's real millet photo shown in the pack window
- **Responsive** (mobile / tablet / desktop) + themed design system

## 🎟️ Coupon codes (demo)

| Code | Discount |
|------|----------|
| `SHUDDHA10` | 10% off |
| `MILLET15` | 15% off |
| `FRESH50` | ₹50 off |

## 🛠️ Tech stack

- **React 19** + **Vite** (build tooling & dev server)
- **React Router** (client-side routing)
- **React Context** (cart state) + `localStorage` persistence
- Plain **CSS** with design tokens (no UI framework)
- Inline **SVG** for the branded pouch, logo, icons & favicon
- Product/scene photography from [Unsplash](https://unsplash.com) (free license)

## 🚀 Getting started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# production build → dist/
npm run build

# preview the production build
npm run preview
```

## 📁 Project structure

```
src/
├── components/       # Header, Footer, CartDrawer, ProductCard, Pouch, Layout, icons
├── context/          # CartContext (cart state + INR formatter)
├── data/             # products.js (catalog, categories, filters)
├── pages/            # Home, Heritage, Shop, Product, Checkout, Benefits, Recipes
├── index.css         # design tokens + base + header/footer styles
├── components.css    # page/component styles
└── main.jsx          # router setup
public/
└── img/              # product & scene images
```

## 🌐 Deploying to Netlify

This repo is Netlify-ready:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **SPA routing:** `netlify.toml` + `public/_redirects` rewrite all paths to `index.html`
  (so deep links like `/shop` and `/product/:id` work on refresh)

Connect the GitHub repo in Netlify (or drag the `dist/` folder to
[app.netlify.com/drop](https://app.netlify.com/drop)) and deploy.

---

_Demo project — product data, prices, reviews and imagery are illustrative._
