import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { lookbookItems } from '../data/lookbook';
import { LookbookItem } from '../types';
import { Sparkles, ArrowRight, X, Heart, Eye, Check } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [inspectItem, setInspectItem] = useState<LookbookItem | null>(null);

  const filters = [
    'All',
    'Recent Creations',
    'Custom Orders',
    'Sold Pieces',
    'Behind The Scenes',
  ];

  const filteredItems = selectedFilter === 'All'
    ? lookbookItems
    : lookbookItems.filter((item) => item.category === selectedFilter);

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFEBE4] border border-[#E5E0D8] text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D]">
            <Sparkles className="w-3.5 h-3.5 text-[#8E7B6D]" />
            <span>Artisan Lookbook & Archive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#4A3F35] font-medium leading-tight">
            A Gallery of Past & Present Stitches
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5F54] leading-relaxed font-light">
            Not every piece in our studio is destined for the shop shelf. Here we archive our custom bridal commissions, experimental open-lace cardigans, and behind-the-scenes blocking tables.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-[#4A3F35] text-white shadow-xs'
                  : 'bg-white border border-[#E5E0D8] text-[#4A3F35] hover:bg-[#EFEBE4]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Pinterest / Editorial-Inspired Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setInspectItem(item)}
              className="break-inside-avoid group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#E5E0D8] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Frame with aspect ratio variations */}
              <div
                className={`relative overflow-hidden bg-[#EFEBE4] ${
                  item.aspectRatio === 'tall'
                    ? 'aspect-3/4'
                    : item.aspectRatio === 'wide'
                    ? 'aspect-4/3'
                    : 'aspect-square'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#4A3F35]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white/90 text-[#4A3F35] shadow-md">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>

                {/* Status Pill */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#4A3F35]/85 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                {item.isSold && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#8E7B6D] text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-xs">
                      Past Archive
                    </span>
                  </div>
                )}
              </div>

              {/* Editorial Caption Box */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#6B5F54] mb-1 font-light">
                    <span>{item.year}</span>
                    <span className="italic">{item.yarnUsed}</span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#4A3F35] group-hover:text-[#8E7B6D] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#6B5F54] mt-2 leading-relaxed font-light line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {item.priceEstimate && (
                  <div className="mt-4 pt-3 border-t border-[#EFEBE4] flex items-center justify-between text-xs">
                    <span className="text-[#6B5F54] font-light">Commission Context:</span>
                    <span className="font-medium text-[#4A3F35]">{item.priceEstimate}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bespoke Request Banner at bottom of lookbook */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#EFEBE4] border border-[#E5E0D8] text-center max-w-3xl mx-auto space-y-4">
          <Sparkles className="w-6 h-6 text-[#8E7B6D] mx-auto" />
          <h2 className="font-serif text-2xl sm:text-3xl text-[#4A3F35] font-medium">
            Have Something Special in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5F54] max-w-xl mx-auto leading-relaxed font-light">
            If you fell in love with a piece in our archive or have an entirely new design idea, Maya accepts bespoke commissions for weddings, home spaces, and gifts.
          </p>
          <div className="pt-2">
            <Link
              to="/custom-order"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4A3F35] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#8E7B6D] transition-colors shadow-xs"
            >
              <span>Request a Custom Creation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Modal for In-Depth Item Inspection */}
        {inspectItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-[#4A3F35]/50 backdrop-blur-xs"
              onClick={() => setInspectItem(null)}
            />
            <div className="relative bg-[#FDFBF7] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 border border-[#E5E0D8] animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setInspectItem(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#4A3F35] flex items-center justify-center shadow-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-4/3 overflow-hidden bg-[#EFEBE4]">
                <img
                  src={inspectItem.image}
                  alt={inspectItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#8E7B6D] uppercase tracking-[0.2em]">
                  <span>{inspectItem.category}</span>
                  <span>•</span>
                  <span>Archive {inspectItem.year}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#4A3F35] font-medium">
                  {inspectItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6B5F54] leading-relaxed font-light">
                  {inspectItem.description}
                </p>

                <div className="p-4 bg-[#EFEBE4] rounded-2xl text-xs space-y-1 border border-[#E5E0D8]">
                  <p className="text-[#4A3F35]">
                    <strong>Materials & Yarn:</strong> {inspectItem.yarnUsed}
                  </p>
                  {inspectItem.priceEstimate && (
                    <p className="text-[#6B5F54] font-light">
                      <strong>Reference:</strong> {inspectItem.priceEstimate}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex gap-3">
                  <Link
                    to="/custom-order"
                    onClick={() => setInspectItem(null)}
                    className="flex-1 py-3.5 text-center rounded-full bg-[#4A3F35] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#8E7B6D] transition-colors shadow-xs"
                  >
                    Request Similar Custom Piece
                  </Link>
                  <button
                    onClick={() => setInspectItem(null)}
                    className="px-6 py-3.5 rounded-full border border-[#E5E0D8] text-xs text-[#4A3F35] hover:bg-[#EFEBE4] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
