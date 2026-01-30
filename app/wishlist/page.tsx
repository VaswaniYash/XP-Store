'use client';

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PremiumButton } from "@/components/uiverse/premium-button";
import { 
  Trash2, 
  ShoppingCart, 
  Heart,
  ArrowRight,
  PackageX
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCartContext } from "@/components/providers/cart-context";
import { products } from "@/lib/products"; // Using mock products for design

export default function WishlistPage() {
  const { addToCart, openCart } = useCartContext();
  // Mocking internal state for now since we don't have a global wishlist context yet
  // We'll take the first 4 products as "wishlisted" items for the demo
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 4));

  const removeFromWishlist = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item._id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-12 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 flex items-center gap-3">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-primary fill-primary/20" />
              Your Wishlist
            </h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <button 
              onClick={clearWishlist}
              className="text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-2 group"
            >
              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Clear all items
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
             <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
               <Heart className="w-10 h-10 text-muted-foreground" />
             </div>
             <h2 className="text-2xl font-bold mb-3">Your wishlist is empty</h2>
             <p className="text-muted-foreground max-w-md mb-8">
               Looks like you haven't added anything to your wishlist yet. 
               Explore our premium collection and save your favorites.
             </p>
             <PremiumButton 
               text="Start Shopping"
               variant="gold"
               className="w-48"
               onClick={() => window.location.href = '/consoles'} // Simple redirect
             />
          </div>
        ) : (
          // Wishlist Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <div 
                key={item._id}
                className="group relative bg-secondary/5 border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Image Area */}
                <div className="aspect-square bg-white/5 p-8 relative overflow-hidden flex items-center justify-center">
                   <img 
                     src={item.image} 
                     alt={item.name}
                     className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                   />
                   
                   {/* Quick Remove Button (Top Right) */}
                   <button 
                     onClick={() => removeFromWishlist(item._id)}
                     className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-red-500/90 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                     title="Remove from wishlist"
                   >
                     <PackageX className="w-4 h-4" />
                   </button>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col gap-4">
                   <div>
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-primary tracking-wider uppercase">{item.category}</span>
                        {item.stock && item.stock < 10 && (
                          <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">
                            Low Stock
                          </span>
                        )}
                     </div>
                     <Link href={`/product/${item._id}`} className="block">
                        <h3 className="font-bold text-lg mb-1 truncate hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                     </Link>
                     <p className="text-xl font-black">
                       ₹{item.price.toLocaleString()}
                     </p>
                   </div>

                   {/* Actions */}
                   <div className="flex flex-col gap-3 mt-auto">
                      <PremiumButton 
                        text="Add to Cart"
                        variant="outline"
                        icon={<ShoppingCart className="w-4 h-4" />}
                        className="h-10 text-sm"
                        onClick={() => {
                          addToCart(item, 1);
                          openCart();
                        }}
                      />
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
