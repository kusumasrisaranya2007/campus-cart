import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';
import {
  BookOpen,
  Laptop,
  Cpu,
  PenTool,
  Coffee,
  Luggage,
  Dumbbell,
  ArrowRight,
  Palette,
  CheckCircle2,
  Package
} from 'lucide-react';

interface CategoryItem {
  id: ProductCategory;
  name: string;
  tagline: string;
  icon: React.ElementType;
  count: number;
}

export const PopularCategories: React.FC = () => {
  const { setSelectedCategory, setView, products } = useApp();

  const categories: CategoryItem[] = [
    {
      id: 'books',
      name: 'Books & Reference',
      tagline: 'Textbooks, GATE guides, coding manuals',
      icon: BookOpen,
      count: products.filter((p) => p.category === 'books' || p.category === 'textbooks').length,
    },
    {
      id: 'electronics',
      name: 'Electronics & Audio',
      tagline: 'Headphones, USB hubs, keyboards & mice',
      icon: Laptop,
      count: products.filter((p) => p.category === 'electronics').length,
    },
    {
      id: 'stationery',
      name: 'Stationery & Supplies',
      tagline: 'Notebooks, roller pens, calculators',
      icon: PenTool,
      count: products.filter((p) => p.category === 'stationery').length,
    },
    {
      id: 'essentials',
      name: 'College Essentials',
      tagline: 'Water bottles, lunchboxes, ID holders',
      icon: Luggage,
      count: products.filter((p) => p.category === 'essentials').length,
    },
    {
      id: 'hostel',
      name: 'Hostel Essentials',
      tagline: 'Electric kettles, spike guards, bedding',
      icon: Coffee,
      count: products.filter((p) => p.category === 'hostel').length,
    },
    {
      id: 'fashion',
      name: 'Campus Fashion',
      tagline: 'Fleece hoodies, canvas sneakers, watches',
      icon: Package,
      count: products.filter((p) => p.category === 'fashion').length,
    },
    {
      id: 'lab',
      name: 'Lab Equipment',
      tagline: 'Lab coats, multimeters, ESP32 kits',
      icon: Cpu,
      count: products.filter((p) => p.category === 'lab' || p.category === 'engineering').length,
    },
    {
      id: 'fitness',
      name: 'Sports & Fitness',
      tagline: 'Badminton, footballs, yoga mats, bands',
      icon: Dumbbell,
      count: products.filter((p) => p.category === 'fitness').length,
    },
    {
      id: 'art',
      name: 'Art & Creativity',
      tagline: 'Sketchbooks, acrylics, technical pens',
      icon: Palette,
      count: products.filter((p) => p.category === 'art').length,
    },
    {
      id: 'secondhand',
      name: 'Pre-Owned Resale',
      tagline: 'Senior bicycles, used drafters, monitors',
      icon: CheckCircle2,
      count: products.filter((p) => p.isSecondHand || p.category === 'secondhand').length,
    },
    {
      id: 'snacks',
      name: 'Snacks & Pantry',
      tagline: 'Instant noodles, coffee, tumblers, nuts',
      icon: Coffee,
      count: products.filter((p) => p.category === 'snacks').length,
    },
  ];

  const handleSelect = (catId: ProductCategory) => {
    setSelectedCategory(catId);
    setView('catalog');
  };

  return (
    <section className="py-12 bg-[#F5F7FA] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
              Explore All Categories
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Curated department supplies, lab essentials, dorm living, and student resale.
            </p>
          </div>
          <button
            onClick={() => handleSelect('all')}
            className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View All ({products.length} Items)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className="group p-5 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#EAF2FF] group-hover:bg-[#2563EB] flex items-center justify-center text-[#2563EB] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-[#2563EB] transition-colors font-tabular">
                    {cat.count} {cat.count === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-bold text-[#142D4E] group-hover:text-[#2563EB] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 line-clamp-1 leading-normal">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
