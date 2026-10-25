import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Star, ShoppingBag, Eye, UserCheck } from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setView } = useApp();
  const [showQuickView, setShowQuickView] = useState(false);
  const wishlisted = isInWishlist(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <>
      <div className="group bg-white rounded-xl border border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden relative">
        {/* Product Image Area */}
        <div
          onClick={() => setView('product-detail', product.id)}
          className="relative w-full aspect-[4/3] bg-[#F8FAFC] overflow-hidden cursor-pointer flex items-center justify-center"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Fallback container underneath if image fails */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] flex flex-col items-center justify-center p-4 text-center pointer-events-none -z-10">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-xs font-bold text-slate-700 mt-1 line-clamp-2">
              {product.title}
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {product.isSecondHand ? (
              <span className="px-2 py-0.5 bg-[#142D4E]/90 text-white text-[10px] font-bold rounded shadow-xs flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-emerald-400" />
                <span>Pre-Owned</span>
              </span>
            ) : product.badge ? (
              <span
                className={`px-2 py-0.5 text-[10px] font-bold rounded shadow-xs ${
                  product.badge === 'Best Seller'
                    ? 'bg-[#142D4E] text-white'
                    : product.badge === 'Hot Deal'
                    ? 'bg-[#DC2626] text-white'
                    : product.badge.startsWith('Under')
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2563EB] text-white'
                }`}
              >
                {product.badge}
              </span>
            ) : null}
          </div>

          {/* Action buttons (Wishlist & Quick View) */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                wishlisted
                  ? 'bg-rose-50 text-[#DC2626] border border-rose-200'
                  : 'bg-white/90 text-slate-600 hover:text-[#DC2626] hover:bg-white border border-slate-200/80 shadow-xs'
              }`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>

            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickView(true);
              }}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-[#2563EB] border border-slate-200/80 shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="Quick Preview"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Unboxed Metadata */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1 font-medium">
              <span className="uppercase tracking-wider text-[10px] text-[#2563EB] font-bold">
                {product.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{product.condition}</span>
              {product.brand && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="truncate max-w-[100px]">{product.brand}</span>
                </>
              )}
            </div>

            {/* Product Title */}
            <h3
              onClick={() => setView('product-detail', product.id)}
              className="text-sm font-semibold text-[#1F2937] hover:text-[#2563EB] transition-colors line-clamp-2 cursor-pointer leading-snug"
              title={product.title}
            >
              {product.title}
            </h3>

            {/* Ratings with demo tag */}
            <div className="flex items-center gap-1.5 mt-1.5 text-xs">
              <div className="flex items-center text-amber-500 font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 text-slate-800 font-tabular">{product.rating}</span>
              </div>
              <span className="text-slate-400 font-tabular text-[11px]">
                ({product.ratingCount})
              </span>
              {product.stock <= 3 && product.stock > 0 && (
                <span className="ml-auto text-[11px] font-semibold text-[#DC2626]">
                  Only {product.stock} left
                </span>
              )}
            </div>
          </div>

          {/* Pricing and Action Button */}
          <div className="mt-3.5 pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-[#142D4E] font-tabular">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through font-tabular">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {discountPercent > 0 && (
                <span className="text-[10px] font-bold text-[#DC2626]">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(product, 1)}
              disabled={product.stock === 0}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                product.stock === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xs'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};
