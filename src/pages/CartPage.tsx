import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Sparkles, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Heart,
  Tag
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    freeShippingThreshold,
    discount,
    appliedPromoCode,
    applyPromoCode,
    removePromoCode,
    total,
  } = useCart();

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [giftNote, setGiftNote] = useState('');

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen py-20">
        <div className="max-w-xl mx-auto px-6 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#EFEBE4] border border-[#E5E0D8] flex items-center justify-center text-[#4A3F35] mx-auto mb-2">
            <ShoppingBag className="w-9 h-9 stroke-[1.2]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#4A3F35] font-medium">
            Your Studio Basket is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5F54] max-w-sm mx-auto leading-relaxed font-light">
            Discover our small-batch daisy shoulder bags, sweet sculpted amigurumi, and eternal flower bouquets.
          </p>
          <div className="pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4A3F35] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#8E7B6D] transition-colors shadow-xs"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="pb-8 border-b border-[#E5E0D8] flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              Shopping Basket
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#4A3F35] font-medium mt-1">
              Your Selected Handmade Pieces ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#6B5F54] hover:text-[#8E7B6D] underline cursor-pointer"
          >
            Clear Basket
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="my-6 p-5 rounded-3xl bg-[#EFEBE4] border border-[#E5E0D8]">
          <div className="flex items-center justify-between text-xs mb-2.5 font-medium text-[#4A3F35]">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8E7B6D]" />
              {remainingForFreeShip > 0 ? (
                <>Add <strong className="text-[#8E7B6D] font-semibold">${remainingForFreeShip}</strong> more for Free Domestic Tracked Shipping</>
              ) : (
                <span className="text-[#4A3F35] font-semibold">✓ Congratulations! You have unlocked Free Tracked Shipping!</span>
              )}
            </span>
            <span className="text-xs font-semibold text-[#8E7B6D]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#E5E0D8] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#8E7B6D] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart Items Table / List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-8 divide-y divide-[#EFEBE4]">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-2xl border border-[#E5E0D8] bg-[#EFEBE4] shrink-0"
                  />

                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
                      {item.product.category}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-[#4A3F35]">
                      <Link to={`/product/${item.product.slug}`} className="hover:text-[#8E7B6D] transition-colors">
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#6B5F54] font-light">
                      Palette: <span className="font-medium text-[#4A3F35]">{item.selectedColor}</span>
                    </p>
                    <p className="text-xs text-[#4A3F35] font-semibold sm:hidden">
                      ${item.product.price} each
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-[#E5E0D8] rounded-full bg-[#FDFBF7] px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                        className="text-[#6B5F54] hover:text-[#4A3F35] px-1 font-bold text-xs cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#4A3F35]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="text-[#6B5F54] hover:text-[#4A3F35] px-1 font-bold text-xs disabled:opacity-30 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-20">
                      <span className="font-serif text-base font-semibold text-[#4A3F35] block">
                        ${item.product.price * item.quantity}
                      </span>
                      <span className="text-[10px] text-[#6B5F54] font-light">
                        (${item.product.price} ea)
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="p-2 text-[#8E7B6D] hover:text-[#4A3F35] rounded-full hover:bg-[#EFEBE4] transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Note / Studio Packaging Instructions */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E0D8] space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D]">
                Gift Note or Packaging Request
              </label>
              <textarea
                rows={2}
                placeholder="Ordering as a gift? Enter a heartfelt note and we'll handwrite it on a studio botanical card with dried lavender."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35] leading-relaxed"
              />
            </div>
          </div>

          {/* Order Summary & Checkout Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs space-y-5">
              <h3 className="font-serif text-xl font-medium text-[#4A3F35]">
                Order Summary
              </h3>

              {/* Promo Code Form */}
              <div>
                {appliedPromoCode ? (
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#EFEBE4] border border-[#E5E0D8] text-xs">
                    <span className="text-[#4A3F35] font-semibold flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#8E7B6D]" />
                      Promo {appliedPromoCode} applied!
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-[#8E7B6D] font-medium hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-1.5">
                    <div className="flex items-center bg-[#FDFBF7] border border-[#E5E0D8] rounded-full overflow-hidden focus-within:border-[#4A3F35]">
                      <input
                        type="text"
                        placeholder="Promo code (e.g. HANDMADE10)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs text-[#4A3F35] focus:outline-hidden uppercase bg-transparent"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#4A3F35] text-white text-xs font-semibold hover:bg-[#8E7B6D] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-[#A67C52]">{promoError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2.5 text-xs text-[#6B5F54] pt-2 border-t border-[#E5E0D8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#4A3F35] font-medium">${subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#8E7B6D]">
                    <span>Discount ({appliedPromoCode})</span>
                    <span>-${discount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tracked Domestic Shipping</span>
                  <span className="text-[#4A3F35] font-medium">
                    {shipping === 0 ? (
                      <span className="text-[#8E7B6D] font-semibold">FREE</span>
                    ) : (
                      `$${shipping}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#4A3F35] pt-3 border-t border-[#E5E0D8]">
                  <span>Estimated Total</span>
                  <span className="font-serif text-2xl">${total}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                id="btn-proceed-checkout"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-full bg-[#4A3F35] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#8E7B6D] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#6B5F54]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8E7B6D]" />
                <span className="font-light">Protected by 256-bit artisan checkout security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
