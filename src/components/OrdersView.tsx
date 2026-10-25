import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Package, Truck, Calendar, ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react';
import { TrackOrderModal } from './TrackOrderModal';
import { Order } from '../types';
import { FULL_CATALOG } from '../data/fullCatalog';

const DEMO_FALLBACK_ORDER: Order = {
  id: 'CC-94812',
  date: '2026-10-25',
  items: [
    {
      product: FULL_CATALOG.find((p) => p.id === 'elec-01') || FULL_CATALOG[0],
      quantity: 1,
    },
    {
      product: FULL_CATALOG.find((p) => p.id === 'stat-01') || FULL_CATALOG[1],
      quantity: 2,
    },
  ],
  subtotal: 2198,
  discount: 220,
  couponCode: 'STUDENT10',
  deliveryFee: 0,
  total: 1978,
  shippingAddress: {
    fullName: 'Aarav Patel',
    email: 'aarav.patel@campus.edu',
    phone: '+91 98450 11223',
    college: 'National Institute of Technology',
    hostelBlock: 'Hostel Block B (Aryabhatta)',
    roomNumber: 'B-304',
    deliveryType: 'hostel',
  },
  paymentMethod: 'upi',
  status: 'Out for Delivery',
  estimatedDelivery: 'Today by 2:30 PM (Hostel Express)',
};

export const OrdersView: React.FC = () => {
  const { orders, setView, addToCart } = useApp();
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);

  return (
    <div className="py-8 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E8F0]">
          <div>
            <h1 className="text-2xl font-extrabold text-[#142D4E] tracking-tight">
              Campus Order History
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Review hostel delivery statuses, live courier timelines, and receipts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedOrderForTracking(orders[0] || DEMO_FALLBACK_ORDER)}
              className="text-xs font-semibold text-[#142D4E] hover:text-[#2563EB] bg-white border border-[#E2E8F0] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Track Active Delivery</span>
            </button>
            <button
              onClick={() => setView('catalog')}
              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center max-w-md mx-auto shadow-sm">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#142D4E]">No Orders Placed Yet</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Your placed campus orders and live hostel courier tracking will appear here.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => setView('catalog')}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Shop Campus Essentials
              </button>
              <button
                onClick={() => setSelectedOrderForTracking(DEMO_FALLBACK_ORDER)}
                className="px-4 py-2 bg-[#EAF2FF] hover:bg-[#D4E4FC] text-[#2563EB] rounded-lg text-xs font-semibold border border-blue-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Demo Track Order Timeline</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-2xs space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#142D4E]">Order #{order.id}</span>
                    <span className="text-slate-400">·</span>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{order.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setSelectedOrderForTracking(order)}
                      className="px-3 py-1 bg-[#EAF2FF] hover:bg-[#D4E4FC] text-[#2563EB] border border-[#2563EB]/30 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Order</span>
                    </button>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-[#2563EB] border border-blue-200'
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-sm font-bold text-[#142D4E] font-tabular">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <h4
                            onClick={() => setView('product-detail', item.product.id)}
                            className="font-semibold text-slate-900 hover:text-[#2563EB] cursor-pointer"
                          >
                            {item.product.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-tabular">
                            Qty: {item.quantity} · ₹{item.product.price} each · {item.product.condition}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(item.product, 1)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[#142D4E] text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Buy Again</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Destination & Tracking strip */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#2563EB]" />
                    <span>
                      Delivered to:{' '}
                      <strong className="text-slate-800">
                        {order.shippingAddress.hostelBlock} ({order.shippingAddress.roomNumber})
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">
                      Payment: <span className="uppercase font-semibold text-slate-700">{order.paymentMethod}</span>
                    </span>
                    <button
                      onClick={() => setSelectedOrderForTracking(order)}
                      className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <span>Live Timeline</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Track Order Modal */}
        {selectedOrderForTracking && (
          <TrackOrderModal
            order={selectedOrderForTracking}
            isOpen={Boolean(selectedOrderForTracking)}
            onClose={() => setSelectedOrderForTracking(null)}
          />
        )}
      </div>
    </div>
  );
};

