# NEXORA HOME — Smart Home Automation Website

A premium, futuristic, production-quality home automation & smart home installer website for the fictional brand **Nexora Home**.

> **Tagline:** *Intelligence for Every Space.*

Built with pure HTML5, CSS3, JavaScript (ES6+) — no framework required. Works by opening `index.html` directly and is ready for deployment on Vercel, Netlify, or GitHub Pages.

---

## ✨ Features

### Marketing Website
- **Futuristic homepage** with animated hero, floating UI cards, and an interactive SVG smart-home visual
- **Smart Home Live Demo** — a fully interactive simulator with working controls for:
  - Lighting (power, brightness, scenes: Relax / Movie / Party / Night)
  - Climate (temperature, fan mode, cooling/heating)
  - Security (arming, door lock, cameras, motion detection)
  - Curtains (open, close, position slider)
  - Energy (consumption, daily usage, energy saved)
- **Solutions** page — by room (7) and by use case (6)
- **Products** catalog — 12 products, category filter + live search
- **Pricing** — 3 packages (Essential / Connect / Signature) with comparison table + FAQ
- **Installation Process** — 6-step visual timeline + FAQ
- **About** — mission, philosophy, why-choose-us, animated stats, team
- **Contact** — validated consultation form + info cards
- **Auth pages** — split-screen Login, Register (with password strength), Forgot Password

### Client Dashboard (9 pages)
- **Dashboard home** — greeting, stats, energy chart, activity feed
- **My Devices** — 8 devices with functional on/off toggles
- **Service Requests** — status table + modal request form
- **Installation Tracking** — visual progress timeline + technician card
- **Service Tickets** — ticket table + creation modal
- **Warranties** — warranty cards + product registration modal
- **Invoices** — realistic invoice history + demo download
- **Profile** & **Settings** — editable profile, functional preference toggles

### Global Features
- **Dark / Light mode** with `localStorage` persistence
- **Floating AI chatbot** ("Nexora Assistant") with predefined responses
- Scroll-reveal animations, animated counters, magnetic CTAs
- Sticky glassmorphism navbar with mobile hamburger menu
- Back-to-top button, page loader, toast notifications
- Fully responsive (desktop → small mobile), accessible (ARIA, focus states, semantic HTML), SEO-ready meta on every page

---

## 📁 Folder Structure

```
home-automation-smart-home/
│
├── index.html
├── 404.html
├── README.md
│
├── pages/
│   ├── solutions.html
│   ├── products.html
│   ├── pricing.html
│   ├── installation-process.html
│   ├── about.html
│   ├── contact.html
│   ├── login.html
│   ├── register.html
│   ├── forgot-password.html
│   │
│   └── dashboard/
│       ├── index.html
│       ├── devices.html
│       ├── service-requests.html
│       ├── installation-tracking.html
│       ├── service-tickets.html
│       ├── warranties.html
│       ├── invoices.html
│       ├── profile.html
│       └── settings.html
│
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   ├── dashboard.css
│   │   └── animations.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── navbar.js
│   │   ├── animations.js
│   │   ├── smart-home.js
│   │   ├── pricing.js
│   │   ├── forms.js
│   │   ├── dashboard.js
│   │   └── theme.js
│   │
│   ├── images/   (hero, solutions, products, rooms, installation, team, backgrounds)
│   └── icons/
│
└── components/
    ├── navbar.html
    ├── footer.html
    ├── chatbot.html
    └── dashboard-sidebar.html
```

---

## 🚀 Getting Started

### Option 1 — Open directly (no server needed)
Double-click `index.html`. Everything runs client-side with vanilla JS.

### Option 2 — Local dev server (recommended)
```bash
# Python
python -m http.server 8000

# Node (npx)
npx http-server -p 8000
```
Then open `http://localhost:8000`.

### Option 3 — Deploy
- **Vercel / Netlify:** point to the `home-automation-smart-home` folder.
- **GitHub Pages:** upload the folder as the site root.

---

## 🎨 Design System

| Token | Value |
|---|---|
| Deep Midnight | `#080B14` |
| Graphite | `#111622` |
| Soft White | `#F7F8FA` |
| Electric Cyan | `#00E5FF` |
| Intelligent Blue | `#3B82F6` |
| Soft Violet | `#8B5CF6` |

- **Headings:** Space Grotesk
- **Body:** Inter
- **Icons:** Bootstrap Icons

---

## 🧭 Navigation Guide

- **Marketing site:** Home · Solutions · Products · Pricing · Installation · About · Contact
- **Auth:** Login → forwards to Client Dashboard after success
- **Dashboard sidebar:** Dashboard · My Devices · Service Requests · Installation Tracking · Service Tickets · Warranties · Invoices · Profile · Settings · Logout

---

## ✅ Final QA Checklist

- [x] All navigation links resolve to existing pages
- [x] Dark / light theme with persistence
- [x] Responsive across desktop, tablet, mobile
- [x] All JS interactions functional (demo, filters, toggles, forms, chatbot)
- [x] No missing CSS/JS assets
- [x] Consistent design system across all 20+ pages

---

## 📝 Notes

- All data is **demo/fictional**. No backend required.
- The logo is an inline SVG; replace with your brand PNG in `assets/icons/` if needed.
- Images referenced in code are SVG illustrations to keep the repo lightweight. For production, swap in optimized JPG/WebP photos under `assets/images/`.

---

© 2026 Nexora Home. All rights reserved.