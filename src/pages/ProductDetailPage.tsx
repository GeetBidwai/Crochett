import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/product/ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Check, 
  RefreshCw, 
  Info,
  Layers,
  Scissors
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, setIsCartDrawerOpen } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'care' | 'shipping'>('details');

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProduct = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const found = await apiService.getProductBySlug(slug);
        if (found) {
          setProduct(found);
          setSelectedColor(found.colors[0]?.name || '');
          setActiveImageIndex(0);

          // Fetch related products in same category
          const all = await apiService.getProducts({ category: found.category });
          setRelatedProducts(all.filter((p) => p.id !== found.id).slice(0, 4));
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Failed to load product', err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-16 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#4A3F35] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-24 text-center px-4">
        <h2 className="font-serif text-3xl text-[#4A3F35] mb-3">Product Not Found</h2>
        <p className="text-xs text-[#6B5F54] mb-6 font-light">
          The handmade creation you are looking for may have been archived or sold.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full bg-[#4A3F35] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8E7B6D] transition-colors"
        >
          Return to Boutique Catalogue
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const currentColor = selectedColor || product.colors[0]?.name;

  const handleAddToCart = () => {
    addToCart(product, quantity, currentColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentColor);
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-[#6B5F54] mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#4A3F35] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          <Link to="/shop" className="hover:text-[#4A3F35] transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#4A3F35] transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          <span className="text-[#4A3F35] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#EFEBE4] border border-[#E5E0D8] shadow-xs">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.isBestSeller && (
                  <span className="inline-flex items-center gap-1.5 bg-[#4A3F35] text-[#FDFBF7] text-[10px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#D8C7B5]" />
                    Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="inline-block bg-[#B0C4B1] text-[#4A3F35] text-[10px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full shadow-sm">
                    New Studio Batch
                  </span>
                )}
              </div>

              {/* Wishlist Toggle Overlay */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition-all ${
                  wishlisted
                    ? 'bg-white text-[#A67C52]'
                    : 'bg-white/90 hover:bg-white text-[#4A3F35]'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-[#A67C52]' : ''}`} />
              </button>
            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-[#EFEBE4] border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#4A3F35] shadow-xs'
                        : 'border-[#E5E0D8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* "Handmade with Care" Promise Box */}
            <div className="p-6 rounded-3xl bg-[#EFEBE4] border border-[#E5E0D8] flex items-start gap-4 text-xs text-[#6B5F54]">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 text-[#8E7B6D] shadow-xs border border-[#E5E0D8]">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-medium text-[#4A3F35] text-sm">
                  Handmade with mindful care
                </h4>
                <p className="mt-1 leading-relaxed font-light">
                  Every stitch of this creation was made one-at-a-time by hand. Slight organic variations in stitch tension are the true mark of authentic artisan textile craft.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing & Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#4A3F35] font-semibold">
                  <Star className="w-4 h-4 fill-[#A67C52] text-[#A67C52]" />
                  <span>{product.rating}</span>
                  <span className="text-[#6B5F54] font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#4A3F35] font-medium mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-serif text-2xl sm:text-3xl text-[#4A3F35] font-semibold">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-[#6B5F54]">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="ml-auto text-xs font-semibold text-[#4A3F35] flex items-center gap-1 bg-[#B0C4B1]/30 px-3 py-1 rounded-full border border-[#B0C4B1]/50">
                  <Check className="w-3.5 h-3.5" />
                  {product.stock > 0 ? `${product.stock} in studio stock` : 'Made to order'}
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-[#6B5F54] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Craft Time Stat */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E5E0D8] text-xs text-[#4A3F35]">
              <Clock className="w-4 h-4 text-[#8E7B6D] shrink-0" />
              <span>
                <strong className="font-semibold">Studio Time:</strong> Approx. {product.craftTimeHours} hours of patient hand needlework
              </span>
            </div>

            {/* Color Swatch Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] block mb-2.5">
                  Color Option: <span className="font-semibold normal-case text-[#4A3F35]">{currentColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`group relative flex items-center gap-2 py-1.5 px-3.5 rounded-full border text-xs transition-all ${
                        currentColor === color.name
                          ? 'border-[#4A3F35] bg-white font-semibold text-[#4A3F35] shadow-xs'
                          : 'border-[#E5E0D8] bg-[#EFEBE4] text-[#6B5F54] hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Purchase Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E5E0D8] rounded-full bg-white px-3.5 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-[#6B5F54] hover:text-[#4A3F35] px-1 font-semibold text-sm transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#4A3F35]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="text-[#6B5F54] hover:text-[#4A3F35] px-1 font-semibold text-sm disabled:opacity-30 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Basket Button */}
                <button
                  id="btn-add-to-cart"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#4A3F35] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E7B6D] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket</span>
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                id="btn-buy-now"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-full bg-white border border-[#4A3F35] text-[#4A3F35] text-xs uppercase tracking-widest font-semibold hover:bg-[#4A3F35] hover:text-white transition-colors shadow-xs"
              >
                Buy Now with Instant Checkout
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-[#E5E0D8] grid grid-cols-2 gap-3 text-xs text-[#6B5F54]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8E7B6D]" />
                <span>Tracked shipping in 3–5 days</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8E7B6D]" />
                <span>Plastic-free gift packaging</span>
              </div>
            </div>

            {/* Accordion / Tabbed Details */}
            <div className="pt-6 border-t border-[#E5E0D8] space-y-4">
              {/* Tab navigation */}
              <div className="flex border-b border-[#E5E0D8] text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2.5 mr-6 uppercase tracking-wider transition-colors border-b-2 ${
                    activeTab === 'details'
                      ? 'border-[#4A3F35] text-[#4A3F35]'
                      : 'border-transparent text-[#6B5F54] hover:text-[#4A3F35]'
                  }`}
                >
                  Story & Dimensions
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`pb-2.5 mr-6 uppercase tracking-wider transition-colors border-b-2 ${
                    activeTab === 'materials'
                      ? 'border-[#4A3F35] text-[#4A3F35]'
                      : 'border-transparent text-[#6B5F54] hover:text-[#4A3F35]'
                  }`}
                >
                  Materials Used
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2.5 mr-6 uppercase tracking-wider transition-colors border-b-2 ${
                    activeTab === 'care'
                      ? 'border-[#4A3F35] text-[#4A3F35]'
                      : 'border-transparent text-[#6B5F54] hover:text-[#4A3F35]'
                  }`}
                >
                  Care Guide
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2.5 uppercase tracking-wider transition-colors border-b-2 ${
                    activeTab === 'shipping'
                      ? 'border-[#4A3F35] text-[#4A3F35]'
                      : 'border-transparent text-[#6B5F54] hover:text-[#4A3F35]'
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs text-[#6B5F54] leading-relaxed pt-1">
                {activeTab === 'details' && (
                  <div className="space-y-3">
                    <p className="italic text-[#4A3F35] font-serif text-sm">"{product.story}"</p>
                    <p>
                      <strong className="text-[#4A3F35]">Dimensions:</strong> {product.dimensions}
                    </p>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <ul className="space-y-1.5 list-disc pl-4 font-light">
                    {product.materials.map((mat, i) => (
                      <li key={i}>{mat}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'care' && (
                  <ul className="space-y-1.5 list-disc pl-4 font-light">
                    {product.careInstructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2 font-light">
                    <p>
                      <strong className="font-semibold text-[#4A3F35]">Domestic:</strong> Free tracked shipping on orders over $75 ($6 flat rate otherwise). Delivered in 3–5 business days.
                    </p>
                    <p>
                      <strong className="font-semibold text-[#4A3F35]">Packaging:</strong> Arrives in a reinforced, recyclable kraft box tied with raw cotton twine, with a personalized handwritten thank-you note.
                    </p>
                    <p>
                      <strong className="font-semibold text-[#4A3F35]">Returns:</strong> Because each piece is handmade in small quantities, we accept returns within 14 days of delivery if undamaged in original condition.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-20 pt-16 border-t border-[#E5E0D8]">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#4A3F35] font-medium">
                  Customer Reviews ({product.reviewsCount})
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-[#A67C52]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#4A3F35]">
                    {product.rating} out of 5 stars
                  </span>
                </div>
              </div>

              <button
                onClick={() => alert('Thank you! Reviews can be submitted directly through your post-purchase email verification link.')}
                className="px-6 py-2.5 rounded-full border border-[#E5E0D8] bg-white text-xs font-semibold text-[#4A3F35] hover:border-[#8E7B6D] transition-colors"
              >
                Write a Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="p-6 rounded-3xl bg-white border border-[#E5E0D8] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#4A3F35]">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-[#4A3F35] bg-[#B0C4B1]/30 border border-[#B0C4B1]/40 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Verified Studio Collector
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#6B5F54]">{rev.date}</span>
                    </div>

                    <div className="flex text-[#A67C52]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <h5 className="text-xs font-bold text-[#4A3F35] pt-1">
                      {rev.title}
                    </h5>

                    <p className="text-xs text-[#6B5F54] leading-relaxed font-light">
                      {rev.comment}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-3xl bg-white border border-[#E5E0D8] text-xs text-[#6B5F54]">
                  Be the first to review this small-batch release!
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[#E5E0D8]">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
                  More from this collection
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#4A3F35] font-medium mt-1">
                  You May Also Love
                </h3>
              </div>
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs uppercase tracking-widest font-semibold text-[#4A3F35] hover:text-[#8E7B6D]"
              >
                View all {product.category} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
