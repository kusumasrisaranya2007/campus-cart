import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Mail,
  GraduationCap,
  Save,
  Store,
  Shield,
  LogOut,
  Package,
  Heart,
  Clock,
  ArrowRight,
  Lock
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, loginUser, logoutUser, setView, orders, wishlist, addToast } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [college, setCollege] = useState(user?.college || 'National Institute of Technology');
  const [hostel, setHostel] = useState(user?.hostel || 'Hostel Block B (Aryabhatta)');
  const [roomNumber, setRoomNumber] = useState(user?.roomNumber || 'B-304');

  // If user is not logged in, show access-restricted placeholder screen
  if (!user) {
    return (
      <div className="py-16 bg-[#F5F7FA] min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-[#142D4E]">
            Student Profile Restricted
          </h2>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Please sign in with your campus account or use a demo profile to view your student identity card, hostel address preferences, and order history.
          </p>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs text-left flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Demo Notice:</strong> This platform does not require real credentials. You can use 1-click test accounts to inspect the authenticated experience.
            </span>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => setView('login')}
              className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Sign In to Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setView('signup')}
              className="w-full py-2.5 bg-white border border-[#CBD5E1] text-[#142D4E] text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Create New Student Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      college,
      hostel,
      roomNumber,
      role: user.role,
      verifiedStudent: true,
    });
    addToast('Student profile and hostel settings saved', 'success');
  };

  const handleLogout = () => {
    logoutUser();
    setView('home');
  };

  return (
    <div className="py-8 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#142D4E] tracking-tight">
              Student Profile & Campus ID
            </h1>
            <p className="text-xs text-[#64748B]">
              Authenticated campus session for hostel room delivery & verified peer resale.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-lg border border-rose-200 bg-rose-50 text-[#DC2626] hover:bg-rose-100 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* DEMO NOTICE BANNER (Explicit Requirement) */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Demo Authentication Notice:</span> You are logged in with demo profile data. This website operates in client-side demonstration mode; <strong className="underline">no sensitive passwords, tokens, or private credentials are stored in localStorage</strong>.
          </div>
        </div>

        {/* Digital Campus Student ID Card */}
        <div className="bg-gradient-to-r from-[#142D4E] via-[#1A385F] to-[#2563EB] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold text-white shadow-inner">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Student ID</span>
                  </span>
                </div>
                <p className="text-xs text-blue-200 mt-0.5">{user.email}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
                  <span>{user.college}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 text-xs text-left sm:text-right self-stretch sm:self-auto flex flex-col justify-center">
              <span className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">
                Delivery Destination
              </span>
              <span className="font-bold text-white text-base mt-0.5">{user.roomNumber}</span>
              <span className="text-[11px] text-blue-200">{user.hostel}</span>
            </div>
          </div>
        </div>

        {/* Student Activity Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => setView('orders')}
            className="p-4 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] cursor-pointer transition-colors shadow-2xs"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Orders Placed</span>
              <Package className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="text-2xl font-extrabold text-[#142D4E] font-tabular mt-2">
              {orders.length}
            </div>
            <p className="text-[11px] text-blue-600 font-medium mt-1">View tracking receipts →</p>
          </div>

          <div
            onClick={() => setView('wishlist')}
            className="p-4 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] cursor-pointer transition-colors shadow-2xs"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Saved Items</span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-extrabold text-[#142D4E] font-tabular mt-2">
              {wishlist.length}
            </div>
            <p className="text-[11px] text-rose-600 font-medium mt-1">View bookmarked gear →</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Campus Discount Tier</span>
              <Clock className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-[#059669] font-tabular mt-2">
              Semester Pass
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Free express hostel runs</p>
          </div>
        </div>

        {/* Portal Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setView('seller-dashboard')}
            className="p-4 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] transition-colors text-left flex items-start gap-3 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#142D4E] group-hover:text-[#2563EB] transition-colors">
                Open Student Seller Hub
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                List used books, lab coats, and hostel appliances to batchmates.
              </p>
            </div>
          </button>

          <button
            onClick={() => setView('admin-dashboard')}
            className="p-4 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] transition-colors text-left flex items-start gap-3 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#142D4E] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#142D4E] group-hover:text-[#2563EB] transition-colors">
                Campus Admin Console
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Review store GMV, hostel delivery runs, and catalog products.
              </p>
            </div>
          </button>
        </div>

        {/* Account Settings Form */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-2xs">
          <h3 className="text-sm font-bold text-[#142D4E] uppercase tracking-wider mb-4 pb-3 border-b border-slate-100">
            Edit Student & Hostel Details
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">College / University</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hostel Residence Hall</label>
                <select
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="Hostel Block A (Kalam)">Hostel Block A (Kalam)</option>
                  <option value="Hostel Block B (Aryabhatta)">Hostel Block B (Aryabhatta)</option>
                  <option value="Hostel Block C (C.V. Raman)">Hostel Block C (C.V. Raman)</option>
                  <option value="Hostel Block D (Shivaji)">Hostel Block D (Shivaji)</option>
                  <option value="Gargi Hall (Girls Hostel 1)">Gargi Hall (Girls Hostel 1)</option>
                  <option value="Kalpana Chawla Hall (Girls Hostel 2)">Kalpana Chawla Hall (Girls Hostel 2)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Room Number</label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-lg text-xs flex items-center gap-2 shadow-sm transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
