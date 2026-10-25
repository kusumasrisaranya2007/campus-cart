import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  TrendingUp,
  Package,
  Users,
  CheckCircle,
  Trash2,
  Eye,
  Sliders,
  DollarSign
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { products, orders, deleteProduct, updateProductStock, setView } = useApp();
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'categories'>('catalog');

  const totalGMV = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="py-8 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#142D4E] text-white rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#142D4E] tracking-tight">
                Campus Admin Console
              </h1>
              <p className="text-xs text-[#64748B]">
                Platform analytics, hostel dispatch queue, and catalog inventory governance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Campus Hub Live</span>
            </span>
          </div>
        </div>

        {/* High-Level KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-400">
              <span>Campus GMV</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-[#142D4E] font-tabular mt-2">
              ₹{(totalGMV + 48250).toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              +18.4% this semester
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-400">
              <span>Active Campus Orders</span>
              <Package className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="text-2xl font-extrabold text-[#142D4E] font-tabular mt-2">
              {orders.length + 18}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {orders.filter((o) => o.status !== 'Delivered').length} hostel runs in-progress
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-400">
              <span>Catalog SKUs</span>
              <Sliders className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-extrabold text-[#142D4E] font-tabular mt-2">
              {products.length}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Across 7 college departments</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-400">
              <span>Verified Students</span>
              <Users className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-[#142D4E] font-tabular mt-2">
              1,420
            </div>
            <p className="text-[11px] text-slate-500 mt-1">NIT Campus Batch of 2026</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#E2E8F0] gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'catalog'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Catalog Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Recent Orders & Hostel Runs
          </button>
        </div>

        {/* Tab 1: Catalog Inventory Management */}
        {activeTab === 'catalog' && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3">Product Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Campus Stock</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-6 py-3 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 flex items-center gap-3">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-8 h-8 rounded object-cover border border-slate-200 shrink-0"
                        />
                        <span className="font-semibold text-slate-900 truncate max-w-xs">
                          {item.title}
                        </span>
                      </td>
                      <td className="px-4 py-3 uppercase text-[11px] text-[#2563EB] font-medium">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 font-bold font-tabular text-slate-800">
                        ₹{item.price.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3 font-tabular">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateProductStock(item.id, item.stock - 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span
                            className={`font-bold px-1.5 ${
                              item.stock <= 2 ? 'text-red-600' : 'text-slate-800'
                            }`}
                          >
                            {item.stock}
                          </span>
                          <button
                            onClick={() => updateProductStock(item.id, item.stock + 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            item.isSecondHand
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-blue-50 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {item.isSecondHand ? 'Peer Resale' : 'Campus Warehouse'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right space-x-2">
                        <button
                          onClick={() => setView('product-detail', item.id)}
                          className="p-1 text-slate-400 hover:text-[#2563EB]"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="p-1 text-slate-400 hover:text-[#DC2626]"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Overview */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4">
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#142D4E]">Order #{ord.id}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{ord.shippingAddress.fullName}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-blue-600 font-semibold">
                        {ord.shippingAddress.hostelBlock} ({ord.shippingAddress.roomNumber})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {ord.items.length} items · Payment via {ord.paymentMethod.toUpperCase()}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-900 font-tabular text-sm">
                      ₹{ord.total.toLocaleString('en-IN')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
