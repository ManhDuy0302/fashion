import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { CartContextType, CartItem } from '../types/index';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.selectedSize === newItem.selectedSize &&
          item.selectedColor.hex === newItem.selectedColor.hex
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        };
        return updatedItems;
      }

      return [...currentItems, newItem];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, size: string, color: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.hex === color
          )
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (quantity < 1) {
        removeFromCart(productId, size, color);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor.hex === color
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
