import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Mail, 
  MessageCircle, 
  Instagram, 
  MapPin, 
  Clock, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Question');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setIsSent(true);
      addToast('Your message has been delivered to our studio. Maya will reply shortly!', 'success');
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  const faqs = [
    {
      q: 'How long does a handmade order take to ship?',
      a: 'Items marked "Ready to Ship" dispatch within 1–2 business days. Custom colorways or made-to-order pieces typically require 7–14 days depending on stitch complexity.',
    },
    {
      q: 'Can I wash my crochet bag or plushie?',
      a: 'Yes! We recommend gentle spot cleaning or hand washing in cool water with mild wool wash or baby shampoo. Reshape while damp and lay flat on a clean dry towel. Avoid tumble drying.',
    },
    {
      q: 'Do you ship internationally?',
      a: 'Yes, we ship worldwide via tracked postal carrier. International shipping is calculated at checkout and usually takes 7–12 business days.',
    },
    {
      q: 'Can you match custom colors for wedding bouquets?',
      a: 'Absolutely. Over 60% of our bouquets are custom palette commissions. Please send us your swatch photos through the Custom Orders page or on WhatsApp!',
    },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEBE4] border border-[#E5E0D8] text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D]">
            <Sparkles className="w-3.5 h-3.5 text-[#8E7B6D]" />
            <span>Studio Inquiries</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#4A3F35] font-medium leading-tight">
            We Would Love to Hear from You
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5F54] leading-relaxed font-light">
            Whether you have a question regarding yarn textures, want to check shipping dates, or simply want to say hello, we are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Artisan Channels & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            {/* Prominent WhatsApp Card */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#4A3F35]">
                    Chat with Maya on WhatsApp
                  </h3>
                  <p className="text-xs text-[#6B5F54] font-light">
                    Fastest response for custom inquiries & photos
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#6B5F54] leading-relaxed font-light">
                Prefer chatting directly? Message us anytime with reference photos, questions about yarn colors, or custom sizing requests.
              </p>

              <a
                href="https://wa.me/1234567890?text=Hello%20Maya!%20I%20have%20a%20question%20about%20your%20crochet%20pieces."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-full bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Direct Chat</span>
              </a>
            </div>

            {/* Studio Info List */}
            <div className="p-8 rounded-3xl bg-[#EFEBE4] border border-[#E5E0D8] space-y-4 text-xs">
              <h4 className="font-serif text-base font-medium text-[#4A3F35]">
                Studio Details
              </h4>

              <div className="flex items-start gap-3 text-[#6B5F54]">
                <Mail className="w-4 h-4 text-[#8E7B6D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#4A3F35] block">Email</span>
                  <a href="mailto:hello@knotandbloom.craft" className="hover:text-[#4A3F35] underline">
                    hello@knotandbloom.craft
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#6B5F54]">
                <Instagram className="w-4 h-4 text-[#8E7B6D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#4A3F35] block">Instagram</span>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4A3F35] underline">
                    @knotandbloom.craft
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#6B5F54]">
                <MapPin className="w-4 h-4 text-[#8E7B6D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#4A3F35] block">Studio Location</span>
                  <span className="font-light">Handcrafted Studio in Portland, Oregon (Online Only)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#6B5F54]">
                <Clock className="w-4 h-4 text-[#8E7B6D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#4A3F35] block">Studio Hours</span>
                  <span className="font-light">Monday – Friday: 9:00 AM – 5:00 PM PST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs">
              <h3 className="font-serif text-2xl font-medium text-[#4A3F35] mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-[#6B5F54] mb-6 font-light">
                Fill out the form below and we will respond via email within 24 hours.
              </p>

              {isSent ? (
                <div className="p-8 rounded-3xl bg-[#EFEBE4] border border-[#E5E0D8] text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#4A3F35] mx-auto" />
                  <h4 className="font-serif text-xl text-[#4A3F35]">Thank You for Writing!</h4>
                  <p className="text-xs text-[#6B5F54] max-w-sm mx-auto leading-relaxed font-light">
                    We received your message and look forward to connecting with you.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-6 py-2.5 rounded-full border border-[#E5E0D8] text-xs font-semibold text-[#4A3F35] hover:bg-white transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="maya@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35] cursor-pointer"
                    >
                      <option value="General Question">General Boutique Question</option>
                      <option value="Order Status">Order Status or Tracking</option>
                      <option value="Custom Order Inquiry">Custom Creation Inquiry</option>
                      <option value="Wholesale / Boutique Stockist">Wholesale / Stockist Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="How can we help you today?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35] leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#4A3F35] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#8E7B6D] shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Send Message to Studio</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mt-20 pt-16 border-t border-[#E5E0D8]">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              Got Questions?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#4A3F35] font-medium">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group p-6 rounded-3xl bg-white border border-[#E5E0D8] transition-all open:shadow-xs"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-xs text-[#4A3F35]">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-[#8E7B6D] transition-transform group-open:rotate-180 shrink-0 ml-2" />
                </summary>
                <p className="text-xs text-[#6B5F54] mt-3 leading-relaxed border-t border-[#E5E0D8] pt-3 font-light">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
