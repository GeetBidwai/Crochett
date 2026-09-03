import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  Heart, 
  Send, 
  Instagram, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  Package
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { addToast } = useCart();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      addToast('Welcome to our studio circle! Look out for your 10% welcome code.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FDFBF7] text-[#4A3F35] border-t border-[#E5E0D8]">
      {/* Guarantees / Value Proposition Bar */}
      <div className="border-b border-[#E5E0D8] bg-[#EFEBE4] py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            <div className="flex items-start gap-3.5 justify-center sm:justify-start">
              <div className="w-11 h-11 rounded-2xl bg-white border border-[#E5E0D8] flex items-center justify-center shrink-0 text-[#4A3F35] shadow-xs">
                <Leaf className="w-5 h-5 text-[#B0C4B1]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#4A3F35]">100% Natural Yarns</h4>
                <p className="text-xs text-[#6B5F54] mt-1 leading-relaxed font-light">
                  Pure combed cotton, merino wool, and linen fibers safe for sensitive skin.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 justify-center sm:justify-start">
              <div className="w-11 h-11 rounded-2xl bg-white border border-[#E5E0D8] flex items-center justify-center shrink-0 text-[#4A3F35] shadow-xs">
                <Sparkles className="w-5 h-5 text-[#A67C52]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#4A3F35]">Slow Craftsmanship</h4>
                <p className="text-xs text-[#6B5F54] mt-1 leading-relaxed font-light">
                  Every loop is made by hand with patient needlework, never fast factory machinery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 justify-center sm:justify-start">
              <div className="w-11 h-11 rounded-2xl bg-white border border-[#E5E0D8] flex items-center justify-center shrink-0 text-[#4A3F35] shadow-xs">
                <Package className="w-5 h-5 text-[#4A3F35]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#4A3F35]">Plastic-Free Packaging</h4>
                <p className="text-xs text-[#6B5F54] mt-1 leading-relaxed font-light">
                  Recycled kraft boxes, lavender sprigs, and cotton ribbons ready for thoughtful gifting.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 justify-center sm:justify-start">
              <div className="w-11 h-11 rounded-2xl bg-white border border-[#E5E0D8] flex items-center justify-center shrink-0 text-[#4A3F35] shadow-xs">
                <Truck className="w-5 h-5 text-[#4A3F35]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#4A3F35]">Free Shipping $75+</h4>
                <p className="text-xs text-[#6B5F54] mt-1 leading-relaxed font-light">
                  Complimentary tracked domestic delivery with custom care guide included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-medium text-[#4A3F35] tracking-tight">
                Knot & Bloom
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#8E7B6D] font-bold">
                Artisan Handmade Boutique
              </span>
            </Link>
            <p className="text-xs text-[#6B5F54] leading-relaxed max-w-sm font-light">
              We craft heirloom crochet pieces that bring warmth, botanical whimsy, and soulful tactility to everyday living. Designed and crocheted by hand in small, intentional studio batches.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#EFEBE4] text-[#4A3F35] border border-[#E5E0D8] flex items-center justify-center hover:bg-[#4A3F35] hover:text-[#FDFBF7] transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#EFEBE4] text-[#4A3F35] border border-[#E5E0D8] flex items-center justify-center hover:bg-[#4A3F35] hover:text-white transition-colors"
                aria-label="Artisan WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              Explore
            </h5>
            <ul className="space-y-2 text-xs text-[#6B5F54]">
              <li>
                <Link to="/shop" className="hover:text-[#4A3F35] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#4A3F35] transition-colors">
                  Artisan Lookbook
                </Link>
              </li>
              <li>
                <Link to="/custom-order" className="hover:text-[#4A3F35] transition-colors">
                  Custom Creations
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#4A3F35] transition-colors">
                  Meet the Creator
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#4A3F35] transition-colors">
                  Contact Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              Collections
            </h5>
            <ul className="space-y-2 text-xs text-[#6B5F54]">
              <li>
                <Link to="/shop?category=Crochet Bags" className="hover:text-[#4A3F35] transition-colors">
                  Crochet Bags & Totes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Amigurumi" className="hover:text-[#4A3F35] transition-colors">
                  Sculpted Amigurumi
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Crochet Flowers" className="hover:text-[#4A3F35] transition-colors">
                  Everlasting Flowers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Home Decor" className="hover:text-[#4A3F35] transition-colors">
                  Home Cushions & Coasters
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Clothing" className="hover:text-[#4A3F35] transition-colors">
                  Wearables & Cardigans
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              Studio Letters
            </h5>
            <p className="text-xs text-[#6B5F54] leading-relaxed font-light">
              Receive early access to seasonal batch releases, behind-the-scenes sketches, and 10% off your first order.
            </p>
            {isSubscribed ? (
              <div className="p-3.5 bg-[#EFEBE4] rounded-2xl text-xs text-[#4A3F35] font-medium border border-[#E5E0D8]">
                ✓ You're on our studio list. Thank you!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center bg-white border border-[#E5E0D8] rounded-full overflow-hidden p-1 pl-3 focus-within:border-[#8E7B6D]">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs text-[#4A3F35] focus:outline-hidden bg-transparent placeholder-[#6B5F54]/60"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-[#4A3F35] text-white hover:bg-[#8E7B6D] rounded-full transition-colors shrink-0"
                    aria-label="Subscribe to studio newsletter"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#6B5F54] block pl-2">
                  Never spam. Unsubscribe anytime with one click.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal / Artisan Signature */}
        <div className="pt-12 mt-12 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B5F54] gap-4">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#8E7B6D] fill-[#8E7B6D]" />
            <span>and pure cotton yarn. © {new Date().getFullYear()} Knot & Bloom. All rights reserved.</span>
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/contact" className="hover:text-[#4A3F35]">Care Guide</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#4A3F35]">Shipping & Returns</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#4A3F35]">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
