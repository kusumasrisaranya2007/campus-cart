import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { X, Heart, ShoppingBag, Star, Truck, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist, setView } = useApp();
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const wishlisted = isInWishlist(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 z-10 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Left: Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
              <img
                src={product.images[selectedImg] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {/* Fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center -z-10 p-4 text-center">
                <span className="text-xs font-bold text-slate-600">{product.title}</span>
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-colors ${
                  wishlisted
                    ? 'bg-rose-50 text-[#DC2626] border border-rose-200'
                    : 'bg-white/90 text-slate-600 hover:text-[#DC2626] border border-slate-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImg === idx ? 'border-[#2563EB]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Quick Actions */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                <span className="text-[#2563EB]">{product.category}</span>
                <span>·</span>
                <span>{product.condition}</span>
                {product.badge && (
                  <>
                    <span>·</span>
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">
                      {product.badge}
                    </span>
                  </>
                )}
              </div>

              <h2 className="text-base font-bold text-[#142D4E] leading-snug">
                {product.title}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 text-slate-800 font-tabular">{product.rating}</span>
                </div>
                <span className="text-slate-400 font-tabular">({product.ratingCount} demo reviews)</span>
                <span>·</span>
                <span className={product.stock > 0 ? 'text-[#059669] font-semibold' : 'text-[#DC2626] font-semibold'}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#142D4E] font-tabular">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through font-tabular">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-[#DC2626] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {product.isSecondHand && product.seller && (
                <div className="mt-2.5 p-2 bg-blue-50/70 border border-blue-200 rounded-lg text-[11px] text-slate-700 flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  <span>
                    <strong>Student Seller:</strong> {product.seller.name} ({product.seller.hostel})
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3 text-xs">
                <span className="font-semibold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold font-tabular text-[#142D4E]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    onClose();
                  }}
                  disabled={product.stock === 0}
                  className="flex-1 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setView('product-detail', product.id);
                  }}
                  className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#142D4E] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
