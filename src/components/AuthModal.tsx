import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, User as UserIcon } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password');
      return;
    }
    loginUser({
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      role: 'student',
      college: 'National Institute of Technology',
      hostel: 'Hostel Block B (Aryabhatta)',
      roomNumber: 'B-304',
    });
  };

  const handleQuickLogin = (role: 'student' | 'seller' | 'admin') => {
    if (role === 'student') {
      loginUser({
        name: 'Aarav Patel',
        email: 'aarav.patel@campus.edu',
        role: 'student',
        college: 'National Institute of Technology',
        hostel: 'Hostel Block B (Aryabhatta)',
        roomNumber: 'B-304',
      });
    } else if (role === 'seller') {
      loginUser({
        name: 'Aditi Varma',
        email: 'aditi.varma@campus.edu',
        role: 'seller',
        college: 'National Institute of Technology',
        hostel: 'Gargi Hall (Girls Hostel 1)',
        roomNumber: 'GH1-210',
      });
    } else {
      loginUser({
        name: 'Prof. S. Sengupta',
        email: 'admin.desk@campus.edu',
        role: 'admin',
        college: 'National Institute of Technology',
        hostel: 'Faculty Quarters / Central Hub',
        roomNumber: 'SAC-401',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 z-10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-[#142D4E]">
              {isSignUp ? 'Create Student Account' : 'Student & Staff Login'}
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Campus Cart University Shopping Network
            </p>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Fast Logins */}
        <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#142D4E]">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>1-Click Demo Profiles (Instant Access):</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('student')}
              className="py-1.5 px-2 bg-white hover:bg-blue-100 border border-blue-200 rounded text-[11px] font-semibold text-[#142D4E] transition-colors"
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('seller')}
              className="py-1.5 px-2 bg-white hover:bg-blue-100 border border-blue-200 rounded text-[11px] font-semibold text-[#142D4E] transition-colors"
            >
              Seller
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-1.5 px-2 bg-white hover:bg-blue-100 border border-blue-200 rounded text-[11px] font-semibold text-[#142D4E] transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Traditional Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {isSignUp && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Student Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Aarav Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
                <UserIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Student / College Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
              />
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pr-9 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
              />
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {error && <p className="text-[11px] text-[#DC2626] font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-lg shadow-sm transition-colors text-xs"
          >
            {isSignUp ? 'Create Student Account' : 'Sign In to Campus Cart'}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
          <span>{isSignUp ? 'Already registered?' : 'Need a campus account?'}</span>{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-[#2563EB] font-semibold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};
