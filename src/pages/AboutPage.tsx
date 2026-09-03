import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Scissors, Leaf, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Intro Story Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEBE4] border border-[#E5E0D8] text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D]">
            <Sparkles className="w-3.5 h-3.5 text-[#8E7B6D]" />
            <span>The Artisan's Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#4A3F35] font-medium leading-tight">
            Meet Maya & The Story of Knot & Bloom
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5F54] leading-relaxed font-light">
            A small independent fiber arts studio rooted in slow making, botanical observation, and the enduring human touch of the crochet hook.
          </p>
        </div>

        {/* Creator Portrait & Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <div className="rounded-3xl overflow-hidden bg-white border-4 border-white shadow-xl aspect-4/5 relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Maya, crochet artisan & founder of Knot & Bloom"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl border border-[#E5E0D8] text-center text-xs font-semibold text-[#4A3F35]">
                Maya Lin — Founder & Fiber Artist
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-[#6B5F54] leading-relaxed font-light">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#4A3F35] font-medium">
              How a single spool of cotton yarn changed everything.
            </h2>
            <p>
              I first learned the rhythmic language of the crochet hook during a quiet, misty winter in 2018. Surrounded by digital screens and fast-paced deadlines, holding a simple wooden hook and unbleached cotton skein felt like an anchor. Each loop demanded patience. There was no 'undo' key—only the gentle unwinding of stitches and the mindfulness of beginning again.
            </p>
            <p>
              What started as gifts for dearest friends—daisy bags, comforting little plushies, and everlasting wedding flowers—quickly grew into a community of people who were craving authentic tactile connection in a world increasingly filled with synthetic, mass-produced items.
            </p>
            <p className="italic text-[#4A3F35] font-serif border-l-2 border-[#8E7B6D] pl-4 py-1">
              "Crochet cannot be replicated by factory machines. Every single piece you hold in your hands has been individually guided by a human heart and two hands."
            </p>
          </div>
        </div>

        {/* What Inspires Her */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#EFEBE4] border border-[#E5E0D8] space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              Creative Roots
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#4A3F35] font-medium">
              What Inspires Every Stitch
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs text-[#6B5F54]">
            <div className="p-6 rounded-3xl bg-white space-y-3 border border-[#E5E0D8]">
              <div className="w-9 h-9 rounded-full bg-[#EFEBE4] flex items-center justify-center text-[#B0C4B1]">
                <Leaf className="w-4 h-4 text-[#4A3F35]" />
              </div>
              <h4 className="font-serif font-medium text-[#4A3F35] text-base">Botanical Meadow Life</h4>
              <p className="leading-relaxed font-light">
                Tulips, wild blackberries, chamomile petals, and mossy woodlands inspire our soft earthy colorways and organic shapes.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white space-y-3 border border-[#E5E0D8]">
              <div className="w-9 h-9 rounded-full bg-[#EFEBE4] flex items-center justify-center text-[#8E7B6D]">
                <Sparkles className="w-4 h-4 text-[#8E7B6D]" />
              </div>
              <h4 className="font-serif font-medium text-[#4A3F35] text-base">Heirloom Longevity</h4>
              <p className="leading-relaxed font-light">
                Creating pieces meant to be passed down—whether it's a child's favorite sleepy bunny or a bag that softens with every summer market trip.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white space-y-3 border border-[#E5E0D8]">
              <div className="w-9 h-9 rounded-full bg-[#EFEBE4] flex items-center justify-center text-[#4A3F35]">
                <Scissors className="w-4 h-4 text-[#4A3F35]" />
              </div>
              <h4 className="font-serif font-medium text-[#4A3F35] text-base">Mindful Slow Fashion</h4>
              <p className="leading-relaxed font-light">
                Zero inventory waste. Pieces are either ready-to-ship from micro-batches or crocheted specifically for the collector upon order.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Handmade Process */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              From Hank to Heirloom
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#4A3F35] font-medium">
              The Studio Process
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-[#E5E0D8] flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-[#4A3F35] text-[#FDFBF7] text-xs font-bold flex items-center justify-center shrink-0">
                01
              </span>
              <div className="text-xs space-y-1">
                <h4 className="font-serif font-medium text-base text-[#4A3F35]">Skein Selection & Fiber Inspection</h4>
                <p className="text-[#6B5F54] leading-relaxed font-light">
                  We hand-select combed Turkish cotton, merino wools, and raffia threads with strict standards for softness, dye consistency, and durability.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E5E0D8] flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-[#4A3F35] text-[#FDFBF7] text-xs font-bold flex items-center justify-center shrink-0">
                02
              </span>
              <div className="text-xs space-y-1">
                <h4 className="font-serif font-medium text-base text-[#4A3F35]">Stitch Execution & Tension Balancing</h4>
                <p className="text-[#6B5F54] leading-relaxed font-light">
                  Every round is counted manually to ensure exact symmetry. Bags receive reinforced base corners, and amigurumi plushies receive safety-locked backs.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E5E0D8] flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-[#4A3F35] text-[#FDFBF7] text-xs font-bold flex items-center justify-center shrink-0">
                03
              </span>
              <div className="text-xs space-y-1">
                <h4 className="font-serif font-medium text-base text-[#4A3F35]">Steam Blocking & Hand-Lining</h4>
                <p className="text-[#6B5F54] leading-relaxed font-light">
                  Finished crochet motifs are pinned out on blocking boards and gently steamed to relax fibers into their ideal final drape. Bags are sewn with unbleached organic linen linings.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E5E0D8] flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-[#4A3F35] text-[#FDFBF7] text-xs font-bold flex items-center justify-center shrink-0">
                04
              </span>
              <div className="text-xs space-y-1">
                <h4 className="font-serif font-medium text-base text-[#4A3F35]">Studio Wrapping & Gift Note</h4>
                <p className="text-[#6B5F54] leading-relaxed font-light">
                  Wrapped in recycled tissue paper, sealed with dried lavender sprigs and a handwritten studio card detailing care recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4A3F35] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#8E7B6D] transition-colors shadow-xs"
          >
            <span>Explore the Current Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
