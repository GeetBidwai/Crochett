import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '+1234567890'; // Representative business number
  const defaultMsg = encodeURIComponent(
    'Hello! I am browsing your crochet boutique (Knot & Bloom) and would love to ask about custom orders and availability.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${defaultMsg}`;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {isOpen && (
        <div className="mb-3 w-72 p-4 rounded-2xl bg-[#FFFFFF] border border-[#EAE2D8] shadow-2xl text-[#2A231F] animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#F4EFEA]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#8F9E8B]/20 text-[#43593F] flex items-center justify-center font-semibold text-xs">
                KB
              </div>
              <div>
                <p className="text-xs font-semibold text-[#2A231F]">Artisan Studio Chat</p>
                <p className="text-[10px] text-[#8F9E8B] flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8F9E8B] animate-pulse"></span>
                  Usually replies within 1 hour
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#6C5E55] hover:text-[#2A231F] p-1 rounded-full hover:bg-[#F4EFEA]"
              aria-label="Close chat bubble"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#6C5E55] mt-2.5 leading-relaxed">
            Have a question about yarn colors, custom sizing, or delivery dates? Chat with Maya directly on WhatsApp!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3.5 flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-medium text-xs shadow-md hover:bg-[#20ba59] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Open WhatsApp Chat
          </a>
        </div>
      )}

      <button
        id="btn-whatsapp-floating"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#2A231F] text-[#FAF7F2] shadow-xl hover:bg-[#3E342E] transition-all hover:scale-105 active:scale-95 group border border-[#443831]"
        aria-label="Chat with the artisan on WhatsApp"
      >
        <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0">
          <MessageCircle className="w-4 h-4" />
        </div>
        <span className="text-xs font-medium tracking-wide pr-1">
          Chat with Artisan
        </span>
      </button>
    </div>
  );
};
