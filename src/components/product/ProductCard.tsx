import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-[#FFFFFF] rounded-3xl border border-[#E5E0D8] overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#8E7B6D]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#EFEBE4]">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 bg-[#4A3F35] text-[#FDFBF7] text-[9px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
              <Sparkles className="w-3 h-3 text-[#E5E0D8]" />
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="inline-block bg-[#B0C4B1] text-[#4A3F35] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
              New Batch
            </span>
          )}
          {product.stock <= 3 && product.stock > 0 && (
            <span className="inline-block bg-[#8E7B6D] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            wishlisted
              ? 'bg-[#FFFFFF] text-[#8E7B6D] shadow-sm'
              : 'bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#4A3F35] shadow-xs'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#8E7B6D]' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-3.5 bottom-3.5 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            className="flex-1 py-2 px-3.5 rounded-full bg-[#FDFBF7]/95 backdrop-blur-xs hover:bg-[#FFFFFF] text-[#4A3F35] text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all border border-[#E5E0D8]"
          >
            <Eye className="w-3.5 h-3.5 text-[#6B5F54]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="p-2.5 rounded-full bg-[#4A3F35] hover:bg-[#8E7B6D] text-white shadow-md transition-colors"
            aria-label="Add to basket"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-[#FFFFFF]">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#4A3F35]">
              <Star className="w-3 h-3 fill-[#A67C52] text-[#A67C52]" />
              <span className="text-[11px] font-semibold">{product.rating}</span>
            </div>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="font-serif text-lg font-medium text-[#4A3F35] hover:text-[#8E7B6D] transition-colors mt-1 line-clamp-1 block"
          >
            {product.name}
          </Link>

          <p className="text-xs text-[#6B5F54] mt-1 line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Colors & Price row */}
        <div className="mt-4 pt-3.5 border-t border-[#E5E0D8]/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {product.colors && product.colors.slice(0, 3).map((col) => (
              <span
                key={col.name}
                className="w-3 h-3 rounded-full border border-black/10"
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            {product.colors && product.colors.length > 3 && (
              <span className="text-[10px] text-[#6B5F54]">+{product.colors.length - 3}</span>
            )}
          </div>

          <div className="flex items-baseline gap-1.5">
            {product.originalPrice && (
              <span className="text-[11px] line-through text-[#6B5F54]/70">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-sm font-bold text-[#4A3F35]">
              ${product.price}
            </span>
          </div>
        </div>

        {/* Mobile-only visible Add-to-Cart bar */}
        <div className="sm:hidden mt-3.5 pt-2">
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2.5 px-3 rounded-full bg-[#EFEBE4] hover:bg-[#E5E0D8] text-[#4A3F35] text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Basket</span>
          </button>
        </div>
      </div>
    </div>
  );
};
