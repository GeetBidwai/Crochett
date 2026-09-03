import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ArrowRight, Package, Heart, Sparkles } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen py-24 text-center px-6">
        <h2 className="font-serif text-3xl text-[#4A3F35] mb-3">No Active Order Found</h2>
        <p className="text-xs text-[#6B5F54] mb-6 font-light">
          If you recently placed an order, please check your email for confirmation details.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 rounded-full bg-[#4A3F35] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#8E7B6D] transition-colors"
        >
          Return to Boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xs p-6 sm:p-12 text-center space-y-6">
          {/* Checkmark Icon */}
          <div className="w-16 h-16 rounded-full bg-[#EFEBE4] text-[#8E7B6D] border border-[#E5E0D8] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#8E7B6D] uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thank You for Supporting Handmade</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#4A3F35] font-medium">
              Your Order is Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5F54] max-w-md mx-auto leading-relaxed font-light">
              We have received your order. Maya is currently wrapping your selected creations in our Portland studio with eco-friendly kraft materials.
            </p>
          </div>

          {/* Reference Banner */}
          <div className="p-4 rounded-2xl bg-[#EFEBE4] border border-[#E5E0D8] max-w-md mx-auto text-xs text-[#4A3F35] space-y-1">
            <p><strong>Order Tracking Number:</strong> <span className="font-mono text-[#8E7B6D] font-bold">{order.orderNumber}</span></p>
            <p className="text-[11px] text-[#6B5F54] font-light">
              Confirmation & dispatch updates sent to <strong>{order.customer?.email}</strong>
            </p>
          </div>

          {/* Purchased Items List */}
          <div className="text-left border-t border-b border-[#E5E0D8] py-6 space-y-4">
            <h3 className="font-serif text-lg font-medium text-[#4A3F35]">
              Handcrafted Items Reserved
            </h3>
            <div className="divide-y divide-[#EFEBE4]">
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="py-3 flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl border border-[#E5E0D8]"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#4A3F35] truncate">{item.name}</h4>
                    <p className="text-[11px] text-[#6B5F54] font-light">Color: {item.color} • Qty: {item.quantity}</p>
                  </div>
                  <span className="font-serif text-xs font-semibold text-[#4A3F35]">
                    ${item.totalPrice}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between text-xs font-semibold text-[#4A3F35]">
              <span>Total Paid:</span>
              <span className="font-serif text-lg">${order.total}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/1234567890?text=${encodeURIComponent(`Hi Maya! I just placed order ${order.orderNumber} on Knot & Bloom.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#4A3F35] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#8E7B6D] transition-colors shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Track Order via WhatsApp</span>
            </a>

            <Link
              to="/shop"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#E5E0D8] text-[#4A3F35] text-xs font-semibold uppercase tracking-widest hover:bg-[#EFEBE4] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue Browsing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
