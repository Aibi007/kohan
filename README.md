# 👑 Kohan — Premium Stone-Ground Spice Brand Website

> "We don't grind spices. We preserve time."

A production-grade, multi-page e-commerce website built with Next.js 14, Tailwind CSS, and Framer Motion. Cinematic luxury design for an ultra-premium Pakistani artisanal food brand.

---

## 📁 Project Structure

```
kohan/
├── app/
│   ├── layout.jsx              ← Root layout (nav, footer, cart provider)
│   ├── page.jsx                ← Homepage
│   ├── products/
│   │   ├── page.jsx            ← All products listing
│   │   └── [slug]/
│   │       └── page.jsx        ← Individual product detail
│   └── checkout/
│       └── page.jsx            ← Checkout with WhatsApp order
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          ← Sticky glass navbar with mobile menu
│   │   └── Footer.jsx          ← Minimal luxury footer
│   ├── sections/
│   │   ├── HeroSection.jsx     ← Cinematic video hero
│   │   ├── Ticker.jsx          ← Animated trust ticker
│   │   ├── TrustSection.jsx    ← 3-pillar Kohan difference
│   │   ├── StorySection.jsx    ← Split story with comparison
│   │   ├── FeaturedProducts.jsx← Homepage product cards
│   │   ├── TestimonialsSection.jsx ← Infinite review slider
│   │   └── OrderCTA.jsx        ← WhatsApp CTA section
│   └── ui/
│       ├── Button.jsx          ← Multi-variant luxury button
│       ├── SectionLabel.jsx    ← Gold section labels
│       ├── GoldDivider.jsx     ← Decorative gold divider
│       └── CustomCursor.jsx    ← Luxury cursor (desktop only)
│
├── lib/
│   ├── products.js             ← All product data (edit here)
│   └── cart-context.js         ← Cart state (localStorage persisted)
│
├── public/
│   └── videos/
│       └── hero-stone-grind.mp4 ← (Add your video here)
│
├── styles/
│   └── globals.css             ← Global styles, animations, grain overlay
│
├── tailwind.config.js          ← Full design system tokens
├── next.config.js
└── package.json
```

---

## 🚀 Quick Start

### 1. Install Node.js
Download from [nodejs.org](https://nodejs.org) (LTS version recommended)

### 2. Clone / Copy the project
Place the `kohan/` folder wherever you want on your machine.

### 3. Install dependencies
```bash
cd kohan
npm install
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) ✅

---

## 🎥 Adding Your Hero Video

Place your video at:
```
public/videos/hero-stone-grind.mp4
```

**Recommended video specs:**
- Resolution: 1920×1080 or 3840×2160 (4K)
- Duration: 15–30 seconds (loops seamlessly)
- Format: MP4 (H.264 codec)
- File size: under 8MB (compress with HandBrake or ffmpeg)
- Content: Stone mill grinding turmeric, slow motion, warm lighting

**Compress for web:**
```bash
ffmpeg -i your-video.mp4 -vcodec libx264 -crf 28 -preset slow -vf scale=1920:-2 -an public/videos/hero-stone-grind.mp4
```

If no video file is present, the hero falls back to the Pexels video URL automatically.

---

## 📝 Customising Product Data

Edit `lib/products.js` to update:
- Product names, descriptions, prices
- Weight options and pricing
- Image URLs (Unsplash or your own CDN)
- Origin stories, health benefits, process descriptions

```js
// Example: Change turmeric price
priceMap: { '100g': 200, '200g': 350, '500g': 750 },
```

---

## 📱 WhatsApp Integration

Update your WhatsApp number throughout the project:

**Search for:** `923001234567`
**Replace with:** `92XXXXXXXXXX` (your number, no spaces or +)

Files to update:
- `components/sections/HeroSection.jsx`
- `components/sections/OrderCTA.jsx`
- `components/layout/Footer.jsx`
- `app/products/page.jsx`
- `app/products/[slug]/page.jsx`
- `app/checkout/page.jsx`

---

## 🌐 Deploy to Vercel (Free)

### Option A: Via Vercel CLI
```bash
npm install -g vercel
vercel
```
Follow the prompts. Your site will be live in ~2 minutes.

### Option B: Via GitHub
1. Push your project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Click Deploy

Vercel auto-detects Next.js — zero configuration needed.

### Option C: Via Vercel Dashboard
1. Zip your `kohan/` folder
2. Go to [vercel.com](https://vercel.com)
3. Drag and drop your zip

---

## 🖼 Image Optimization

All images use Next.js `<Image />` component which automatically:
- Serves WebP/AVIF format
- Lazy loads below the fold
- Optimizes for screen size
- Prevents layout shift

To use your own product images:
1. Place images in `public/images/`
2. Update `image` and `imageDetail` fields in `lib/products.js`
3. Change the `src` in Image components to `/images/your-image.jpg`

---

## ⚡ Performance Checklist

- [x] Video lazy loads with poster fallback
- [x] Images use Next.js optimization
- [x] Fonts loaded via Google Fonts (preconnect)
- [x] Animations use CSS transforms (GPU accelerated)
- [x] Cart state in localStorage (no API calls)
- [x] Framer Motion tree-shaken
- [ ] Add video: compress to <8MB with H.264
- [ ] Add `sitemap.xml` for SEO
- [ ] Configure `robots.txt`
- [ ] Add Google Analytics

---

## 🎨 Design System Reference

| Token        | Value      | Usage                  |
|-------------|------------|------------------------|
| `cream`     | `#F9F6F0`  | Page background        |
| `green`     | `#0A3D2E`  | Primary text, buttons  |
| `gold`      | `#C5A059`  | Accents, highlights    |
| `green-dark`| `#07281F`  | Dark sections, overlays|

**Fonts:**
- Headings: `Playfair Display` (serif, royal)
- Subheadings: `Cormorant Garamond` (elegant italic)
- Body: `DM Sans` (clean, readable)

---

## 📞 Support

Built by Claude for Kohan.
Customize freely — this is your brand.
