import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';
import { ShieldCheck, MapPin, Mail, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setView, setSelectedCategory } = useApp();

  const handleCategoryClick = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setView('catalog');
  };

  return (
    <footer className="bg-[#142D4E] text-white pt-12 pb-8 border-t border-[#1E3E66]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center font-bold text-white text-sm">
                CC
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Campus Cart</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              The premier college shopping network and student peer marketplace. Bringing university-approved textbooks, lab tools, electronics, and hostel essentials directly to student dorm rooms with zero fuss.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Central Campus Warehouse, Student Activity Center, Block 4</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>support@campuscart.edu / campusdesk@college.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Hostel Delivery Hotline: +91 (080) 4920-CAMPUS</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleCategoryClick('textbooks')}
                  className="hover:text-white transition-colors"
                >
                  Textbooks & Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('electronics')}
                  className="hover:text-white transition-colors"
                >
                  Audio & Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('engineering')}
                  className="hover:text-white transition-colors"
                >
                  Engineering & Lab Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('stationery')}
                  className="hover:text-white transition-colors"
                >
                  Scientific Calculators
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('hostel')}
                  className="hover:text-white transition-colors"
                >
                  Hostel Living Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('fashion')}
                  className="hover:text-white transition-colors"
                >
                  Backpacks & Bags
                </button>
              </li>
            </ul>
          </div>

          {/* Student Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Student Hub
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => setView('seller-dashboard')}
                  className="hover:text-white transition-colors text-blue-300 font-medium"
                >
                  Sell Pre-Owned Gear
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView('orders')}
                  className="hover:text-white transition-colors"
                >
                  Track Hostel Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView('wishlist')}
                  className="hover:text-white transition-colors"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView('admin-dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Campus Admin Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView('profile')}
                  className="hover:text-white transition-colors"
                >
                  Verify Student ID
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Trust & Delivery
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Verified student ID logins only for peer transactions.</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Hostel delivery runs operate daily from 4:30 PM to 9:00 PM covering Boys & Girls Hostels A through F.
              </p>
              <div className="pt-2 text-[11px] text-slate-400">
                <span>Demo prototype ready for college deployment.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#1E3E66] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Campus Cart. Crafted for university students.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Hostel Delivery Terms</span>
            <span>·</span>
            <span>Peer Resale Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
