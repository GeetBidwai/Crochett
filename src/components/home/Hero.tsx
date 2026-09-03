import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Narrative Intro */}
          <div className="lg:col-span-3 flex flex-col justify-end pb-4 lg:pb-8">
            <div className="border-t border-[#E5E0D8] pt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D] mb-3">
                Handmade with care
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif leading-[1.15] text-[#4A3F35] mb-4">
                Woven Stories <br />
                <span className="italic font-normal">for Daily Rituals.</span>
              </h1>
              <p className="text-sm leading-relaxed text-[#6B5F54] mb-8 font-light">
                Every stitch is an intention. Explore our seasonal release featuring sustainably sourced organic cotton, plant-dyed fibers, and timeless floral needlework.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  to="/shop"
                  id="btn-hero-shop"
                  className="bg-[#4A3F35] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8E7B6D] transition-colors self-start inline-flex items-center gap-2 shadow-xs"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/gallery"
                  id="btn-hero-explore"
                  className="text-xs uppercase tracking-widest font-semibold text-[#4A3F35] hover:opacity-60 transition-opacity py-2 self-start flex items-center gap-1.5"
                >
                  <span>Explore Lookbook</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </Link>
              </div>
            </div>
          </div>

          {/* Center Column: Featured Editorial Showcase */}
          <div className="lg:col-span-6 relative min-h-[440px] lg:min-h-[540px]">
            <Link
              to="/product/daisy-crochet-bag"
              className="h-full w-full rounded-[40px] bg-[#EFEBE4] overflow-hidden flex items-center justify-center relative group p-6 sm:p-8 block border border-[#E5E0D8] shadow-xs"
            >
              <div className="absolute inset-0 bg-[#8E7B6D]/10 pointer-events-none" />
              <div 
                className="w-[86%] h-[86%] bg-cover bg-center rounded-2xl shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85')"
                }}
              />
              <div className="absolute inset-x-8 bottom-8 z-10 flex items-end justify-between text-white p-6 rounded-2xl bg-gradient-to-t from-[#4A3F35]/85 via-[#4A3F35]/40 to-transparent">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-1 font-bold text-[#E5E0D8]">
                    Featured Masterpiece
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white">
                    The Daisy Meadow Tote
                  </h3>
                  <p className="text-xs text-[#E5E0D8]/90 mt-0.5">
                    100% combed cotton • 9 hours of hand needlework
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-[#4A3F35] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          {/* Right Column: Custom Spotlight & Artisan Micro-Cards */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Custom Bouquets Feature */}
            <div className="flex-1 bg-[#B0C4B1]/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-[#B0C4B1]/35 relative">
              <div
                className="w-24 h-24 rounded-full bg-white shadow-sm mb-4 bg-cover bg-center border-2 border-white"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=400&q=80')"
                }}
              />
              <h4 className="font-serif italic text-xl text-[#4A3F35]">
                Custom Bouquets
              </h4>
              <p className="text-[11px] text-[#6B5F54] mt-1.5 px-2 leading-relaxed">
                Everlasting floral stems crafted for weddings, housewarmings, and special rituals.
              </p>
              <Link
                to="/custom-order"
                className="mt-4 text-[10px] uppercase tracking-widest border-b border-[#4A3F35] pb-1 font-bold text-[#4A3F35] hover:opacity-60 transition-opacity"
              >
                Request custom &rarr;
              </Link>
            </div>

            {/* Split Product Teasers */}
            <div className="grid grid-cols-2 gap-3.5">
              <Link
                to="/product/sleepy-bear-plushie"
                className="bg-white rounded-3xl p-4 flex flex-col justify-between border border-[#E5E0D8] hover:border-[#8E7B6D] transition-all group"
              >
                <div
                  className="h-24 bg-[#EFEBE4] rounded-2xl overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=400&q=80')"
                  }}
                />
                <div className="mt-3">
                  <p className="text-[9px] uppercase tracking-wider text-[#8E7B6D] font-bold">
                    Amigurumi
                  </p>
                  <p className="text-xs font-bold text-[#4A3F35] truncate mt-0.5 group-hover:text-[#8E7B6D]">
                    Mini Sleepy Bear
                  </p>
                  <p className="text-xs text-[#4A3F35] font-semibold mt-1">
                    $28.00
                  </p>
                </div>
              </Link>

              <Link
                to="/product/crochet-tulip-stems"
                className="bg-white rounded-3xl p-4 flex flex-col justify-between border border-[#E5E0D8] hover:border-[#8E7B6D] transition-all group"
              >
                <div
                  className="h-24 bg-[#EFEBE4] rounded-2xl overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=400&q=80')"
                  }}
                />
                <div className="mt-3">
                  <p className="text-[9px] uppercase tracking-wider text-[#8E7B6D] font-bold">
                    Botanical
                  </p>
                  <p className="text-xs font-bold text-[#4A3F35] truncate mt-0.5 group-hover:text-[#8E7B6D]">
                    Everlasting Tulips
                  </p>
                  <p className="text-xs text-[#4A3F35] font-semibold mt-1">
                    $38.00
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
