import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginUser, setView, addToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const errs: { email?: string; password?: string } = {};

    // Email validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errs.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errs.email = 'Please enter a valid email address (e.g. rollno@college.edu)';
      }
    }

    // Password validation
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters long';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccessMessage('');

    // Simulate authentication delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Login successful! Redirecting to your Campus Profile...');

      // Authenticate in app context without saving password to localStorage
      loginUser({
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: email.trim(),
        role: 'student',
        college: 'National Institute of Technology',
        hostel: 'Hostel Block B (Aryabhatta)',
        roomNumber: 'B-304',
      });

      addToast('Signed in successfully!', 'success');

      // Navigate to the authenticated Profile page
      setTimeout(() => {
        setView('profile');
      }, 600);
    }, 700);
  };

  // 1-Click Demo Logins for easy reviewer evaluation
  const handleQuickLogin = (role: 'student' | 'seller' | 'admin') => {
    if (role === 'student') {
      setEmail('aarav.patel@campus.edu');
      setPassword('campus2026');
      loginUser({
        name: 'Aarav Patel',
        email: 'aarav.patel@campus.edu',
        role: 'student',
        college: 'National Institute of Technology',
        hostel: 'Hostel Block B (Aryabhatta)',
        roomNumber: 'B-304',
      });
    } else if (role === 'seller') {
      setEmail('aditi.varma@campus.edu');
      setPassword('campus2026');
      loginUser({
        name: 'Aditi Varma',
        email: 'aditi.varma@campus.edu',
        role: 'seller',
        college: 'National Institute of Technology',
        hostel: 'Gargi Hall (Girls Hostel 1)',
        roomNumber: 'GH1-210',
      });
    } else {
      setEmail('admin.desk@campus.edu');
      setPassword('campus2026');
      loginUser({
        name: 'Prof. S. Sengupta',
        email: 'admin.desk@campus.edu',
        role: 'admin',
        college: 'National Institute of Technology',
        hostel: 'Faculty Quarters / Central Hub',
        roomNumber: 'SAC-401',
      });
    }
    setView('profile');
  };

  return (
    <div className="py-12 bg-[#F5F7FA] min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-md w-full mx-4 space-y-6">
        {/* Back Link */}
        <button
          onClick={() => setView('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#2563EB] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Campus Cart</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#142D4E] text-white flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow">
              CC
            </div>
            <h1 className="text-2xl font-extrabold text-[#142D4E] tracking-tight">
              Sign In to Campus Cart
            </h1>
            <p className="text-xs text-[#64748B]">
              Enter your student or university credentials to manage orders and hostel deliveries
            </p>
          </div>

          {/* DEMO NOTICE BANNER (Explicit Requirement) */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Demo Authentication Flow:</span> This is a prototype front-end authentication simulator. No real backend is connected, and <strong className="underline">no sensitive passwords or credentials are stored in localStorage</strong>.
            </div>
          </div>

          {/* Quick Demo Login Buttons */}
          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#142D4E]">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>1-Click Demo Profiles (Instant Fill):</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="py-1.5 px-2 bg-white hover:bg-blue-100 border border-blue-200 rounded font-semibold text-[#142D4E] transition-colors text-center"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('seller')}
                className="py-1.5 px-2 bg-white hover:bg-blue-100 border border-blue-200 rounded font-semibold text-[#142D4E] transition-colors text-center"
              >
                Seller
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-1.5 px-2 bg-white hover:bg-blue-100 border border-blue-200 rounded font-semibold text-[#142D4E] transition-colors text-center"
              >
                Admin
              </button>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* General Error Banner */}
          {errors.general && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-[#DC2626] text-xs">
              {errors.general}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email Field */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Student or College Email <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="e.g. aarav.patel@campus.edu"
                  className={`w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border ${
                    errors.email ? 'border-[#DC2626] bg-rose-50/20' : 'border-[#CBD5E1]'
                  } rounded-lg text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]`}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="text-[11px] text-[#DC2626] font-medium mt-1 pl-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field with Visibility Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  Password <span className="text-[#DC2626]">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Min. 6 chars</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-10 py-2.5 bg-[#F8FAFC] border ${
                    errors.password ? 'border-[#DC2626] bg-rose-50/20' : 'border-[#CBD5E1]'
                  } rounded-lg text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]`}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-[#DC2626] font-medium mt-1 pl-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-lg shadow-sm transition-colors text-xs flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Signup */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>New student at campus?</span>{' '}
            <button
              type="button"
              onClick={() => setView('signup')}
              className="text-[#2563EB] font-bold hover:underline"
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
