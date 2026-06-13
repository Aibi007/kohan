'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';

export default function OrderCTA() {
  return (
    <section id="order" className="relative bg-green-DEFAULT py-24 md:py-36 overflow-hidden">
      {/* Watermark */}
      <p
        className="absolute font-display font-black text-white/[0.03] pointer-events-none select-none"
        style={{
          fontSize: 'clamp(6rem, 20vw, 18rem)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.04em',
        }}
      >
        KOHAN
      </p>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22,1,0.36,1] }}
        >
          <SectionLabel>Direct Order</SectionLabel>
          <h2
            className="font-display text-white font-bold leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Speak to Kohan
          </h2>
          <p className="font-sans text-white/55 text-[0.9rem] leading-relaxed mb-10 max-w-lg mx-auto">
            No complex checkout. No middlemen. One WhatsApp message and
            we handle everything — from grinding to your door.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22,1,0.36,1] }}
        >
          <a
            href="https://wa.me/923001234567?text=Hello%2C%20I%27d%20like%20to%20begin%20my%20Kohan%20order."
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-serif font-semibold text-[0.78rem] tracking-widest2 uppercase px-10 py-5 shadow-[0_10px_36px_rgba(37,211,102,0.35)] hover:bg-[#1ebe5a] hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(37,211,102,0.45)] transition-all duration-400 ease-luxury animate-pulse-gold"
          >
            <MessageCircle size={18} strokeWidth={2} />
            Begin Your Order
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.45 }}
          className="font-sans text-[0.75rem] text-white/30 mt-7 leading-relaxed"
        >
          <span className="text-gold/60">We grind fresh only after confirming your order.</span>
          <br />
          Cash on Delivery · Nationwide · 24–48h Dispatch
        </motion.p>
      </div>
    </section>
  );
}
