import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    shipping,
    discount,
    total,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#4A3F35]/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#E5E0D8]">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between bg-[#FDFBF7]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#4A3F35]" />
              <h3 className="font-serif text-xl font-medium text-[#4A3F35]">
                Your Studio Basket ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-full text-[#6B5F54] hover:text-[#4A3F35] hover:bg-[#EFEBE4] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#EFEBE4] border-b border-[#E5E0D8]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-[#4A3F35]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
                {remainingForFreeShip > 0 ? (
                  <>Add <strong className="text-[#8E7B6D]">${remainingForFreeShip}</strong> for Free Tracked Shipping</>
                ) : (
                  <span className="text-[#4A3F35] font-semibold">✓ You qualify for Free Domestic Shipping!</span>
                )}
              </span>
              <span className="text-[11px] text-[#6B5F54] font-semibold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#E5E0D8] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#4A3F35] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E5E0D8]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#EFEBE4] flex items-center justify-center text-[#8E7B6D] mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-xl text-[#4A3F35] mb-1">
                  Your basket is currently empty
                </h4>
                <p className="text-xs text-[#6B5F54] max-w-xs mb-6 font-light">
                  Explore our small-batch bags, flowers, and handmade gifts.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-8 py-3 rounded-full bg-[#4A3F35] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8E7B6D] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="py-4 flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-2xl border border-[#E5E0D8] bg-[#EFEBE4]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/product/${item.product.slug}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="text-xs font-semibold text-[#4A3F35] hover:text-[#8E7B6D] transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-[#6B5F54] hover:text-[#8E7B6D] p-0.5 ml-2"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#6B5F54] mt-0.5">
                        Color: <span className="font-medium text-[#4A3F35]">{item.selectedColor}</span>
                      </p>
                      <p className="text-xs font-semibold text-[#4A3F35] mt-1">
                        ${item.product.price}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E5E0D8] rounded-full bg-white px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                          className="text-[#4A3F35] hover:text-[#8E7B6D] p-1"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#4A3F35]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="text-[#4A3F35] hover:text-[#8E7B6D] p-1 disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#4A3F35]">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E5E0D8] bg-[#FFFFFF] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6B5F54]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#4A3F35] font-semibold">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#8E7B6D]">
                    <span>Discount</span>
                    <span>-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tracked Shipping</span>
                  <span className="text-[#4A3F35] font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#4A3F35] pt-2.5 border-t border-[#E5E0D8]">
                  <span>Total</span>
                  <span className="font-serif text-lg font-bold">${total}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-3 rounded-full border border-[#E5E0D8] text-xs uppercase tracking-wider font-semibold text-[#4A3F35] hover:border-[#8E7B6D] transition-all"
                >
                  View Full Bag
                </button>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3 rounded-full bg-[#4A3F35] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8E7B6D] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
