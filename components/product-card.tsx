'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCartContext } from './cart-context';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const platformColors: Record<string, string> = {
  PlayStation: 'bg-blue-600',
  Xbox: 'bg-green-600',
  Nintendo: 'bg-red-500',
  PC: 'bg-purple-600',
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartContext();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Card className="group overflow-hidden border-border hover:border-accent transition-all duration-300 h-full flex flex-col bg-card hover:shadow-lg">
      <Link href={`/product/${product._id}`} className="block w-full aspect-square bg-muted/10">
        <CardHeader className="p-0 overflow-hidden relative w-full h-full">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute top-2 right-2 ${platformColors[product.category] || 'bg-gray-500'} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
            {product.category}
          </div>
        </CardHeader>
      </Link>

      <CardContent className="pt-4 pb-2 flex-1">
        <Link href={`/product/${product._id}`}>
          <h3 className="font-bold text-sm mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-foreground">4.5</span>
          </div>
          <span className="text-xs text-muted-foreground">Action</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 flex flex-col gap-3">
        <div className="text-lg font-bold text-secondary">
          ₹{product.price}
        </div>
        <Button
          onClick={handleAddToCart}
          className={`w-full gap-2 transition-all ${
            added
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-secondary hover:bg-secondary/90'
          } text-secondary-foreground`}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? 'Added!' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
