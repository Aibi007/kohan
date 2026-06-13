import HeroSection        from '@/components/sections/HeroSection';
import Ticker             from '@/components/sections/Ticker';
import TrustSection       from '@/components/sections/TrustSection';
import StorySection       from '@/components/sections/StorySection';
import FeaturedProducts   from '@/components/sections/FeaturedProducts';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import OrderCTA           from '@/components/sections/OrderCTA';

export default function HomePage() {
  return (
    <div className="page-enter">
      <HeroSection />
      <Ticker />
      <TrustSection />
      <StorySection />
      <FeaturedProducts />
      <TestimonialsSection />
      <OrderCTA />
    </div>
  );
}
