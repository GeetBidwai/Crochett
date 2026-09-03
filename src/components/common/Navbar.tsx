import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cartCount, wishlist, setIsCartDrawerOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Lookbook', path: '/gallery' },
    { name: 'Custom Orders', path: '/custom-order' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Boutique Announcement Ribbon */}
      <div className="bg-[#4A3F35] text-[#FDFBF7] text-[11px] sm:text-xs py-2 px-4 text-center tracking-widest font-light flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#B0C4B1] animate-pulse" />
        <span>
          Handmade with care <span className="opacity-40 mx-1.5">•</span> Global Artisan Delivery over $75 <span className="opacity-40 mx-1.5">•</span> Code <strong className="font-medium text-[#E5E0D8]">HANDMADE10</strong> for 10% off
        </span>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-xs border-b border-[#E5E0D8]'
            : 'bg-[#FDFBF7] border-b border-[#E5E0D8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                id="btn-mobile-menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 rounded-lg text-[#4A3F35] hover:bg-[#EFEBE4] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link to="/" className="group flex flex-col items-start">
                <span className="font-serif text-2xl sm:text-3xl tracking-tighter italic font-medium text-[#4A3F35] group-hover:opacity-75 transition-opacity">
                  Knot & Bloom
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#8E7B6D] -mt-1 font-sans">
                  Artisan Studio
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-widest font-semibold transition-opacity py-1 border-b-2 ${
                      isActive
                        ? 'text-[#4A3F35] border-[#4A3F35]'
                        : 'text-[#4A3F35] border-transparent hover:opacity-60'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Toggle */}
              <div className="relative">
                {searchOpen ? (
                  <form
                    onSubmit={handleSearchSubmit}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-64 sm:w-72 flex items-center bg-[#FFFFFF] border border-[#E5E0D8] rounded-full shadow-lg px-3 py-1.5 z-40"
                  >
                    <Search className="w-4 h-4 text-[#6B5F54] shrink-0 mr-2" />
                    <input
                      type="text"
                      placeholder="Search bags, flowers, plushies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full text-xs text-[#4A3F35] focus:outline-hidden bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="text-[#6B5F54] hover:text-[#4A3F35] p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <button
                    id="btn-search-toggle"
                    onClick={() => setSearchOpen(true)}
                    className="p-2 rounded-full text-[#4A3F35] hover:bg-[#EFEBE4] transition-colors"
                    aria-label="Search crochet products"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Wishlist Link */}
              <Link
                to="/shop?filter=wishlist"
                id="btn-nav-wishlist"
                className="relative p-2 rounded-full text-[#4A3F35] hover:bg-[#EFEBE4] transition-colors"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#8E7B6D] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Drawer Trigger */}
              <button
                id="btn-nav-cart"
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center gap-2 py-2 px-3.5 rounded-full bg-[#EFEBE4] hover:bg-[#E5E0D8] text-[#4A3F35] border border-[#E5E0D8] transition-all"
                aria-label={`Shopping bag containing ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#4A3F35]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#8E7B6D] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline text-xs font-semibold uppercase tracking-widest">
                  Basket
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[113px] z-50 bg-[#4A3F35]/40 backdrop-blur-xs flex">
            <div className="w-4/5 max-w-sm bg-[#FDFBF7] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-r border-[#E5E0D8]">
              <div>
                <div className="pb-4 mb-4 border-b border-[#E5E0D8]">
                  <p className="text-xs uppercase tracking-widest text-[#8E7B6D] mb-2 font-bold">
                    Artisan Catalogue
                  </p>
                  <form onSubmit={handleSearchSubmit} className="relative mt-2">
                    <input
                      type="text"
                      placeholder="Search bags, amigurumi..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#E5E0D8] rounded-full px-3.5 py-2 text-xs text-[#4A3F35] pr-8 focus:outline-hidden focus:border-[#4A3F35]"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5F54]"
                    >
                      <Search className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-2.5 px-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-colors ${
                          isActive
                            ? 'bg-[#EFEBE4] text-[#4A3F35]'
                            : 'text-[#6B5F54] hover:bg-[#EFEBE4] hover:text-[#4A3F35]'
                        }`
                      }
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Mobile Drawer Bottom Info */}
              <div className="pt-6 border-t border-[#E5E0D8] text-xs text-[#6B5F54] space-y-3">
                <div className="p-4 bg-[#EFEBE4] rounded-2xl border border-[#E5E0D8]">
                  <p className="font-serif italic text-base text-[#4A3F35]">Have a custom idea?</p>
                  <p className="text-[11px] text-[#6B5F54] mt-1 leading-relaxed">
                    We take bespoke commissions for weddings, bouquets, and heirloom gifts.
                  </p>
                  <Link
                    to="/custom-order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-3 inline-block text-[10px] uppercase tracking-widest font-bold border-b border-[#4A3F35] pb-0.5 text-[#4A3F35] hover:opacity-70"
                  >
                    Request custom piece &rarr;
                  </Link>
                </div>
                <div className="text-center text-[10px] text-[#8E7B6D] flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B0C4B1] animate-pulse"></span>
                  <span>Available for new commissions</span>
                </div>
              </div>
            </div>

            {/* Click outside to close */}
            <div
              className="flex-1"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu overlay"
            />
          </div>
        )}
      </header>
    </>
  );
};
