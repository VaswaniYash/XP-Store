'use client';

import React, { createContext, useContext } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/lib/types';

interface CartContextType {
  items: any[];
  loading: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (undefined === context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
}
