'use client';

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/components/cart-context";
import { products } from "@/lib/products";
import { Star, Truck, ShieldCheck, Heart, Share2, Undo2, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCartContext();
  const [activeTab, setActiveTab] = useState("description");

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => router.push('/consoles')}>Back to Store</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const getThemeColor = () => {
    switch(product.category) {
      case "PlayStation": return "text-blue-500";
      case "Xbox": return "text-green-500";
      case "Nintendo": return "text-red-500";
      default: return "text-primary";
    }
  };

  const getButtonClass = () => {
    switch(product.category) {
      case "PlayStation": return "bg-blue-600 hover:bg-blue-700";
      case "Xbox": return "bg-green-600 hover:bg-green-700";
      case "Nintendo": return "bg-red-600 hover:bg-red-700";
      default: return "bg-primary hover:bg-primary/90";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-black text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-8 hover:bg-transparent hover:text-primary -ml-4"
        >
          <Undo2 className="w-4 h-4 mr-2" />
          Back to List
        </Button>

        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-10 shadow-xl border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Side - Image */}
            <div className="relative group">
              <div className="aspect-square bg-[#F0F2F5] dark:bg-zinc-800/50 rounded-3xl overflow-hidden flex items-center justify-center p-8 relative">
                <img 
                  src={product.image || "/placeholder.svg"} 
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Image Navigation Mock for Carousel */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-xl">‹</span>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-xl">›</span>
                </div>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-2">
                <span className={`text-sm font-bold uppercase tracking-wider ${getThemeColor()}`}>
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">4.8 (124 Reviews)</span>
              </div>

              <div className="flex items-center justify-between mb-8 pb-8 border-b border-border/50">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{(product.price * 1.2).toFixed(0).toLocaleString()}
                  </span>
                </div>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold">
                  In Stock
                </div>
              </div>

              <div className="flex gap-4 mb-10">
                <Button 
                  onClick={handleAddToCart}
                  className={`flex-1 h-14 text-lg font-bold rounded-xl ${getButtonClass()}`}
                >
                  Add to Cart
                </Button>
                <Button variant="outline" className="h-14 w-14 rounded-xl border-2">
                  <Heart className="w-6 h-6" />
                </Button>
                <Button variant="outline" className="h-14 w-14 rounded-xl border-2">
                  <Share2 className="w-6 h-6" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-orange-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold leading-tight max-w-[80px]">Original Product</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600">
                    <Undo2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold leading-tight max-w-[80px]">7 Days Return</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold leading-tight max-w-[80px]">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-purple-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold leading-tight max-w-[80px]">Store Pickup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="mt-16 md:mt-24">
            <div className="flex items-center gap-8 border-b border-border/50 mb-8 overflow-x-auto">
              <button 
                onClick={() => setActiveTab("description")}
                className={`pb-4 text-base font-bold transition-all relative whitespace-nowrap ${activeTab === "description" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Description
                {activeTab === "description" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab("specs")}
                className={`pb-4 text-base font-bold transition-all relative whitespace-nowrap ${activeTab === "specs" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Specifications
                {activeTab === "specs" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 text-base font-bold transition-all relative whitespace-nowrap ${activeTab === "reviews" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Reviews (124)
                {activeTab === "reviews" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
              </button>
            </div>

            <div className="min-h-[200px] text-muted-foreground leading-relaxed">
              {activeTab === "description" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl">
                  <p className="text-lg mb-6">{product.description}</p>
                  <p className="mb-4">
                    Elevate your gaming setup with the {product.name}. Designed for the ultimate performance, 
                    this console delivers breathtaking graphics, lightning-fast load times, and an immersive experience 
                    that puts you at the center of the action. Whether you are a casual player or a competitive gamer, 
                    the {product.name} offers something for everyone.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Next-generation performance and graphics</li>
                    <li>High-speed storage for instant loading</li>
                    <li>Immersive audio technology</li>
                    <li>Backward compatibility with thousands of games</li>
                  </ul>
                </div>
              )}
              
              {activeTab === "specs" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-2xl">
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="font-medium text-foreground">Storage</span>
                      <span>1TB Custom SSD</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="font-medium text-foreground">Resolution</span>
                      <span>Up to 4K 120Hz / 8K Support</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="font-medium text-foreground">Memory</span>
                      <span>16GB GDDR6</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="font-medium text-foreground">Connectivity</span>
                      <span>Wi-Fi 6, Bluetooth 5.1</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="font-medium text-foreground">Ports</span>
                      <span>HDMI 2.1, USB-A, USB-C</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex flex-col gap-6 max-w-3xl">
                    <div className="flex gap-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/20">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                        JD
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-foreground">John Doe</span>
                          <span className="text-xs text-muted-foreground">• 2 days ago</span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                        </div>
                        <p className="text-sm">Absolutely loving this console! The graphics are insane and the loading times are basically non-existent.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/20">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                        AS
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-foreground">Alice Smith</span>
                          <span className="text-xs text-muted-foreground">• 1 week ago</span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                        </div>
                        <p className="text-sm">Best purchase I've made all year. Highly recommend getting the bundle with the extra controller.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
