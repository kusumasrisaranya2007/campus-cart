export type ProductCategory =
  | 'all'
  | 'books'
  | 'textbooks'
  | 'electronics'
  | 'engineering'
  | 'lab'
  | 'stationery'
  | 'essentials'
  | 'hostel'
  | 'fashion'
  | 'fitness'
  | 'art'
  | 'secondhand'
  | 'snacks';

export type ProductCondition = 'New' | 'Like New' | 'Used';

export interface ProductSeller {
  name: string;
  hostel: string;
  department: string;
  year?: string;
  phone?: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  condition: ProductCondition;
  price: number;
  originalPrice: number;
  rating: number;
  ratingCount: number;
  stock: number;
  isSecondHand: boolean;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  brand?: string;
  department?: string;
  badge?: string;
  seller?: ProductSeller;
  featured?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
  isDeal?: boolean;
  dealEndsInHours?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrder: number;
  description: string;
  freeShipping?: boolean;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  hostelBlock: string;
  roomNumber: string;
  deliveryType: 'hostel' | 'gate';
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'upi' | 'cod' | 'campus_card';
  status: 'Confirmed' | 'Packed at Campus Hub' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  hostel: string;
  roomNumber: string;
  role: 'student' | 'seller' | 'admin';
  verifiedStudent: boolean;
}
