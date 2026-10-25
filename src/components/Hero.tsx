import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ShieldCheck, Truck, Sparkles, BookOpen } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setView, setSelectedCategory } = useApp();

  return (
    <section className="bg-gradient-to-b from-[#142D4E] via-[#10243E] to-[#0D1D32] text-white py-12 lg:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/20 border border-[#2563EB]/40 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Official Student E-Commerce & Peer Marketplace</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Your Campus Essentials, Delivered Directly To Your Hostel.
            </h1>

            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Skip overpriced outside stationery stores. Shop university-approved semester textbooks, Casio calculators, lab coats, and hostel dorm essentials with zero delivery fees and peer-to-peer student resale.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setView('catalog');
                }}
                className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2 text-sm"
              >
                <span>Shop Campus Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setView('seller-dashboard')}
                className="px-5 py-3 bg-[#0B1E36] hover:bg-[#142D4E] text-slate-200 hover:text-white font-medium rounded-lg border border-[#2563EB]/40 transition-colors text-sm flex items-center gap-2"
              >
                <span>Sell Pre-Owned Gear</span>
              </button>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-slate-700/60">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2563EB]" />
                <span>Same-day delivery to hostel blocks</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified student ID profiles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-[#0B1E36]">
              <img
                src="/src/assets/images/hero_college_shopping_1792932187772.jpg"
                alt="University students studying and shopping with campus backpacks and gear"
                referrerPolicy="no-referrer"
                className="w-full h-[340px] sm:h-[400px] object-cover hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/90 via-transparent to-transparent pointer-events-none" />

              {/* Floating Quick Feature Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B1E36]/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Semester Exam Special
                  </div>
                  <div className="font-bold text-white text-sm">
                    Up to 40% Off Engineering Math & Drafters
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('engineering');
                    setView('catalog');
                  }}
                  className="px-3 py-1.5 bg-[#2563EB] text-white font-semibold rounded-md hover:bg-blue-600 transition-colors shrink-0"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Trust Strip below hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-700/60">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2563EB]/20 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Hostel Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct to Room or Gate pickup</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#059669]/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Student Verified</h4>
              <p className="text-xs text-slate-400 mt-0.5">Authentic peer listings only</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2563EB]/20 flex items-center justify-center text-blue-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Academic Materials</h4>
              <p className="text-xs text-slate-400 mt-0.5">Standard university syllabus</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Campus Resale</h4>
              <p className="text-xs text-slate-400 mt-0.5">Save up to 60% on used gear</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
