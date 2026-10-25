import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Building,
  Home,
  ArrowLeft
} from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { loginUser, setView, addToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [college, setCollege] = useState('National Institute of Technology');
  const [hostel, setHostel] = useState('Hostel Block B (Aryabhatta)');
  const [roomNumber, setRoomNumber] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};

    // Name
    if (!name.trim()) {
      errs.name = 'Full student name is required';
    }

    // Email
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errs.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errs.email = 'Please enter a valid email format (e.g. rollno@college.edu)';
      }
    }

    // Password
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters long';
    }

    // Confirm Password
    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    // Room Number
    if (!roomNumber.trim()) {
      errs.roomNumber = 'Hostel room number is required for deliveries';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccessMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Student account created! Redirecting to your Campus Profile...');

      loginUser({
        name: name.trim(),
        email: email.trim(),
        college,
        hostel,
        roomNumber: roomNumber.trim(),
        role: 'student',
        verifiedStudent: true,
      });

      addToast('Welcome to Campus Cart! Account ready.', 'success');

      setTimeout(() => {
        setView('profile');
      }, 600);
    }, 700);
  };

  return (
    <div className="py-12 bg-[#F5F7FA] min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-lg w-full mx-4 space-y-6">
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
            <div className="w-12 h-12 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow">
              CC
            </div>
            <h1 className="text-2xl font-extrabold text-[#142D4E] tracking-tight">
              Create Student Account
            </h1>
            <p className="text-xs text-[#64748B]">
              Join your campus shopping network for free hostel delivery and student peer resale
            </p>
          </div>

          {/* DEMO NOTICE BANNER (Explicit Requirement) */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Demo Registration Flow:</span> This is a prototype front-end registration simulator. No real backend is connected, and <strong className="underline">no sensitive passwords or credentials are stored in localStorage</strong>.
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Full Name */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Full Student Name <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="e.g. Priya Sharma"
                  className={`w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border ${
                    errors.name ? 'border-[#DC2626] bg-rose-50/20' : 'border-[#CBD5E1]'
                  } rounded-lg text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]`}
                />
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.name && (
                <p className="text-[11px] text-[#DC2626] font-medium mt-1 pl-1">{errors.name}</p>
              )}
            </div>

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
                  placeholder="e.g. priya.sharma@campus.edu"
                  className={`w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border ${
                    errors.email ? 'border-[#DC2626] bg-rose-50/20' : 'border-[#CBD5E1]'
                  } rounded-lg text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]`}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="text-[11px] text-[#DC2626] font-medium mt-1 pl-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field with Visibility Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Password <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Min. 6 chars"
                    className={`w-full pl-9 pr-9 py-2.5 bg-[#F8FAFC] border ${
                      errors.password ? 'border-[#DC2626] bg-rose-50/20' : 'border-[#CBD5E1]'
                    } rounded-lg text-slate-900 focus:outline-none focus:border-[#2563EB]`}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-[#DC2626] font-medium mt-1 pl-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Confirm Password <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                    }}
                    placeholder="Re-type password"
                    className={`w-full pl-9 pr-9 py-2.5 bg-[#F8FAFC] border ${
                      errors.confirmPassword ? 'border-[#DC2626] bg-rose-50/20' : 'border-[#CBD5E1]'
                    } rounded-lg text-slate-900 focus:outline-none focus:border-[#2563EB]`}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-[#DC2626] font-medium mt-1 pl-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* College & Hostel details */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block font-semibold text-slate-700 mb-1">
                College / University
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hostel Residence</label>
                <div className="relative">
                  <select
                    value={hostel}
                    onChange={(e) => setHostel(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Hostel Block A (Kalam)">Hostel Block A (Kalam)</option>
                    <option value="Hostel Block B (Aryabhatta)">Hostel Block B (Aryabhatta)</option>
                    <option value="Hostel Block C (C.V. Raman)">Hostel Block C (C.V. Raman)</option>
                    <option value="Hostel Block D (Shivaji)">Hostel Block D (Shivaji)</option>
                    <option value="Gargi Hall (Girls Hostel 1)">Gargi Hall (Girls Hostel 1)</option>
                    <option value="Kalpana Chawla Hall (Girls Hostel 2)">
                      Kalpana Chawla Hall (Girls Hostel 2)
                    </option>
                  </select>
                  <Home className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Room Number <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => {
                    setRoomNumber(e.target.value);
                    if (errors.roomNumber)
                      setErrors((prev) => ({ ...prev, roomNumber: undefined }));
                  }}
                  placeholder="e.g. B-304"
                  className={`w-full px-3 py-2 bg-[#F8FAFC] border ${
                    errors.roomNumber ? 'border-[#DC2626] bg-rose-50/20' : 'border-[#CBD5E1]'
                  } rounded-lg text-slate-900 focus:outline-none focus:border-[#2563EB]`}
                />
                {errors.roomNumber && (
                  <p className="text-[11px] text-[#DC2626] font-medium mt-1 pl-1">
                    {errors.roomNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-lg shadow-sm transition-colors text-xs flex items-center justify-center gap-2 mt-2"
            >
              <span>{isSubmitting ? 'Creating Student Profile...' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Login */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Already have an account?</span>{' '}
            <button
              type="button"
              onClick={() => setView('login')}
              className="text-[#2563EB] font-bold hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
