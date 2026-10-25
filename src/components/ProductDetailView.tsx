import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Zap,
  Star,
  ShieldCheck,
  Truck,
  MapPin,
  UserCheck,
  Check,
  Share2
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setView,
    addToast
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const wishlisted = isInWishlist(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Related products in same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setView('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    addToast('Product link copied to clipboard', 'info');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="py-8 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E8F0]">
          <button
            onClick={() => setView('catalog')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Campus Catalog</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#142D4E] transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share Item'}</span>
          </button>
        </div>

        {/* Product Purchase Module Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-2xl border border-[#E2E8F0] p-6 lg:p-8 shadow-sm">
          {/* Left Column: Image & Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0]">
              <img
                src={product.images[0]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {/* Fallback container underneath */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-6 text-center pointer-events-none -z-10">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  {product.category}
                </span>
                <span className="text-base font-bold text-slate-700 mt-2">
                  {product.title}
                </span>
              </div>

              {/* Wishlist Floating Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-colors ${
                  wishlisted
                    ? 'bg-rose-50 text-[#DC2626] border border-rose-200'
                    : 'bg-white/90 text-slate-600 hover:text-[#DC2626] border border-slate-200'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Second Hand Badge */}
              {product.isSecondHand && (
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#142D4E]/95 backdrop-blur-sm text-white text-xs font-semibold rounded-md flex items-center gap-1.5 shadow">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Student Pre-Owned Resale</span>
                </div>
              )}
            </div>

            {/* Additional Info Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Hostel Room Delivery by 7:30 PM</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Campus Quality Inspection</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category, Condition, Dept unboxed metadata */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="uppercase tracking-wider text-[#2563EB] font-bold">
                  {product.category}
                </span>
                <span>·</span>
                <span className="font-semibold text-slate-700">Condition: {product.condition}</span>
                {product.department && (
                  <>
                    <span>·</span>
                    <span>{product.department}</span>
                  </>
                )}
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#142D4E] tracking-tight leading-snug">
                {product.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {product.subtitle}
              </p>

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 pt-1 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-slate-800 font-tabular">{product.rating}</span>
                </div>
                <span className="text-slate-400 font-tabular">({product.ratingCount} reviews)</span>
                <span>·</span>
                {product.stock > 0 ? (
                  <span className="text-[#059669] font-semibold">
                    In Stock ({product.stock} units on campus)
                  </span>
                ) : (
                  <span className="text-[#DC2626] font-semibold">Currently Out of Stock</span>
                )}
              </div>

              {/* Pricing Block */}
              <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#142D4E] font-tabular">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through font-tabular">
                      MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-[#DC2626] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Inclusive of all taxes · Eligible for free hostel room delivery
                </p>
              </div>

              {/* Pre-Owned Student Seller Details Card (if second-hand) */}
              {product.isSecondHand && product.seller && (
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#142D4E]">
                    <div className="flex items-center gap-1.5 text-[#2563EB]">
                      <UserCheck className="w-4 h-4" />
                      <span>Verified Student Seller</span>
                    </div>
                    <span className="text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                      Campus Verified ID
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1">
                    <p className="font-semibold text-slate-900">{product.seller.name}</p>
                    <p className="text-slate-600 flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{product.seller.hostel} · {product.seller.department}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Direct cash / UPI on handover at hostel reception or campus gate.
                    </p>
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-[#CBD5E1] rounded-lg bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-slate-600 hover:text-black hover:bg-slate-100 rounded-l transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold font-tabular text-[#142D4E]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="px-3 py-1.5 text-slate-600 hover:text-black hover:bg-slate-100 rounded-r transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => addToCart(product, quantity)}
                    disabled={product.stock === 0}
                    className="flex-1 py-3 px-6 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="flex-1 py-3 px-6 rounded-lg bg-[#142D4E] hover:bg-[#0B1E36] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Full Description & Specifications Section */}
        <div className="mt-8 bg-white rounded-2xl border border-[#E2E8F0] p-6 lg:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#142D4E]">Product Description</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-lg font-bold text-[#142D4E] mb-3">Specifications & Academic Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-slate-100"
                >
                  <span className="font-medium text-slate-500">{key}</span>
                  <span className="font-semibold text-slate-800 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[#142D4E] mb-6 tracking-tight">
              Related Campus Gear
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
