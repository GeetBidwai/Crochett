import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Scissors, ArrowRight } from 'lucide-react';

export const StoryHighlight: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#EFEBE4] relative overflow-hidden border-t border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Creator Imagery Composite */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo: Artisan at work */}
              <div className="rounded-[36px] overflow-hidden bg-[#FFFFFF] border border-[#E5E0D8] shadow-md aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
                  alt="Artisan hands crocheting with warm natural wool"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Inset Photo */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-60 rounded-3xl overflow-hidden bg-[#FFFFFF] border-2 border-white shadow-xl aspect-square hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80"
                  alt="Yarn skeins and natural wooden crochet hooks"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Creator quote pill */}
              <div className="absolute top-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-[#E5E0D8] max-w-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B0C4B1]/30 flex items-center justify-center shrink-0 text-[#4A3F35]">
                  <Heart className="w-5 h-5 fill-[#4A3F35]" />
                </div>
                <div>
                  <p className="text-xs font-serif italic text-[#4A3F35]">
                    "In every loop, there is intentional peace."
                  </p>
                  <p className="text-[10px] text-[#8E7B6D] mt-0.5 font-medium">
                    — Maya, Founder & Artisan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D8] text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              <Sparkles className="w-3 h-3 text-[#A67C52]" />
              <span>Made With Care</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A3F35] font-medium leading-[1.2]">
              Why handmade pieces hold a different kind of warmth.
            </h2>

            <p className="text-sm sm:text-base text-[#6B5F54] leading-relaxed font-light">
              Unlike mass-manufactured goods stamped out by automated machines in seconds, every single knot in our studio is formed by two human hands. Crochet is one of the few textile crafts that <strong className="font-medium text-[#4A3F35]">cannot be replicated by machines</strong>—every stitch requires a conscious, rhythmic movement.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#B0C4B1]/40 text-[#4A3F35] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-[#6B5F54]">
                  <strong className="text-[#4A3F35] font-medium">Conscious Material Sourcing:</strong> We strictly choose unbleached Turkish cottons, soft merino, and recycled linen threads that age gracefully.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#B0C4B1]/40 text-[#4A3F35] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-[#6B5F54]">
                  <strong className="text-[#4A3F35] font-medium">Bespoke Customization:</strong> Looking for a specific wedding bouquet palette or a personalized amigurumi companion? We co-create with you.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#B0C4B1]/40 text-[#4A3F35] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-[#6B5F54]">
                  <strong className="text-[#4A3F35] font-medium">Heirloom Longevity:</strong> Reinforced edges, double-blocked panels, and lined bags that are built to be cherished for years.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-5">
              <Link
                to="/about"
                className="px-8 py-3.5 rounded-full bg-[#4A3F35] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8E7B6D] transition-colors inline-flex items-center gap-2"
              >
                <span>Read Full Studio Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/custom-order"
                className="text-xs font-semibold uppercase tracking-widest text-[#4A3F35] hover:opacity-60 transition-opacity"
              >
                Commission a Piece &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
