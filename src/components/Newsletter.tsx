import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Newsletter: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter your college or personal email');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setSubscribed(true);
    addToast('Subscribed! Use code CAMPUS20 on your next order.', 'success');
  };

  return (
    <section className="py-12 bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-12 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#EAF2FF] flex items-center justify-center text-[#2563EB] mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
            Get Semester Exam Deals & Textbook Alerts
          </h2>
          <p className="text-sm text-[#64748B] mt-2 max-w-lg mx-auto">
            Subscribe for flash deal alerts on Casio calculators, lab equipment restocks, and senior student resale drops.
          </p>

          {subscribed ? (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm max-w-md mx-auto flex items-center gap-3 text-left">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-semibold">You're subscribed!</p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Use coupon code <span className="font-bold underline">CAMPUS20</span> at checkout for 20% off.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your student email (e.g. rollno@college.edu)"
                  className="flex-1 px-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-sm text-[#1F2937] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  Subscribe
                </button>
              </div>
              {error && (
                <p className="text-xs text-[#DC2626] font-medium text-left mt-2 pl-1">
                  {error}
                </p>
              )}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span>Zero spam. Only relevant campus alerts and promo codes.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
