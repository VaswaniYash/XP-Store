'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCartContext } from './cart-context';

export function CartIcon() {
  const { itemCount } = useCartContext();

  return (
    <Link href="/cart">
      <div className="relative">
        <ShoppingCart className="w-6 h-6 text-foreground hover:text-accent transition-colors" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
    </Link>
  );
}
