import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import {
  X,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  MapPin,
  ShieldCheck,
  Phone,
  RotateCcw,
  Sparkles,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export type TrackingStage = 'Placed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

interface TrackOrderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

const STAGES: {
  key: TrackingStage;
  label: string;
  tagline: string;
  description: string;
  facility: string;
  relativeTime: string;
}[] = [
  {
    key: 'Placed',
    label: 'Placed',
    tagline: 'Order Confirmed & Payment Verified',
    description: 'Order logged into Campus Cart central server. Payment and student verification confirmed.',
    facility: 'Campus Core Systems',
    relativeTime: 'Today, 09:42 AM',
  },
  {
    key: 'Shipped',
    label: 'Shipped',
    tagline: 'Dispatched from Central Campus Hub',
    description: 'Items sorted, quality checked, and assigned to campus batch transfer container #H-12.',
    facility: 'Student Activity Center · Bay 3',
    relativeTime: 'Today, 11:15 AM',
  },
  {
    key: 'Out for Delivery',
    label: 'Out for Delivery',
    tagline: 'Student Courier on the Way',
    description: 'Campus Student Ambassador is en route via campus pathway to your designated hostel block.',
    facility: 'Hostel Quad Transit Route',
    relativeTime: 'Today, 01:20 PM',
  },
  {
    key: 'Delivered',
    label: 'Delivered',
    tagline: 'Delivered to Hostel Block',
    description: 'Package handed over at room door / hostel security counter and verified via digital OTP.',
    facility: 'Hostel Reception / Room Doorstep',
    relativeTime: 'Today, 01:48 PM',
  },
];

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  // Determine initial stage based on order status or default to 'Out for Delivery'
  const getInitialStage = (status: Order['status']): TrackingStage => {
    switch (status) {
      case 'Confirmed':
        return 'Placed';
      case 'Packed at Campus Hub':
        return 'Shipped';
      case 'Out for Delivery':
        return 'Out for Delivery';
      case 'Delivered':
        return 'Delivered';
      default:
        return 'Out for Delivery';
    }
  };

  const [activeStage, setActiveStage] = useState<TrackingStage>(() =>
    getInitialStage(order.status)
  );

  // Sync when order changes
  useEffect(() => {
    setActiveStage(getInitialStage(order.status));
  }, [order]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStageIndex = STAGES.findIndex((s) => s.key === activeStage);
  const progressPercent = (currentStageIndex / (STAGES.length - 1)) * 100;

  const handleNextStage = () => {
    const nextIdx = (currentStageIndex + 1) % STAGES.length;
    setActiveStage(STAGES[nextIdx].key);
  };

  const handleResetStage = () => {
    setActiveStage('Placed');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="track-order-title"
      >
        {/* Header */}
        <div className="bg-[#142D4E] text-white px-6 py-5 flex items-start justify-between relative overflow-hidden">
          {/* Subtle geometric pattern accent */}
          <div className="absolute right-0 top-0 w-48 h-full bg-linear-to-l from-[#2563EB]/20 to-transparent pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                Live Campus Tracking
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-[11px] font-mono text-emerald-300 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Hub Sync
              </span>
            </div>
            <h2 id="track-order-title" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Order #{order.id}</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Estimated Delivery:{' '}
              <span className="font-semibold text-white">
                {activeStage === 'Delivered'
                  ? 'Delivered to Hostel'
                  : 'Today by 2:30 PM (Hostel Express)'}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-6 flex-1">
          {/* Demo Controls Bar */}
          <div className="bg-[#EAF2FF] border border-[#2563EB]/20 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2563EB] shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#142D4E] block">
                  Interactive Timeline Simulator
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Click any stage or step forward to test delivery states
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleNextStage}
                className="px-2.5 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                title="Advance to next stage"
              >
                <span>Advance State</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetStage}
                className="p-1 text-[#64748B] hover:text-[#142D4E] hover:bg-blue-100 rounded-md transition-colors"
                title="Reset to Placed"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Stage Picker Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {STAGES.map((s, index) => {
              const isSelected = s.key === activeStage;
              const isPast = index < currentStageIndex;

              return (
                <button
                  key={s.key}
                  onClick={() => setActiveStage(s.key)}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold text-center transition-all border ${
                    isSelected
                      ? 'bg-[#142D4E] text-white border-[#142D4E] shadow-xs'
                      : isPast
                      ? 'bg-blue-50 text-[#2563EB] border-blue-200 hover:bg-blue-100'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                    Step {index + 1}
                  </div>
                  <div className="truncate">{s.label}</div>
                </button>
              );
            })}
          </div>

          {/* Visual Timeline Stepper */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5 sm:p-6">
            {/* Top Stepper Track (Horizontal) */}
            <div className="relative mb-8">
              {/* Baseline background */}
              <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 rounded-full" />
              {/* Filled progress bar */}
              <div
                className="absolute top-4 left-6 h-1 bg-[#2563EB] rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `calc(${progressPercent}% * (1 - 48px / 100%))`,
                }}
              />

              {/* 4 Step Nodes */}
              <div className="relative flex justify-between">
                {STAGES.map((s, idx) => {
                  const isCompleted = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div
                      key={s.key}
                      onClick={() => setActiveStage(s.key)}
                      className="flex flex-col items-center cursor-pointer group"
                      style={{ width: '80px' }}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 relative ${
                          isCompleted
                            ? 'bg-[#059669] text-white shadow-xs'
                            : isCurrent
                            ? 'bg-[#2563EB] text-white ring-4 ring-blue-100 shadow-md scale-105'
                            : 'bg-white border-2 border-slate-300 text-slate-400 group-hover:border-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : isCurrent ? (
                          <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      <span
                        className={`mt-2 text-[11px] font-bold text-center leading-tight transition-colors ${
                          isCurrent
                            ? 'text-[#2563EB]'
                            : isCompleted
                            ? 'text-[#059669]'
                            : 'text-slate-400'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Stage Cards (Vertical Milestone Feed) */}
            <div className="space-y-4 pt-2">
              {STAGES.map((s, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div
                    key={s.key}
                    className={`flex items-start gap-3.5 p-3.5 rounded-lg border transition-all ${
                      isCurrent
                        ? 'bg-white border-[#2563EB] shadow-xs ring-1 ring-[#2563EB]/20'
                        : isPassed
                        ? 'bg-white/80 border-slate-200'
                        : 'bg-slate-50/50 border-slate-100 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isCurrent
                          ? 'bg-[#2563EB] text-white'
                          : isPassed
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {idx === 0 ? (
                        <Package className="w-3.5 h-3.5" />
                      ) : idx === 1 ? (
                        <Clock className="w-3.5 h-3.5" />
                      ) : idx === 2 ? (
                        <Truck className="w-3.5 h-3.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#142D4E]">
                            {s.tagline}
                          </h4>
                          {isCurrent && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EAF2FF] text-[#2563EB]">
                              In Progress
                            </span>
                          )}
                          {isPassed && !isCurrent && (
                            <span className="text-[10px] font-semibold text-emerald-600">
                              Completed
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                          {isPassed ? s.relativeTime : 'Pending'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        {s.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 font-medium">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{s.facility}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery & Security Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            {/* Courier & Verification */}
            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#142D4E] flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#2563EB]" />
                  <span>Hostel Courier Info</span>
                </span>
                <span className="text-[11px] text-[#059669] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Student
                </span>
              </div>
              <p className="text-slate-700 font-medium">
                Rohit Verma <span className="text-slate-400">·</span> Hostel 4 Courier Squad
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  +91 98210 54199
                </span>
                <span className="text-[#2563EB] font-semibold">Eco-Cycle #04</span>
              </div>
            </div>

            {/* Handover OTP & Drop Location */}
            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#142D4E] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                  <span>Handover Security PIN</span>
                </span>
                <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-slate-900 text-yellow-300">
                  8492
                </span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Deliver to:{' '}
                <strong className="text-slate-900">
                  {order.shippingAddress.hostelBlock}, Room {order.shippingAddress.roomNumber}
                </strong>
              </p>
              <div className="pt-1 border-t border-slate-100 text-[11px] text-slate-400">
                Share PIN with courier upon arrival to confirm package handover.
              </div>
            </div>
          </div>

          {/* Package Contents Quick Preview */}
          <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
            <h4 className="text-xs font-bold text-[#142D4E] mb-2.5 flex items-center justify-between">
              <span>Items in this shipment ({order.items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span className="text-[11px] font-normal text-slate-500 font-tabular">
                Order Total: ₹{order.total.toLocaleString('en-IN')}
              </span>
            </h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-9 h-9 rounded-md object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 truncate text-[11px] max-w-[280px] sm:max-w-[360px]">
                        {item.product.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-tabular">
                        Qty: {item.quantity} · ₹{item.product.price}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-700 text-xs font-tabular">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-[#E2E8F0] flex items-center justify-between">
          <div className="text-[11px] text-[#64748B]">
            Campus Hub Support: <span className="font-semibold text-slate-700">SAC Room 102</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#142D4E] hover:bg-[#0F223B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
