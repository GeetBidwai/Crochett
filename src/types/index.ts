export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  story: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  colors: { name: string; hex: string }[];
  materials: string[];
  dimensions: string;
  stock: number;
  featured: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  craftTimeHours: number;
  careInstructions: string[];
  inStock: boolean;
  reviews?: ProductReview[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'Recent Creations' | 'Custom Orders' | 'Sold Pieces' | 'Behind The Scenes';
  image: string;
  aspectRatio: 'tall' | 'square' | 'wide';
  description: string;
  year: string;
  yarnUsed: string;
  story?: string;
  isSold?: boolean;
  priceEstimate?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  productName: string;
  comment: string;
  rating: number;
  date: string;
}

export interface CustomOrderFormData {
  name: string;
  email: string;
  whatsapp: string;
  productType: string;
  preferredColors: string;
  sizeDimensions: string;
  quantity: number;
  description: string;
  budgetRange: string;
  referenceImageName?: string;
  additionalNotes: string;
  targetDate?: string;
}

export interface OrderItemPayload {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
}

export interface OrderCustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes?: string;
  paymentMethod: string;
}

export interface OrderItemPayload {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image?: string;
  totalPrice?: number;
}

export interface OrderPayload {
  customer: OrderCustomerInfo;
  items: OrderItemPayload[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod?: string;
  appliedPromoCode?: string | null;
}

export interface OrderConfirmationResult {
  orderId: string;
  orderNumber: string;
  status: 'confirmed' | 'pending';
  orderDate: string;
  estimatedDelivery: string;
  total: number;
  customer?: OrderCustomerInfo;
  items?: OrderItemPayload[];
}
