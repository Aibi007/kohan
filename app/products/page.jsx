'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Filter } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import SectionLabel from '@/components/ui/SectionLabel';
import GoldDivider from '@/components/ui/GoldDivider';

const CATEGORIES = ['All', 'Spices', 'Flour', 'Blends'];

function ProductCard({ product, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: (index % 3) * 0.14, ease: [0.22,1,0.36,1] }}
    >
      <Link href={`/products/${product.slug}`} className="block group product-card">
        <div className="relative overflow-hidden aspect-[4/3] bg-cream-dark">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className="product-card-img object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-green-dark/5 group-hover:bg-transparent transition-all duration-600" />
          {product.tag && (
            <span className="absolute top-4 left-4 bg-gold text-green-DEFAULT font-serif text-[0.58rem] font-semibold tracking-widest uppercase px-2.5 py-1">
              {product.tag}
            </span>
          )}
          <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="bg-green-DEFAULT text-gold font-serif text-[0.62rem] tracking-widest2 uppercase px-4 py-2 flex items-center gap-1.5">
              View <ArrowRight size={11} />
            </span>
          </div>
        </div>
        <div className="p-5 bg-white border border-gold/15 border-t-0 group-hover:border-gold/35 transition-all duration-400">
          <p className="font-serif text-[0.6rem] tracking-widest2 uppercase text-gold mb-1">{product.subtitle}</p>
          <h3 className="font-display text-green-DEFAULT text-lg font-semibold mb-1.5">{product.name}</h3>
          <p className="font-sans text-[0.78rem] text-green-DEFAULT/50 mb-4 line-clamp-2 leading-relaxed">{product.heroDesc}</p>
          <div className="flex items-center justify-between border-t border-gold/12 pt-4">
            <div>
              <p className="font-display text-green-DEFAULT text-xl font-bold">
                <sup className="text-[0.65rem] font-sans font-normal">₨</sup>{product.price}
              </p>
              <p className="font-sans text-[0.6rem] text-green-DEFAULT/35">from {product.weights[0]}</p>
            </div>
            <span className="font-serif text-[0.62rem] tracking-widest uppercase text-green-DEFAULT/60 group-hover:text-gold border border-green-DEFAULT/20 group-hover:border-gold px-3 py-1.5 transition-all duration-300">
              Details
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="page-enter">
      {/* Page Hero */}
      <div className="relative min-h-[45vh] bg-green-DEFAULT flex items-end overflow-hidden pt-20">
        <div
          className="absolute inset-0 opacity-12"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400&q=50')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/60 to-green-DEFAULT/95" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-14 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22,1,0.36,1] }}
          >
            <SectionLabel>The Royal Collection</SectionLabel>
            <h1 className="font-display text-white font-bold leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}>
              Our Spices &amp; Flours
            </h1>
            <p className="font-serif italic text-white/50 text-lg mt-2">
              Every product stone-ground fresh. No compromise.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-cream-mid border-b border-gold/12 sticky top-[70px] z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center gap-3 flex-wrap">
          <Filter size={13} className="text-gold/60 hidden sm:block" />
          <span className="font-serif text-[0.62rem] tracking-widest uppercase text-green-DEFAULT/40 mr-1 hidden sm:block">
            Filter:
          </span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-serif text-[0.65rem] tracking-widest uppercase px-4 py-1.5 border transition-all duration-300
                ${activeFilter === cat
                  ? 'bg-green-DEFAULT text-cream border-green-DEFAULT'
                  : 'border-gold/20 text-green-DEFAULT/50 hover:border-gold/50 hover:text-gold'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-cream-mid py-16 text-center border-t border-gold/10">
        <p className="section-label text-center">Can't find what you need?</p>
        <p className="font-display text-green-DEFAULT text-2xl font-semibold mb-6">
          Ask us on WhatsApp
        </p>
        <a
          href="https://wa.me/923001234567?text=Hello%2C%20I%27m%20looking%20for%20a%20specific%20Kohan%20product."
          target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white font-serif text-[0.72rem] tracking-widest2 uppercase px-8 py-4 shadow-[0_6px_24px_rgba(37,211,102,0.25)] hover:bg-[#1ebe5a] hover:-translate-y-0.5 transition-all duration-400"
        >
          Chat with Us
        </a>
      </section>
    </div>
  );
}
