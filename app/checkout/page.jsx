'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import SectionLabel from '@/components/ui/SectionLabel';
import GoldDivider from '@/components/ui/GoldDivider';

const PROVINCES = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad (Capital)', 'Azad Kashmir', 'Gilgit-Baltistan'];

function OrderConfirmed({ form, grandTotal, clearCart }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
      className="min-h-screen bg-cream flex items-center justify-center px-6 pt-[70px]"
    >
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22,1,0.36,1] }}
          className="w-20 h-20 rounded-full bg-green-DEFAULT flex items-center justify-center mx-auto mb-8 animate-pulse-gold"
        >
          <Check size={32} className="text-gold" strokeWidth={2.5} />
        </motion.div>
        <h1 className="font-display text-green-DEFAULT text-3xl md:text-4xl font-bold mb-3">Order Placed!</h1>
        <p className="font-sans text-green-DEFAULT/55 text-sm leading-relaxed mb-2">
          Thank you, <strong className="text-green-DEFAULT">{form.firstName}</strong>. We've received your order.
        </p>
        <p className="font-sans text-green-DEFAULT/50 text-sm leading-relaxed mb-8">
          We'll call or WhatsApp you at <strong className="text-green-DEFAULT">{form.phone}</strong> to confirm,
          then begin fresh grinding immediately.
        </p>
        <div className="bg-cream-mid border border-gold/15 p-6 mb-8 text-left">
          <p className="font-serif text-[0.62rem] tracking-widest uppercase text-gold mb-2">What Happens Next</p>
          {[
            'We confirm your order via WhatsApp',
            'We begin grinding fresh for your order',
            'Packed and dispatched within 24 hours',
            'Cash on delivery at your door',
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gold/10 last:border-0">
              <span className="w-5 h-5 rounded-full border border-gold text-gold font-serif text-[0.6rem] flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <span className="font-sans text-[0.82rem] text-green-DEFAULT/65">{step}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 font-serif text-[0.68rem] tracking-widest2 uppercase px-7 py-3.5 border border-green-DEFAULT/30 text-green-DEFAULT hover:border-gold hover:text-gold transition-all duration-300">
            <ArrowLeft size={12} /> Back to Home
          </Link>
          <Link href="/products" onClick={clearCart} className="inline-flex items-center justify-center gap-2 bg-green-DEFAULT text-cream font-serif text-[0.68rem] tracking-widest2 uppercase px-7 py-3.5 hover:bg-green-mid transition-all duration-300">
            Shop More <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CheckoutPage() {
  const { cart, updateQty, removeItem, clearCart, subtotal, shipping, grandTotal, totalItems } = useCart();

  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    address: '', city: '', province: 'Punjab', notes: '',
  });
  const [payment,   setPayment]   = useState('cod');
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const isValid = form.firstName && form.phone && form.address && form.city;

  // Build the WhatsApp message
  const buildWAMessage = () => {
    const lines = [
      '🌿 *KOHAN ORDER*',
      '─────────────────',
      ...cart.map(i => `• ${i.name} (${i.weight}) × ${i.qty} = ₨${i.linePrice * i.qty}`),
      '─────────────────',
      `Subtotal: ₨${subtotal}`,
      `Shipping: ${shipping === 0 ? 'Free' : `₨${shipping}`}`,
      `*TOTAL: ₨${grandTotal}*`,
      '',
      '📦 *Delivery Details*',
      `Name: ${form.firstName} ${form.lastName}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
      `City: ${form.city}, ${form.province}`,
      form.notes ? `Notes: ${form.notes}` : '',
      '',
      `💳 Payment: ${payment === 'cod' ? 'Cash on Delivery' : payment === 'bank' ? 'Bank Transfer' : 'EasyPaisa/JazzCash'}`,
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || cart.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1600);
  };

  if (submitted) {
    return <OrderConfirmed form={form} grandTotal={grandTotal} clearCart={clearCart} />;
  }

  return (
    <div className="page-enter min-h-screen bg-cream pt-[70px]">
      {/* Page Header */}
      <div className="bg-cream-mid border-b border-gold/10 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Complete Your Order</SectionLabel>
          <h1 className="font-display text-green-DEFAULT text-3xl md:text-4xl font-bold">Checkout</h1>
        </div>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart */
        <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
          <ShoppingBag size={48} className="text-green-DEFAULT/20 mb-5" strokeWidth={1} />
          <h2 className="font-display text-green-DEFAULT text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="font-sans text-green-DEFAULT/45 text-sm mb-8">
            Discover our stone-ground spices and flours.
          </p>
          <Link href="/products"
            className="inline-flex items-center gap-3 bg-green-DEFAULT text-cream font-serif text-[0.72rem] tracking-widest2 uppercase px-9 py-4 hover:bg-green-mid transition-all duration-400">
            Explore Products <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">

            {/* ─── Left: Form ─── */}
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Cart Items */}
              <div>
                <h2 className="font-display text-green-DEFAULT text-xl font-semibold mb-6 pb-4 border-b border-gold/15">
                  Your Items ({totalItems})
                </h2>
                <div className="space-y-4">
                  <AnimatePresence>
                    {cart.map(item => (
                      <motion.div
                        key={`${item.id}-${item.weight}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
                        className="flex items-start gap-4 py-4 border-b border-gold/10"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-cream-dark border border-gold/15">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-green-DEFAULT text-sm font-semibold truncate">{item.name}</p>
                          <p className="font-sans text-[0.72rem] text-green-DEFAULT/45 mb-2">{item.weight}</p>
                          <div className="flex items-center gap-0">
                            <button type="button" onClick={() => updateQty(item.id, item.weight, item.qty - 1)}
                              className="w-8 h-8 border border-gold/20 flex items-center justify-center text-green-DEFAULT hover:bg-green-DEFAULT hover:text-cream hover:border-green-DEFAULT transition-all duration-300">
                              <Minus size={11} />
                            </button>
                            <div className="w-10 h-8 border-t border-b border-gold/20 flex items-center justify-center font-display text-sm text-green-DEFAULT">
                              {item.qty}
                            </div>
                            <button type="button" onClick={() => updateQty(item.id, item.weight, item.qty + 1)}
                              className="w-8 h-8 border border-gold/20 flex items-center justify-center text-green-DEFAULT hover:bg-green-DEFAULT hover:text-cream hover:border-green-DEFAULT transition-all duration-300">
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-display text-green-DEFAULT font-bold text-base">₨{item.linePrice * item.qty}</p>
                          <button type="button" onClick={() => removeItem(item.id, item.weight)}
                            className="text-green-DEFAULT/25 hover:text-red-500 transition-colors duration-300 mt-2">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Delivery Form */}
              <div>
                <h2 className="font-display text-green-DEFAULT text-xl font-semibold mb-6 pb-4 border-b border-gold/15">
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { key: 'firstName', label: 'First Name *',        placeholder: 'Ahmad',         half: true },
                    { key: 'lastName',  label: 'Last Name',            placeholder: 'Khan',          half: true },
                    { key: 'phone',     label: 'Phone Number *',       placeholder: '0300 000 0000', half: true },
                    { key: 'email',     label: 'Email (Optional)',      placeholder: 'you@example.com', half: true },
                  ].map(f => (
                    <div key={f.key} className={f.half ? '' : 'sm:col-span-2'}>
                      <label className="font-serif text-[0.6rem] tracking-widest uppercase text-green-DEFAULT/40 block mb-2">
                        {f.label}
                      </label>
                      <input
                        type={f.key === 'email' ? 'email' : 'text'}
                        value={form[f.key]}
                        onChange={e => setField(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        required={f.label.includes('*')}
                        className="luxury-input w-full px-4 py-3 border border-gold/20 bg-white font-sans text-[0.85rem] text-green-DEFAULT placeholder:text-green-DEFAULT/25 transition-all duration-300"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="font-serif text-[0.6rem] tracking-widest uppercase text-green-DEFAULT/40 block mb-2">
                      Full Address *
                    </label>
                    <input
                      value={form.address}
                      onChange={e => setField('address', e.target.value)}
                      placeholder="House / Flat, Street, Area"
                      required
                      className="luxury-input w-full px-4 py-3 border border-gold/20 bg-white font-sans text-[0.85rem] text-green-DEFAULT placeholder:text-green-DEFAULT/25 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="font-serif text-[0.6rem] tracking-widest uppercase text-green-DEFAULT/40 block mb-2">City *</label>
                    <input
                      value={form.city}
                      onChange={e => setField('city', e.target.value)}
                      placeholder="Lahore"
                      required
                      className="luxury-input w-full px-4 py-3 border border-gold/20 bg-white font-sans text-[0.85rem] text-green-DEFAULT placeholder:text-green-DEFAULT/25 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="font-serif text-[0.6rem] tracking-widest uppercase text-green-DEFAULT/40 block mb-2">Province</label>
                    <select
                      value={form.province}
                      onChange={e => setField('province', e.target.value)}
                      className="luxury-input w-full px-4 py-3 border border-gold/20 bg-white font-sans text-[0.85rem] text-green-DEFAULT transition-all duration-300 appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C5A059' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                      }}
                    >
                      {PROVINCES.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-serif text-[0.6rem] tracking-widest uppercase text-green-DEFAULT/40 block mb-2">
                      Special Instructions
                    </label>
                    <input
                      value={form.notes}
                      onChange={e => setField('notes', e.target.value)}
                      placeholder="Coarse grind, extra packaging, delivery time preference…"
                      className="luxury-input w-full px-4 py-3 border border-gold/20 bg-white font-sans text-[0.85rem] text-green-DEFAULT placeholder:text-green-DEFAULT/25 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="font-display text-green-DEFAULT text-xl font-semibold mb-6 pb-4 border-b border-gold/15">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'cod',       name: 'Cash on Delivery',           note: 'Pay when your order arrives — available nationwide' },
                    { id: 'bank',      name: 'Bank Transfer',              note: 'Account details sent via WhatsApp after confirmation' },
                    { id: 'easypaisa', name: 'EasyPaisa / JazzCash',       note: 'Mobile wallet — number shared on confirmation' },
                  ].map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => setPayment(opt.id)}
                      className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-300
                        ${payment === opt.id
                          ? 'border-green-DEFAULT bg-green-DEFAULT/3'
                          : 'border-gold/15 hover:border-gold/35'
                        }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300
                        ${payment === opt.id ? 'border-green-DEFAULT' : 'border-gold/30'}`}>
                        {payment === opt.id && <div className="w-2 h-2 rounded-full bg-green-DEFAULT" />}
                      </div>
                      <div>
                        <p className="font-sans text-[0.85rem] text-green-DEFAULT font-medium">{opt.name}</p>
                        <p className="font-sans text-[0.72rem] text-green-DEFAULT/40 mt-0.5">{opt.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="submit"
                  disabled={!isValid || loading}
                  whileHover={{ scale: isValid ? 1.01 : 1 }}
                  whileTap={{ scale: isValid ? 0.98 : 1 }}
                  className={`flex-1 flex items-center justify-center gap-3 font-serif font-semibold text-[0.75rem] tracking-widest2 uppercase py-4 transition-all duration-400
                    ${isValid
                      ? 'bg-green-DEFAULT text-cream hover:bg-green-mid cursor-pointer'
                      : 'bg-green-DEFAULT/30 text-cream/50 cursor-not-allowed'
                    }`}
                >
                  {loading ? 'Placing Order…' : <><Check size={15} /> Confirm Order</>}
                </motion.button>

                {isValid && (
                  <motion.a
                    href={`https://wa.me/923001234567?text=${buildWAMessage()}`}
                    target="_blank" rel="noreferrer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white font-serif font-semibold text-[0.75rem] tracking-widest2 uppercase py-4 hover:bg-[#1ebe5a] transition-all duration-400"
                  >
                    <MessageCircle size={15} /> Order via WhatsApp
                  </motion.a>
                )}
              </div>

              <p className="font-sans text-[0.7rem] text-green-DEFAULT/30 leading-relaxed text-center">
                Orders are ground fresh after confirmation. No cancellation after grinding begins.
              </p>
            </form>

            {/* ─── Right: Order Summary ─── */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-cream-mid border border-gold/15 p-6">
                <h2 className="font-display text-green-DEFAULT text-xl font-semibold mb-5 pb-4 border-b border-gold/15">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-5">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.weight}`} className="flex items-start gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden bg-cream-dark border border-gold/10">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-[0.78rem] text-green-DEFAULT font-medium truncate">{item.name}</p>
                        <p className="font-sans text-[0.65rem] text-green-DEFAULT/40">{item.weight} × {item.qty}</p>
                      </div>
                      <p className="font-display text-green-DEFAULT text-sm font-semibold flex-shrink-0">
                        ₨{item.linePrice * item.qty}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gold/12 pt-4 space-y-2.5 mb-4">
                  <div className="flex justify-between">
                    <span className="font-sans text-[0.78rem] text-green-DEFAULT/50">Subtotal</span>
                    <span className="font-sans text-[0.78rem] text-green-DEFAULT">₨{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-[0.78rem] text-green-DEFAULT/50">Shipping</span>
                    <span className={`font-sans text-[0.78rem] ${shipping === 0 ? 'text-green-DEFAULT font-medium' : 'text-green-DEFAULT'}`}>
                      {shipping === 0 ? 'Free' : `₨${shipping}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="font-sans text-[0.65rem] text-green-DEFAULT/50 bg-green-DEFAULT/6 px-2.5 py-1.5">
                      ✓ Free shipping on orders above ₨1,500
                    </p>
                  )}
                </div>
                <div className="flex justify-between border-t border-gold/15 pt-4 mb-6">
                  <span className="font-display text-green-DEFAULT font-semibold">Total</span>
                  <span className="font-display text-green-DEFAULT text-xl font-bold">₨{grandTotal.toLocaleString()}</span>
                </div>

                {/* Trust points */}
                <div className="border-t border-gold/12 pt-4 space-y-2.5">
                  {[
                    'Ground fresh after order confirmation',
                    'Cash on delivery available nationwide',
                    '100% pure — video proof with every batch',
                    'WhatsApp support at every step',
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 bg-gold transform rotate-45 flex-shrink-0" />
                      <span className="font-sans text-[0.7rem] text-green-DEFAULT/45">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
