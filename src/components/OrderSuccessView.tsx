import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Package, MapPin, Truck, ArrowRight, ShoppingBag, ExternalLink } from 'lucide-react';
import { TrackOrderModal } from './TrackOrderModal';

export const OrderSuccessView: React.FC = () => {
  const { orders, lastOrderId, setView } = useApp();
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  const currentOrder = orders.find((o) => o.id === lastOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold">No recent order found</h2>
        <button
          onClick={() => setView('catalog')}
          className="mt-4 px-4 py-2 bg-[#2563EB] text-white rounded text-xs"
        >
          Go to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-10 shadow-sm space-y-8">
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#059669] mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Campus Order #{currentOrder.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142D4E] tracking-tight">
              Order Confirmed & Sent to Campus Hub!
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
              We've dispatched your order details to the central hostel delivery team.
            </p>
          </div>

          {/* Delivery Tracker Steps */}
          <div className="p-4 sm:p-6 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#142D4E] mb-4">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#2563EB]" />
                <span>Live Delivery Timeline</span>
              </span>
              <button
                onClick={() => setIsTrackModalOpen(true)}
                className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Open Detailed Tracker</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative flex items-center justify-between">
              {/* Progress Line */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
              <div className="absolute left-6 w-1/3 top-1/2 -translate-y-1/2 h-0.5 bg-[#2563EB] -z-0" />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold shadow">
                  ✓
                </div>
                <span className="text-[11px] font-semibold text-[#142D4E] mt-2">Placed</span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold shadow">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-[#142D4E] mt-2">Campus Hub</span>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center text-xs font-bold">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-2">Hostel Run</span>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center text-xs font-bold">
                  🏠
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-2">Delivered</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>
                <strong>Estimated Delivery:</strong> {currentOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Destination Details & Order Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl border border-[#E2E8F0] space-y-2">
              <div className="font-bold text-[#142D4E] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Hostel Delivery Address</span>
              </div>
              <p className="font-semibold text-slate-800">{currentOrder.shippingAddress.fullName}</p>
              <p className="text-slate-600">
                {currentOrder.shippingAddress.hostelBlock},{' '}
                {currentOrder.shippingAddress.roomNumber}
              </p>
              <p className="text-slate-600">{currentOrder.shippingAddress.college}</p>
              <p className="text-slate-600">Phone: {currentOrder.shippingAddress.phone}</p>
              {currentOrder.shippingAddress.notes && (
                <p className="text-slate-400 italic text-[11px] pt-1">
                  Note: "{currentOrder.shippingAddress.notes}"
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl border border-[#E2E8F0] space-y-2">
              <div className="font-bold text-[#142D4E] uppercase tracking-wider text-[11px]">
                Payment Summary
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Method:</span>
                <span className="font-semibold text-slate-800 uppercase">
                  {currentOrder.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-tabular">₹{currentOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-[#059669]">
                  <span>Discount:</span>
                  <span className="font-tabular">-₹{currentOrder.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery:</span>
                <span>{currentOrder.deliveryFee === 0 ? 'FREE' : `₹${currentOrder.deliveryFee}`}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-sm text-[#142D4E]">
                <span>Total Paid / Due:</span>
                <span className="font-tabular text-[#2563EB]">
                  ₹{currentOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsTrackModalOpen(true)}
              className="flex-1 py-3 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Delivery</span>
            </button>
            <button
              onClick={() => setView('orders')}
              className="flex-1 py-3 px-4 rounded-lg bg-[#142D4E] hover:bg-[#0B1E36] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>View All Past Orders</span>
            </button>
            <button
              onClick={() => setView('catalog')}
              className="sm:w-auto py-3 px-4 rounded-lg bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#142D4E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Catalog</span>
            </button>
          </div>
        </div>

        {/* Track Order Modal */}
        {isTrackModalOpen && (
          <TrackOrderModal
            order={currentOrder}
            isOpen={isTrackModalOpen}
            onClose={() => setIsTrackModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
