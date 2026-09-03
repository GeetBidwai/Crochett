import React from 'react';
import { testimonials } from '../../data/testimonials';
import { Star, Quote, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#FDFBF7] border-t border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D8] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
            <Sparkles className="w-3 h-3 text-[#A67C52]" />
            <span>Customer Notes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3F35] font-medium">
            Stories from our collectors & friends
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5F54] leading-relaxed font-light">
            Nothing brings us more joy than seeing our handmade pieces become everyday companions in your homes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E5E0D8] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#8E7B6D] transition-all"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#A67C52] text-[#A67C52]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#E5E0D8] mb-2" />
                <p className="text-xs text-[#4A3F35] leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E0D8]/60 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E5E0D8]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#4A3F35] leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-[10px] text-[#6B5F54]">{t.location}</p>
                  <span className="text-[10px] text-[#8E7B6D] font-medium block mt-0.5">
                    Purchased {t.productName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
