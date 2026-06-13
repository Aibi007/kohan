'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <circle cx="28" cy="28" r="24"/>
        <circle cx="28" cy="28" r="12"/>
        <circle cx="28" cy="28" r="3.5" fill="currentColor" stroke="none"/>
        <line x1="28" y1="4"  x2="28" y2="11"/>
        <line x1="28" y1="45" x2="28" y2="52"/>
        <line x1="4"  y1="28" x2="11" y2="28"/>
        <line x1="45" y1="28" x2="52" y2="28"/>
        <path d="M16 28 Q28 16 40 28 Q28 40 16 28Z" strokeDasharray="2.5 2"/>
      </svg>
    ),
    title: 'Cold Stone Grinding',
    sub: 'Nutrients Fully Preserved',
    desc: 'Our granite mills rotate at 40 RPM. No friction heat. Every essential oil, pigment, and vitamin remains intact — precisely as nature grew it.',
  },
  {
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path d="M28 6 L33 20 L48 20 L37 29 L41 44 L28 35 L15 44 L19 29 L8 20 L23 20 Z"/>
        <circle cx="28" cy="28" r="7" strokeDasharray="3 2"/>
      </svg>
    ),
    title: '100% Pure Ingredients',
    sub: 'Transparent Video Proof',
    desc: 'Zero additives. Zero artificial colour. Every batch is filmed — from raw ingredient to sealed packet. You see what you eat.',
  },
  {
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <rect x="8" y="18" width="32" height="24" rx="1"/>
        <path d="M16 18 V13 Q16 8 21 8 H35 Q40 8 40 13 V18"/>
        <polyline points="14,30 22,38 42,18" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Freshly Ground on Order',
    sub: 'Cash on Delivery Available',
    desc: 'We confirm. Then we grind. Your order is never pre-ground sitting in a warehouse. It is ground the morning we receive your confirmation.',
  },
];

function Pillar({ pillar, index }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.18, ease: [0.22,1,0.36,1] }}
      className="text-center py-12 px-8 border-r border-gold/15 last:border-r-0 group hover:bg-white/3 transition-colors duration-500"
    >
      <div className="w-12 h-12 mx-auto mb-5 text-gold opacity-80 group-hover:opacity-100 transition-opacity duration-500">
        {pillar.icon}
      </div>
      <h3 className="font-display text-white text-[1.05rem] mb-1 font-medium">
        {pillar.title}
      </h3>
      <p className="font-serif text-[0.65rem] tracking-widest text-gold uppercase mb-3">
        {pillar.sub}
      </p>
      <p className="font-sans text-[0.8rem] text-white/45 leading-relaxed max-w-[220px] mx-auto">
        {pillar.desc}
      </p>
    </motion.div>
  );
}

export default function TrustSection() {
  return (
    <section className="bg-green-DEFAULT">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {pillars.map((p, i) => <Pillar key={i} pillar={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
