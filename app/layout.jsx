import '@/styles/globals.css';
import { CartProvider } from '@/lib/cart-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';

export const metadata = {
  title: {
    default:  'Kohan — Where Time Is Preserved in Stone',
    template: '%s | Kohan',
  },
  description:
    'Ultra-premium Pakistani stone-ground spices and flour. Traditional cold-pressed, handcrafted in small batches. Zarr-e-Talai Haldi, Hayat Mix Atta, Dardari Lal Mirch.',
  keywords:
    'stone ground spices Pakistan, organic spices Lahore, cold pressed turmeric, Kohan spices, premium Pakistani spices, pure haldi, whole grain flour',
  openGraph: {
    title:       'Kohan — Where Time Is Preserved in Stone',
    description: 'Traditional cold-pressed spices and flour, handcrafted in small batches.',
    type:        'website',
    locale:      'en_PK',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
