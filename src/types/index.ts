export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  collection?: string;
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  details: string[];
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: ProductColor;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    productId: string,
    size: string,
    color: string
  ) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';
