import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SearchAutocomplete } from './SearchAutocomplete';
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  Package,
  Store,
  Shield,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    user,
    setView,
    currentView,
    setSelectedCategory,
    setSearchQuery,
    logoutUser,
    products
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'books', label: 'Books' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'essentials', label: 'College Essentials' },
    { id: 'hostel', label: 'Hostel Essentials' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'lab', label: 'Lab Equipment' },
    { id: 'fitness', label: 'Sports & Fitness' },
    { id: 'art', label: 'Art & Creativity' },
    { id: 'secondhand', label: 'Pre-Owned Resale' },
    { id: 'snacks', label: 'Snacks & Pantry' },
  ];

  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setSearchQuery('');
    setView('catalog');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#142D4E] text-white border-b border-[#1E3E66] shadow-md">
      {/* Top utility alert bar */}
      <div className="bg-[#0B1E36] px-4 py-1.5 text-xs text-slate-300 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#2563EB] font-bold">Campus Delivery:</span>
            <span>Free same-day hostel room delivery on orders above ₹499</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-300">
            <span>Hostel B & C Delivery Hub: Open</span>
            <span>·</span>
            <button
              onClick={() => setView('seller-dashboard')}
              className="text-white hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
            >
              <span>Sell Used Gear</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Brand Wordmark */}
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-2.5 text-left group shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-inner font-bold tracking-tight">
              CC
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Campus Cart
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Student Marketplace ({products.length}+ Items)
              </span>
            </div>
          </button>

          {/* Advanced Search Bar with Autocomplete Suggestions */}
          <div className="relative flex-1 max-w-xl hidden md:block">
            <SearchAutocomplete isMobile={false} />
          </div>

          {/* Action Icons & Account */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Orders link */}
            <button
              onClick={() => setView('orders')}
              className={`hidden lg:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors ${
                currentView === 'orders' ? 'text-white bg-[#1E3E66]' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4 text-blue-400" />
              <span>Orders</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setView('wishlist')}
              className="relative p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-[#1E3E66]"
              aria-label="View Wishlist"
              title="Campus Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => setView('cart')}
              className="relative flex items-center gap-2 px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-sm font-semibold transition-colors shadow-xs"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-white text-[#2563EB] text-xs font-bold rounded-full flex items-center justify-center font-tabular">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Menu */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#1E3E66] transition-colors text-slate-200"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1E3E66] border border-[#2B5487] flex items-center justify-center text-xs font-bold text-white">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden xl:inline text-xs font-medium max-w-[100px] truncate text-slate-200">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setView('login')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-xs"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => setView('signup')}
                    className="hidden sm:inline px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white hover:bg-[#1E3E66] rounded-lg transition-colors"
                  >
                    Register
                  </button>
                </div>
              )}

              {/* User Dropdown */}
              {isUserMenuOpen && user && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-60 bg-[#0B1E36] border border-[#224570] rounded-xl shadow-2xl py-2 z-30 text-xs text-slate-200">
                    <div className="px-4 py-2 border-b border-[#1E3E66]">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                      <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-blue-300">
                        <Sparkles className="w-3 h-3 text-blue-400" />
                        <span>Verified Student ({user.hostel})</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setView('profile');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#142D4E] flex items-center gap-2"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Student Profile & Hostel Address</span>
                      </button>

                      <button
                        onClick={() => {
                          setView('orders');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#142D4E] flex items-center gap-2"
                      >
                        <Package className="w-3.5 h-3.5 text-slate-400" />
                        <span>Order History & Receipts</span>
                      </button>

                      <button
                        onClick={() => {
                          setView('seller-dashboard');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#142D4E] flex items-center gap-2 text-blue-300"
                      >
                        <Store className="w-3.5 h-3.5 text-blue-400" />
                        <span>Seller Portal (List Pre-Owned)</span>
                      </button>

                      <button
                        onClick={() => {
                          setView('admin-dashboard');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#142D4E] flex items-center gap-2 text-slate-300"
                      >
                        <Shield className="w-3.5 h-3.5 text-slate-400" />
                        <span>Campus Admin Console</span>
                      </button>
                    </div>

                    <div className="border-t border-[#1E3E66] pt-1">
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#142D4E] text-rose-400 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-[#1E3E66]"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input with autocomplete */}
        <div className="mt-2.5 md:hidden">
          <SearchAutocomplete isMobile={true} />
        </div>
      </div>

      {/* Expanded Category Strip with all 11 categories */}
      <nav className="bg-[#0e223c] border-t border-[#1a385f] px-4 sm:px-6 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 py-2 text-xs font-medium whitespace-nowrap">
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.id}>
              {idx > 0 && <span className="text-slate-600">·</span>}
              <button
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-2.5 py-1 rounded transition-colors shrink-0 ${
                  cat.id === 'secondhand'
                    ? 'bg-[#2563EB]/25 text-blue-300 font-bold hover:bg-[#2563EB]/40'
                    : 'text-slate-200 hover:text-white hover:bg-[#142D4E]'
                }`}
              >
                {cat.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0B1E36] border-t border-[#1E3E66] px-4 py-4 space-y-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            All Campus Categories
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectCategory(c.id)}
                className="text-left px-3 py-2 rounded bg-[#142D4E] text-slate-200 hover:text-white"
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="border-t border-[#1E3E66] pt-3 flex flex-col gap-2">
            {!user ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setView('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-2 px-3 rounded bg-[#2563EB] text-white text-xs font-semibold text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setView('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-2 px-3 rounded bg-[#142D4E] text-slate-200 text-xs font-semibold text-center"
                >
                  Register
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setView('profile');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded bg-[#142D4E] text-white text-xs font-medium"
              >
                My Student Profile ({user.name})
              </button>
            )}

            <button
              onClick={() => {
                setView('seller-dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded bg-[#2563EB] text-white text-xs font-medium flex items-center justify-between"
            >
              <span>Sell Used Items on Campus</span>
              <Store className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setView('admin-dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded bg-[#142D4E] text-slate-200 text-xs font-medium"
            >
              Campus Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
