'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import SectionLabel from '@/components/ui/SectionLabel';
import GoldDivider from '@/components/ui/GoldDivider';

function ProductCard({ product, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay: index * 0.15, ease: [0.22,1,0.36,1] }}
    >
      <Link href={`/products/${product.slug}`} className="block group product-card">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-cream-dark">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className="product-card-img object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-green-dark/10 group-hover:bg-green-dark/0 transition-all duration-600" />

          {/* Badge */}
          {product.tag && (
            <span className="absolute top-4 left-4 bg-gold text-green-DEFAULT font-serif text-[0.58rem] font-semibold tracking-widest uppercase px-2.5 py-1">
              {product.tag}
            </span>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="bg-green-DEFAULT text-gold font-serif text-[0.65rem] tracking-widest2 uppercase px-5 py-2.5 flex items-center gap-2">
              View Details <ArrowRight size={12} />
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 bg-white border border-gold/15 border-t-0 group-hover:border-gold/40 transition-all duration-400">
          <p className="font-serif text-[0.62rem] tracking-widest2 uppercase text-gold mb-1">
            {product.subtitle}
          </p>
          <h3 className="font-display text-green-DEFAULT text-lg font-semibold mb-2 leading-tight">
            {product.name}
          </h3>
          <p className="font-sans text-[0.8rem] text-green-DEFAULT/55 leading-relaxed mb-4 line-clamp-2">
            {product.heroDesc}
          </p>
          <div className="flex items-center justify-between border-t border-gold/15 pt-4">
            <div>
              <p className="font-display text-green-DEFAULT text-xl font-bold">
                <sup className="text-xs font-normal">₨</sup>
                {product.price}
              </p>
              <p className="font-sans text-[0.65rem] text-green-DEFAULT/40">{product.weights[1]}</p>
            </div>
            <span className="font-serif text-[0.65rem] tracking-widest2 uppercase text-green-DEFAULT border border-green-DEFAULT/30 group-hover:border-gold group-hover:text-gold px-4 py-2 transition-all duration-300 flex items-center gap-1.5">
              View Details <ArrowRight size={10} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22,1,0.36,1] }}
          className="text-center mb-14"
        >
          <SectionLabel>The Royal Collection</SectionLabel>
          <h2 className="font-display text-green-DEFAULT font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)' }}>
            Featured Products
          </h2>
          <GoldDivider className="max-w-[220px] mx-auto mt-5" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PRODUCTS.slice(0, 3).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
          className="text-center mt-14"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 font-serif text-[0.75rem] tracking-widest2 uppercase text-green-DEFAULT border border-green-DEFAULT/30 hover:border-gold hover:text-gold px-10 py-4 transition-all duration-400"
          >
            View Full Collection <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
