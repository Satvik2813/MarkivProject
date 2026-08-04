# 🌾 Shuddha Millets

**100% Organic, Stone-Ground Millet Powders & Flours — From Traditional Farms to Your Kitchen**

A fully-functional organic millet e-commerce storefront built with **React 19 + Vite 8**. Browse a curated catalog of 12 millet products, filter by dietary needs, add to cart, and complete checkout — all with a beautiful, responsive UI.

🔗 **Live Demo:** [shuddha-millets.netlify.app](https://shuddha-millets.netlify.app)
📦 **Repository:** [github.com/Satvik2813/MarkivProject](https://github.com/Satvik2813/MarkivProject)

---

## ✨ Features

### 🛍️ Shopping Experience
- **Product Listing (PLP)** — category sidebar, price range slider, sort options, quick-filter chips
- **Product Detail (PDP)** — image gallery with branded kraft-pouch rendering, pack sizes, quantity selector, nutrition badges, customer reviews
- **Shopping Cart** — slide-out drawer with quantity controls, item removal, free-shipping progress bar, `localStorage` persistence
- **Search** — real-time search across product name, category, and description
- **Checkout** — multi-step form with delivery address, 6-digit pincode → auto city lookup, payment options, coupon codes, dynamic order summary, and order-success confirmation

### 📄 Content Pages (7 Total)
| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero banner, bestsellers grid, why-fresh-millets section, process teaser, testimonials |
| **Our Farm** | `/our-farm` | Heritage story + 4-step "farm to kitchen" process |
| **Shop** | `/shop` | Full product listing with filters & sorting |
| **Product** | `/product/:id` | Individual product detail page |
| **Checkout** | `/checkout` | Delivery form + payment + order summary |
| **Benefits** | `/benefits` | Nutrition breakdown + millet comparison table |
| **Recipes** | `/recipes` | Expandable millet recipe collection |

### 🎨 Design & UX
- **Fully responsive** — mobile, tablet, and desktop optimized
- **Custom design system** — CSS custom properties (design tokens), no UI framework dependency
- **Branded product imagery** — inline SVG kraft-pouch with real grain photos in the pack window
- **Smooth interactions** — animated cart drawer, hover effects, and micro-interactions

---

## 🎟️ Demo Coupon Codes

| Code | Discount |
|------|----------|
| `SHUDDHA10` | 10% off |
| `MILLET15` | 15% off |
| `FRESH50` | ₹50 off |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **UI Library** | React 19 |
| **Build Tool** | Vite 8 |
| **Routing** | React Router v7 |
| **State Management** | React Context API + `localStorage` persistence |
| **Styling** | Vanilla CSS with design tokens (custom properties) |
| **Linting** | OxLint |
| **Type Checking** | TypeScript type definitions (`@types/react`) |
| **Icons & Graphics** | Inline SVG (logo, pouch, icons, favicon) |
| **Deployment** | Netlify (with SPA redirect) |
| **Photography** | [Unsplash](https://unsplash.com) (free license) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Satvik2813/MarkivProject.git
cd MarkivProject

# Install dependencies
npm install

# Start the development server (http://localhost:5173)
npm run dev
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Dev** | `npm run dev` | Start Vite dev server with HMR |
| **Build** | `npm run build` | Production build → `dist/` |
| **Preview** | `npm run preview` | Preview the production build locally |
| **Lint** | `npm run lint` | Run OxLint for code quality checks |

---

## 📁 Project Structure

```
MarkivProject/
├── public/
│   ├── img/                  # Product & scene photography (12 product images)
│   ├── icons.svg             # Shared SVG icon sprite
│   ├── favicon.svg           # Browser tab icon
│   └── _redirects            # Netlify SPA fallback
│
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Navigation bar with cart badge
│   │   ├── Footer.jsx        # Site footer with links
│   │   ├── CartDrawer.jsx    # Slide-out shopping cart
│   │   ├── ProductCard.jsx   # Product grid card component
│   │   ├── Pouch.jsx         # Branded kraft-pouch SVG rendering
│   │   ├── Layout.jsx        # Page layout wrapper (Header + Outlet + Footer)
│   │   └── icons.jsx         # SVG icon components
│   │
│   ├── context/
│   │   └── CartContext.jsx   # Cart state provider + INR currency formatter
│   │
│   ├── data/
│   │   └── products.js       # Product catalog (12 items), categories & filters
│   │
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Heritage.jsx      # Our Farm / heritage story
│   │   ├── Shop.jsx          # Product listing with filters
│   │   ├── Product.jsx       # Product detail page
│   │   ├── Checkout.jsx      # Checkout flow
│   │   ├── Benefits.jsx      # Millet nutrition & benefits
│   │   └── Recipes.jsx       # Recipe collection
│   │
│   ├── assets/               # Static assets (hero image, SVGs)
│   ├── index.css             # Design tokens + base + header/footer styles
│   ├── components.css        # Page & component styles
│   └── main.jsx              # App entry point + React Router setup
│
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── netlify.toml              # Netlify build & redirect config
├── package.json              # Dependencies & scripts
└── .gitignore                # Git ignore rules
```

---

## 🌐 Deployment (Netlify)

This project is **Netlify-ready** out of the box:

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **SPA routing** | `netlify.toml` + `public/_redirects` → rewrites all paths to `index.html` |

### Deploy Options

1. **Git Integration** — Connect this GitHub repo in [Netlify](https://app.netlify.com) for automatic deploys on push
2. **Drag & Drop** — Build locally with `npm run build`, then drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

---

## 📦 Product Catalog (12 Items)

| Product | Category | Price |
|---------|----------|-------|
| Sprouted Ragi Superpowder | Ragi Powders | ₹549 |
| Organic Ragi Powder | Ragi Powders | ₹349 |
| Authentic Jowar Flour | Flours | ₹349 |
| Multi-Millet Super Mix | Grain Mixes | ₹119 |
| Sprouted Jowar Flour | Flours | ₹549 |
| Pearl Bajra Flour | Flours | ₹299 |
| Foxtail Millet Rava | Grain Mixes | ₹189 |
| Diabetic Care Millet Mix | Diabetes | ₹449 |
| Baby Millet Porridge Mix | Baby Mixes | ₹399 |
| Kodo Millet (Whole) | Grain Mixes | ₹159 |
| Little Millet Flour | Flours | ₹269 |
| Instant Ragi Malt Drink Mix | Ragi Powders | ₹429 |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for demonstration purposes. Product data, prices, reviews, and imagery are illustrative.

---

<p align="center">
  Built with 💚 by <a href="https://github.com/Satvik2813">Satvik</a>
</p>
