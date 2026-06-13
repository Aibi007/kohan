'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';

const comparisons = [
  {
    bad: true,
    icon: '✗',
    label: 'Machine Grinding',
    text: 'Industrial mills spin at 3,000+ RPM. Friction raises temperature above 80°C. The essential oils that define a spice\'s character — its aroma, colour, and medicinal potency — simply evaporate. What remains is flavoured dust.',
  },
  {
    bad: false,
    icon: '✓',
    label: 'Kohan Stone Grinding',
    text: 'Granite on granite. 40 RPM. The stone moves with time, not against it. Every aromatic oil stays sealed inside each particle. The colour is vivid. The fragrance is arresting. The nutrition is complete.',
  },
];

export default function StorySection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="story" className="bg-cream-mid py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}
          >
            <SectionLabel>The Kohan Philosophy</SectionLabel>
            <h2 className="font-display text-green-DEFAULT font-bold leading-[1.15] mb-5"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              Why the Mill<br/>Makes All the<br/>Difference
            </h2>
            <p className="font-sans text-[0.9rem] text-green-DEFAULT/60 leading-relaxed mb-8 max-w-md">
              The temperature at which a spice is ground determines everything.
              Heat is the silent destroyer of flavour and nutrition. At Kohan, we
              have removed heat from the equation entirely.
            </p>

            <div className="space-y-4">
              {comparisons.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.2, ease: [0.22,1,0.36,1] }}
                  className={`flex gap-4 p-5 ${
                    c.bad
                      ? 'bg-white border-l-[3px] border-l-red-500/60'
                      : 'bg-green-DEFAULT border-l-[3px] border-l-gold'
                  }`}
                >
                  <span className={`text-sm mt-0.5 flex-shrink-0 ${c.bad ? 'text-red-500/70' : 'text-gold'}`}>
                    {c.icon}
                  </span>
                  <div>
                    <p className={`font-serif text-[0.6rem] tracking-widest uppercase mb-1.5 ${
                      c.bad ? 'text-red-500/60' : 'text-gold'
                    }`}>
                      {c.label}
                    </p>
                    <p className={`font-sans text-[0.82rem] leading-relaxed ${
                      c.bad ? 'text-green-DEFAULT/70' : 'text-white/75'
                    }`}>
                      {c.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22,1,0.36,1] }}
            className="relative"
          >
            {/* Decorative corners */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t border-l border-gold/40 pointer-events-none z-10" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-gold/40 pointer-events-none z-10" />

            <div className="relative overflow-hidden aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=900&q=85&fit=crop"
                alt="Traditional stone grinding mill macro texture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-dark/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-[2px] bg-green-dark/50">
                <p className="font-serif text-[0.65rem] tracking-widest2 uppercase text-gold-pale">
                  Ancient granite mill · Cold grinding · No heat · Kohan
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
