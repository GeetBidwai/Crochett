import React, { useState } from 'react';
import { apiService } from '../services/api';
import { CustomOrderFormData } from '../types';
import { useCart } from '../context/CartContext';
import { 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  Send, 
  Clock, 
  Palette, 
  MessageCircle, 
  FileText, 
  X, 
  ArrowRight 
} from 'lucide-react';

export const CustomOrderPage: React.FC = () => {
  const { addToast } = useCart();

  const [formData, setFormData] = useState<CustomOrderFormData>({
    name: '',
    email: '',
    whatsapp: '',
    productType: 'Crochet Bag',
    preferredColors: '',
    sizeDimensions: '',
    quantity: 1,
    description: '',
    budgetRange: '$50 - $100',
    referenceImageName: '',
    additionalNotes: '',
    targetDate: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{ requestId: string; message: string } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFormData((prev) => ({ ...prev, referenceImageName: file.name }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, referenceImageName: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      addToast('Please fill in all required fields (Name, Email, Description).', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.createCustomOrder(formData);
      setSubmittedResult(res);
      addToast('Custom creation request sent successfully!', 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      addToast('Failed to submit custom order request. Please try again.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Intro */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFEBE4] border border-[#E5E0D8] text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D]">
            <Sparkles className="w-3.5 h-3.5 text-[#8E7B6D]" />
            <span>Bespoke Studio Commissions</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#4A3F35] font-medium leading-tight">
            Have Something Special in Mind?
          </h1>

          <p className="text-xs sm:text-sm text-[#6B5F54] leading-relaxed font-light">
            Whether you envision a bridal bouquet matching your bridesmaid palettes, a miniature crochet replica of a family pet, or an heirloom tapestry blanket, Maya will handcraft your vision with authentic fiber artistry.
          </p>
        </div>

        {/* 4-Step Process Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="p-5 rounded-3xl bg-white border border-[#E5E0D8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#EFEBE4] text-xs font-bold flex items-center justify-center text-[#4A3F35]">
              1
            </span>
            <h4 className="text-xs font-semibold text-[#4A3F35]">Share Your Idea</h4>
            <p className="text-[11px] text-[#6B5F54] leading-relaxed font-light">
              Submit the form below with your desired palette, proportions, and timeline.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E5E0D8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#EFEBE4] text-xs font-bold flex items-center justify-center text-[#4A3F35]">
              2
            </span>
            <h4 className="text-xs font-semibold text-[#4A3F35]">Yarn & Swatch Chat</h4>
            <p className="text-[11px] text-[#6B5F54] leading-relaxed font-light">
              Maya connects via WhatsApp/Email to confirm skein colors and initial sketches.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E5E0D8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#EFEBE4] text-xs font-bold flex items-center justify-center text-[#4A3F35]">
              3
            </span>
            <h4 className="text-xs font-semibold text-[#4A3F35]">Hand-Stitching</h4>
            <p className="text-[11px] text-[#6B5F54] leading-relaxed font-light">
              Your piece is crocheted by hand in our studio with progress updates sent along the way.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E5E0D8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#EFEBE4] text-xs font-bold flex items-center justify-center text-[#4A3F35]">
              4
            </span>
            <h4 className="text-xs font-semibold text-[#4A3F35]">Approval & Delivery</h4>
            <p className="text-[11px] text-[#6B5F54] leading-relaxed font-light">
              Review high-res photos before shipping. Packaged plastic-free with tracked delivery.
            </p>
          </div>
        </div>

        {/* Success Confirmation State */}
        {submittedResult ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#EFEBE4] text-[#8E7B6D] flex items-center justify-center mx-auto border border-[#E5E0D8]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7B6D]">
              Commission Request Submitted
            </span>

            <h2 className="font-serif text-3xl text-[#4A3F35] font-medium">
              We Can’t Wait to Create This for You
            </h2>

            <p className="text-xs sm:text-sm text-[#6B5F54] max-w-lg mx-auto leading-relaxed font-light">
              {submittedResult.message}
            </p>

            <div className="inline-block p-4 bg-[#EFEBE4] rounded-2xl border border-[#E5E0D8] text-xs text-[#4A3F35] text-left max-w-md mx-auto">
              <p><strong>Studio Reference ID:</strong> <span className="font-mono text-[#8E7B6D] font-bold">{submittedResult.requestId}</span></p>
              <p className="mt-1 text-[#6B5F54] font-light">A copy has been logged to our studio desk. Feel free to message Maya on WhatsApp referencing this ID anytime.</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/1234567890?text=${encodeURIComponent(`Hi Maya! I just submitted bespoke inquiry ${submittedResult.requestId} on Knot & Bloom.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#4A3F35] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#8E7B6D] transition-colors shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Maya on WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setSubmittedResult(null);
                  setFormData({
                    name: '',
                    email: '',
                    whatsapp: '',
                    productType: 'Crochet Bag',
                    preferredColors: '',
                    sizeDimensions: '',
                    quantity: 1,
                    description: '',
                    budgetRange: '$50 - $100',
                    referenceImageName: '',
                    additionalNotes: '',
                    targetDate: '',
                  });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#E5E0D8] text-[#4A3F35] text-xs font-semibold hover:bg-[#EFEBE4] transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Custom Order Form */
          <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xs p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    Your Name <span className="text-[#A67C52]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Clara Oswald"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    Email Address <span className="text-[#A67C52]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="clara@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                  />
                </div>
              </div>

              {/* Row 2: Product Type & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    Product Type
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                  >
                    <option value="Crochet Bag">Crochet Bag / Tote</option>
                    <option value="Amigurumi Plushie">Amigurumi Plushie / Keepsake</option>
                    <option value="Everlasting Bouquet">Everlasting Flower Bouquet</option>
                    <option value="Home Decor">Home Decor (Cushion, Coasters)</option>
                    <option value="Wearable Cardigan">Wearable Garment / Cardigan</option>
                    <option value="Other">Other Bespoke Textile Idea</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    Target Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                  >
                    <option value="Under $50">Under $50</option>
                    <option value="$50 - $100">$50 – $100</option>
                    <option value="$100 - $200">$100 – $200</option>
                    <option value="$200+">$200+ (Grand bouquet or garment)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, Number(e.target.value)) })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                  />
                </div>
              </div>

              {/* Row 3: Colors & Proportions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    Preferred Colors / Palette
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sage green, cream, burnt sienna, dusty pink..."
                    value={formData.preferredColors}
                    onChange={(e) => setFormData({ ...formData, preferredColors: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    Approximate Size / Dimensions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 30cm x 30cm or 'To fit 13-inch laptop'"
                    value={formData.sizeDimensions}
                    onChange={(e) => setFormData({ ...formData, sizeDimensions: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                  />
                </div>
              </div>

              {/* Row 4: Detailed Description */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                  Describe Your Vision <span className="text-[#A67C52]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about what you want made! Any specific stitches, flower species, motifs, or special occasions (birthday, wedding, anniversary) this piece is meant to celebrate?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35] leading-relaxed"
                />
              </div>

              {/* Row 5: Reference Image Upload */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                  Reference Photo or Color Swatch (Optional)
                </label>

                {imagePreview ? (
                  <div className="relative inline-block border border-[#E5E0D8] rounded-2xl overflow-hidden p-2 bg-[#EFEBE4]">
                    <img
                      src={imagePreview}
                      alt="Reference preview"
                      className="w-40 h-40 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removeUploadedImage}
                      className="absolute top-3 right-3 p-1 rounded-full bg-[#4A3F35] text-white hover:bg-[#8E7B6D] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[10px] text-[#6B5F54] mt-1.5 px-1 truncate max-w-40 font-light">
                      {formData.referenceImageName}
                    </p>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E5E0D8] rounded-3xl cursor-pointer hover:bg-[#EFEBE4] transition-colors">
                    <Upload className="w-6 h-6 text-[#8E7B6D] mb-2" />
                    <span className="text-xs font-medium text-[#4A3F35]">
                      Click or drag reference photo here
                    </span>
                    <span className="text-[10px] text-[#6B5F54] mt-0.5 font-light">
                      PNG, JPG, or WEBP up to 10MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Row 6: Needed By Date & Additional Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    Target Needed-By Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E7B6D] mb-2">
                    Additional Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Packaging note, gift recipient's name..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] text-xs text-[#4A3F35] focus:outline-hidden focus:border-[#4A3F35]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="btn-submit-custom-order"
                  className="w-full py-4 rounded-full bg-[#4A3F35] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#8E7B6D] shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting to Studio Desk...</span>
                  ) : (
                    <>
                      <span>Request a Custom Creation</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#6B5F54] mt-2.5 font-light">
                  Submitting an inquiry does not require payment upfront. Maya will discuss yarn swatches with you first!
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
