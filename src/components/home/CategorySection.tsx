import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { ArrowRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7] border-t border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              Handcrafted Categories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3F35] font-medium mt-1">
              Explore by Collection
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-widest font-semibold text-[#4A3F35] hover:opacity-60 flex items-center gap-1.5 transition-opacity"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.slug === 'custom-orders' ? '/custom-order' : `/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-3xl overflow-hidden bg-[#EFEBE4] border border-[#E5E0D8] aspect-4/5 flex flex-col justify-end p-5 sm:p-6 transition-all duration-300 hover:shadow-md hover:border-[#8E7B6D]"
            >
              {/* Category Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#4A3F35]/85 via-[#4A3F35]/25 to-transparent transition-opacity duration-300 group-hover:from-[#4A3F35]/95" />

              {/* Text content */}
              <div className="relative z-10 text-[#FDFBF7]">
                <span className="text-[10px] uppercase tracking-widest text-[#E5E0D8] block mb-1 font-medium">
                  {cat.itemCount} items
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#FDFBF7] leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#E5E0D8]/80 mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
