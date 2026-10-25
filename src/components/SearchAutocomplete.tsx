import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCategory, Product } from '../types';
import { Search, X, BookOpen, Laptop, Cpu, Coffee, Luggage, Dumbbell, ArrowRight, Tag } from 'lucide-react';

interface CategoryMatch {
  id: ProductCategory;
  name: string;
  icon: React.ElementType;
  count: number;
}

const CATEGORY_METADATA: { id: ProductCategory; name: string; icon: React.ElementType }[] = [
  { id: 'textbooks', name: 'Textbooks & Notes', icon: BookOpen },
  { id: 'electronics', name: 'Audio, Laptops & Tech', icon: Laptop },
  { id: 'engineering', name: 'Engineering & Lab Equipment', icon: Cpu },
  { id: 'stationery', name: 'Stationery & Calculators', icon: Tag },
  { id: 'hostel', name: 'Hostel Essentials & Dorm Living', icon: Coffee },
  { id: 'fashion', name: 'Backpacks & Campus Gear', icon: Luggage },
  { id: 'fitness', name: 'Sports & Fitness Equipment', icon: Dumbbell },
];

const POPULAR_CAMPUS_TERMS = [
  'Casio FX-991CW ClassWiz Calculator',
  'Higher Engineering Mathematics B.S. Grewal',
  'Sony WH-1000XM5 Studio Headphones',
  'Water-Resistant Campus Commuter Backpack',
  'Hostel Electric Kettle for Chai & Maggi',
  'Mini Drafter and Engineering Drawing Board',
  'Aluminium USB-C Hub 8-in-1',
  'Data Structures Algorithms in C++',
  'Digital Multimeter Auto-Ranging',
  'Rechargeable LED Study Desk Lamp',
  'Ergonomic Foldable Laptop Stand',
  'Yonex Badminton Racket Set',
  'Engineering Graphics Kit',
  'Second-hand textbooks',
];

interface SearchAutocompleteProps {
  isMobile?: boolean;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({ isMobile = false }) => {
  const { products, setView, setSearchQuery, setSelectedCategory } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmedQuery = inputValue.trim().toLowerCase();

  // 1. Dynamic Matching Products
  const matchingProducts = useMemo(() => {
    if (!trimmedQuery) return [];
    return products
      .filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(trimmedQuery);
        const subMatch = p.subtitle.toLowerCase().includes(trimmedQuery);
        const deptMatch = p.department?.toLowerCase().includes(trimmedQuery);
        const catMatch = p.category.toLowerCase().includes(trimmedQuery);
        return titleMatch || subMatch || deptMatch || catMatch;
      })
      .slice(0, 4);
  }, [products, trimmedQuery]);

  // 2. Dynamic Matching Categories
  const matchingCategories = useMemo(() => {
    if (!trimmedQuery) return [];
    return CATEGORY_METADATA.filter((cat) => {
      const nameMatch = cat.name.toLowerCase().includes(trimmedQuery);
      const idMatch = cat.id.toLowerCase().includes(trimmedQuery);
      const hasProducts = products.some(
        (p) => p.category === cat.id && p.title.toLowerCase().includes(trimmedQuery)
      );
      return nameMatch || idMatch || hasProducts;
    }).map((cat) => ({
      ...cat,
      count: products.filter((p) => p.category === cat.id).length,
    }));
  }, [products, trimmedQuery]);

  // 3. Dynamic Matching Popular Search Terms
  const matchingTerms = useMemo(() => {
    if (!trimmedQuery) return [];
    return POPULAR_CAMPUS_TERMS.filter((term) =>
      term.toLowerCase().includes(trimmedQuery)
    ).slice(0, 3);
  }, [trimmedQuery]);

  // Handle direct search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmedQuery) {
      setSearchQuery(inputValue.trim());
      setSelectedCategory('all');
      setView('catalog');
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectProduct = (product: Product) => {
    setView('product-detail', product.id);
    setIsFocused(false);
    setInputValue('');
  };

  const handleSelectCategory = (catId: ProductCategory) => {
    setSelectedCategory(catId);
    setSearchQuery('');
    setView('catalog');
    setIsFocused(false);
    setInputValue('');
  };

  const handleSelectTerm = (term: string) => {
    setInputValue(term);
    setSearchQuery(term);
    setSelectedCategory('all');
    setView('catalog');
    setIsFocused(false);
  };

  const handleClear = () => {
    setInputValue('');
    setIsFocused(false);
  };

  // Condition to display dropdown:
  // Must be focused and input must NOT be empty (as per requirement: "hidden when the input is cleared or focus is lost")
  const showDropdown = isFocused && trimmedQuery.length > 0;
  const hasResults =
    matchingProducts.length > 0 || matchingCategories.length > 0 || matchingTerms.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsFocused(false);
              inputRef.current?.blur();
            }
          }}
          placeholder={
            isMobile
              ? 'Search books, calculators, gear...'
              : 'Search textbooks, scientific calculators, lab coats, hostel gear...'
          }
          className={`w-full ${
            isMobile
              ? 'pl-8 pr-16 py-2 text-xs'
              : 'pl-10 pr-24 py-2 text-sm'
          } bg-[#0B1E36]/90 border border-[#224570] text-white placeholder-slate-400 rounded-lg focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all`}
        />

        <Search
          className={`${
            isMobile ? 'w-3.5 h-3.5 left-2.5' : 'w-4 h-4 left-3.5'
          } text-slate-400 absolute top-1/2 -translate-y-1/2 pointer-events-none`}
        />

        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute ${
              isMobile ? 'right-12' : 'right-18'
            } top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1`}
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          type="submit"
          className={`absolute right-1.5 top-1/2 -translate-y-1/2 ${
            isMobile ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
          } bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium rounded-md transition-colors`}
        >
          Search
        </button>
      </form>

      {/* Dynamic Suggestions Dropdown */}
      {showDropdown && (
        <div
          onMouseDown={(e) => e.preventDefault()} // Prevents blur before click executes
          className="absolute left-0 right-0 top-full mt-2 bg-[#0B1E36] border border-[#224570] rounded-xl shadow-2xl py-3 z-50 text-xs text-slate-200 overflow-hidden divide-y divide-[#1A385F] animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {hasResults ? (
            <>
              {/* 1. Matching Categories */}
              {matchingCategories.length > 0 && (
                <div className="px-3 pb-2.5">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 px-2">
                    Departments & Categories
                  </div>
                  <div className="space-y-1">
                    {matchingCategories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSelectCategory(cat.id)}
                          className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-[#142D4E] hover:text-white flex items-center justify-between transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-[#142D4E] group-hover:bg-[#2563EB] flex items-center justify-center text-[#2563EB] group-hover:text-white transition-colors">
                              <Icon className="w-3.5 h-3.5" />
                            </span>
                            <span className="font-semibold text-slate-200 group-hover:text-white">
                              {cat.name}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-tabular font-medium">
                            {cat.count} {cat.count === 1 ? 'item' : 'items'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Matching Products */}
              {matchingProducts.length > 0 && (
                <div className="px-3 py-2.5">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 px-2">
                    Matching Campus Products
                  </div>
                  <div className="space-y-1">
                    {matchingProducts.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => handleSelectProduct(prod)}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-[#142D4E] hover:text-white flex items-center gap-3 transition-colors group"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.title}
                          className="w-10 h-10 rounded-md object-cover border border-[#224570] shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-100 group-hover:text-white truncate">
                            {prod.title}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span className="uppercase text-[#2563EB] text-[10px] font-bold">
                              {prod.category}
                            </span>
                            <span>·</span>
                            <span>{prod.condition}</span>
                            {prod.isSecondHand && (
                              <>
                                <span>·</span>
                                <span className="text-emerald-400">Pre-Owned Resale</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="font-bold text-white font-tabular text-sm shrink-0 pl-2">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Matching Popular Terms */}
              {matchingTerms.length > 0 && (
                <div className="px-3 pt-2.5">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 px-2">
                    Related Campus Searches
                  </div>
                  <div className="space-y-0.5">
                    {matchingTerms.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleSelectTerm(term)}
                        className="w-full text-left px-2 py-1.5 rounded hover:bg-[#142D4E] text-slate-300 hover:text-white flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-slate-500" />
                          <span>{term}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* View all search results bar */}
              <div className="p-2 bg-[#08172B] text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-1.5 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>See all catalog results for "{inputValue}"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="px-6 py-6 text-center space-y-1">
              <p className="font-semibold text-slate-300">
                No direct matches for "{inputValue}"
              </p>
              <p className="text-[11px] text-slate-400">
                Press Enter or click Search to browse the full catalog with loose matching.
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold"
              >
                <span>Search in Catalog</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
