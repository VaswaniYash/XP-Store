'use client';

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCartContext } from "@/components/cart-context";
import { products } from "@/lib/products";
import { PremiumButton } from "@/components/uiverse/premium-button";
import { WishlistButton } from "@/components/uiverse/wishlist-button";
import { BackButton } from "@/components/uiverse/back-button";
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  Share2, 
  Undo2, 
  ChevronLeft,
  ChevronRight,
  Minus, 
  Plus, 
  CreditCard, 
  Award,
  Package,
  ShoppingBag,
  Zap,
  Check
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, openCart } = useCartContext();
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <PremiumButton 
           text="Back to Store" 
           variant="black"
           onClick={() => router.push('/consoles')} 
           className="w-48"
        />
      </div>
    );
  }

  // Generate related images (Mocking 3 images for the carousel using the main image to ensure relevance)
  const galleryImages = [
    product.image,
    product.image, 
    product.image 
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    // openCart(); // Removed as per user request to only show button animation
    setTimeout(() => setIsAdded(false), 2000);
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout'); 
  };

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
           <BackButton 
             onClick={() => router.push('/consoles')} 
             label="Back to Consoles"
           />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          {/* Left Column: Premium Gallery */}
          <div className="flex gap-6 h-[500px] md:h-[600px]">
             {/* Thumbnails Strip */}
             <div className="flex flex-col gap-4 w-20 flex-shrink-0">
               {galleryImages.map((img, idx) => (
                 <button 
                   key={idx} 
                   onClick={() => setCurrentImageIndex(idx)}
                   className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 relative ${
                     idx === currentImageIndex 
                       ? 'ring-2 ring-primary ring-offset-2 ring-offset-background opacity-100' 
                       : 'opacity-60 hover:opacity-100 border border-transparent hover:border-border'
                   }`}
                 >
                   <img 
                      src={img || "/placeholder.svg"} 
                      alt={`View ${idx + 1}`} 
                      className="w-full h-full object-cover"
                   />
                 </button>
               ))}
             </div>

             {/* Main Image Stage */}
             <div className="flex-1 bg-secondary/5 dark:bg-zinc-900/50 rounded-3xl overflow-hidden flex items-center justify-center border border-border/50 relative group">
                <img 
                  src={galleryImages[currentImageIndex] || "/placeholder.svg"} 
                  alt={product.name}
                  className="w-full h-full object-contain p-8 lg:p-12" 
                />
                
                {/* Navigation Arrows */}
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white hover:border-primary shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white hover:border-primary shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Index Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-medium">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
             </div>
          </div>

          {/* Right Column: Premium Details */}
          <div className="flex flex-col pt-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase rounded-full">
                {product.category}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                SKU: XP-{product._id.substring(0, 4).toUpperCase()}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-none text-foreground">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-8 py-4 border-y border-border/50">
               <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="text-lg font-bold ml-1">4.9</span>
                  <span className="text-muted-foreground text-sm ml-1">(128 Reviews)</span>
               </div>
               <div className="w-px h-6 bg-border"></div>
               <div className="flex items-center gap-2 text-green-500 font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  In Stock
               </div>
            </div>

            <div className="mb-2">
               <span className="text-4xl font-bold text-foreground">
                 ₹{product.price.toLocaleString()}
               </span>
            </div>
            <p className="text-muted-foreground text-sm mb-8">
              Tax included. Shipping calculated at checkout.
            </p>
            
            {/* Hurry Badge */}
            <div className="mb-10">
               <div className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm font-medium">
                 <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                 Only {product.stock || 5} units left - Order soon
               </div>
            </div>

            {/* Premium Actions with Uiverse Buttons */}
            <div className="space-y-4 mb-8">
               <div className="flex gap-4 h-14">
                  {/* Quantity Counter */}
                  <div className="flex items-center bg-secondary/10 rounded-xl h-full w-36 px-1 border border-transparent hover:border-gold/20 transition-colors">
                     <button 
                       onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                       className="w-10 h-full flex items-center justify-center hover:text-primary transition-colors"
                     >
                       <Minus className="w-4 h-4" />
                     </button>
                     <div className="flex-1 h-full flex items-center justify-center font-bold text-lg">
                       {quantity}
                     </div>
                     <button 
                       onClick={() => quantity < 10 && setQuantity(q => q + 1)}
                       className="w-10 h-full flex items-center justify-center hover:text-primary transition-colors"
                     >
                       <Plus className="w-4 h-4" />
                     </button>
                  </div>

                  {/* Add To Cart - Premium Outline */}
                  <PremiumButton 
                    variant={isAdded ? "gold" : "outline"}
                    text={isAdded ? "Added to Cart" : "Add to Cart"}
                    icon={isAdded ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                    onClick={handleAddToCart}
                    className="flex-1"
                  />
               </div>

               {/* Buy Now - Premium Gold */}
               <PremiumButton 
                  variant="gold"
                  text="Buy It Now"
                  icon={<Zap className="w-5 h-5 fill-current" />}
                  onClick={handleBuyNow}
               />
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center justify-center gap-8 mb-8 text-sm font-medium text-muted-foreground">
               <WishlistButton />
               <button className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share Product
               </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 py-8 border-t border-border/50">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-foreground">
                     <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Free Delivery</h4>
                    <p className="text-xs text-muted-foreground">For all orders over ₹5000</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-foreground">
                     <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">2 Year Warranty</h4>
                    <p className="text-xs text-muted-foreground">Full coverage included</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-foreground">
                     <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Secure Payment</h4>
                    <p className="text-xs text-muted-foreground">100% secure checkout</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-foreground">
                     <Undo2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Easy Returns</h4>
                    <p className="text-xs text-muted-foreground">7 days replacement</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Premium Bottom Tabs */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 md:gap-8 border-b border-border mb-12 overflow-x-auto pb-1">
             {[
               { id: 'description', label: 'Description' },
               { id: 'specs', label: 'Specifications' },
               { id: 'inbox', label: 'In The Box' },
               { id: 'reviews', label: 'Reviews (128)' }
             ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-4 text-sm md:text-base font-bold transition-all relative whitespace-nowrap ${
                    activeTab === tab.id 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
             ))}
          </div>

          <div className="min-h-[200px] animate-in slide-in-from-bottom-4 duration-500">
             {activeTab === "description" && (
                <div className="grid md:grid-cols-2 gap-12 text-muted-foreground leading-relaxed">
                   <div>
                      <h3 className="text-foreground text-xl font-bold mb-4">Elevate Your Reality</h3>
                      <p className="mb-6">
                        The {product.name} is engineered for next-level performance. Immersive graphics, 
                        lightning-fast speeds, and a design that commands attention—this is the future of gaming.
                      </p>
                      <p>
                        Every component has been optimized for peak efficiency, ensuring smooth frame rates even 
                        in the most demanding titles. From the sleek exterior to the powerful internals, 
                        excellence is in every detail.
                      </p>
                   </div>
                   <div className="bg-secondary/5 rounded-2xl p-8 flex flex-col justify-center">
                      <h3 className="text-foreground text-lg font-bold mb-4">Key Goals</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                           <span>Uncompromised Performance</span>
                        </li>
                        <li className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                           <span>Stunning Visual Fidelity</span>
                        </li>
                        <li className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                           <span>Seamless Connectivity</span>
                        </li>
                      </ul>
                   </div>
                </div>
             )}

             {activeTab === "specs" && (
               <div className="bg-secondary/5 rounded-2xl p-8 max-w-3xl mx-auto">
                 <div className="space-y-4">
                   <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="font-medium">Processor</span>
                      <span className="text-muted-foreground">Custom Zen 2 8-Core</span>
                   </div>
                   <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="font-medium">GPU</span>
                      <span className="text-muted-foreground">10.28 TFLOPs</span>
                   </div>
                   <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="font-medium">Storage</span>
                      <span className="text-muted-foreground">1TB NVMe SSD</span>
                   </div>
                   <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="font-medium">Connectivity</span>
                      <span className="text-muted-foreground">Standard 802.11ax</span>
                   </div>
                 </div>
               </div>
             )}

             {activeTab === "inbox" && (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Mock Box Contents */}
                  <div className="bg-secondary/5 rounded-xl p-6 text-center border border-border/50 flex flex-col items-center gap-4">
                     <Package className="w-8 h-8 text-primary opacity-80" />
                     <div>
                       <div className="font-medium text-sm">{product.name}</div>
                       <div className="text-xs text-muted-foreground">Console Unit</div>
                     </div>
                  </div>
                  <div className="bg-secondary/5 rounded-xl p-6 text-center border border-border/50 flex flex-col items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">🎮</div>
                     <div>
                       <div className="font-medium text-sm">Controller</div>
                       <div className="text-xs text-muted-foreground">Wireless</div>
                     </div>
                  </div>
                  <div className="bg-secondary/5 rounded-xl p-6 text-center border border-border/50 flex flex-col items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">⚡</div>
                     <div>
                       <div className="font-medium text-sm">Power Cable</div>
                       <div className="text-xs text-muted-foreground">AC Adapter</div>
                     </div>
                  </div>
                  <div className="bg-secondary/5 rounded-xl p-6 text-center border border-border/50 flex flex-col items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">📺</div>
                     <div>
                       <div className="font-medium text-sm">HDMI</div>
                       <div className="text-xs text-muted-foreground">High Speed</div>
                     </div>
                  </div>
               </div>
             )}

             {activeTab === "reviews" && (
                <div className="max-w-3xl mx-auto text-center py-12 text-muted-foreground">
                   <Star className="w-12 h-12 text-primary/20 mx-auto mb-4" />
                   <p>Reviews functionality is being upgraded.</p>
                </div>
             )}
          </div>
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
