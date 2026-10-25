import React from 'react';
import { Hero } from './Hero';
import { PopularCategories } from './PopularCategories';
import { DealsCountdown } from './DealsCountdown';
import { SecondHandBanner } from './SecondHandBanner';
import { StudentBenefits } from './StudentBenefits';
import { Newsletter } from './Newsletter';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  TrendingUp,
  Tag,
  Laptop,
  BookOpen,
  Coffee,
  Sparkles,
  ShoppingBag,
  Cpu,
  History,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { ProductCategory, Product } from '../types';

export const HomeView: React.FC = () => {
  const { products, setView, setSelectedCategory, recentlyViewed, addToCart, addToast } = useApp();

  // Curated collections based on data attributes
  const trending = products.filter((p) => p.isTrending || p.badge === 'Hot Deal').slice(0, 4);
  const under199 = products.filter((p) => p.price <= 199).slice(0, 4);
  const under499 = products.filter((p) => p.price > 199 && p.price <= 499).slice(0, 4);
  const electronics = products.filter((p) => p.category === 'electronics').slice(0, 4);
  const books = products.filter((p) => p.category === 'books' || p.category === 'textbooks').slice(0, 4);
  const hostel = products.filter((p) => p.category === 'hostel').slice(0, 4);
  const fashion = products.filter((p) => p.category === 'fashion' || p.category === 'essentials').slice(0, 4);
  const lab = products.filter((p) => p.category === 'lab' || p.category === 'engineering').slice(0, 4);
  const preloved = products.filter((p) => p.isSecondHand).slice(0, 4);
  const recommended = products.filter((p) => p.featured || p.rating >= 4.8).slice(4, 8);

  // Bundle: Frequently Bought Together
  const bundleItem1 = products.find((p) => p.id === 'book-01') || products[0]; // B.S. Grewal
  const bundleItem2 = products.find((p) => p.id === 'elec-12') || products[2]; // Casio Calc
  const bundleItem3 = products.find((p) => p.id === 'stat-04') || products[5]; // Geometry Box
  const bundleTotal = bundleItem1.price + bundleItem2.price + bundleItem3.price;
  const bundleSavings = 250;
  const bundlePrice = bundleTotal - bundleSavings;

  const handleAddBundle = () => {
    addToCart(bundleItem1, 1);
    addToCart(bundleItem2, 1);
    addToCart(bundleItem3, 1);
    addToast('Semester 1 Freshmen Bundle added to your cart!', 'success');
  };

  const navigateCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setView('catalog');
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Explore All Categories */}
      <PopularCategories />

      {/* 3. Limited-Time Flash Deals (Active Live Countdown) */}
      <DealsCountdown />

      {/* 4. Trending on Campus */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>Popular This Week</span>
              </div>
              <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
                Trending on Campus
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Most viewed textbooks, noise-cancelling headphones, and dorm essentials.
              </p>
            </div>
            <button
              onClick={() => navigateCategory('all')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors self-start sm:self-auto"
            >
              <span>View All Trending</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Best Deals Under ₹199 (Pocket Money Specials) */}
      <section className="py-12 bg-[#F5F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                <Tag className="w-4 h-4" />
                <span>Pocket-Friendly Specials</span>
              </div>
              <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
                Best Deals Under ₹199
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Budget stationery refills, instant noodles, laundry hampers, and essential campus supplies.
              </p>
            </div>
            <button
              onClick={() => navigateCategory('stationery')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
            >
              <span>Browse Under ₹199</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {under199.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Best Deals Under ₹499 */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Value Packs</span>
              </div>
              <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
                Best Deals Under ₹499
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Spiral notebook packs, extension boards, lab coats, and desk organizers under ₹499.
              </p>
            </div>
            <button
              onClick={() => navigateCategory('essentials')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {under499.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Frequently Bought Together (Campus Freshmen Starter Bundle) */}
      <section className="py-12 bg-[#F5F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-10 shadow-sm">
            <div className="max-w-xl mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Semester 1 Starter Pack
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#142D4E] mt-1">
                Frequently Bought Together
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Bundle the mandatory First-Year Engineering Mathematics book, Casio ClassWiz calculator, and mathematical geometry box together to save an extra ₹{bundleSavings}!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Bundle items row */}
              <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-4">
                {/* Item 1 */}
                <div className="flex-1 p-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-center w-full">
                  <img
                    src={bundleItem1.images[0]}
                    alt={bundleItem1.title}
                    className="w-20 h-20 object-cover rounded-lg mx-auto mb-2 border border-slate-200"
                  />
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{bundleItem1.title}</h4>
                  <div className="text-xs font-bold text-[#142D4E] font-tabular mt-1">
                    ₹{bundleItem1.price}
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                </div>

                {/* Item 2 */}
                <div className="flex-1 p-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-center w-full">
                  <img
                    src={bundleItem2.images[0]}
                    alt={bundleItem2.title}
                    className="w-20 h-20 object-cover rounded-lg mx-auto mb-2 border border-slate-200"
                  />
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{bundleItem2.title}</h4>
                  <div className="text-xs font-bold text-[#142D4E] font-tabular mt-1">
                    ₹{bundleItem2.price}
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                </div>

                {/* Item 3 */}
                <div className="flex-1 p-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-center w-full">
                  <img
                    src={bundleItem3.images[0]}
                    alt={bundleItem3.title}
                    className="w-20 h-20 object-cover rounded-lg mx-auto mb-2 border border-slate-200"
                  />
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{bundleItem3.title}</h4>
                  <div className="text-xs font-bold text-[#142D4E] font-tabular mt-1">
                    ₹{bundleItem3.price}
                  </div>
                </div>
              </div>

              {/* Bundle Purchase CTA */}
              <div className="lg:col-span-4 p-5 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Combined Price:</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-extrabold text-[#142D4E] font-tabular">
                      ₹{bundlePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through font-tabular">
                      ₹{bundleTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded inline-block mt-1">
                    Bundle Discount: Save ₹{bundleSavings}
                  </span>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add All 3 to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Essential Electronics */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                <Laptop className="w-4 h-4" />
                <span>Tech & Audio Gear</span>
              </div>
              <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
                Essential Electronics
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Noise-cancelling headphones, USB-C hubs, power banks, and silent wireless keyboards.
              </p>
            </div>
            <button
              onClick={() => navigateCategory('electronics')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
            >
              <span>View Electronics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {electronics.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Bestselling Books */}
      <section className="py-12 bg-[#F5F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Curriculum Reference</span>
              </div>
              <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
                Bestselling Academic Books
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Engineering Mathematics, CLRS Algorithms, GATE Guides, and placement aptitude books.
              </p>
            </div>
            <button
              onClick={() => navigateCategory('books')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
            >
              <span>Explore Books</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Hostel Room Makeover */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                <Coffee className="w-4 h-4" />
                <span>Dorm Living Comfort</span>
              </div>
              <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
                Hostel Room Makeover
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Electric kettles, memory foam chair cushions, single bedsheets, and study desk lamps.
              </p>
            </div>
            <button
              onClick={() => navigateCategory('hostel')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
            >
              <span>Hostel Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hostel.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 11. Backpacks and College Fashion */}
      <section className="py-12 bg-[#F5F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Streetwear & Commute</span>
              </div>
              <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
                Backpacks & College Fashion
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Heavyweight hoodies, water-resistant laptop packs, sneakers, and retro Casio watches.
              </p>
            </div>
            <button
              onClick={() => navigateCategory('fashion')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
            >
              <span>View Fashion</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fashion.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 12. Lab and Project Essentials */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
                <Cpu className="w-4 h-4" />
                <span>Hardware & Laboratory</span>
              </div>
              <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
                Lab & Project Essentials
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                100% cotton lab coats, digital multimeters, ESP32 IoT kits, breadboards, and mini drafters.
              </p>
            </div>
            <button
              onClick={() => navigateCategory('lab')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
            >
              <span>View Lab Gear</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lab.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 13. Pre-Loved Finds (Second Hand Marketplace) */}
      <section className="py-12 bg-[#F5F7FA] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Peer Resale</span>
              </div>
              <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
                Pre-Loved Campus Finds
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Save 50% to 70% on senior textbooks, gear bicycles, mini drafters, and study monitors.
              </p>
            </div>
            <button
              onClick={() => navigateCategory('secondhand')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
            >
              <span>Browse All Resale</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {preloved.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 14. Second-Hand Banner CTA */}
      <SecondHandBanner />

      {/* 15. Recommended for You */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Curated Recommendations</span>
              </div>
              <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
                Recommended For You
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Top rated semester supplies handpicked by university batches.
              </p>
            </div>
            <button
              onClick={() => navigateCategory('all')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommended.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 16. Recently Viewed Products (if any viewed) */}
      {recentlyViewed && recentlyViewed.length > 0 && (
        <section className="py-12 bg-[#F5F7FA] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-6">
              <History className="w-4 h-4 text-[#2563EB]" />
              <h2 className="text-lg font-bold text-[#142D4E]">
                Recently Viewed by You
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyViewed.slice(0, 6).map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setView('product-detail', prod.id)}
                  className="bg-white p-3 rounded-xl border border-slate-200 hover:border-[#2563EB] cursor-pointer transition-colors flex flex-col justify-between"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-full aspect-square object-cover rounded-lg mb-2"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#142D4E] line-clamp-1">{prod.title}</h4>
                    <div className="text-xs font-bold text-[#2563EB] font-tabular mt-1">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 17. Student Shopping Benefits */}
      <StudentBenefits />

      {/* 18. Newsletter with Coupon Code Reveal */}
      <Newsletter />
    </div>
  );
};
