import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory, ProductCondition } from '../types';
import {
  Store,
  PlusCircle,
  Trash2,
  Edit3,
  CheckCircle,
  Eye,
  DollarSign,
  Package,
  Sparkles,
  MapPin,
  X
} from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  const { products, addProduct, deleteProduct, updateProductStock, setView, user } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    category: 'textbooks' as ProductCategory,
    condition: 'Like New' as ProductCondition,
    price: 350,
    originalPrice: 750,
    stock: 1,
    department: 'First Year Common',
    description: '',
    hostelBlock: user?.hostel || 'Hostel Block B (Aryabhatta)',
    roomNumber: user?.roomNumber || 'B-304',
    phone: '+91 98765 43210',
    imageUrl: '/src/assets/images/hero_college_shopping_1792932187772.jpg',
  });

  // Filter products listed as second-hand (peer items) or created by students
  const myItems = products.filter((p) => p.isSecondHand || p.id.startsWith('prod-'));

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    addProduct({
      title: form.title,
      subtitle: form.subtitle || 'Student pre-owned listing available for campus handover.',
      category: form.category,
      condition: form.condition,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      rating: 4.9,
      ratingCount: 1,
      stock: Number(form.stock),
      isSecondHand: true,
      images: [form.imageUrl],
      description: form.description || 'Clean condition, verified by student seller.',
      specifications: {
        'Condition': form.condition,
        'Seller Hostel': form.hostelBlock,
        'Room': form.roomNumber,
        'Department': form.department,
        'Pickup': 'Hostel gate or campus library reception'
      },
      department: form.department,
      seller: {
        name: user?.name || 'Aarav Patel',
        hostel: `${form.hostelBlock} (${form.roomNumber})`,
        department: form.department,
        phone: form.phone,
        verified: true,
      },
      featured: false,
    });

    setIsModalOpen(false);
    setForm({
      title: '',
      subtitle: '',
      category: 'textbooks',
      condition: 'Like New',
      price: 350,
      originalPrice: 750,
      stock: 1,
      department: 'First Year Common',
      description: '',
      hostelBlock: user?.hostel || 'Hostel Block B (Aryabhatta)',
      roomNumber: user?.roomNumber || 'B-304',
      phone: '+91 98765 43210',
      imageUrl: '/src/assets/images/hero_college_shopping_1792932187772.jpg',
    });
  };

  return (
    <div className="py-8 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#2563EB] text-white">
                <Store className="w-4 h-4" />
              </span>
              <h1 className="text-2xl font-extrabold text-[#142D4E] tracking-tight">
                Student Seller Hub
              </h1>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              List and manage your pre-owned textbooks, calculators, drafters, and hostel gear.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List an Item for Resale</span>
          </button>
        </div>

        {/* Demo Disclaimer Banner */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Student Resale Portal:</strong> Any item you list here appears instantly in the campus catalog and persists in your browser. All peer sales are 0% commission.
          </span>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Resale Listings
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-[#142D4E] font-tabular">
                {myItems.length}
              </span>
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Live in campus catalog</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Estimated Inventory Value
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-[#059669] font-tabular">
                ₹{myItems.reduce((acc, i) => acc + i.price * i.stock, 0).toLocaleString('en-IN')}
              </span>
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Direct payout on student pickup</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Seller Status
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-base font-bold text-[#142D4E]">NIT Campus Verified</span>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Hostel Block B (Room B-304)
            </p>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-2xs">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#142D4E]">My Campus Listings</h3>
            <span className="text-xs text-slate-400 font-tabular">{myItems.length} items</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Condition</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-10 h-10 rounded object-cover border border-slate-200 shrink-0"
                      />
                      <div className="max-w-xs">
                        <div
                          onClick={() => setView('product-detail', item.id)}
                          className="font-semibold text-slate-900 hover:text-[#2563EB] cursor-pointer truncate"
                        >
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.seller?.hostel || 'Hostel Room B-304'}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 uppercase font-medium text-[#2563EB]">
                      {item.category}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">
                        {item.condition}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900 font-tabular">
                      ₹{item.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateProductStock(item.id, item.stock - 1)}
                          className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600"
                        >
                          -
                        </button>
                        <span className="font-bold font-tabular px-1">{item.stock}</span>
                        <button
                          onClick={() => updateProductStock(item.id, item.stock + 1)}
                          className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setView('product-detail', item.id)}
                        className="p-1.5 text-slate-500 hover:text-[#2563EB]"
                        title="View Live Listing"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(item.id)}
                        className="p-1.5 text-slate-400 hover:text-[#DC2626]"
                        title="Delete Listing"
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
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-[#142D4E]">
                List Pre-Owned Item on Campus Cart
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Higher Engineering Mathematics by B.S. Grewal (44th Ed)"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value as ProductCategory })
                    }
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="textbooks">Textbooks & Notes</option>
                    <option value="engineering">Engineering & Lab</option>
                    <option value="electronics">Electronics & Tech</option>
                    <option value="stationery">Stationery & Calculators</option>
                    <option value="hostel">Hostel Essentials</option>
                    <option value="fashion">Backpacks & Gear</option>
                    <option value="fitness">Sports & Fitness</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Condition *</label>
                  <select
                    value={form.condition}
                    onChange={(e) =>
                      setForm({ ...form, condition: e.target.value as ProductCondition })
                    }
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Like New">Like New (barely used)</option>
                    <option value="Used">Used (good structural shape)</option>
                    <option value="New">Brand New (unopened)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    min="10"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quantity Stock</label>
                  <input
                    type="number"
                    min="1"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hostel Block *</label>
                  <input
                    type="text"
                    value={form.hostelBlock}
                    onChange={(e) => setForm({ ...form, hostelBlock: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Room Number *</label>
                  <input
                    type="text"
                    value={form.roomNumber}
                    onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Item Description & Condition Notes
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Detail notes: which semester it was used for, highlights, included accessories..."
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-semibold shadow-sm"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
