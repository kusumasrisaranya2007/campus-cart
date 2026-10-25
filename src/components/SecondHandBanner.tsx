import React from 'react';
import { useApp } from '../context/AppContext';
import { RefreshCw, CheckCircle, Shield, ArrowRight, Sparkles } from 'lucide-react';

export const SecondHandBanner: React.FC = () => {
  const { setView, setSearchQuery, setSelectedCategory } = useApp();

  return (
    <section className="py-12 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#142D4E] to-[#1E3E66] rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          {/* Subtle decoration */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#2563EB]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2563EB]/30 border border-[#2563EB]/50 text-blue-200 text-xs font-semibold">
                <RefreshCw className="w-3.5 h-3.5 text-blue-300" />
                <span>Peer-to-Peer Campus Marketplace</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Buy & Sell Used College Gear Directly With Batchmates.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Finished with your first-year Engineering Mathematics or Civil Drawing kit? Pass them on to juniors. Save up to 65% on pristine condition textbooks, drafters, and sports gear. Direct hostel handover or campus library pickup.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inspected condition ratings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-300 shrink-0" />
                  <span>Verified hostel room details</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>0% commission on student sales</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('second-hand');
                  setView('catalog');
                }}
                className="w-full px-5 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Browse Pre-Owned Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setView('seller-dashboard')}
                className="w-full px-5 py-3 bg-[#0B1E36]/90 hover:bg-[#0B1E36] text-slate-200 hover:text-white font-semibold rounded-lg text-sm border border-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>List an Item for Resale</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
