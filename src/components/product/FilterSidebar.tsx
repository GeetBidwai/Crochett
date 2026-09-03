import React from 'react';
import { Category } from '../../types';
import { Filter, X, RotateCcw, Check } from 'lucide-react';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  priceRange: [number, number];
  onPriceChange: (newRange: [number, number]) => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
  onResetFilters: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  inStockOnly,
  onToggleInStock,
  onResetFilters,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const content = (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
        <div className="flex items-center gap-2 text-[#4A3F35] font-bold text-sm">
          <Filter className="w-4 h-4 text-[#8E7B6D]" />
          <span>Filter Products</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-[#6B5F54] hover:text-[#8E7B6D] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category List */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-3">
          Category
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded-2xl transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#4A3F35] text-[#FDFBF7] font-semibold shadow-xs'
                : 'text-[#6B5F54] hover:bg-[#EFEBE4] hover:text-[#4A3F35]'
            }`}
          >
            <span>All Creations</span>
            <span className="text-[11px] opacity-70">12</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded-2xl transition-colors ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-[#4A3F35] text-[#FDFBF7] font-semibold shadow-xs'
                  : 'text-[#6B5F54] hover:bg-[#EFEBE4] hover:text-[#4A3F35]'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[11px] opacity-70">{cat.itemCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D]">
            Price Range
          </h4>
          <span className="text-xs text-[#4A3F35] font-semibold">
            ${priceRange[0]} – ${priceRange[1]}
          </span>
        </div>
        <div className="space-y-3">
          <input
            type="range"
            min="10"
            max="200"
            step="5"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-[#4A3F35] cursor-pointer"
          />
          <div className="flex items-center justify-between gap-2 text-xs text-[#6B5F54]">
            <span className="px-2.5 py-1 bg-white border border-[#E5E0D8] rounded-xl font-medium text-[#4A3F35]">
              Min: ${priceRange[0]}
            </span>
            <span>to</span>
            <span className="px-2.5 py-1 bg-white border border-[#E5E0D8] rounded-xl font-medium text-[#4A3F35]">
              Max: ${priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="pt-2 border-t border-[#E5E0D8]">
        <label className="flex items-center justify-between cursor-pointer py-2">
          <span className="text-xs font-semibold text-[#4A3F35]">In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="w-4 h-4 rounded-sm text-[#4A3F35] accent-[#4A3F35] border-[#E5E0D8]"
          />
        </label>
      </div>

      {/* Artisan Assurance Note */}
      <div className="p-4 bg-[#EFEBE4] rounded-2xl border border-[#E5E0D8] text-xs text-[#6B5F54] space-y-1.5">
        <p className="font-bold text-[#4A3F35]">Looking for a custom color?</p>
        <p className="text-[11px] leading-relaxed font-light">
          If your desired hue isn't in stock, we will gladly hand-dye or source specific skeins for you.
        </p>
      </div>
    </div>
  );

  // If mobile drawer
  if (isMobileOpen) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
        <div
          className="absolute inset-0 bg-[#4A3F35]/40 backdrop-blur-xs"
          onClick={onCloseMobile}
        />
        <div className="fixed inset-y-0 left-0 max-w-full flex">
          <div className="w-80 bg-[#FDFBF7] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-r border-[#E5E0D8]">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E0D8]">
                <h3 className="font-serif text-lg font-medium text-[#4A3F35]">Filter Studio Pieces</h3>
                <button
                  onClick={onCloseMobile}
                  className="p-1 rounded-full text-[#6B5F54] hover:text-[#4A3F35]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-6 mt-6 border-t border-[#E5E0D8]">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 bg-[#4A3F35] text-white text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-[#8E7B6D] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <aside className="hidden lg:block w-64 shrink-0">{content}</aside>;
};
