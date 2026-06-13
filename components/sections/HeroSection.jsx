'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.addEventListener('loadeddata', () => {
      v.style.transition = 'transform 14s cubic-bezier(0.22,1,0.36,1)';
      v.style.transform  = 'scale(1)';
    });
  }, []);

  return (
    <section className="hero-video-container">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.08)', willChange: 'transform' }}
        poster="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400&q=60"
      >
        <source src="/videos/hero-stone-grind.mp4"       type="video/mp4" />
        <source src="https://videos.pexels.com/video-files/5900490/5900490-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-dark/40 via-green-dark/10 to-green-dark/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-dark/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pb-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22,1,0.36,1] }}
          className="mb-6"
        >
          <span className="inline-block font-serif text-[0.65rem] tracking-widest3 uppercase text-gold-pale border border-gold/30 px-5 py-2">
            Pure · Ancient · Handcrafted in Small Batches
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.25, ease: [0.22,1,0.36,1] }}
          className="font-display text-white font-bold leading-[1.06] mb-4"
          style={{ fontSize: 'clamp(2.8rem, 7.5vw, 5.5rem)' }}
        >
          Kohan — Where Time<br/>
          <em className="font-display not-italic text-shimmer">
            Is Preserved in Stone.
          </em>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22,1,0.36,1] }}
          className="font-serif text-white/70 font-light leading-relaxed max-w-xl mb-10"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
        >
          Traditional cold-pressed spices and flour,<br className="hidden md:block"/>
          handcrafted in small batches. Stone-ground fresh on every order.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.75, ease: [0.22,1,0.36,1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.a
            href="https://wa.me/923001234567?text=Hello%2C%20I%20would%20like%20to%20place%20an%20order%20with%20Kohan."
            target="_blank" rel="noreferrer"
            className="bg-gold text-green-DEFAULT font-serif font-semibold text-[0.75rem] tracking-widest2 uppercase px-8 py-4 flex items-center gap-3 shadow-[0_8px_32px_rgba(197,160,89,0.35)] hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-400 ease-luxury"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle size={16} strokeWidth={2} />
            Order on WhatsApp
          </motion.a>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/products"
              className="text-white/80 hover:text-white font-serif text-[0.75rem] tracking-widest2 uppercase px-8 py-4 border border-white/30 hover:border-white/60 flex items-center gap-3 transition-all duration-400"
            >
              Explore the Collection <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div
          className="w-px bg-gradient-to-b from-white/50 to-transparent animate-float"
          style={{ height: 44 }}
        />
        <span className="font-serif text-[0.55rem] tracking-widest3 uppercase text-white/40">Scroll</span>
      </motion.div>
    </section>
  );
}
