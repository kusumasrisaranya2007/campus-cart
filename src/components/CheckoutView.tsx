import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShippingAddress } from '../types';
import {
  ArrowLeft,
  Truck,
  MapPin,
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    subtotal,
    deliveryFee,
    discountAmount,
    finalTotal,
    appliedCoupon,
    user,
    placeOrder,
    setView
  } = useApp();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: user?.name || 'Aarav Patel',
    email: user?.email || 'aarav.patel@campus.edu',
    phone: '+91 98450 11223',
    college: user?.college || 'National Institute of Technology',
    hostelBlock: user?.hostel || 'Hostel Block B (Aryabhatta)',
    roomNumber: user?.roomNumber || 'B-304',
    deliveryType: 'hostel',
    notes: 'Please leave with hostel reception if delivery arrives during afternoon labs.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'campus_card'>('upi');
  const [upiId, setUpiId] = useState('student@okaxis');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-16 bg-[#F5F7FA] text-center min-h-[calc(100vh-200px)]">
        <h2 className="text-xl font-bold text-[#142D4E]">No items to checkout</h2>
        <button
          onClick={() => setView('catalog')}
          className="mt-4 px-6 py-2 bg-[#2563EB] text-white rounded-lg text-xs font-semibold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Student name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.college.trim()) errs.college = 'College name is required';
    if (formData.deliveryType === 'hostel') {
      if (!formData.hostelBlock.trim()) errs.hostelBlock = 'Hostel block is required';
      if (!formData.roomNumber.trim()) errs.roomNumber = 'Room number is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(formData, paymentMethod);
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="py-8 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#E2E8F0]">
          <button
            onClick={() => setView('cart')}
            className="p-1.5 rounded-lg border border-[#E2E8F0] bg-white text-slate-600 hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#142D4E] tracking-tight">
              Hostel Checkout & Delivery
            </h1>
            <p className="text-xs text-[#64748B]">
              Enter student hostel address & choose preferred campus payment method
            </p>
          </div>
        </div>

        {/* Form and Summary */}
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Address & Payment */}
            <div className="lg:col-span-8 space-y-6">
              {/* Delivery Destination Options */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#2563EB]" />
                  <h2 className="text-sm font-bold text-[#142D4E] uppercase tracking-wider">
                    1. Campus Delivery Location
                  </h2>
                </div>

                {/* Delivery Type Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <label
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      formData.deliveryType === 'hostel'
                        ? 'border-[#2563EB] bg-[#EAF2FF]/60 shadow-2xs'
                        : 'border-[#E2E8F0] hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={formData.deliveryType === 'hostel'}
                      onChange={() => setFormData({ ...formData, deliveryType: 'hostel' })}
                      className="mt-0.5 accent-[#2563EB]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#142D4E]">Hostel Room Delivery</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Delivered directly to your hostel block reception or door
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      formData.deliveryType === 'gate'
                        ? 'border-[#2563EB] bg-[#EAF2FF]/60 shadow-2xs'
                        : 'border-[#E2E8F0] hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={formData.deliveryType === 'gate'}
                      onChange={() => setFormData({ ...formData, deliveryType: 'gate' })}
                      className="mt-0.5 accent-[#2563EB]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#142D4E]">Campus Gate Pickup Hub</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Pick up from Main Gate Security Counter / Hub at your convenience
                      </div>
                    </div>
                  </label>
                </div>

                {/* Address Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Student Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#1F2937] focus:outline-none focus:border-[#2563EB]"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-[#DC2626] mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#1F2937] focus:outline-none focus:border-[#2563EB]"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-[#DC2626] mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      College / University Name *
                    </label>
                    <input
                      type="text"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#1F2937] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  {formData.deliveryType === 'hostel' && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Hostel Block / Residence Hall *
                        </label>
                        <select
                          value={formData.hostelBlock}
                          onChange={(e) =>
                            setFormData({ ...formData, hostelBlock: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#1F2937] focus:outline-none focus:border-[#2563EB]"
                        >
                          <option value="Hostel Block A (Kalam)">Hostel Block A (Kalam)</option>
                          <option value="Hostel Block B (Aryabhatta)">
                            Hostel Block B (Aryabhatta)
                          </option>
                          <option value="Hostel Block C (C.V. Raman)">
                            Hostel Block C (C.V. Raman)
                          </option>
                          <option value="Hostel Block D (Shivaji)">Hostel Block D (Shivaji)</option>
                          <option value="Gargi Hall (Girls Hostel 1)">
                            Gargi Hall (Girls Hostel 1)
                          </option>
                          <option value="Kalpana Chawla Hall (Girls Hostel 2)">
                            Kalpana Chawla Hall (Girls Hostel 2)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Hostel Room Number *
                        </label>
                        <input
                          type="text"
                          value={formData.roomNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, roomNumber: e.target.value })
                          }
                          placeholder="e.g. B-304, 2nd Floor"
                          className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#1F2937] focus:outline-none focus:border-[#2563EB]"
                        />
                        {errors.roomNumber && (
                          <p className="text-[11px] text-[#DC2626] mt-1">{errors.roomNumber}</p>
                        )}
                      </div>
                    </>
                  )}

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Delivery Note for Student Courier (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Call before coming up, in lab until 5 PM"
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#1F2937] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#2563EB]" />
                  <h2 className="text-sm font-bold text-[#142D4E] uppercase tracking-wider">
                    2. Campus Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'upi'
                        ? 'border-[#2563EB] bg-[#EAF2FF]/50 shadow-2xs'
                        : 'border-[#E2E8F0] hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-0.5 accent-[#2563EB]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#142D4E]">
                          UPI (Google Pay, PhonePe, Paytm, BHIM)
                        </span>
                        <QrCode className="w-4 h-4 text-[#2563EB]" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Instant zero-charge UPI payment to campus store merchant VPA.
                      </p>
                      {paymentMethod === 'upi' && (
                        <div className="mt-3 flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@upi"
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                          />
                          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Cash on Delivery (COD) */}
                  <label
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'cod'
                        ? 'border-[#2563EB] bg-[#EAF2FF]/50 shadow-2xs'
                        : 'border-[#E2E8F0] hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 accent-[#2563EB]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#142D4E]">
                          Cash on Hostel Delivery (COD)
                        </span>
                        <Banknote className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Pay cash directly when student delivery agent reaches your hostel block.
                      </p>
                    </div>
                  </label>

                  {/* Campus Card / Net Banking */}
                  <label
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'campus_card'
                        ? 'border-[#2563EB] bg-[#EAF2FF]/50 shadow-2xs'
                        : 'border-[#E2E8F0] hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'campus_card'}
                      onChange={() => setPaymentMethod('campus_card')}
                      className="mt-0.5 accent-[#2563EB]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#142D4E]">
                          College Student Smart ID Card / Net Banking
                        </span>
                        <CreditCard className="w-4 h-4 text-slate-600" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Deduct balance from official campus mess/library smart card account.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-[#142D4E] uppercase tracking-wider pb-3 border-b border-slate-100">
                  Review Campus Order
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 truncate">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-9 h-9 rounded object-cover border border-slate-200 shrink-0"
                        />
                        <div className="truncate">
                          <p className="font-semibold text-slate-800 truncate">{item.product.title}</p>
                          <p className="text-[10px] text-slate-400 font-tabular">
                            Qty: {item.quantity} · ₹{item.product.price} each
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 font-tabular shrink-0 pl-2">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900 font-tabular">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#059669]">
                      <span>
                        Promo Discount {appliedCoupon && `(${appliedCoupon.code})`}
                      </span>
                      <span className="font-semibold font-tabular">
                        -₹{discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Campus Hostel Delivery</span>
                    <span className="font-semibold font-tabular">
                      {deliveryFee === 0 ? (
                        <span className="text-[#059669]">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline text-sm font-bold text-[#142D4E]">
                    <span>Payable Amount</span>
                    <span className="text-xl font-extrabold text-[#2563EB] font-tabular">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Placing Campus Order...' : `Place Order (₹${finalTotal})`}
                  </span>
                </button>

                <div className="text-[11px] text-slate-400 text-center leading-normal">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                  Demo checkout simulator for college campus deployment.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
