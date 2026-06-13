'use client';

import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';

const reviews = [
  {
    name: 'Sana Tariq',
    city: 'Lahore',
    avatar: 'S',
    stars: 5,
    text: 'The first time I opened the turmeric tin, the fragrance filled our entire home. Twenty years of searching for that exact smell — my grandmother\'s kitchen, her hands, her alchemy. Kohan returned it to me.',
  },
  {
    name: 'Dr. Imran ul-Haq',
    city: 'Islamabad',
    avatar: 'I',
    stars: 5,
    text: 'My children had chronic digestive complaints for three years. Within four weeks of switching to Hayat Mix Atta, the difference was undeniable. This is not marketing. This is real food making a real difference.',
  },
  {
    name: 'Nazia Mirza',
    city: 'Karachi',
    avatar: 'N',
    stars: 5,
    text: 'I served the biryani to guests and two people asked which restaurant had catered. When I told them I cooked it — and mentioned Kohan Garam Masala — they refused to believe it. That\'s the only review that matters.',
  },
  {
    name: 'Hassan Raza',
    city: 'Peshawar',
    avatar: 'H',
    stars: 5,
    text: 'Dardari Lal Mirch has a complexity I cannot describe. It is not just heat. It is fragrant heat. The colour it gives to curries is spectacular — a deep, lacquered crimson that commercial chilli cannot produce.',
  },
  {
    name: 'Amina Qureshi',
    city: 'Multan',
    avatar: 'A',
    stars: 5,
    text: "When the Garam Masala arrived, my husband walked into the kitchen thinking I\'d already started cooking — just from the scent of opening the packet. That\'s the difference. That\'s Kohan.",
  },
];

function ReviewCard({ review }) {
  return (
    <div className="review-card bg-white border border-gold/15 p-7 w-[310px] md:w-[340px] flex-shrink-0">
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: review.stars }).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 text-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <p className="font-display text-4xl text-gold/20 leading-none mb-1">"</p>
      <p className="font-sans text-[0.83rem] text-green-DEFAULT/65 leading-relaxed mb-5">
        {review.text}
      </p>
      <div className="flex items-center gap-3 border-t border-gold/10 pt-4">
        <div className="w-8 h-8 rounded-full bg-green-DEFAULT flex items-center justify-center flex-shrink-0">
          <span className="font-display text-[0.7rem] text-gold">{review.avatar}</span>
        </div>
        <div>
          <p className="font-sans text-[0.78rem] text-green-DEFAULT font-medium">{review.name}</p>
          <p className="font-serif text-[0.62rem] text-green-DEFAULT/40 tracking-wide">{review.city}, Pakistan</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const doubled = [...reviews, ...reviews];
  return (
    <section className="bg-cream-mid py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22,1,0.36,1] }}
          className="text-center"
        >
          <SectionLabel>What Our Customers Say</SectionLabel>
          <h2 className="font-display text-green-DEFAULT font-bold"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Voices from the Kitchen
          </h2>
        </motion.div>
      </div>

      <div className="review-slider">
        <div className="review-track py-2">
          {doubled.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>
    </section>
  );
}
