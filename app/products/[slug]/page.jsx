'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, MessageCircle, ArrowLeft, Check } from 'lucide-react';
import { getProductBySlug, PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import SectionLabel from '@/components/ui/SectionLabel';
import GoldDivider from '@/components/ui/GoldDivider';

export default function ProductDetailPage({ params }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(product.weights[1] || product.weights[0]);
  const [qty,       setQty]       = useState(1);
  const [added,     setAdded]     = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const linePrice = product.priceMap[selectedWeight];

  const handleAdd = () => {
    addToCart(product, selectedWeight, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const waMsg = encodeURIComponent(
    `Hello, I'd like to order:\n\n${product.name}\nWeight: ${selectedWeight}\nQty: ${qty}\nPrice: ₨${linePrice * qty}\n\nPlease confirm my order.`
  );

  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 2);

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="bg-cream-mid border-b border-gold/10 pt-[70px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center gap-2">
          <Link href="/" className="font-serif text-[0.62rem] tracking-wide text-green-DEFAULT/40 hover:text-gold transition-colors duration-300">Home</Link>
          <span className="text-gold/30 text-xs">/</span>
          <Link href="/products" className="font-serif text-[0.62rem] tracking-wide text-green-DEFAULT/40 hover:text-gold transition-colors duration-300">Products</Link>
          <span className="text-gold/30 text-xs">/</span>
          <span className="font-serif text-[0.62rem] tracking-wide text-gold">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}
              className="relative"
            >
              {/* Corner Accents */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-gold/40 z-10 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-gold/40 z-10 pointer-events-none" />

              <div className="relative overflow-hidden aspect-square bg-cream-dark group">
                <Image
                  src={product.imageDetail}
                  alt={product.imageAlt}
                  fill
                  priority
                  onLoad={() => setImgLoaded(true)}
                  className={`object-cover transition-all duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Zoom hint */}
                <div className="absolute bottom-4 right-4 bg-green-DEFAULT/80 text-gold font-serif text-[0.55rem] tracking-widest uppercase px-3 py-1.5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  Hover to explore
                </div>
              </div>

              {/* Origin badge */}
              <div className="mt-3 flex items-center gap-2">
                <div className="w-1 h-1 bg-gold rounded-full" />
                <span className="font-serif text-[0.62rem] tracking-widest uppercase text-green-DEFAULT/45">
                  Origin: {product.origin}
                </span>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.22,1,0.36,1] }}
              className="lg:sticky lg:top-28"
            >
              <SectionLabel>{product.subtitle}</SectionLabel>
              <h1 className="font-display text-green-DEFAULT font-bold leading-tight mb-2"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)' }}>
                {product.name}
              </h1>
              <p className="font-serif italic text-green-DEFAULT/50 text-lg mb-5">{product.heroDesc}</p>

              <GoldDivider className="mb-6" />

              {/* Price */}
              <div className="mb-7">
                <span className="font-display text-green-DEFAULT font-bold"
                      style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
                  <sup className="font-sans text-sm font-normal">₨</sup>
                  {linePrice}
                </span>
                <span className="font-sans text-sm text-green-DEFAULT/40 ml-2">/ {selectedWeight}</span>
              </div>

              {/* Weight Selector */}
              <div className="mb-7">
                <p className="font-serif text-[0.62rem] tracking-widest uppercase text-green-DEFAULT/50 mb-3">
                  Select Weight
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.weights.map(w => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`font-serif text-[0.65rem] tracking-wide uppercase px-5 py-2.5 border transition-all duration-300
                        ${selectedWeight === w
                          ? 'bg-green-DEFAULT text-cream border-green-DEFAULT'
                          : 'border-gold/25 text-green-DEFAULT/60 hover:border-gold hover:text-gold'
                        }`}
                    >
                      {w}
                      <span className="block text-[0.55rem] mt-0.5 opacity-60">₨{product.priceMap[w]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="font-serif text-[0.62rem] tracking-widest uppercase text-green-DEFAULT/50 mb-3">
                  Quantity
                </p>
                <div className="flex items-center gap-0">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-11 h-11 border border-gold/25 flex items-center justify-center text-green-DEFAULT hover:bg-green-DEFAULT hover:text-cream hover:border-green-DEFAULT transition-all duration-300"
                  >
                    <Minus size={14} />
                  </button>
                  <div className="w-14 h-11 border-t border-b border-gold/25 flex items-center justify-center font-display text-green-DEFAULT text-lg font-semibold">
                    {qty}
                  </div>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-11 h-11 border border-gold/25 flex items-center justify-center text-green-DEFAULT hover:bg-green-DEFAULT hover:text-cream hover:border-green-DEFAULT transition-all duration-300"
                  >
                    <Plus size={14} />
                  </button>
                  <span className="ml-4 font-display text-green-DEFAULT/40 text-sm">
                    Total: <span className="text-green-DEFAULT font-semibold">₨{linePrice * qty}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.button
                  onClick={handleAdd}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-3 font-serif font-semibold text-[0.72rem] tracking-widest2 uppercase py-4 transition-all duration-400
                    ${added
                      ? 'bg-gold-deep text-cream'
                      : 'bg-green-DEFAULT text-cream hover:bg-green-mid'
                    }`}
                >
                  {added
                    ? <><Check size={15} /> Added to Cart</>
                    : <><ShoppingBag size={15} /> Add to Cart</>
                  }
                </motion.button>

                <motion.a
                  href={`https://wa.me/923001234567?text=${waMsg}`}
                  target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white font-serif font-semibold text-[0.72rem] tracking-widest2 uppercase py-4 hover:bg-[#1ebe5a] transition-all duration-400"
                >
                  <MessageCircle size={15} /> Order on WhatsApp
                </motion.a>
              </div>

              {/* Trust micro-bar */}
              <div className="flex items-center gap-4 py-4 border-t border-gold/12">
                {['Fresh-ground', 'COD Available', 'Pure — Video Proof'].map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-gold rounded-full" />
                    <span className="font-serif text-[0.58rem] tracking-wide text-green-DEFAULT/45 uppercase">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story & Details */}
      <section className="bg-cream-mid py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

            {/* Origin Story */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22,1,0.36,1] }}
            >
              <SectionLabel>Origin Story</SectionLabel>
              <h2 className="font-display text-green-DEFAULT text-2xl font-semibold mb-4 leading-tight">
                {product.storyTitle}
              </h2>
              <p className="font-sans text-[0.85rem] text-green-DEFAULT/60 leading-relaxed">
                {product.story}
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22,1,0.36,1] }}
            >
              <SectionLabel>Why It Matters</SectionLabel>
              <h2 className="font-display text-green-DEFAULT text-2xl font-semibold mb-4">Health Benefits</h2>
              <ul className="space-y-3">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gold mt-2 flex-shrink-0 transform rotate-45" />
                    <span className="font-sans text-[0.83rem] text-green-DEFAULT/65 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Grinding Process */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22,1,0.36,1] }}
            className="mt-14 bg-green-DEFAULT p-8 md:p-10"
          >
            <SectionLabel>The Process</SectionLabel>
            <h3 className="font-display text-white text-xl md:text-2xl font-semibold mb-4">
              How Your {product.name} Is Made
            </h3>
            <p className="font-sans text-[0.88rem] text-white/60 leading-relaxed">
              {product.process}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-cream py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-10">
              <SectionLabel>You May Also Love</SectionLabel>
              <h2 className="font-display text-green-DEFAULT text-2xl font-semibold">Related Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {related.map((p, i) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3] bg-cream-dark mb-3">
                    <Image src={p.image} alt={p.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 100vw, 50vw" />
                  </div>
                  <p className="font-serif text-[0.6rem] tracking-widest uppercase text-gold mb-0.5">{p.subtitle}</p>
                  <p className="font-display text-green-DEFAULT font-semibold group-hover:text-gold-deep transition-colors duration-300">{p.name}</p>
                  <p className="font-display text-green-DEFAULT/60 text-sm mt-0.5">from ₨{p.priceMap[p.weights[0]]}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to products */}
      <div className="bg-cream border-t border-gold/10 py-6 text-center">
        <Link href="/products" className="inline-flex items-center gap-2 font-serif text-[0.65rem] tracking-widest2 uppercase text-green-DEFAULT/50 hover:text-gold transition-colors duration-300">
          <ArrowLeft size={12} /> Back to All Products
        </Link>
      </div>
    </div>
  );
}
