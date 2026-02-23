import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';

export function useWishlist() {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('wishlist');
        if (stored) {
            setWishlistItems(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, loading]);

    const addToWishlist = (product: Product) => {
        setWishlistItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setWishlistItems(prev => prev.filter(item => item._id !== productId));
    };

    const clearWishlist = () => setWishlistItems([]);

    const isInWishlist = (productId: string) => {
        return wishlistItems.some(item => item._id === productId);
    };

    return {
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist
    };
}
