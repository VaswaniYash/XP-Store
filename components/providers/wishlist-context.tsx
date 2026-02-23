'use client';

import React, { createContext, useContext } from 'react';
import { useWishlist } from '@/hooks/use-wishlist';
import { Product } from '@/lib/types';

interface WishlistContextType {
  wishlistItems: Product[];
  loading: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const wishlist = useWishlist();
  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (undefined === context) {
    throw new Error('useWishlistContext must be used within WishlistProvider');
  }
  return context;
}
