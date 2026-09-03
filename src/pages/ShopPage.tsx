import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { apiService } from '../services/api';
import { categories } from '../data/categories';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { 
  SlidersHorizontal, 
  Search, 
  X, 
  ArrowUpDown, 
  Sparkles, 
  Heart, 
  PackageOpen 
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter states
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || ''; // e.g. 'wishlist'

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(searchParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 200]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');

  // Sync URL query params with state
  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [categoryParam, searchParam]);

  // Fetch products
  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await apiService.getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Filter and sort locally
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Wishlist view
      if (filterParam === 'wishlist' && !wishlist.includes(product.id)) {
        return false;
      }

      // Category filter
      if (
        selectedCategory !== 'all' &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Search term
      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(term);
        const matchesDesc = product.description.toLowerCase().includes(term);
        const matchesCat = product.category.toLowerCase().includes(term);
        const matchesMat = product.materials.some((m) => m.toLowerCase().includes(term));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesMat) return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Stock filter
      if (inStockOnly && (!product.inStock || product.stock <= 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, priceRange, inStockOnly, sortBy, filterParam, wishlist]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([10, 200]);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Title & Subtitle */}
        <div className="pb-8 border-b border-[#E5E0D8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
                Artisan Collection
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A3F35] font-medium mt-1">
                {filterParam === 'wishlist'
                  ? 'Your Saved Wishlist'
                  : selectedCategory !== 'all'
                  ? selectedCategory
                  : 'Handmade Crochet Boutique'}
              </h1>
              <p className="text-xs sm:text-sm text-[#6B5F54] mt-1.5 max-w-2xl font-light leading-relaxed">
                {filterParam === 'wishlist'
                  ? 'Pieces you have saved to your heart. Keep an eye on small-batch inventory levels.'
                  : 'Explore handcrafted bags, whimsical amigurumi, eternal bouquets, and cozy textural home goods made with sustainable natural fibers.'}
              </p>
            </div>

            {/* Total Results Count */}
            <div className="text-xs text-[#6B5F54] font-medium">
              Showing <strong className="text-[#4A3F35] font-bold">{filteredProducts.length}</strong> creations
            </div>
          </div>

          {/* Quick Filter Category Pills Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1 no-scrollbar">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === 'all' && filterParam !== 'wishlist'
                  ? 'bg-[#4A3F35] text-[#FDFBF7] shadow-xs'
                  : 'bg-white border border-[#E5E0D8] text-[#4A3F35] hover:border-[#8E7B6D]'
              }`}
            >
              All Pieces
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.name)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase() && filterParam !== 'wishlist'
                    ? 'bg-[#4A3F35] text-[#FDFBF7] shadow-xs'
                    : 'bg-white border border-[#E5E0D8] text-[#4A3F35] hover:border-[#8E7B6D]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar: Search, Mobile Filter Trigger & Sort */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E7B6D]" />
            <input
              type="text"
              placeholder="Search by name, stitch, or yarn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#E5E0D8] rounded-full text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35] placeholder-[#6B5F54]/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5F54] hover:text-[#4A3F35]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Button */}
            <button
              id="btn-mobile-filters"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E0D8] rounded-full text-xs font-semibold text-[#4A3F35] hover:border-[#8E7B6D]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8E7B6D]" />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B5F54] hidden sm:inline font-medium">Sort:</span>
              <div className="relative">
                <select
                  id="select-sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white border border-[#E5E0D8] rounded-full text-xs text-[#4A3F35] pl-4 pr-9 py-2.5 font-semibold focus:outline-hidden cursor-pointer hover:border-[#8E7B6D]"
                >
                  <option value="featured">Featured Artisans</option>
                  <option value="newest">Newest Batches</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ArrowUpDown className="w-3 h-3 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E7B6D] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(selectedCategory !== 'all' || searchQuery || filterParam === 'wishlist' || inStockOnly || priceRange[1] < 200) && (
          <div className="pb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#6B5F54]">Active filters:</span>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEBE4] border border-[#E5E0D8] text-xs font-medium text-[#4A3F35]">
                Category: {selectedCategory}
                <button onClick={() => handleCategorySelect('all')}>
                  <X className="w-3 h-3 text-[#6B5F54] hover:text-[#4A3F35]" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEBE4] border border-[#E5E0D8] text-xs font-medium text-[#4A3F35]">
                Keyword: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 text-[#6B5F54] hover:text-[#4A3F35]" />
                </button>
              </span>
            )}

            {filterParam === 'wishlist' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEBE4] border border-[#E5E0D8] text-xs font-medium text-[#4A3F35]">
                Wishlist Only
                <button onClick={() => {
                  searchParams.delete('filter');
                  setSearchParams(searchParams);
                }}>
                  <X className="w-3 h-3 text-[#6B5F54] hover:text-[#4A3F35]" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEBE4] border border-[#E5E0D8] text-xs font-medium text-[#4A3F35]">
                In Stock Only
                <button onClick={() => setInStockOnly(false)}>
                  <X className="w-3 h-3 text-[#6B5F54] hover:text-[#4A3F35]" />
                </button>
              </span>
            )}

            {priceRange[1] < 200 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEBE4] border border-[#E5E0D8] text-xs font-medium text-[#4A3F35]">
                Up to ${priceRange[1]}
                <button onClick={() => setPriceRange([10, 200])}>
                  <X className="w-3 h-3 text-[#6B5F54] hover:text-[#4A3F35]" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs text-[#8E7B6D] hover:underline ml-2 font-bold"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="flex gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            inStockOnly={inStockOnly}
            onToggleInStock={setInStockOnly}
            onResetFilters={handleResetFilters}
          />

          {/* Mobile Filter Drawer */}
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            inStockOnly={inStockOnly}
            onToggleInStock={setInStockOnly}
            onResetFilters={handleResetFilters}
            isMobileOpen={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-3xl bg-[#EFEBE4] aspect-square animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#E5E0D8] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFEBE4] flex items-center justify-center text-[#8E7B6D] mx-auto">
                  <PackageOpen className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#4A3F35]">
                  No matching creations found
                </h3>
                <p className="text-xs text-[#6B5F54] max-w-md mx-auto leading-relaxed font-light">
                  We couldn't find any crochet pieces matching your active filter criteria. Try clearing some filters or search for something else.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-8 py-3 rounded-full bg-[#4A3F35] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8E7B6D] transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
