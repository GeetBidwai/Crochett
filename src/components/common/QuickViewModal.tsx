import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Star, Heart, Check, Clock, Shield, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isWishlisted } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activeColor = selectedColor || product.colors[0]?.name || 'Standard';
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, activeColor);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#4A3F35]/40 backdrop-blur-xs transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Container */}
      <div className="relative bg-[#FDFBF7] rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden z-10 border border-[#E5E0D8] animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#4A3F35] flex items-center justify-center shadow-xs transition-colors border border-[#E5E0D8]"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images Section */}
          <div className="p-6 bg-[#EFEBE4] flex flex-col justify-between">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#E5E0D8] relative">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isBestSeller && (
                <span className="absolute top-3 left-3 bg-[#4A3F35] text-[#FDFBF7] text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full">
                  Bestseller
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-14 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#8E7B6D] shadow-xs'
                        : 'border-[#E5E0D8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#FDFBF7]">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-medium text-[#4A3F35]">
                  <Star className="w-3.5 h-3.5 fill-[#A67C52] text-[#A67C52]" />
                  <span>{product.rating}</span>
                  <span className="text-[#6B5F54]">({product.reviewsCount})</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[#4A3F35] mt-1 leading-snug">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-xl font-medium text-[#4A3F35]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs line-through text-[#6B5F54]">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="ml-auto text-xs text-[#8E7B6D] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {product.stock > 0 ? `${product.stock} ready to ship` : 'Made to order'}
                </span>
              </div>

              <p className="text-xs text-[#6B5F54] mt-3 leading-relaxed line-clamp-3 font-light">
                {product.description}
              </p>

              {/* Craft time badge */}
              <div className="mt-4 flex items-center gap-3 text-xs text-[#6B5F54] bg-[#EFEBE4] p-3 rounded-2xl border border-[#E5E0D8]">
                <Clock className="w-4 h-4 text-[#8E7B6D] shrink-0" />
                <span>Requires ~{product.craftTimeHours} hours of focused hand-stitching</span>
              </div>

              {/* Color selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="text-xs font-bold text-[#4A3F35] block mb-2">
                    Select Palette: <span className="font-normal text-[#6B5F54]">{activeColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative flex items-center justify-center p-1 rounded-full border transition-all ${
                          activeColor === color.name
                            ? 'border-[#4A3F35] scale-110'
                            : 'border-transparent hover:scale-105'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-5 h-5 rounded-full shadow-inner border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[#E5E0D8] mt-6 space-y-3">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E5E0D8] rounded-full bg-white px-3 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-[#6B5F54] hover:text-[#4A3F35] p-1 font-medium"
                  >
                    -
                  </button>
                  <span className="w-7 text-center text-xs font-semibold text-[#4A3F35]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="text-[#6B5F54] hover:text-[#4A3F35] p-1 font-medium disabled:opacity-30"
                  >
                    +
                  </button>
                </div>

                {/* Add to Basket Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 rounded-full bg-[#4A3F35] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8E7B6D] transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Add to Studio Basket</span>
                  <span>•</span>
                  <span>${product.price * quantity}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-full border transition-colors ${
                    wishlisted
                      ? 'border-[#8E7B6D] bg-[#8E7B6D]/10 text-[#8E7B6D]'
                      : 'border-[#E5E0D8] hover:border-[#8E7B6D] text-[#4A3F35] bg-white'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#8E7B6D]' : ''}`} />
                </button>
              </div>

              {/* View Full Product Page Link */}
              <Link
                to={`/product/${product.slug}`}
                onClick={closeQuickView}
                className="w-full text-center py-2 text-xs text-[#6B5F54] hover:text-[#4A3F35] flex items-center justify-center gap-1.5 font-medium transition-colors"
              >
                <span>View Complete Craft Details & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
