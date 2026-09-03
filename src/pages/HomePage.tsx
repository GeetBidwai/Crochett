import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/home/Hero';
import { CategorySection } from '../components/home/CategorySection';
import { StoryHighlight } from '../components/home/StoryHighlight';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { InstagramFeed } from '../components/home/InstagramFeed';
import { ProductCard } from '../components/product/ProductCard';
import { apiService } from '../services/api';
import { Product } from '../types';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Palette, Scissors } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchFeatured = async () => {
      try {
        const items = await apiService.getProducts({ sortBy: 'featured' });
        // Take top 4 or 6 featured products
        setFeaturedProducts(items.filter((p) => p.featured).slice(0, 4));
      } catch (err) {
        console.error('Failed to load featured products', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-[#FAF7F2]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Product Categories */}
      <CategorySection />

      {/* 3. Featured Products Section */}
      <section className="py-20 bg-[#FDFBF7] border-t border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Small Batch Releases</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3F35] font-medium">
                Featured Handmade Pieces
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-widest font-semibold text-[#4A3F35] hover:opacity-60 flex items-center gap-1.5 transition-opacity"
            >
              <span>Explore Entire Shop ({12}+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-3xl bg-[#EFEBE4] aspect-square animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Quick banner below products */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#EFEBE4] border border-[#E5E0D8] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] flex items-center justify-center shrink-0 text-[#4A3F35] shadow-xs border border-[#E5E0D8]">
                <Scissors className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#4A3F35]">
                  Can't find your dream color combination?
                </h4>
                <p className="text-xs text-[#6B5F54] mt-0.5">
                  We gladly accommodate custom yarn colors and sizing for our signature bags and flowers.
                </p>
              </div>
            </div>
            <Link
              to="/custom-order"
              className="whitespace-nowrap px-8 py-3.5 rounded-full bg-[#4A3F35] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#8E7B6D] transition-colors"
            >
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>

      {/* 4. "Made With Love" & Creator Story Section */}
      <StoryHighlight />

      {/* 5. Lookbook Preview Ribbon */}
      <section className="py-20 bg-[#FDFBF7] border-t border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
                Artisan Gallery
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3F35] font-medium leading-tight">
                Archive & Lookbook
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5F54] leading-relaxed font-light">
                A visual showcase of past bespoke bridal bouquets, one-off gallery garments, and behind-the-scenes studio moments with unbleached cotton spools.
              </p>
              <div className="pt-2">
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FFFFFF] border border-[#E5E0D8] text-[#4A3F35] text-xs font-semibold uppercase tracking-widest hover:border-[#8E7B6D] transition-all"
                >
                  <span>Open Lookbook Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-3xl overflow-hidden aspect-3/4 bg-[#EFEBE4] border border-[#E5E0D8] shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80"
                  alt="Past custom bouquet"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-3/4 bg-[#EFEBE4] border border-[#E5E0D8] shadow-xs mt-6">
                <img
                  src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
                  alt="Solstice cardigan"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-3/4 bg-[#EFEBE4] border border-[#E5E0D8] shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80"
                  alt="Woodland nursery piece"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <TestimonialsSection />

      {/* 7. Instagram / Studio Diary Feed */}
      <InstagramFeed />
    </div>
  );
};
