import Link from 'next/link';
import { MessageCircle, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-deep text-cream/40 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display text-3xl text-gold mb-3">Kohan</p>
            <p className="font-serif italic text-sm text-cream/40 leading-relaxed max-w-xs">
              We don't grind spices.<br/>
              We preserve time.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://wa.me/923001234567"
                target="_blank" rel="noreferrer"
                className="w-9 h-9 border border-gold/20 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/60 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-gold/20 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/60 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="mailto:hello@kohan.pk"
                className="w-9 h-9 border border-gold/20 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/60 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="section-label mb-4">Navigate</p>
            <ul className="space-y-3">
              {[
                { label: 'Home',      href: '/' },
                { label: 'Products',  href: '/products' },
                { label: 'Our Story', href: '/#story' },
                { label: 'Checkout',  href: '/checkout' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="font-sans text-xs text-cream/40 hover:text-gold transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label mb-4">Contact</p>
            <ul className="space-y-3">
              <li className="font-sans text-xs text-cream/40">+92 300 000 0000</li>
              <li className="font-sans text-xs text-cream/40">hello@kohan.pk</li>
              <li className="font-sans text-xs text-cream/40">Lahore, Pakistan</li>
              <li className="mt-4">
                <a
                  href="https://wa.me/923001234567?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20Kohan."
                  target="_blank" rel="noreferrer"
                  className="font-serif text-[0.65rem] tracking-widest2 uppercase text-[#25D366]/70 hover:text-[#25D366] border border-[#25D366]/20 hover:border-[#25D366]/60 px-4 py-2.5 transition-all duration-300 inline-block"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-[0.65rem] tracking-widest text-cream/25 uppercase">
            © {year} Kohan — All Rights Reserved
          </p>
          <p className="font-serif text-[0.65rem] italic text-cream/20">
            Pure • Ancient • Handcrafted • Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
