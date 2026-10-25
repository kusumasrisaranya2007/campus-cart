import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, Order, User, ProductCategory, ShippingAddress } from '../types';
import { FULL_CATALOG } from '../data/fullCatalog';
import { AVAILABLE_COUPONS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  appliedCoupon: Coupon | null;
  orders: Order[];
  user: User | null;
  currentView: string;
  selectedProductId: string | null;
  selectedCategory: ProductCategory;
  searchQuery: string;
  lastOrderId: string | null;
  isAuthModalOpen: boolean;
  toasts: Toast[];
  recentlyViewed: Product[];
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  finalTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  placeOrder: (address: ShippingAddress, paymentMethod: 'upi' | 'cod' | 'campus_card') => Order;
  addProduct: (newProd: Omit<Product, 'id'>) => Product;
  deleteProduct: (id: string) => void;
  updateProductStock: (id: string, newStock: number) => void;
  setView: (view: string, productId?: string) => void;
  setSelectedCategory: (cat: ProductCategory) => void;
  setSearchQuery: (query: string) => void;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  loginUser: (userData: Partial<User>) => void;
  logoutUser: () => void;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_DEMO_USER: User = {
  id: 'usr-demo-1',
  name: 'Aarav Patel',
  email: 'aarav.patel@campus.edu',
  college: 'National Institute of Technology',
  hostel: 'Hostel Block B (Aryabhatta)',
  roomNumber: 'B-304',
  role: 'student',
  verifiedStudent: true,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products list (hydrated with localStorage if seller created items, else FULL_CATALOG)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('campus_cart_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= FULL_CATALOG.length) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return FULL_CATALOG;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('campus_cart_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campus_cart_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['book-01', 'elec-01', 'stat-01'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('campus_cart_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'CC-90214',
        date: '2026-10-22',
        items: [
          {
            product: FULL_CATALOG.find((p) => p.id === 'elec-12') || FULL_CATALOG[2],
            quantity: 1,
          }
        ],
        subtotal: 1395,
        discount: 139,
        couponCode: 'STUDENT10',
        deliveryFee: 0,
        total: 1256,
        shippingAddress: {
          fullName: 'Aarav Patel',
          email: 'aarav.patel@campus.edu',
          phone: '+91 98450 11223',
          college: 'National Institute of Technology',
          hostelBlock: 'Hostel Block B (Aryabhatta)',
          roomNumber: 'B-304',
          deliveryType: 'hostel',
        },
        paymentMethod: 'upi',
        status: 'Delivered',
        estimatedDelivery: 'Delivered to Hostel Room B-304',
      }
    ];
  });

  // User (Only non-sensitive public display data stored in localStorage for demo convenience)
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('campus_cart_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_DEMO_USER;
  });

  // Recently Viewed Products
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('campus_cart_recent');
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        return FULL_CATALOG.filter((p) => ids.includes(p.id)).slice(0, 6);
      }
    } catch {
      // ignore
    }
    return FULL_CATALOG.slice(0, 4);
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem('campus_cart_products', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('campus_cart_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('campus_cart_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('campus_cart_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Persist user (no passwords stored)
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('campus_cart_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('campus_cart_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Toast Helpers
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 499 || appliedCoupon?.freeShipping ? 0 : 40;

  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
      if (appliedCoupon.code === 'CAMPUS20' && discountAmount > 300) {
        discountAmount = 300;
      }
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Added "${product.title.slice(0, 32)}..." to your cart`, 'success');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Helpers
  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      addToast('Removed from your wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      addToast('Saved to your wishlist', 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === trimmed);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try CAMPUS20 or FREESHIP' };
    }
    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Cart subtotal must be at least ₹${found.minOrder} to apply code ${found.code}`,
      };
    }
    setAppliedCoupon(found);
    addToast(`Coupon "${found.code}" applied successfully!`, 'success');
    return { success: true, message: `Applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Order Placement
  const placeOrder = (
    address: ShippingAddress,
    paymentMethod: 'upi' | 'cod' | 'campus_card'
  ): Order => {
    const orderNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `CC-${orderNum}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      deliveryFee,
      total: finalTotal,
      shippingAddress: address,
      paymentMethod,
      status: 'Confirmed',
      estimatedDelivery:
        address.deliveryType === 'hostel'
          ? `Today by 7:30 PM at ${address.hostelBlock} ${address.roomNumber}`
          : 'Today by 5:00 PM at Main Campus Gate Hub',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrderId(newOrder.id);
    clearCart();
    setAppliedCoupon(null);
    setCurrentView('order-success');
    addToast(`Order #${newOrder.id} confirmed!`, 'success');
    return newOrder;
  };

  // Product mutations for seller / admin
  const addProduct = (newProd: Omit<Product, 'id'>): Product => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    addToast('Product listing published on Campus Cart!', 'success');
    return product;
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product listing removed', 'info');
  };

  const updateProductStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, newStock) } : p))
    );
    addToast('Inventory count updated', 'success');
  };

  // Navigation & Product Tracking
  const setView = (view: string, productId?: string) => {
    setCurrentView(view);
    if (productId !== undefined) {
      setSelectedProductId(productId);
      const viewedProd = products.find((p) => p.id === productId);
      if (viewedProd) {
        setRecentlyViewed((prev) => {
          const filtered = prev.filter((p) => p.id !== viewedProd.id);
          const updated = [viewedProd, ...filtered].slice(0, 6);
          try {
            localStorage.setItem('campus_cart_recent', JSON.stringify(updated.map((p) => p.id)));
          } catch {
            // ignore
          }
          return updated;
        });
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth (client-side demo simulation)
  const loginUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: userData.id || `usr-${Date.now()}`,
      name: userData.name || 'Campus Student',
      email: userData.email || 'student@campus.edu',
      college: userData.college || 'National Institute of Technology',
      hostel: userData.hostel || 'Hostel Block B (Aryabhatta)',
      roomNumber: userData.roomNumber || 'B-304',
      role: userData.role || 'student',
      verifiedStudent: true,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
    addToast('Signed out of Campus Cart', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        appliedCoupon,
        orders,
        user,
        currentView,
        selectedProductId,
        selectedCategory,
        searchQuery,
        lastOrderId,
        isAuthModalOpen,
        toasts,
        recentlyViewed,
        cartCount,
        subtotal,
        deliveryFee,
        discountAmount,
        finalTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        applyCoupon,
        removeCoupon,
        placeOrder,
        addProduct,
        deleteProduct,
        updateProductStock,
        setView,
        setSelectedCategory,
        setSearchQuery,
        addToast,
        removeToast,
        loginUser,
        logoutUser,
        setIsAuthModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
