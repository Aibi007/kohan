import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cream:      #F9F6F0;
      --cream-mid:  #F0EAE0;
      --cream-dark: #E8DFD0;
      --green:      #0A3D2E;
      --green-mid:  #1A5C44;
      --green-light:#2E7D58;
      --gold:       #C5A059;
      --gold-light: #D4B577;
      --gold-pale:  #EDD8A8;
      --gold-deep:  #A07830;
      --text:       #1C1A16;
      --text-mid:   #4A4035;
      --text-muted: #7A6E62;
      --border:     rgba(197,160,89,0.25);
      --border-mid: rgba(197,160,89,0.45);
      --shadow:     0 4px 24px rgba(10,61,46,0.08);
      --shadow-lg:  0 16px 64px rgba(10,61,46,0.14);
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--cream);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* Grain overlay */
    body::after {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9999; opacity: 0.6;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--cream-mid); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes slideRight {
      from { opacity: 0; transform: translateX(-24px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes goldShimmer {
      0%   { background-position: -300% center; }
      100% { background-position: 300% center; }
    }
    @keyframes slowFloat {
      0%,100% { transform: translateY(0); }
      50%     { transform: translateY(-10px); }
    }
    @keyframes scrollTicker {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(197,160,89,0.4); }
      50%     { box-shadow: 0 0 0 10px rgba(197,160,89,0); }
    }
    @keyframes pageEnter {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes drawLine {
      from { width: 0; } to { width: 100%; }
    }
    @keyframes rotateSlow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    .animate-page { animation: pageEnter 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .animate-float { animation: slowFloat 6s ease-in-out infinite; }

    /* Reveal on scroll */
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.9s ease, transform 1s cubic-bezier(0.22,1,0.36,1);
    }
    .reveal.visible { opacity: 1; transform: none; }
    .reveal-left {
      opacity: 0; transform: translateX(-24px);
      transition: opacity 0.9s ease, transform 1s cubic-bezier(0.22,1,0.36,1);
    }
    .reveal-left.visible { opacity: 1; transform: none; }

    /* Nav */
    .nav-root {
      position: fixed; top: 0; left: 0; right: 0; z-index: 900;
      padding: 1.1rem 3rem;
      display: flex; align-items: center; justify-content: space-between;
      transition: background 0.5s, border-color 0.5s, backdrop-filter 0.5s;
      border-bottom: 1px solid transparent;
    }
    .nav-root.scrolled {
      background: rgba(249,246,240,0.94);
      backdrop-filter: blur(20px);
      border-bottom-color: var(--border);
    }
    .nav-logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.7rem; font-weight: 700;
      color: var(--green); cursor: pointer;
      letter-spacing: 0.04em;
      transition: color 0.3s;
    }
    .nav-logo .logo-dot { color: var(--gold); }
    .nav-links { display: flex; gap: 2.2rem; list-style: none; }
    .nav-links button {
      background: none; border: none; cursor: pointer;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.9rem; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--text-mid);
      transition: color 0.3s; padding: 0;
    }
    .nav-links button:hover, .nav-links button.active { color: var(--green); }
    .nav-links button.active {
      border-bottom: 1px solid var(--gold);
      padding-bottom: 2px;
    }
    .nav-right { display: flex; align-items: center; gap: 1.2rem; }
    .nav-cart-btn {
      position: relative; background: none; border: 1px solid var(--border-mid);
      padding: 0.5rem 1rem; cursor: pointer; font-family: 'Cormorant Garamond', serif;
      font-size: 0.78rem; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--green); transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;
    }
    .nav-cart-btn:hover { background: var(--green); color: #fff; border-color: var(--green); }
    .cart-badge {
      background: var(--gold); color: var(--green); border-radius: 50%;
      width: 18px; height: 18px; font-size: 0.6rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      font-family: 'DM Sans', sans-serif;
    }

    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-root { padding: 1rem 1.5rem; }
      .nav-logo { font-size: 1.4rem; }
    }

    /* ── TICKER ── */
    .ticker { background: var(--green); overflow: hidden; padding: 0.55rem 0; }
    .ticker-inner { display: flex; width: max-content; animation: scrollTicker 30s linear infinite; }
    .ticker-item {
      white-space: nowrap; padding: 0 3rem;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase;
      color: var(--gold-pale);
    }
    .ticker-sep { color: var(--gold); padding: 0 1rem; }

    /* ── HERO ── */
    .hero {
      min-height: 100svh; position: relative;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .hero-video {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; filter: brightness(0.38) saturate(0.75);
      transform: scale(1.06);
      transition: transform 14s cubic-bezier(0.22,1,0.36,1);
    }
    .hero-video.ready { transform: scale(1); }
    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(160deg,rgba(10,61,46,0.35) 0%,transparent 50%,rgba(10,61,46,0.55) 100%);
    }
    .hero-content {
      position: relative; z-index: 2;
      text-align: center; max-width: 860px; padding: 2rem;
    }
    .hero-eyebrow {
      display: inline-block;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.72rem; letter-spacing: 0.5em; text-transform: uppercase;
      color: var(--gold-light); border: 1px solid rgba(197,160,89,0.4);
      padding: 0.4rem 1.6rem; margin-bottom: 2rem;
      animation: fadeIn 2s ease both;
    }
    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.8rem, 7vw, 5.2rem);
      font-weight: 700; color: #fff; line-height: 1.12;
      margin-bottom: 0.5rem;
      animation: fadeUp 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s both;
    }
    .hero-title em {
      font-style: italic;
      background: linear-gradient(90deg, var(--gold-pale), var(--gold), var(--gold-light), var(--gold-pale));
      background-size: 300%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      animation: goldShimmer 5s linear 1.5s infinite;
    }
    .hero-subtitle {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.1rem, 2.5vw, 1.5rem);
      font-weight: 300; color: rgba(255,255,255,0.78);
      margin-bottom: 3rem; line-height: 1.7;
      animation: fadeUp 1.4s cubic-bezier(0.22,1,0.36,1) 0.5s both;
    }
    .hero-actions {
      display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap;
      animation: fadeUp 1.4s cubic-bezier(0.22,1,0.36,1) 0.8s both;
    }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 0.7rem;
      background: var(--gold); color: var(--green);
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.85rem; font-weight: 600;
      letter-spacing: 0.2em; text-transform: uppercase;
      padding: 1rem 2.4rem; cursor: pointer; border: none;
      transition: all 0.4s ease;
      box-shadow: 0 8px 32px rgba(197,160,89,0.35);
    }
    .btn-primary:hover {
      background: var(--gold-light); transform: translateY(-3px);
      box-shadow: 0 14px 40px rgba(197,160,89,0.5);
    }
    .btn-outline {
      display: inline-flex; align-items: center; gap: 0.7rem;
      background: transparent; color: #fff;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.85rem; font-weight: 500;
      letter-spacing: 0.2em; text-transform: uppercase;
      padding: 1rem 2.4rem; cursor: pointer;
      border: 1px solid rgba(255,255,255,0.5);
      transition: all 0.4s ease;
    }
    .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.08); }
    .hero-scroll {
      position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
      color: rgba(255,255,255,0.45);
      font-family: 'Cormorant Garamond', serif; font-size: 0.65rem;
      letter-spacing: 0.3em; text-transform: uppercase;
      animation: fadeIn 3s ease both;
    }
    .scroll-bar {
      width: 1px; height: 44px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
      animation: slowFloat 2.5s ease-in-out infinite;
    }

    /* ── SECTION SHARED ── */
    .section { padding: 7rem 2rem; }
    .section-sm { padding: 4rem 2rem; }
    .container { max-width: 1200px; margin: 0 auto; }
    .section-label {
      display: block;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.7rem; letter-spacing: 0.45em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 0.9rem;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.8rem, 4vw, 2.9rem);
      color: var(--green); line-height: 1.2;
      margin-bottom: 1rem;
    }
    .section-body {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem; line-height: 1.85;
      color: var(--text-muted); max-width: 560px;
    }
    .gold-rule {
      display: flex; align-items: center; gap: 1rem;
      margin: 1.5rem 0;
    }
    .gold-rule::before, .gold-rule::after {
      content: ''; flex: 1; height: 1px;
      background: linear-gradient(to right, transparent, var(--gold-pale));
    }
    .gold-rule::after { background: linear-gradient(to left, transparent, var(--gold-pale)); }
    .gold-diamond {
      width: 7px; height: 7px; background: var(--gold);
      transform: rotate(45deg); flex-shrink: 0;
    }
    .gold-rule-center {
      display: flex; align-items: center; gap: 0.8rem; max-width: 280px; margin: 0 auto;
    }
    .gold-rule-center::before, .gold-rule-center::after {
      content: ''; flex: 1; height: 1px; background: var(--gold-pale);
    }

    /* ── TRUST BAR ── */
    .trust-bar { background: var(--green); }
    .trust-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 0; max-width: 1200px; margin: 0 auto;
    }
    @media (max-width: 768px) { .trust-grid { grid-template-columns: 1fr; } }
    .trust-item {
      text-align: center; padding: 3.5rem 2rem;
      border-right: 1px solid rgba(197,160,89,0.15);
      transition: background 0.4s;
    }
    .trust-item:last-child { border-right: none; }
    .trust-item:hover { background: rgba(255,255,255,0.03); }
    .trust-icon-wrap {
      width: 52px; height: 52px; margin: 0 auto 1.2rem;
      color: var(--gold);
    }
    .trust-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem; color: #fff; margin-bottom: 0.5rem;
    }
    .trust-desc {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.82rem; color: rgba(255,255,255,0.5);
      line-height: 1.8;
    }

    /* ── STORY ── */
    .story-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 6rem; align-items: center; max-width: 1200px; margin: 0 auto;
    }
    @media (max-width: 900px) { .story-grid { grid-template-columns: 1fr; gap: 3rem; } }
    .compare-stack { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
    .compare-item {
      display: flex; gap: 1rem; align-items: flex-start;
      padding: 1.2rem 1.4rem;
    }
    .compare-bad { background: #fff; border-left: 3px solid #C5382C; }
    .compare-good { background: var(--green); border-left: 3px solid var(--gold); }
    .compare-icon { font-size: 1rem; flex-shrink: 0; margin-top: 2px; }
    .compare-text-block {}
    .compare-label {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
      margin-bottom: 0.25rem;
    }
    .compare-bad .compare-label { color: #C5382C; }
    .compare-good .compare-label { color: var(--gold); }
    .compare-body {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem; line-height: 1.7;
    }
    .compare-bad .compare-body { color: var(--text-mid); }
    .compare-good .compare-body { color: rgba(255,255,255,0.82); }

    .story-img-wrap {
      position: relative;
    }
    .story-img {
      width: 100%; aspect-ratio: 4/5;
      object-fit: cover; display: block;
    }
    .story-img-frame {
      position: absolute; inset: -14px;
      border: 1px solid var(--gold-pale); pointer-events: none;
      animation: fadeIn 1s 0.5s ease both;
    }
    .story-caption {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: rgba(10,61,46,0.88); padding: 1rem 1.4rem;
      backdrop-filter: blur(8px);
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;
      color: var(--gold-pale);
    }

    /* ── PRODUCT GRID ── */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem; margin-top: 3.5rem;
    }
    .product-card {
      background: #fff; border: 1px solid var(--border);
      overflow: hidden; cursor: pointer;
      transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s;
    }
    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
    }
    .product-card:hover .product-img { transform: scale(1.06); }
    .product-img-box { position: relative; aspect-ratio: 4/3; overflow: hidden; background: var(--cream-mid); }
    .product-img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.9s cubic-bezier(0.22,1,0.36,1);
    }
    .product-badge-tag {
      position: absolute; top: 1rem; left: 1rem;
      background: var(--gold); color: var(--green);
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.62rem; font-weight: 600;
      letter-spacing: 0.25em; text-transform: uppercase;
      padding: 0.28rem 0.65rem;
    }
    .product-body { padding: 1.6rem 1.5rem; }
    .product-en {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.68rem; letter-spacing: 0.3em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 0.3rem;
    }
    .product-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem; color: var(--green); margin-bottom: 0.5rem;
    }
    .product-desc {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.83rem; color: var(--text-muted);
      line-height: 1.8; margin-bottom: 1.4rem;
    }
    .product-footer {
      display: flex; align-items: center; justify-content: space-between;
      border-top: 1px solid var(--border); padding-top: 1.1rem;
    }
    .product-price {
      font-family: 'Playfair Display', serif;
      font-size: 1.35rem; color: var(--green); font-weight: 700;
    }
    .product-price sup {
      font-size: 0.75rem; vertical-align: super; font-weight: 400;
    }
    .product-price small {
      font-size: 0.7rem; color: var(--text-muted);
      font-family: 'DM Sans', sans-serif; font-weight: 300;
    }
    .btn-sm {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--green); border: 1px solid var(--green);
      padding: 0.45rem 1rem; background: none; cursor: pointer;
      transition: all 0.3s;
    }
    .btn-sm:hover { background: var(--green); color: #fff; }
    .btn-sm.gold { border-color: var(--gold); color: var(--gold-deep); }
    .btn-sm.gold:hover { background: var(--gold); color: var(--green); }

    /* ── TESTIMONIALS ── */
    .testimonials-bg { background: var(--cream-mid); }
    .reviews-slider {
      overflow: hidden;
      mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
      margin-top: 3.5rem;
    }
    .reviews-track {
      display: flex; gap: 2rem; width: max-content;
      animation: scrollTicker 35s linear infinite;
    }
    .reviews-track:hover { animation-play-state: paused; }
    .review-card {
      background: #fff; border: 1px solid var(--border);
      padding: 2rem 1.8rem; width: 320px; flex-shrink: 0;
    }
    .review-stars { color: var(--gold); font-size: 0.85rem; letter-spacing: 2px; margin-bottom: 1rem; }
    .review-quote {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem; color: var(--gold-pale); line-height: 1;
      margin-bottom: 0.3rem;
    }
    .review-text {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem; color: var(--text-mid); line-height: 1.9;
      margin-bottom: 1.4rem;
    }
    .reviewer { display: flex; align-items: center; gap: 0.8rem; }
    .reviewer-av {
      width: 34px; height: 34px; border-radius: 50%;
      background: var(--green); display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif; font-size: 0.85rem; color: var(--gold); flex-shrink: 0;
    }
    .reviewer-name {
      font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
      color: var(--green); font-weight: 500;
    }
    .reviewer-loc {
      font-family: 'Cormorant Garamond', serif; font-size: 0.7rem;
      color: var(--text-muted); letter-spacing: 0.1em;
    }

    /* ── ORDER SECTION ── */
    .order-section {
      background: var(--green); position: relative; overflow: hidden;
    }
    .order-watermark {
      position: absolute; font-family: 'Playfair Display', serif;
      font-size: clamp(8rem, 20vw, 16rem); color: rgba(255,255,255,0.03);
      top: 50%; left: 50%; transform: translate(-50%,-50%);
      white-space: nowrap; pointer-events: none; font-weight: 900;
      letter-spacing: 0.05em;
    }
    .order-content { max-width: 680px; margin: 0 auto; text-align: center; position: relative; z-index: 2; }
    .order-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 5vw, 3.2rem);
      color: #fff; margin-bottom: 1rem;
    }
    .order-desc {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem; color: rgba(255,255,255,0.58);
      margin-bottom: 3rem; line-height: 1.9;
    }
    .btn-whatsapp {
      display: inline-flex; align-items: center; gap: 0.8rem;
      background: #25D366; color: #fff;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.9rem; font-weight: 600;
      letter-spacing: 0.18em; text-transform: uppercase;
      padding: 1.1rem 2.8rem; cursor: pointer; border: none;
      transition: all 0.4s;
      box-shadow: 0 8px 32px rgba(37,211,102,0.3);
    }
    .btn-whatsapp:hover {
      background: #1ebe5a; transform: translateY(-3px);
      box-shadow: 0 14px 42px rgba(37,211,102,0.45);
    }
    .order-note {
      margin-top: 1.6rem; font-family: 'DM Sans', sans-serif;
      font-size: 0.78rem; color: rgba(255,255,255,0.35);
      line-height: 1.9;
    }
    .order-note strong { color: var(--gold); font-weight: 400; }

    /* ── FOOTER ── */
    .footer-root {
      background: #060F0B;
      padding: 4rem 2rem 2rem;
    }
    .footer-grid {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 3rem; margin-bottom: 3rem;
    }
    @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } }
    .footer-brand {}
    .footer-logo-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem; color: var(--gold); margin-bottom: 0.8rem;
    }
    .footer-tagline {
      font-family: 'Cormorant Garamond', serif; font-style: italic;
      font-size: 0.9rem; color: rgba(255,255,255,0.35); line-height: 1.8;
    }
    .footer-col-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.7rem; letter-spacing: 0.35em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 1.2rem;
    }
    .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
    .footer-links button {
      background: none; border: none; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
      color: rgba(255,255,255,0.4); text-align: left;
      transition: color 0.3s; padding: 0;
    }
    .footer-links button:hover { color: var(--gold-pale); }
    .footer-bottom {
      max-width: 1200px; margin: 0 auto;
      border-top: 1px solid rgba(255,255,255,0.06);
      padding-top: 1.5rem;
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;
    }
    .footer-copy {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.7rem; letter-spacing: 0.15em;
      color: rgba(255,255,255,0.2);
    }

    /* ── PRODUCTS PAGE ── */
    .products-page-hero {
      min-height: 45vh; background: var(--green);
      display: flex; align-items: flex-end;
      padding: 6rem 2rem 3.5rem;
      position: relative; overflow: hidden;
    }
    .products-page-hero::before {
      content: ''; position: absolute; inset: 0;
      background: url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400&q=60') center/cover no-repeat;
      opacity: 0.15;
    }
    .products-hero-content { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; width: 100%; }
    .products-hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.2rem, 6vw, 4rem); color: #fff; font-weight: 700;
    }
    .products-hero-sub {
      font-family: 'Cormorant Garamond', serif; font-style: italic;
      font-size: 1.1rem; color: rgba(255,255,255,0.6); margin-top: 0.5rem;
    }

    .filter-bar {
      background: var(--cream-mid); border-bottom: 1px solid var(--border);
      padding: 0.9rem 2rem;
    }
    .filter-inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;
    }
    .filter-label {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
      color: var(--text-muted); margin-right: 0.4rem;
    }
    .filter-btn {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
      padding: 0.35rem 0.9rem; border: 1px solid var(--border);
      background: none; cursor: pointer; color: var(--text-muted);
      transition: all 0.3s;
    }
    .filter-btn.active { background: var(--green); color: #fff; border-color: var(--green); }
    .filter-btn:hover:not(.active) { border-color: var(--gold); color: var(--gold-deep); }

    /* Product Detail Panel */
    .detail-overlay {
      position: fixed; inset: 0; z-index: 800;
      background: rgba(10,40,28,0.65); backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      padding: 2rem;
      opacity: 0; pointer-events: none;
      transition: opacity 0.4s ease;
    }
    .detail-overlay.open { opacity: 1; pointer-events: all; }
    .detail-panel {
      background: var(--cream); max-width: 860px; width: 100%;
      display: grid; grid-template-columns: 1fr 1fr;
      max-height: 90vh; overflow-y: auto;
      transform: translateY(20px);
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .detail-overlay.open .detail-panel { transform: translateY(0); }
    @media (max-width: 700px) { .detail-panel { grid-template-columns: 1fr; } }
    .detail-img { width: 100%; height: 100%; min-height: 300px; object-fit: cover; }
    .detail-body { padding: 2.5rem; }
    .detail-close {
      position: absolute; top: 1rem; right: 1rem;
      background: var(--green); color: #fff; border: none;
      width: 32px; height: 32px; cursor: pointer;
      font-size: 1rem; display: flex; align-items: center; justify-content: center;
      transition: background 0.3s; z-index: 10;
    }
    .detail-close:hover { background: var(--gold-deep); }
    .detail-label {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.68rem; letter-spacing: 0.35em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 0.5rem;
    }
    .detail-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem; color: var(--green); margin-bottom: 0.8rem; line-height: 1.2;
    }
    .detail-price {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem; color: var(--green); margin-bottom: 1.4rem;
    }
    .detail-desc {
      font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
      color: var(--text-muted); line-height: 1.9; margin-bottom: 1.6rem;
    }
    .detail-features { list-style: none; margin-bottom: 2rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .detail-features li {
      font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: var(--text-mid);
      display: flex; align-items: center; gap: 0.6rem;
    }
    .detail-features li::before {
      content: ''; width: 5px; height: 5px; background: var(--gold);
      transform: rotate(45deg); flex-shrink: 0;
    }
    .qty-control { display: flex; align-items: center; gap: 0; margin-bottom: 1.4rem; }
    .qty-btn {
      width: 36px; height: 36px; border: 1px solid var(--border-mid);
      background: none; cursor: pointer; font-size: 1rem; color: var(--green);
      display: flex; align-items: center; justify-content: center; transition: all 0.3s;
    }
    .qty-btn:hover { background: var(--green); color: #fff; border-color: var(--green); }
    .qty-num {
      width: 48px; height: 36px; border: 1px solid var(--border-mid); border-left: 0; border-right: 0;
      text-align: center; font-family: 'Playfair Display', serif; font-size: 1rem;
      color: var(--green); background: #fff;
    }
    .btn-add-cart {
      width: 100%; padding: 0.95rem;
      background: var(--green); color: #fff; border: none; cursor: pointer;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.85rem; letter-spacing: 0.25em; text-transform: uppercase;
      transition: all 0.4s; display: flex; align-items: center; justify-content: center; gap: 0.7rem;
    }
    .btn-add-cart:hover { background: var(--green-light); }
    .btn-add-cart.added { background: var(--gold-deep); }

    /* ── CHECKOUT PAGE ── */
    .checkout-layout {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 400px;
      gap: 3rem; padding: 9rem 2rem 5rem; align-items: flex-start;
    }
    @media (max-width: 900px) { .checkout-layout { grid-template-columns: 1fr; } }

    .checkout-form-section {}
    .checkout-step-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem; color: var(--green); margin-bottom: 2rem;
      padding-bottom: 1rem; border-bottom: 1px solid var(--border);
    }
    .form-group { margin-bottom: 1.4rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
    .form-label {
      display: block; font-family: 'Cormorant Garamond', serif;
      font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
      color: var(--text-muted); margin-bottom: 0.45rem;
    }
    .form-input {
      width: 100%; padding: 0.8rem 1rem;
      border: 1px solid var(--border-mid); background: #fff;
      font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
      color: var(--text); outline: none;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .form-input:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(197,160,89,0.12);
    }
    .form-input::placeholder { color: var(--text-muted); opacity: 0.6; }
    .form-select {
      width: 100%; padding: 0.8rem 1rem;
      border: 1px solid var(--border-mid); background: #fff;
      font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
      color: var(--text); outline: none; cursor: pointer;
      transition: border-color 0.3s;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C5A059' fill='none' stroke-width='1.5'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 1rem center;
    }
    .form-select:focus { border-color: var(--gold); }
    .payment-options { display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.4rem; }
    .payment-option {
      display: flex; align-items: center; gap: 1rem;
      padding: 1rem 1.2rem; border: 1px solid var(--border-mid); cursor: pointer;
      transition: border-color 0.3s, background 0.3s;
    }
    .payment-option:hover { border-color: var(--gold-pale); }
    .payment-option.selected { border-color: var(--green); background: rgba(10,61,46,0.03); }
    .payment-radio {
      width: 16px; height: 16px; border-radius: 50%;
      border: 2px solid var(--border-mid); display: flex;
      align-items: center; justify-content: center; flex-shrink: 0;
      transition: border-color 0.3s;
    }
    .payment-option.selected .payment-radio { border-color: var(--green); }
    .payment-radio-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--green); display: none;
    }
    .payment-option.selected .payment-radio-dot { display: block; }
    .payment-info {}
    .payment-name {
      font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
      color: var(--text); font-weight: 500;
    }
    .payment-note {
      font-family: 'DM Sans', sans-serif; font-size: 0.75rem;
      color: var(--text-muted); margin-top: 0.15rem;
    }
    .btn-checkout {
      width: 100%; padding: 1.1rem;
      background: var(--green); color: #fff; border: none; cursor: pointer;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.92rem; letter-spacing: 0.25em; text-transform: uppercase;
      transition: all 0.4s; display: flex; align-items: center; justify-content: center; gap: 0.8rem;
      margin-top: 1rem;
    }
    .btn-checkout:hover { background: var(--green-light); transform: translateY(-2px); box-shadow: var(--shadow-lg); }
    .btn-checkout:disabled { background: var(--text-muted); cursor: not-allowed; transform: none; }

    /* Order Summary */
    .order-summary {
      background: var(--cream-mid); border: 1px solid var(--border);
      padding: 2rem; position: sticky; top: 100px;
    }
    .summary-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem; color: var(--green); margin-bottom: 1.5rem;
      padding-bottom: 1rem; border-bottom: 1px solid var(--border);
    }
    .summary-items { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
    .summary-item { display: flex; gap: 1rem; align-items: flex-start; }
    .summary-item-img {
      width: 56px; height: 56px; object-fit: cover; flex-shrink: 0;
      border: 1px solid var(--border);
    }
    .summary-item-info {}
    .summary-item-name {
      font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
      color: var(--text); font-weight: 500;
    }
    .summary-item-qty {
      font-family: 'DM Sans', sans-serif; font-size: 0.75rem;
      color: var(--text-muted); margin-top: 0.2rem;
    }
    .summary-item-price {
      font-family: 'Playfair Display', serif;
      font-size: 0.95rem; color: var(--green); margin-left: auto; flex-shrink: 0;
    }
    .summary-totals { border-top: 1px solid var(--border); padding-top: 1rem; display: flex; flex-direction: column; gap: 0.6rem; }
    .summary-row { display: flex; justify-content: space-between; align-items: center; }
    .summary-label {
      font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: var(--text-muted);
    }
    .summary-value {
      font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: var(--text);
    }
    .summary-total-row {
      display: flex; justify-content: space-between; align-items: center;
      margin-top: 0.4rem; padding-top: 0.8rem; border-top: 1px solid var(--border);
    }
    .summary-total-label {
      font-family: 'Playfair Display', serif; font-size: 1rem; color: var(--green);
    }
    .summary-total-value {
      font-family: 'Playfair Display', serif; font-size: 1.2rem; color: var(--green); font-weight: 700;
    }
    .summary-trust {
      margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border);
      display: flex; flex-direction: column; gap: 0.5rem;
    }
    .trust-point {
      display: flex; align-items: center; gap: 0.6rem;
      font-family: 'DM Sans', sans-serif; font-size: 0.75rem; color: var(--text-muted);
    }
    .trust-point::before {
      content: '✦'; color: var(--gold); font-size: 0.6rem; flex-shrink: 0;
    }
    .empty-cart {
      text-align: center; padding: 4rem 2rem;
    }
    .empty-cart-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.3; }
    .empty-cart-title {
      font-family: 'Playfair Display', serif; font-size: 1.3rem;
      color: var(--green); margin-bottom: 0.5rem;
    }
    .empty-cart-sub {
      font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
      color: var(--text-muted); margin-bottom: 1.5rem;
    }

    /* Order Confirm */
    .order-confirm {
      text-align: center; padding: 7rem 2rem; max-width: 600px; margin: 0 auto;
    }
    .confirm-icon {
      width: 80px; height: 80px; border-radius: 50%;
      background: var(--green); color: var(--gold);
      display: flex; align-items: center; justify-content: center;
      font-size: 2rem; margin: 0 auto 2rem;
      animation: pulse 2s infinite;
    }
    .confirm-title {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem; color: var(--green); margin-bottom: 0.8rem;
    }
    .confirm-sub {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem; color: var(--text-muted); line-height: 1.9; margin-bottom: 2.5rem;
    }

    /* Misc */
    .text-center { text-align: center; }
    .mx-auto { margin: 0 auto; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
    .mt-8 { margin-top: 2rem; }
    .w-full { width: 100%; }

    .badge-green {
      display: inline-block; background: rgba(10,61,46,0.08);
      color: var(--green); font-family: 'Cormorant Garamond', serif;
      font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
      padding: 0.25rem 0.6rem; border: 1px solid rgba(10,61,46,0.15);
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    sku: "KOH-HLD-200",
    category: "Spices",
    tag: "Best Seller",
    name: "Zarr-e-Talai Haldi",
    subtitle: "Golden Stone-Ground Turmeric",
    price: 350,
    weight: "200g",
    img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=80&fit=crop",
    imgDetail: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=1000&q=90&fit=crop",
    desc: "Sourced from the highlands of Kashmiri farms, our turmeric is sun-dried and cold-ground on ancient stone mills. Deep amber colour and earthy fragrance that machine-processed powder cannot replicate.",
    features: ["Kashmiri highland variety", "5%+ curcumin content", "Cold-ground — no heat degradation", "No artificial colour or additives", "Milled fresh on order"],
  },
  {
    id: 2,
    sku: "KOH-ATT-1KG",
    category: "Flour",
    tag: "Premium",
    name: "Hayat Mix Atta",
    subtitle: "Seven-Grain Stone-Ground Flour",
    price: 480,
    weight: "1 kg",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80&fit=crop",
    imgDetail: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1000&q=90&fit=crop",
    desc: "A blend of seven ancient grains — wheat, barley, millet, sorghum, corn, oats, and amaranth — ground whole on cold stone, preserving the bran, germ and all the fibre that modern rollers discard.",
    features: ["7-grain heritage blend", "Whole grain with bran intact", "High dietary fibre", "No bleaching or chemicals", "Milled to order"],
  },
  {
    id: 3,
    sku: "KOH-MRC-200",
    category: "Spices",
    tag: null,
    name: "Dardari Lal Mirch",
    subtitle: "Sun-Dried Balochi Red Chilli",
    price: 320,
    weight: "200g",
    img: "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=800&q=80&fit=crop",
    imgDetail: "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=1000&q=90&fit=crop",
    desc: "Balochistan's finest long red chillies, slow sun-dried at altitude and stone-ground seeds and all. The result is a deep, glossy red powder with a complex heat and a fragrance you can smell from across the kitchen.",
    features: ["Balochistan altitude variety", "Sun-dried at source", "Ground with seeds for full heat", "Deep red natural colour", "No heat treatment"],
  },
  {
    id: 4,
    sku: "KOH-DHN-150",
    category: "Spices",
    tag: "New",
    name: "Safar-e-Sabz Dhania",
    subtitle: "Aromatic Stone-Ground Coriander",
    price: 280,
    weight: "150g",
    img: "https://images.unsplash.com/photo-1599909533809-f48d6d0d2ec9?w=800&q=80&fit=crop",
    imgDetail: "https://images.unsplash.com/photo-1599909533809-f48d6d0d2ec9?w=1000&q=90&fit=crop",
    desc: "Whole coriander seeds from Punjab's fertile plains, lightly roasted over wood flame and then stone-ground to a coarse, fragrant powder that fills the pot the moment it hits hot oil.",
    features: ["Punjab origin seeds", "Wood-flame roasted", "Coarse stone-ground texture", "Rich citrus fragrance", "Batch-numbered packaging"],
  },
  {
    id: 5,
    sku: "KOH-ZRK-100",
    category: "Spices",
    tag: null,
    name: "Shahi Zira Kala",
    subtitle: "Black Cumin from Hunza Valley",
    price: 420,
    weight: "100g",
    img: "https://images.unsplash.com/photo-1600857062241-98e5dba7f434?w=800&q=80&fit=crop",
    imgDetail: "https://images.unsplash.com/photo-1600857062241-98e5dba7f434?w=1000&q=90&fit=crop",
    desc: "Wild-harvested Hunza Valley black cumin (Kala Zira), one of the rarest spices in Pakistan. Intensely aromatic with a warm, smoky note. Stone-ground to a fine powder that is truly irreplaceable in biryani and pilaf.",
    features: ["Wild Hunza Valley harvest", "Rare Kala Zira variety", "Intense smoky-warm aroma", "Stone-ground fine powder", "Limited small-batch production"],
  },
  {
    id: 6,
    sku: "KOH-MSL-300",
    category: "Blends",
    tag: "Popular",
    name: "Kohan Garam Masala",
    subtitle: "Royal Whole-Spice Blend",
    price: 540,
    weight: "150g",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80&fit=crop",
    imgDetail: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1000&q=90&fit=crop",
    desc: "Twelve whole spices, individually roasted and then blended by hand before a single, slow stone-grind. Our garam masala recipe dates back three generations — complex, layered, and impossible to replicate from pre-ground spices.",
    features: ["12-spice heritage recipe", "Each spice individually roasted", "Single stone-grind pass", "No fillers or starch", "Three-generation family blend"],
  },
];

const REVIEWS = [
  { name: "Nadia Rahman", city: "Lahore", avatar: "N", text: "The first time I opened the turmeric tin, the fragrance filled the entire kitchen. Twenty years searching for this exact smell — my grandmother's kitchen. Kohan delivered it.", stars: 5 },
  { name: "Dr. Imran ul-Haq", city: "Islamabad", avatar: "I", text: "My children had digestive issues with commercial flour for years. Three weeks on Hayat Mix Atta and the difference is remarkable. This is real, whole food.", stars: 5 },
  { name: "Sadia Mirza", city: "Karachi", avatar: "S", text: "I made biryani with the Kala Zira and my guests assumed I had hired a professional chef. The depth of flavour is incomparable to anything in the market.", stars: 5 },
  { name: "Hassan Raza", city: "Peshawar", avatar: "H", text: "The Dardari red chilli has a complex, layered heat. It goes into the pot and the colour blooms — no artificial dye needed. Exceptional product.", stars: 5 },
  { name: "Amina Qureshi", city: "Multan", avatar: "A", text: "Ordered the Garam Masala blend. The aroma when opening the pouch is something else — you can smell each individual spice. Worth every rupee.", stars: 5 },
];

/* ─────────────────────────────────────────────────────────────
   ICONS (inline SVG)
───────────────────────────────────────────────────────────── */
const IconMill = ({size=40}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="24" cy="24" r="20"/>
    <circle cx="24" cy="24" r="10"/>
    <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/>
    <line x1="24" y1="4" x2="24" y2="10"/>
    <line x1="24" y1="38" x2="24" y2="44"/>
    <line x1="4" y1="24" x2="10" y2="24"/>
    <line x1="38" y1="24" x2="44" y2="24"/>
    <path d="M14 24 Q24 14 34 24 Q24 34 14 24Z" strokeDasharray="2 2"/>
  </svg>
);
const IconPure = ({size=40}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M24 4 L28 16 L42 16 L31 24 L35 38 L24 30 L13 38 L17 24 L6 16 L20 16 Z"/>
    <circle cx="24" cy="24" r="6" strokeDasharray="3 1.5"/>
  </svg>
);
const IconDelivery = ({size=40}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="6" y="16" width="30" height="22" rx="1"/>
    <path d="M14 16 V10 Q14 6 18 6 H30 Q34 6 34 10 V16"/>
    <circle cx="13" cy="42" r="3"/><circle cx="29" cy="42" r="3"/>
    <polyline points="10,28 18,36 38,14" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCart = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IconWA = ({size=20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconArrow = ({size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconCheck = ({size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconMinus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconPlus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    const nodes = document.querySelectorAll('.reveal, .reveal-left');
    nodes.forEach(n => obs.observe(n));
    return () => obs.disconnect();
  });
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return scrolled;
}

/* ─────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────── */
function Nav({ page, setPage, cart }) {
  const scrolled = useScrolled();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <nav className={`nav-root${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => setPage('home')}>
        Koh<span className="logo-dot">a</span>n
      </div>
      <ul className="nav-links">
        <li><button className={page==='home'?'active':''} onClick={() => setPage('home')}>Home</button></li>
        <li><button className={page==='products'?'active':''} onClick={() => setPage('products')}>Products</button></li>
        <li><button onClick={() => setPage('home')}>Our Story</button></li>
        <li><button onClick={() => setPage('home')}>Contact</button></li>
      </ul>
      <div className="nav-right">
        <button className="nav-cart-btn" onClick={() => setPage('checkout')}>
          <IconCart size={16} />
          Cart
          {total > 0 && <span className="cart-badge">{total}</span>}
        </button>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   TICKER
───────────────────────────────────────────────────────────── */
function Ticker() {
  const items = ["Free Cash-on-Delivery · Nationwide", "Stone-Ground Fresh on Order", "100% Pure · No Additives", "Batch-Numbered Packaging", "Video Proof of Purity"];
  const doubled = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {doubled.map((t, i) => (
          <span key={i} className="ticker-item">{t} <span className="ticker-sep">✦</span></span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
function HomePage({ setPage, addToCart }) {
  useReveal();
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => videoRef.current?.classList.add('ready'));
    }
  }, []);

  return (
    <div className="animate-page">
      {/* ── HERO ── */}
      <section className="hero">
        <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400&q=60">
          <source src="https://videos.pexels.com/video-files/5900490/5900490-uhd_2560_1440_25fps.mp4" type="video/mp4"/>
          <source src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4" type="video/mp4"/>
        </video>
        <div className="hero-overlay"/>
        <div className="hero-content">
          <div className="hero-eyebrow">Pure · Ancient · Handcrafted in Small Batches</div>
          <h1 className="hero-title">
            Tradition Ground<br/>into Every <em>Grain</em>
          </h1>
          <p className="hero-subtitle">
            Stone-milled spices and flour, cold-ground on ancient mills,<br/>
            preserving the nutrients and flavours machine grinding destroys.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setPage('products')}>
              Explore the Collection <IconArrow size={15}/>
            </button>
            <a href="https://wa.me/923001234567?text=Hello%2C%20I%20would%20like%20to%20order%20from%20Kohan." target="_blank" rel="noreferrer" className="btn-outline">
              <IconWA size={16}/> Order via WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-bar"/>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker/>

      {/* ── TRUST ── */}
      <section className="trust-bar section-sm">
        <div className="trust-grid">
          {[
            { Icon: IconMill, title: "Cold Stone Grinding", desc: "No heat. No friction damage.\nNutrients and essential oils fully preserved." },
            { Icon: IconPure, title: "100% Pure", desc: "Zero additives, colours or fillers.\nVideo proof with every batch." },
            { Icon: IconDelivery, title: "Milled Fresh on Order", desc: "We grind after you order.\nCash on delivery, nationwide." },
          ].map(({ Icon, title, desc }, i) => (
            <div key={i} className={`trust-item reveal`} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="trust-icon-wrap"><Icon size={46}/></div>
              <h3 className="trust-title">{title}</h3>
              <p className="trust-desc">{desc.split('\n').map((l,j) => <span key={j}>{l}<br/></span>)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="section" style={{ background: 'var(--cream-mid)' }}>
        <div className="story-grid">
          <div>
            <span className="section-label reveal">The Kohan Philosophy</span>
            <h2 className="section-title reveal">Why the Mill<br/>Makes All the Difference</h2>
            <p className="section-body reveal" style={{ marginBottom: '0.5rem' }}>
              Modern industrial grinders generate temperatures above 80°C. At that heat, the volatile oils that give spices their aroma and potency simply evaporate. What reaches your kitchen is coloured, flavoured dust.
            </p>
            <div className="compare-stack">
              <div className="compare-item compare-bad reveal" style={{ transitionDelay: '0.2s' }}>
                <div className="compare-icon">✗</div>
                <div className="compare-text-block">
                  <div className="compare-label">Machine Grinding</div>
                  <div className="compare-body">High heat destroys essential oils, colour compounds and vitamins — leaving nutritionally empty powder that smells of nothing.</div>
                </div>
              </div>
              <div className="compare-item compare-good reveal" style={{ transitionDelay: '0.4s' }}>
                <div className="compare-icon" style={{ color: 'var(--gold)' }}>✓</div>
                <div className="compare-text-block">
                  <div className="compare-label">Kohan Stone Grinding</div>
                  <div className="compare-body">Cold, slow, ancient. Every oil, pigment and nutrient remains intact. The colour is vivid. The fragrance, arresting.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="story-img-wrap reveal">
            <div className="story-img-frame"/>
            <img className="story-img"
              src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=900&q=80&fit=crop"
              alt="Ancient stone mill" loading="lazy"/>
            <div className="story-caption">Ancient Stone Mill · Cold Grinding · No Heat</div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">The Royal Collection</span>
            <h2 className="section-title">Featured Products</h2>
            <div className="gold-rule-center mt-4"><div className="gold-diamond"/></div>
          </div>
          <div className="products-grid">
            {PRODUCTS.slice(0,3).map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 0.15} addToCart={addToCart} setPage={setPage}/>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="btn-primary" onClick={() => setPage('products')}>
              View Full Collection <IconArrow size={14}/>
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-bg">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Customer Stories</span>
            <h2 className="section-title">Voices from the Kitchen</h2>
          </div>
        </div>
        <div className="reviews-slider" style={{ marginTop: '3rem' }}>
          <div className="reviews-track">
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">{'★'.repeat(r.stars)}</div>
                <div className="review-quote">"</div>
                <p className="review-text">{r.text}</p>
                <div className="reviewer">
                  <div className="reviewer-av">{r.avatar}</div>
                  <div>
                    <div className="reviewer-name">{r.name}</div>
                    <div className="reviewer-loc">{r.city}, Pakistan</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER CTA ── */}
      <section className="section order-section">
        <div className="order-watermark">KOHAN</div>
        <div className="order-content">
          <span className="section-label" style={{ color: 'var(--gold)', justifyContent: 'center', display: 'block' }}>Direct Order</span>
          <h2 className="order-title reveal">No Complex Checkout.<br/>Just a Message.</h2>
          <p className="order-desc reveal">Place your order over WhatsApp and we start grinding fresh the moment it's confirmed. No middlemen, no delays.</p>
          <a href="https://wa.me/923001234567?text=Hello%2C%20I%20would%20like%20to%20place%20an%20order%20from%20Kohan." target="_blank" rel="noreferrer" className="btn-whatsapp reveal">
            <IconWA size={20}/> Order via WhatsApp
          </a>
          <p className="order-note reveal">
            <strong>We grind fresh only after your order is confirmed.</strong><br/>
            Cash on Delivery · Nationwide Shipping · Freshness Guaranteed
          </p>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRODUCT CARD (shared)
───────────────────────────────────────────────────────────── */
function ProductCard({ product: p, delay = 0, addToCart, setPage }) {
  const [added, setAdded] = useState(false);
  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(p, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };
  return (
    <div className="product-card reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className="product-img-box">
        <img className="product-img" src={p.img} alt={p.name} loading="lazy"/>
        {p.tag && <span className="product-badge-tag">{p.tag}</span>}
      </div>
      <div className="product-body">
        <div className="product-en">{p.subtitle}</div>
        <h3 className="product-name">{p.name}</h3>
        <p className="product-desc">{p.desc.slice(0, 110)}…</p>
        <div className="product-footer">
          <div className="product-price">
            <sup>₨</sup>{p.price} <small>/ {p.weight}</small>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={`btn-sm${added ? ' gold' : ''}`} onClick={handleAdd}>
              {added ? <><IconCheck size={12}/> Added</> : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRODUCTS PAGE
───────────────────────────────────────────────────────────── */
function ProductsPage({ addToCart, setPage }) {
  useReveal();
  const [filter, setFilter] = useState('All');
  const [detail, setDetail] = useState(null);
  const [qty, setQty] = useState(1);
  const [addedId, setAddedId] = useState(null);

  const categories = ['All', 'Spices', 'Flour', 'Blends'];
  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  const openDetail = (p) => { setDetail(p); setQty(1); };
  const closeDetail = (e) => { if (e.target.classList.contains('detail-overlay')) setDetail(null); };

  const handleAddFromDetail = () => {
    if (!detail) return;
    addToCart(detail, qty);
    setAddedId(detail.id);
    setTimeout(() => { setAddedId(null); setDetail(null); }, 1600);
  };

  return (
    <div className="animate-page">
      {/* Hero */}
      <div className="products-page-hero">
        <div className="products-hero-content">
          <div style={{ marginBottom: '0.7rem' }}>
            <span className="section-label">The Royal Collection</span>
          </div>
          <h1 className="products-hero-title">Our Spices & Flours</h1>
          <p className="products-hero-sub">Every product stone-ground fresh. No compromise.</p>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        <div className="filter-inner">
          <span className="filter-label">Filter:</span>
          {categories.map(c => (
            <button key={c} className={`filter-btn${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="container">
          <div className="products-grid">
            {filtered.map((p, i) => (
              <div key={p.id} className="product-card reveal" style={{ transitionDelay: `${(i % 3) * 0.12}s`, cursor: 'pointer' }}
                onClick={() => openDetail(p)}>
                <div className="product-img-box">
                  <img className="product-img" src={p.img} alt={p.name} loading="lazy"/>
                  {p.tag && <span className="product-badge-tag">{p.tag}</span>}
                </div>
                <div className="product-body">
                  <div className="product-en">{p.subtitle}</div>
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-desc">{p.desc.slice(0, 100)}…</p>
                  <div className="product-footer">
                    <div className="product-price"><sup>₨</sup>{p.price} <small>/ {p.weight}</small></div>
                    <button className="btn-sm" onClick={e => { e.stopPropagation(); openDetail(p); }}>Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Panel */}
      <div className={`detail-overlay${detail ? ' open' : ''}`} onClick={closeDetail}>
        {detail && (
          <div className="detail-panel" style={{ position: 'relative' }}>
            <button className="detail-close" onClick={() => setDetail(null)}>✕</button>
            <img className="detail-img" src={detail.imgDetail} alt={detail.name}/>
            <div className="detail-body">
              <div className="detail-label">{detail.subtitle} · {detail.sku}</div>
              <h2 className="detail-name">{detail.name}</h2>
              <div className="detail-price"><sup>₨</sup>{detail.price} <span style={{ fontSize:'0.75rem', color:'var(--text-muted)', fontFamily:'DM Sans' }}>/ {detail.weight}</span></div>
              <p className="detail-desc">{detail.desc}</p>
              <ul className="detail-features">
                {detail.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}><IconMinus/></button>
                <div className="qty-num">{qty}</div>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}><IconPlus/></button>
              </div>
              <button className={`btn-add-cart${addedId === detail.id ? ' added' : ''}`} onClick={handleAddFromDetail}>
                {addedId === detail.id ? <><IconCheck size={16}/> Added to Cart!</> : <><IconCart size={16}/> Add to Cart</>}
              </button>
              <div style={{ marginTop: '1rem' }}>
                <a href={`https://wa.me/923001234567?text=Hello%2C%20I%20want%20to%20order%20${encodeURIComponent(detail.name)}%20x${qty}.`}
                  target="_blank" rel="noreferrer" className="btn-whatsapp" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', fontSize: '0.78rem' }}>
                  <IconWA size={16}/> Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CHECKOUT PAGE
───────────────────────────────────────────────────────────── */
function CheckoutPage({ cart, setCart, setPage }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    address: '', city: '', province: 'Punjab', notes: '',
  });
  const [payment, setPayment] = useState('cod');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateCart = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };
  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shipping;

  const valid = form.firstName && form.lastName && form.phone && form.address && form.city;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); setCart([]); }, 2000);
  };

  if (submitted) {
    return (
      <div className="animate-page" style={{ paddingTop: '6rem', minHeight: '100vh' }}>
        <div className="order-confirm">
          <div className="confirm-icon"><IconCheck size={32}/></div>
          <h2 className="confirm-title">Order Placed!</h2>
          <p className="confirm-sub">
            Thank you for your order. We will confirm it via WhatsApp or call within 2 hours, then begin fresh grinding.<br/><br/>
            <strong style={{ color: 'var(--green)' }}>Your spices will be freshly ground and dispatched within 24 hours.</strong>
          </p>
          <a href={`https://wa.me/923001234567?text=Hello%2C%20I%20just%20placed%20an%20order%20from%20Kohan.%20Name:%20${form.firstName}%20${form.lastName}%2C%20Phone:%20${form.phone}`}
            target="_blank" rel="noreferrer" className="btn-whatsapp" style={{ margin: '0 auto', display: 'inline-flex' }}>
            <IconWA size={18}/> Confirm on WhatsApp
          </a>
          <div style={{ marginTop: '2rem' }}>
            <button className="btn-sm" style={{ marginRight: '1rem' }} onClick={() => setPage('home')}>Back to Home</button>
            <button className="btn-sm" onClick={() => setPage('products')}>Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="animate-page" style={{ paddingTop: '6rem', minHeight: '100vh' }}>
        <div className="empty-cart">
          <div className="empty-cart-icon">🧺</div>
          <h2 className="empty-cart-title">Your cart is empty</h2>
          <p className="empty-cart-sub">Discover our stone-ground spices and flours.</p>
          <button className="btn-primary" onClick={() => setPage('products')}>Explore Products <IconArrow size={14}/></button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-page">
      <div className="checkout-layout">
        {/* Form */}
        <div>
          {/* Cart Items */}
          <h2 className="checkout-step-title">Your Order</h2>
          <div style={{ marginBottom: '2.5rem' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display:'flex', gap:'1rem', alignItems:'flex-start', padding:'1rem 0', borderBottom:'1px solid var(--border)' }}>
                <img src={item.img} alt={item.name} style={{ width:70, height:70, objectFit:'cover', border:'1px solid var(--border)', flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Playfair Display, serif', fontSize:'0.95rem', color:'var(--green)', marginBottom:'0.25rem' }}>{item.name}</div>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.75rem', color:'var(--text-muted)' }}>{item.weight}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginTop:'0.6rem' }}>
                    <button className="qty-btn" onClick={() => updateCart(item.id, -1)}><IconMinus/></button>
                    <span style={{ fontFamily:'Playfair Display, serif', fontSize:'0.9rem', width:24, textAlign:'center' }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateCart(item.id, 1)}><IconPlus/></button>
                    <button onClick={() => removeItem(item.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', fontSize:'0.72rem', fontFamily:'Cormorant Garamond', letterSpacing:'0.15em', textTransform:'uppercase', marginLeft:'0.5rem', transition:'color 0.3s' }}
                      onMouseOver={e=>e.target.style.color='#C5382C'} onMouseOut={e=>e.target.style.color='var(--text-muted)'}>Remove</button>
                  </div>
                </div>
                <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1rem', color:'var(--green)', flexShrink:0 }}>₨{item.price * item.qty}</div>
              </div>
            ))}
          </div>

          {/* Shipping Form */}
          <form onSubmit={handleSubmit}>
            <h2 className="checkout-step-title">Delivery Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input className="form-input" value={form.firstName} onChange={e => setForm(f => ({...f, firstName: e.target.value}))} placeholder="Ahmad" required/>
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input className="form-input" value={form.lastName} onChange={e => setForm(f => ({...f, lastName: e.target.value}))} placeholder="Khan"/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input className="form-input" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="0300 0000000" required/>
              </div>
              <div className="form-group">
                <label className="form-label">Email (Optional)</label>
                <input className="form-input" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="you@example.com"/>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Full Address *</label>
              <input className="form-input" value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} placeholder="House / Street / Area" required/>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input className="form-input" value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} placeholder="Lahore" required/>
              </div>
              <div className="form-group">
                <label className="form-label">Province</label>
                <select className="form-select" value={form.province} onChange={e => setForm(f => ({...f, province: e.target.value}))}>
                  <option>Punjab</option><option>Sindh</option><option>KPK</option>
                  <option>Balochistan</option><option>Islamabad</option><option>AJK</option><option>Gilgit-Baltistan</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Special Instructions</label>
              <input className="form-input" value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} placeholder="Coarse grind, extra packaging, etc."/>
            </div>

            <h2 className="checkout-step-title" style={{ marginTop: '2.5rem' }}>Payment Method</h2>
            <div className="payment-options">
              {[
                { id: 'cod', name: 'Cash on Delivery', note: 'Pay when your order arrives — available nationwide' },
                { id: 'wa',  name: 'WhatsApp Confirmation + Bank Transfer', note: 'We will send account details via WhatsApp' },
                { id: 'easypaisa', name: 'EasyPaisa / JazzCash', note: 'Mobile wallet payment — number shared on confirmation' },
              ].map(opt => (
                <div key={opt.id} className={`payment-option${payment === opt.id ? ' selected' : ''}`} onClick={() => setPayment(opt.id)}>
                  <div className="payment-radio">
                    <div className="payment-radio-dot"/>
                  </div>
                  <div className="payment-info">
                    <div className="payment-name">{opt.name}</div>
                    <div className="payment-note">{opt.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" className="btn-checkout" disabled={!valid || loading}>
              {loading ? 'Placing Order…' : <><IconCheck size={16}/> Place Order — ₨{total.toLocaleString()}</>}
            </button>

            <p style={{ marginTop:'1rem', fontFamily:'DM Sans', fontSize:'0.75rem', color:'var(--text-muted)', lineHeight:'1.8', textAlign:'center' }}>
              By placing this order you agree to our return policy. Orders are ground fresh after confirmation — no cancellation after grinding begins.
            </p>
          </form>
        </div>

        {/* Summary */}
        <div className="order-summary">
          <div className="summary-title">Order Summary</div>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <img className="summary-item-img" src={item.img} alt={item.name}/>
                <div className="summary-item-info">
                  <div className="summary-item-name">{item.name}</div>
                  <div className="summary-item-qty">{item.weight} × {item.qty}</div>
                </div>
                <div className="summary-item-price">₨{item.price * item.qty}</div>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">₨{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span className="summary-value">{shipping === 0 ? <span style={{ color:'var(--green)' }}>Free</span> : `₨${shipping}`}</span>
            </div>
            {shipping === 0 && (
              <div style={{ background:'rgba(10,61,46,0.06)', padding:'0.5rem 0.7rem', marginTop:'0.3rem' }}>
                <span style={{ fontFamily:'DM Sans', fontSize:'0.72rem', color:'var(--green)' }}>✓ Free shipping on orders above ₨1,500</span>
              </div>
            )}
          </div>
          <div className="summary-total-row">
            <span className="summary-total-label">Total</span>
            <span className="summary-total-value">₨{total.toLocaleString()}</span>
          </div>
          <div className="summary-trust">
            <div className="trust-point">Ground fresh after order confirmation</div>
            <div className="trust-point">Cash on delivery available nationwide</div>
            <div className="trust-point">100% pure — video proof with every batch</div>
            <div className="trust-point">WhatsApp support at every step</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
function Footer({ setPage }) {
  return (
    <footer className="footer-root">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-text">Kohan</div>
          <p className="footer-tagline">Ancient stone mills.<br/>Modern doorstep delivery.<br/>Tradition ground into every grain.</p>
        </div>
        <div>
          <div className="footer-col-title">Navigate</div>
          <ul className="footer-links">
            <li><button onClick={() => setPage('home')}>Home</button></li>
            <li><button onClick={() => setPage('products')}>Products</button></li>
            <li><button onClick={() => setPage('checkout')}>Cart & Checkout</button></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Products</div>
          <ul className="footer-links">
            {PRODUCTS.map(p => <li key={p.id}><button onClick={() => setPage('products')}>{p.name}</button></li>)}
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Contact</div>
          <ul className="footer-links">
            <li><button>WhatsApp: +92 300 0000000</button></li>
            <li><button>info@kohan.pk</button></li>
            <li><button>Lahore, Pakistan</button></li>
            <li>
              <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer"
                style={{ background:'#25D366', color:'#fff', padding:'0.5rem 1rem', display:'inline-flex', alignItems:'center', gap:'0.5rem', fontSize:'0.75rem', fontFamily:'Cormorant Garamond', letterSpacing:'0.15em', textTransform:'uppercase', textDecoration:'none', marginTop:'0.4rem', transition:'background 0.3s' }}>
                <IconWA size={14}/> Chat with us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2025 KOHAN · All Rights Reserved · Pure Ancient Tradition</span>
        <span className="footer-copy">Crafted with stone and soul · Pakistan</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPageRaw] = useState('home');
  const [cart, setCart] = useState([]);

  const setPage = useCallback((p) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setPageRaw(p), 100);
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
  }, []);

  return (
    <>
      <GlobalStyles/>
      <Nav page={page} setPage={setPage} cart={cart}/>
      {page === 'home' && <HomePage setPage={setPage} addToCart={addToCart}/>}
      {page === 'products' && <ProductsPage addToCart={addToCart} setPage={setPage}/>}
      {page === 'checkout' && <CheckoutPage cart={cart} setCart={setCart} setPage={setPage}/>}
      {page !== 'checkout' && <Footer setPage={setPage}/>}
    </>
  );
}
