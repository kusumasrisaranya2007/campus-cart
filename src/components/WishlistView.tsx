import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const {
    products,
    wishlist,
    toggleWishlist,
    moveToCartFromWishlist,
    addToCart,
    setView
  } = useApp();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach((p) => {
      addToCart(p, 1);
      toggleWishlist(p.id);
    });
  };

  return (
    <div className="py-8 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('catalog')}
              className="p-1.5 rounded-lg border border-[#E2E8F0] bg-white text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-[#142D4E] tracking-tight">
                Saved Wishlist
              </h1>
              <p className="text-xs text-[#64748B]">
                {wishlistedProducts.length} campus essentials bookmarked for later
              </p>
            </div>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={handleMoveAllToCart}
              className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Move All to Cart</span>
            </button>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center max-w-md mx-auto shadow-sm">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#142D4E]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Save textbooks, calculators, and gadgets here while browsing the catalog.
            </p>
            <button
              onClick={() => setView('catalog')}
              className="mt-4 px-5 py-2 bg-[#2563EB] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div>
                  <div
                    onClick={() => setView('product-detail', product.id)}
                    className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-3 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-1">
                    <span className="uppercase text-[#2563EB]">{product.category}</span>
                    <span>·</span>
                    <span>{product.condition}</span>
                  </div>

                  <h3
                    onClick={() => setView('product-detail', product.id)}
                    className="text-sm font-semibold text-slate-900 hover:text-[#2563EB] cursor-pointer line-clamp-2"
                  >
                    {product.title}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-base font-bold text-[#142D4E] font-tabular">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-slate-400 line-through font-tabular">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => moveToCartFromWishlist(product)}
                    className="flex-1 py-1.5 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-1.5 text-slate-400 hover:text-[#DC2626] rounded-lg border border-slate-200 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
