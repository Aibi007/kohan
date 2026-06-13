'use client';

import { motion } from 'framer-motion';

const variants = {
  primary: `
    bg-gold text-green-DEFAULT font-serif font-semibold
    text-xs tracking-widest2 uppercase
    px-8 py-4
    hover:bg-gold-light
    transition-all duration-400 ease-luxury
    shadow-[0_8px_32px_rgba(197,160,89,0.3)]
    hover:shadow-[0_14px_40px_rgba(197,160,89,0.45)]
    hover:-translate-y-0.5
    inline-flex items-center gap-3
  `,
  outline: `
    border border-current font-serif font-medium
    text-xs tracking-widest2 uppercase
    px-8 py-4
    transition-all duration-400 ease-luxury
    inline-flex items-center gap-3
  `,
  ghost: `
    bg-transparent font-serif font-medium
    text-xs tracking-widest2 uppercase
    px-6 py-3
    transition-all duration-300
    inline-flex items-center gap-2
    hover:gap-3
  `,
  dark: `
    bg-green-DEFAULT text-cream font-serif font-semibold
    text-xs tracking-widest2 uppercase
    px-8 py-4
    hover:bg-green-mid
    transition-all duration-400 ease-luxury
    inline-flex items-center gap-3
  `,
  whatsapp: `
    bg-[#25D366] text-white font-serif font-semibold
    text-xs tracking-widest2 uppercase
    px-8 py-4
    hover:bg-[#1ebe5a]
    transition-all duration-400 ease-luxury
    shadow-[0_8px_32px_rgba(37,211,102,0.3)]
    hover:shadow-[0_14px_40px_rgba(37,211,102,0.45)]
    hover:-translate-y-0.5
    inline-flex items-center gap-3
  `,
};

export default function Button({ children, variant = 'primary', className = '', onClick, type = 'button', disabled, href }) {
  const cls = `${variants[variant]} ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cls}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
}
