import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  updateQuantity: (productId: string, selectedColor: string, newQty: number) => void;
  removeFromCart: (productId: string, selectedColor: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shipping: number;
  freeShippingThreshold: number;
  discount: number;
  appliedPromoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  total: number;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Cart Drawer
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (isOpen: boolean) => void;

  // Toast notifications
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 75;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('knot_bloom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('knot_bloom_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('knot_bloom_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage write issues
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('knot_bloom_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = Math.round((subtotal * discountPercent) / 100);

  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 6;

  const total = Math.max(0, subtotal - discount + shipping);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const colorToUse = selectedColor || (product.colors[0]?.name ?? 'Standard');

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === colorToUse
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stock),
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity: Math.min(quantity, product.stock),
            selectedColor: colorToUse,
          },
        ];
      }
    });

    addToast(`Added "${product.name}" (${colorToUse}) to your basket.`, 'success');
  };

  const updateQuantity = (productId: string, selectedColor: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.selectedColor === selectedColor) {
          return {
            ...item,
            quantity: Math.min(newQty, item.product.stock),
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, selectedColor: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
    addToast('Item removed from basket.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromoCode(null);
    setDiscountPercent(0);
  };

  // Promo code
  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HANDMADE10') {
      setAppliedPromoCode('HANDMADE10');
      setDiscountPercent(10);
      addToast('Promo code HANDMADE10 applied! (10% off your order)', 'success');
      return { success: true, message: '10% discount applied!' };
    } else if (clean === 'SPRINGBLOOM') {
      setAppliedPromoCode('SPRINGBLOOM');
      setDiscountPercent(15);
      addToast('Promo code SPRINGBLOOM applied! (15% off your order)', 'success');
      return { success: true, message: '15% discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "HANDMADE10"' };
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
    setDiscountPercent(0);
    addToast('Promo code removed.', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast(`Removed "${product.name}" from your wishlist.`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        addToast(`Saved "${product.name}" to your wishlist.`, 'success');
        return [...prev, product.id];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Quick view
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  // Toasts
  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        discount,
        appliedPromoCode,
        applyPromoCode,
        removePromoCode,
        total,
        wishlist,
        toggleWishlist,
        isWishlisted,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
