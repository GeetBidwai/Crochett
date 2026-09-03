import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { apiService } from '../services/api';
import { OrderPayload } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  ChevronLeft, 
  MessageCircle, 
  Sparkles,
  Banknote
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, shipping, discount, total, appliedPromoCode, clearCart, addToast } = useCart();

  const [formData, setFormData] = useState({
    firstName: 'Emma',
    lastName: 'Watson',
    email: 'emma.watson@example.com',
    phone: '+1 (555) 234-5678',
    address: '42 Blossom Way',
    apartment: 'Apt 4B',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    country: 'United States',
    paymentMethod: 'credit_card', // 'credit_card' | 'whatsapp' | 'cod'
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '08/28',
    cardCvc: '•••',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculatedShipping = shippingMethod === 'express' ? shipping + 12 : shipping;
  const finalTotal = Math.max(0, subtotal - discount + calculatedShipping);

  if (cart.length === 0) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen py-20 text-center px-4">
        <h2 className="font-serif text-3xl text-[#4A3F35] mb-3">Your Basket is Empty</h2>
        <p className="text-xs text-[#6B5F54] mb-6 font-light">There are no pieces in your cart to checkout.</p>
        <Link to="/shop" className="px-6 py-2.5 rounded-full bg-[#4A3F35] text-white text-xs font-semibold hover:bg-[#8E7B6D] transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderPayload: OrderPayload = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          paymentMethod: formData.paymentMethod,
        },
        items: cart.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          color: i.selectedColor,
          quantity: i.quantity,
          price: i.product.price,
          totalPrice: i.product.price * i.quantity,
          image: i.product.images[0],
        })),
        subtotal,
        discount,
        shipping: calculatedShipping,
        total: finalTotal,
        paymentMethod: formData.paymentMethod,
        appliedPromoCode,
      };

      const result = await apiService.createOrder(orderPayload);
      clearCart();
      addToast('Order placed successfully! Confirmation email dispatched.', 'success');
      navigate('/order-success', { state: { order: result } });
    } catch (err) {
      console.error(err);
      addToast('Error processing order. Please try again.', 'warning');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-[#6B5F54] hover:text-[#4A3F35] mb-3 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Shopping Basket</span>
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#4A3F35] font-medium">
              Boutique Checkout
            </h1>
            <div className="flex items-center gap-1 text-xs text-[#8E7B6D]">
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypted Studio Gateway</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Contact Information */}
              <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs space-y-4">
                <h3 className="font-serif text-xl font-medium text-[#4A3F35] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#EFEBE4] text-xs font-bold flex items-center justify-center text-[#4A3F35]">
                    1
                  </span>
                  <span>Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                      Email Address (for order tracking)
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs space-y-4">
                <h3 className="font-serif text-xl font-medium text-[#4A3F35] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#EFEBE4] text-xs font-bold flex items-center justify-center text-[#4A3F35]">
                    2
                  </span>
                  <span>Shipping Address</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                        Apartment, Suite (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.apartment}
                        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                        State & ZIP Code
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                        />
                        <input
                          type="text"
                          required
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Speed Selection */}
                <div className="pt-4 border-t border-[#E5E0D8] space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    Delivery Speed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        shippingMethod === 'standard'
                          ? 'border-[#4A3F35] bg-[#EFEBE4] font-semibold'
                          : 'border-[#E5E0D8] bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="text-[#4A3F35]"
                        />
                        <div>
                          <p className="text-[#4A3F35]">Standard Tracked</p>
                          <p className="text-[10px] text-[#6B5F54] font-light">3–5 Business Days</p>
                        </div>
                      </div>
                      <span className="font-medium text-[#4A3F35]">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                    </label>

                    <label
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        shippingMethod === 'express'
                          ? 'border-[#4A3F35] bg-[#EFEBE4] font-semibold'
                          : 'border-[#E5E0D8] bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="text-[#4A3F35]"
                        />
                        <div>
                          <p className="text-[#4A3F35]">Artisan Priority Express</p>
                          <p className="text-[10px] text-[#6B5F54] font-light">1–2 Business Days</p>
                        </div>
                      </div>
                      <span className="font-medium text-[#4A3F35]">${shipping + 12}</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs space-y-4">
                <h3 className="font-serif text-xl font-medium text-[#4A3F35] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#EFEBE4] text-xs font-bold flex items-center justify-center text-[#4A3F35]">
                    3
                  </span>
                  <span>Payment Method</span>
                </h3>

                <div className="space-y-3">
                  {/* Option 1: Credit Card */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      formData.paymentMethod === 'credit_card'
                        ? 'border-[#4A3F35] bg-[#EFEBE4]'
                        : 'border-[#E5E0D8] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="credit_card"
                        checked={formData.paymentMethod === 'credit_card'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <div>
                        <span className="text-xs font-semibold text-[#4A3F35] block">
                          Credit or Debit Card
                        </span>
                        <span className="text-[10px] text-[#6B5F54] font-light">
                          Visa, Mastercard, Amex, Apple Pay
                        </span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-[#8E7B6D]" />
                  </label>

                  {/* Option 2: WhatsApp / Bank Transfer Direct */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      formData.paymentMethod === 'whatsapp'
                        ? 'border-[#4A3F35] bg-[#EFEBE4]'
                        : 'border-[#E5E0D8] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="whatsapp"
                        checked={formData.paymentMethod === 'whatsapp'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <div>
                        <span className="text-xs font-semibold text-[#4A3F35] block">
                          WhatsApp Pay / Direct Bank Transfer
                        </span>
                        <span className="text-[10px] text-[#6B5F54] font-light">
                          Pay directly with Maya via WhatsApp or Zelle
                        </span>
                      </div>
                    </div>
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </label>

                  {/* Option 3: Cash on Delivery */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#4A3F35] bg-[#EFEBE4]'
                        : 'border-[#E5E0D8] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <div>
                        <span className="text-xs font-semibold text-[#4A3F35] block">
                          Cash on Delivery (COD) / Studio Pickup
                        </span>
                        <span className="text-[10px] text-[#6B5F54] font-light">
                          Pay cash upon receiving your handmade parcel
                        </span>
                      </div>
                    </div>
                    <Banknote className="w-5 h-5 text-[#8E7B6D]" />
                  </label>
                </div>

                {/* Credit card inputs if selected */}
                {formData.paymentMethod === 'credit_card' && (
                  <div className="pt-4 border-t border-[#E5E0D8] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        defaultValue="•••• •••• •••• 4242"
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        defaultValue="08/28"
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1">
                        CVC Code
                      </label>
                      <input
                        type="text"
                        defaultValue="•••"
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Review Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs space-y-4">
                <h3 className="font-serif text-xl font-medium text-[#4A3F35]">
                  Order Items ({cart.length})
                </h3>

                <div className="divide-y divide-[#EFEBE4] max-h-80 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedColor}`} className="py-3 flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-2xl border border-[#E5E0D8] bg-[#EFEBE4] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-[#4A3F35] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#6B5F54] font-light">
                          {item.selectedColor} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-serif font-semibold text-[#4A3F35]">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E5E0D8] space-y-2 text-xs text-[#6B5F54]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#4A3F35] font-medium">${subtotal}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#8E7B6D]">
                      <span>Promo Savings</span>
                      <span>-${discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping ({shippingMethod === 'express' ? 'Priority Express' : 'Standard Tracked'})</span>
                    <span className="text-[#4A3F35] font-medium">
                      {calculatedShipping === 0 ? 'FREE' : `$${calculatedShipping}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-semibold text-[#4A3F35] pt-3 border-t border-[#E5E0D8]">
                    <span>Total Due</span>
                    <span className="font-serif text-2xl">${finalTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  id="btn-place-order"
                  className="w-full py-4 rounded-full bg-[#4A3F35] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#8E7B6D] shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Securing Studio Order...</span>
                  ) : (
                    <>
                      <span>Place Handmade Order • ${finalTotal}</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#6B5F54] text-center leading-relaxed font-light">
                  By clicking Place Order, your parcel is reserved and prepared by hand in our studio.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
