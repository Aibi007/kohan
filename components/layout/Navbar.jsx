'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const navLinks = [
  { label: 'Home',      href: '/' },
  { label: 'Products',  href: '/products' },
  { label: 'Our Story', href: '/#story' },
  { label: 'Contact',   href: '/#order' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [cartPulse,   setCartPulse]   = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setCartPulse(true);
      const t = setTimeout(() => setCartPulse(false), 800);
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isHome    = pathname === '/';
  const isLight   = !scrolled && isHome;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-600 ${
          scrolled ? 'nav-glass' : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 1, ease: [0.22,1,0.36,1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[70px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className={`font-display text-2xl font-bold tracking-wide transition-colors duration-300 ${
            isLight ? 'text-white' : 'text-green-DEFAULT'
          }`}>
            Koh<span className="text-gold">a</span>n
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-serif text-[0.75rem] tracking-widest2 uppercase transition-colors duration-300 pb-0.5
                    ${active ? 'border-b border-gold text-gold' : ''}
                    ${isLight && !active ? 'text-white/80 hover:text-white' : ''}
                    ${!isLight && !active ? 'text-text-mid hover:text-green-DEFAULT' : ''}
                  `}
                  style={{ color: isLight && !active ? undefined : undefined }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="/checkout" className="relative group">
              <motion.div
                animate={cartPulse ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <ShoppingBag
                  size={20}
                  className={`transition-colors duration-300 ${
                    isLight ? 'text-white/80 group-hover:text-gold' : 'text-green-DEFAULT group-hover:text-gold'
                  }`}
                />
              </motion.div>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-gold text-green-DEFAULT w-4 h-4 rounded-full text-[0.55rem] font-bold flex items-center justify-center font-sans"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden transition-colors duration-300 ${isLight ? 'text-white' : 'text-green-DEFAULT'}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[800] bg-green-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{   opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22,1,0.36,1] }}
              >
                <Link
                  href={link.href}
                  className="font-display text-3xl text-cream hover:text-gold transition-colors duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <Link
                href="/checkout"
                className="flex items-center gap-2 font-serif text-xs tracking-widest2 uppercase text-gold border border-gold/40 px-6 py-3 mt-4"
                onClick={() => setMobileOpen(false)}
              >
                <ShoppingBag size={15} /> Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
