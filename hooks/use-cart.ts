import { useState, useEffect } from 'react';
import { Product, CartItem } from '@/lib/types';

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) {
            setItems(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('cart', JSON.stringify(items));
        }
    }, [items, loading]);

    const addToCart = (product: Product, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setItems(prev => prev.map(item =>
            item._id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
        items,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount
    };
}
