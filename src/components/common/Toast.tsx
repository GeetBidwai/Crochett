import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#2A231F] text-[#FAF7F2] shadow-xl shadow-[#2A231F]/15 border border-[#443831] animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#8F9E8B] shrink-0 mt-0.5" />
          )}
          {toast.type === 'warning' && (
            <AlertCircle className="w-5 h-5 text-[#E6A078] shrink-0 mt-0.5" />
          )}
          {(!toast.type || toast.type === 'info') && (
            <Info className="w-5 h-5 text-[#D8C7B5] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-sm font-medium leading-snug">
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#D8C7B5] hover:text-[#FAF7F2] p-0.5 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export const Toast = ToastContainer;
