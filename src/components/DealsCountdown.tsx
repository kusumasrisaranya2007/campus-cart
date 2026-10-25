import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Clock, Flame } from 'lucide-react';

export const DealsCountdown: React.FC = () => {
  const { products } = useApp();

  // Functional countdown: starts with 8 hours, 42 minutes, 15 seconds
  const [secondsLeft, setSecondsLeft] = useState(8 * 3600 + 42 * 60 + 15);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const dealProducts = products.filter((p) => p.isDeal).slice(0, 3);

  if (dealProducts.length === 0) return null;

  return (
    <section className="py-12 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with working live timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#DC2626]">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#142D4E] tracking-tight">
                  Daily Hostel Flash Deals
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-[#DC2626]">
                  Up to 40% OFF
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Special student discounted inventory dispatched from campus central warehouse.
              </p>
            </div>
          </div>

          {/* Working Countdown Clock */}
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2 rounded-xl self-start sm:self-auto">
            <Clock className="w-4 h-4 text-[#2563EB]" />
            <span className="text-xs font-medium text-slate-500">Deals Expire In:</span>
            <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#142D4E] tabular-nums">
              <span className="px-1.5 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">
                {String(hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="px-1.5 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">
                {String(minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="px-1.5 py-0.5 bg-white rounded border border-slate-200 text-[#DC2626] shadow-2xs">
                {String(seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Deals Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
