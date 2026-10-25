import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { ProductCategory, ProductCondition } from '../types';
import { Search, Filter, X, ArrowUpDown, SlidersHorizontal, RefreshCcw, ChevronDown } from 'lucide-react';

export const CatalogView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setView,
  } = useApp();

  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [secondHandOnly, setSecondHandOnly] = useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Pagination / Load more
  const [displayCount, setDisplayCount] = useState<number>(12);

  // Reset display count when filter changes
  React.useEffect(() => {
    setDisplayCount(12);
  }, [selectedCategory, searchQuery, conditionFilter, selectedBrand, minPrice, maxPrice, secondHandOnly, inStockOnly, minRating, sortBy]);

  // If searchQuery was set to 'second-hand', toggle secondHandOnly
  React.useEffect(() => {
    if (searchQuery.toLowerCase() === 'second-hand') {
      setSecondHandOnly(true);
      setSearchQuery('');
    }
  }, [searchQuery, setSearchQuery]);

  // Categories list with live counts
  const categoryTabs: { id: ProductCategory; label: string; count: number }[] = useMemo(() => [
    { id: 'all', label: 'All Products', count: products.length },
    { id: 'books', label: 'Books', count: products.filter((p) => p.category === 'books' || p.category === 'textbooks').length },
    { id: 'electronics', label: 'Electronics', count: products.filter((p) => p.category === 'electronics').length },
    { id: 'stationery', label: 'Stationery', count: products.filter((p) => p.category === 'stationery').length },
    { id: 'essentials', label: 'College Essentials', count: products.filter((p) => p.category === 'essentials').length },
    { id: 'hostel', label: 'Hostel', count: products.filter((p) => p.category === 'hostel').length },
    { id: 'fashion', label: 'Fashion', count: products.filter((p) => p.category === 'fashion').length },
    { id: 'lab', label: 'Lab Equipment', count: products.filter((p) => p.category === 'lab' || p.category === 'engineering').length },
    { id: 'fitness', label: 'Sports', count: products.filter((p) => p.category === 'fitness').length },
    { id: 'art', label: 'Art & Design', count: products.filter((p) => p.category === 'art').length },
    { id: 'secondhand', label: 'Pre-Owned', count: products.filter((p) => p.isSecondHand || p.category === 'secondhand').length },
    { id: 'snacks', label: 'Snacks & Pantry', count: products.filter((p) => p.category === 'snacks').length },
  ], [products]);

  // Available brands in the catalog
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brandsSet.add(p.brand);
    });
    return Array.from(brandsSet).sort();
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter (support aliases)
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'books') {
          if (item.category !== 'books' && item.category !== 'textbooks') return false;
        } else if (selectedCategory === 'lab') {
          if (item.category !== 'lab' && item.category !== 'engineering') return false;
        } else if (selectedCategory === 'secondhand') {
          if (!item.isSecondHand && item.category !== 'secondhand') return false;
        } else if (item.category !== selectedCategory) {
          return false;
        }
      }

      // Search query (checks title, subtitle, category, brand, department, and description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSub = item.subtitle.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesDept = item.department?.toLowerCase().includes(query);
        const matchesBrand = item.brand?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSub && !matchesCategory && !matchesDept && !matchesBrand && !matchesDesc) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== 'all' && item.brand !== selectedBrand) {
        return false;
      }

      // Condition filter
      if (conditionFilter !== 'all' && item.condition !== conditionFilter) {
        return false;
      }

      // Price range
      if (item.price < minPrice || item.price > maxPrice) {
        return false;
      }

      // Second hand only
      if (secondHandOnly && !item.isSecondHand && item.category !== 'secondhand') {
        return false;
      }

      // In stock only
      if (inStockOnly && item.stock <= 0) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && item.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [
    products,
    selectedCategory,
    searchQuery,
    selectedBrand,
    conditionFilter,
    minPrice,
    maxPrice,
    secondHandOnly,
    inStockOnly,
    minRating,
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return list.sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount);
      case 'newest':
        return list.sort((a, b) => (b.id > a.id ? 1 : -1));
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
    }
  }, [filteredProducts, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedBrand('all');
    setConditionFilter('all');
    setMinPrice(0);
    setMaxPrice(10000);
    setSecondHandOnly(false);
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('featured');
    setDisplayCount(12);
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0) +
    (conditionFilter !== 'all' ? 1 : 0) +
    (minPrice > 0 || maxPrice < 10000 ? 1 : 0) +
    (secondHandOnly ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  const displayedList = sortedProducts.slice(0, displayCount);
  const hasMore = displayCount < sortedProducts.length;

  return (
    <div className="py-8 bg-[#F5F7FA] min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#E2E8F0] gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#142D4E] tracking-tight">
              Campus Catalog & Student Resale
            </h1>
            <p className="text-xs text-[#64748B] mt-1">
              Showing <span className="font-semibold text-slate-800 font-tabular">{sortedProducts.length}</span> verified products
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedBrand !== 'all' && ` from ${selectedBrand}`}
            </p>
          </div>

          {/* Sort & Filter Trigger */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#142D4E] shadow-2xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#142D4E] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured & Relevant</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated (★)</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs (Segmented controls with counts) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id);
                setDisplayCount(12);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === tab.id
                  ? 'bg-[#142D4E] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-[#142D4E] hover:bg-slate-100 border border-[#E2E8F0]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-tabular ${
                selectedCategory === tab.id ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Main Grid with Sidebar Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 space-y-6 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-sm font-bold text-[#142D4E]">Refine Catalog</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#DC2626] hover:underline font-medium"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Search Inside Catalog */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Keywords
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, authors, specs..."
                    className="w-full pl-8 pr-7 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#1F2937] focus:outline-none focus:border-[#2563EB]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Brand Filter */}
              {availableBrands.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Brand / Publisher
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="all">All Brands & Publishers</option>
                    {availableBrands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Price Range
                  </label>
                  <span className="text-xs font-semibold text-[#2563EB] font-tabular">
                    ₹{minPrice} - ₹{maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2563EB] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-tabular mt-1">
                  <span>₹0</span>
                  <span>₹5,000</span>
                  <span>₹10,000</span>
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Condition
                </label>
                <div className="space-y-1.5 text-xs text-slate-600">
                  {['all', 'New', 'Like New', 'Used'].map((cond) => (
                    <label
                      key={cond}
                      className="flex items-center gap-2 cursor-pointer hover:text-[#142D4E]"
                    >
                      <input
                        type="radio"
                        name="condition"
                        checked={conditionFilter === cond}
                        onChange={() => setConditionFilter(cond)}
                        className="accent-[#2563EB]"
                      />
                      <span>{cond === 'all' ? 'All Conditions' : cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Student Peer Resale Toggle */}
              <div className="pt-3 border-t border-[#F1F5F9]">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-slate-700">
                    Pre-Owned Resale Only
                  </span>
                  <input
                    type="checkbox"
                    checked={secondHandOnly}
                    onChange={(e) => setSecondHandOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2563EB] accent-[#2563EB] cursor-pointer"
                  />
                </label>
                <p className="text-[11px] text-slate-400 mt-1">
                  Show verified used textbooks & senior bicycles
                </p>
              </div>

              {/* In-Stock Only */}
              <div className="pt-3 border-t border-[#F1F5F9]">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-slate-700">In-Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2563EB] accent-[#2563EB] cursor-pointer"
                  />
                </label>
              </div>

              {/* Minimum Rating */}
              <div className="pt-3 border-t border-[#F1F5F9]">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Minimum Rating
                </label>
                <div className="flex items-center gap-1">
                  {[0, 4, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex-1 py-1 text-xs font-semibold rounded border transition-colors ${
                        minRating === rating
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {rating === 0 ? 'All' : `${rating}★`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products List / Grid */}
          <main className="lg:col-span-3 space-y-8">
            {displayedList.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedList.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button / Pagination */}
                {hasMore && (
                  <div className="pt-6 text-center">
                    <button
                      onClick={() => setDisplayCount((prev) => prev + 12)}
                      className="px-8 py-3 bg-white hover:bg-slate-50 text-[#142D4E] border border-slate-300 font-semibold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
                    >
                      <span>Load More Products ({sortedProducts.length - displayCount} remaining)</span>
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty state with reset */
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#142D4E]">
                  No items matched your filters
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 max-w-xs mx-auto">
                  Try widening your price range, selecting "All Brands", or browsing another department.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-5 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg inline-flex items-center gap-2 transition-colors"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <h3 className="font-bold text-[#142D4E]">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Mobile filter controls */}
              <div className="py-4 space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Maximum Price (₹{maxPrice})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded text-xs"
                  >
                    <option value="all">All Brands</option>
                    {availableBrands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Condition</label>
                  <select
                    value={conditionFilter}
                    onChange={(e) => setConditionFilter(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded text-xs"
                  >
                    <option value="all">All Conditions</option>
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Used">Used</option>
                  </select>
                </div>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={secondHandOnly}
                    onChange={(e) => setSecondHandOnly(e.target.checked)}
                    className="accent-[#2563EB]"
                  />
                  <span>Pre-Owned Resale Only</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#2563EB]"
                  />
                  <span>In-Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2 text-xs font-medium border border-slate-200 rounded text-slate-600"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-2 text-xs font-semibold bg-[#2563EB] text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
