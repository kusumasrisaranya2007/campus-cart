import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Trash2, ArrowRight, Tag, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    discountAmount,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setView
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-16 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-slate-400 mx-auto mb-4 shadow-sm">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#142D4E]">Your Campus Cart is Empty</h2>
          <p className="text-xs text-[#64748B] mt-2 max-w-xs mx-auto leading-relaxed">
            You haven't added any textbooks, lab equipment, or hostel essentials to your cart yet.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={() => setView('catalog')}
              className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              Explore Campus Catalog
            </button>
            <button
              onClick={() => setView('wishlist')}
              className="px-5 py-2.5 bg-white border border-[#CBD5E1] text-[#142D4E] text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              View Saved Wishlist
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('catalog')}
              className="p-1.5 rounded-lg border border-[#E2E8F0] bg-white text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#142D4E] tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-xs text-[#64748B]">
                {cart.length} unique {cart.length === 1 ? 'item' : 'items'} in your campus cart
              </p>
            </div>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-[#DC2626] hover:underline font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
              >
                {/* Product thumbnail & Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div
                    onClick={() => setView('product-detail', item.product.id)}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 cursor-pointer"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                      <span className="uppercase text-[#2563EB]">{item.product.category}</span>
                      <span>·</span>
                      <span>{item.product.condition}</span>
                    </div>

                    <h3
                      onClick={() => setView('product-detail', item.product.id)}
                      className="text-sm font-bold text-[#142D4E] hover:text-[#2563EB] transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.product.title}
                    </h3>

                    <div className="text-xs font-bold text-[#142D4E] font-tabular">
                      ₹{item.product.price.toLocaleString('en-IN')}{' '}
                      <span className="text-[11px] font-normal text-slate-400">each</span>
                    </div>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center border border-[#CBD5E1] rounded-lg bg-white">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded-l text-xs"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold font-tabular text-[#142D4E]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded-r text-xs"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <div className="text-sm font-bold text-[#142D4E] font-tabular">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-slate-400 hover:text-[#DC2626] transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Hostel Delivery Guarantee Note */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center gap-3 text-xs text-slate-700">
              <Truck className="w-5 h-5 text-[#2563EB] shrink-0" />
              <div>
                <span className="font-semibold text-[#142D4E]">Free Campus Hostel Delivery:</span> Orders above ₹499 qualify for zero delivery fee. Delivered to hostel reception or room doors daily.
              </div>
            </div>
          </div>

          {/* Order Summary & Coupon Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-5 shadow-sm">
              <h2 className="text-base font-bold text-[#142D4E]">Order Summary</h2>

              {/* Coupon Form */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Have a Student Promo Code?
                </label>
                {appliedCoupon ? (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code} applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#DC2626] hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. CAMPUS20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg uppercase tracking-wider font-mono focus:outline-none focus:border-[#2563EB]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#142D4E] hover:bg-[#0B1E36] text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-[#DC2626] font-medium mt-1.5">{couponError}</p>
                )}

                {/* Clickable Quick Coupon Shortcuts */}
                {!appliedCoupon && (
                  <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => {
                        setCouponInput('CAMPUS20');
                        applyCoupon('CAMPUS20');
                      }}
                      className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] hover:bg-blue-100 font-mono font-semibold"
                    >
                      CAMPUS20 (20% Off)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCouponInput('FREESHIP');
                        applyCoupon('FREESHIP');
                      }}
                      className="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] hover:bg-blue-100 font-mono font-semibold"
                    >
                      FREESHIP
                    </button>
                  </div>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-slate-900 font-tabular">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#059669]">
                    <span>Coupon Discount</span>
                    <span className="font-semibold font-tabular">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Hostel Delivery</span>
                  <span className="font-semibold font-tabular">
                    {deliveryFee === 0 ? (
                      <span className="text-[#059669]">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline text-sm font-bold text-[#142D4E]">
                  <span>Total Amount</span>
                  <span className="text-xl font-extrabold font-tabular">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setView('checkout')}
                className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Hostel Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pay via UPI, Cash on Delivery, or Student Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
