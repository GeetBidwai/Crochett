import { products } from '../data/products';
import { categories } from '../data/categories';
import { Product, Category, OrderPayload, OrderConfirmationResult, CustomOrderFormData } from '../types';

/**
 * API Service Layer
 * 
 * Configured to serve realistic mock data while mirroring standard REST contracts
 * suitable for immediate drop-in replacement with a Django REST Framework (DRF) backend:
 * 
 * - GET  /api/products/
 * - GET  /api/products/:id/ (or :slug/)
 * - GET  /api/categories/
 * - POST /api/orders/
 * - POST /api/custom-orders/
 */

const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export interface ProductQueryParams {
  category?: string;
  search?: string;
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}

export const apiService = {
  /**
   * Fetch all products with optional filtering and sorting
   */
  async getProducts(params?: ProductQueryParams): Promise<Product[]> {
    if (USE_REAL_API) {
      const query = new URLSearchParams();
      if (params?.category && params.category !== 'all') query.set('category', params.category);
      if (params?.search) query.set('search', params.search);
      if (params?.sortBy) query.set('ordering', params.sortBy);
      if (params?.minPrice !== undefined) query.set('min_price', String(params.minPrice));
      if (params?.maxPrice !== undefined) query.set('max_price', String(params.maxPrice));
      if (params?.inStockOnly) query.set('in_stock', 'true');

      const response = await fetch(`${API_BASE_URL}/products/?${query.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch products from backend');
      return await response.json();
    }

    // Mock API implementation with simulated slight network delay
    await new Promise((resolve) => setTimeout(resolve, 120));

    let result = [...products];

    if (params) {
      if (params.category && params.category !== 'all') {
        result = result.filter(
          (p) => p.category.toLowerCase() === params.category!.toLowerCase()
        );
      }

      if (params.search && params.search.trim() !== '') {
        const term = params.search.toLowerCase().trim();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.materials.some((m) => m.toLowerCase().includes(term)) ||
            p.category.toLowerCase().includes(term)
        );
      }

      if (params.minPrice !== undefined) {
        result = result.filter((p) => p.price >= params.minPrice!);
      }

      if (params.maxPrice !== undefined) {
        result = result.filter((p) => p.price <= params.maxPrice!);
      }

      if (params.inStockOnly) {
        result = result.filter((p) => p.inStock && p.stock > 0);
      }

      if (params.sortBy) {
        switch (params.sortBy) {
          case 'price-low':
            result.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            result.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            result.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
          case 'featured':
          default:
            result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
        }
      }
    }

    return result;
  },

  /**
   * Fetch single product by slug or ID
   */
  async getProductBySlug(slugOrId: string): Promise<Product | null> {
    if (USE_REAL_API) {
      const response = await fetch(`${API_BASE_URL}/products/${slugOrId}/`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch product details');
      }
      return await response.json();
    }

    await new Promise((resolve) => setTimeout(resolve, 80));
    const found = products.find(
      (p) => p.slug === slugOrId || p.id === slugOrId
    );
    return found || null;
  },

  /**
   * Fetch categories list
   */
  async getCategories(): Promise<Category[]> {
    if (USE_REAL_API) {
      const response = await fetch(`${API_BASE_URL}/categories/`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
    return categories;
  },

  /**
   * Submit e-commerce order
   * POST /api/orders/
   */
  async createOrder(payload: OrderPayload): Promise<OrderConfirmationResult> {
    if (USE_REAL_API) {
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Order creation failed on backend');
      return await response.json();
    }

    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate unique artisanal order reference
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `KB-${new Date().getFullYear()}-${randomSuffix}`;

    const confirmation: OrderConfirmationResult = {
      orderId,
      orderNumber: orderId,
      status: 'confirmed',
      orderDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      estimatedDelivery: '3–5 business days (Hand-packaged with care)',
      total: payload.total,
      customer: payload.customer,
      items: payload.items,
    };

    // Store in localStorage for persistence review if desired
    try {
      const pastOrders = JSON.parse(localStorage.getItem('knot_bloom_orders') || '[]');
      pastOrders.unshift({ ...confirmation, payload });
      localStorage.setItem('knot_bloom_orders', JSON.stringify(pastOrders));
    } catch {
      // Ignore local storage error
    }

    return confirmation;
  },

  /**
   * Submit bespoke custom creation request
   * POST /api/custom-orders/
   */
  async createCustomOrder(formData: CustomOrderFormData): Promise<{ requestId: string; message: string }> {
    if (USE_REAL_API) {
      const response = await fetch(`${API_BASE_URL}/custom-orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Custom order request failed on backend');
      return await response.json();
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    const requestId = `BESPOKE-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const customOrders = JSON.parse(localStorage.getItem('knot_bloom_custom_orders') || '[]');
      customOrders.unshift({ requestId, formData, submittedAt: new Date().toISOString() });
      localStorage.setItem('knot_bloom_custom_orders', JSON.stringify(customOrders));
    } catch {
      // Ignore local storage error
    }

    return {
      requestId,
      message: 'Thank you! We have received your bespoke request and will reach out via WhatsApp / Email within 24 hours with yarn swatches and a sketch.',
    };
  },
};
