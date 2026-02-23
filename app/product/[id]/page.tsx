'use client';

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useCartContext } from "@/components/providers/cart-context";
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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";

interface Review {
  _id: string;
  user: { name: string; image?: string };
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart, openCart } = useCartContext();
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [liveStock, setLiveStock] = useState<number | null>(null);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const fetchReviews = useCallback(async () => {
    try {
      setLoadingReviews(true);
      const res = await fetch(`/api/reviews/${id}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.data.reviews);
        setAverageRating(data.data.averageRating);
        setTotalReviews(data.data.totalReviews);
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoadingReviews(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
    
    // Fetch live stock
    const fetchStock = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          setLiveStock(data.data.stock);
          if (data.data.stock === 0) setQuantity(0);
        }
      } catch (e) {
        console.error("Failed to fetch stock", e);
      }
    };
    fetchStock();
  }, [fetchReviews, id]);

  const submitReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!session) {
      setReviewError("You must be logged in to review.");
      return;
    }
    setSubmittingReview(true);
    setReviewError("");
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment })
      });
      const data = await res.json();
      if (data.success) {
        setComment("");
        setRating(5);
        fetchReviews(); // Refresh review list
      } else {
        setReviewError(data.message || "Failed to submit review.");
      }
    } catch (err) {
      setReviewError("An error occurred.");
    } finally {
      setSubmittingReview(false);
    }
  };

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

  // Determine actual maximum the user can add (max 10 overall, and constrained by actual stock)
  const currentStock = liveStock !== null ? liveStock : (product.stock || 5);
  const maxBuyable = Math.min(10, currentStock);

  const handleAddToCart = () => {
    if (quantity === 0) return;
    addToCart(product, quantity);
    setIsAdded(true);
    // openCart(); // Removed as per user request to only show button animation
    setTimeout(() => setIsAdded(false), 2000);
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout'); 
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  const getBackLink = () => {
    const source = searchParams.get('source');
    if (source === 'home') return { href: '/', label: 'Back to Home' };
    
    if (product?._id.startsWith('g')) return { href: '/games', label: 'Back to Games' };
    if (product?._id.startsWith('a')) return { href: '/accessories', label: 'Back to Accessories' };
    return { href: '/consoles', label: 'Back to Consoles' };
  };

  const backLink = getBackLink();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
           <BackButton 
             onClick={() => router.push(backLink.href)} 
             label={backLink.label}
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
                  <span className="text-lg font-bold ml-1">{averageRating > 0 ? averageRating.toFixed(1) : "0.0"}</span>
                  <span className="text-muted-foreground text-sm ml-1">({totalReviews} Reviews)</span>
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
               <div className={`inline-flex items-center gap-2 text-sm font-medium ${currentStock > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-red-500'}`}>
                 <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                 {currentStock > 0 ? `Only ${currentStock} units left - Order soon` : 'Out of stock'}
               </div>
            </div>

            {/* Premium Actions with Uiverse Buttons */}
            <div className="space-y-4 mb-8">
               <div className="flex gap-4 h-14">
                  {/* Quantity Counter */}
                  <div className="flex items-center bg-secondary/10 rounded-xl h-full w-36 px-1 border border-transparent hover:border-gold/20 transition-colors">
                     <button 
                       onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                       disabled={currentStock === 0}
                       className="w-10 h-full flex items-center justify-center hover:text-primary transition-colors disabled:opacity-50"
                     >
                       <Minus className="w-4 h-4" />
                     </button>
                     <div className="flex-1 h-full flex items-center justify-center font-bold text-lg">
                       {quantity}
                     </div>
                     <button 
                       onClick={() => quantity < maxBuyable && setQuantity(q => q + 1)}
                       disabled={currentStock === 0 || quantity >= maxBuyable}
                       className="w-10 h-full flex items-center justify-center hover:text-primary transition-colors disabled:opacity-50"
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
               <WishlistButton product={product} />
               <button 
                  onClick={handleShare}
                  className={`flex items-center gap-2 transition-colors ${isCopied ? 'text-green-500 font-bold' : 'hover:text-primary'}`}
               >
                  {isCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {isCopied ? 'Link Copied!' : 'Share Product'}
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
               { id: 'reviews', label: `Reviews (${totalReviews})` }
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
                <div className="max-w-3xl mx-auto py-8">
                   <div className="mb-12">
                     <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                     
                     <div className="bg-secondary/5 border border-border/50 rounded-2xl p-6 md:p-8 flex items-center gap-8 mb-8">
                        <div className="text-center w-32">
                          <div className="text-5xl font-black text-primary mb-2">{averageRating > 0 ? averageRating.toFixed(1) : "0.0"}</div>
                          <div className="flex gap-1 justify-center mb-1">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`} />
                             ))}
                          </div>
                          <div className="text-sm text-muted-foreground mt-2">Based on {totalReviews} reviews</div>
                        </div>
                        <div className="flex-1 hidden md:block border-l border-border/50 pl-8">
                           <p className="text-lg font-medium">Share your thoughts</p>
                           <p className="text-sm text-muted-foreground mb-4">If you've used this product, we'd love to hear about your experience.</p>
                           {!session && (
                               <button onClick={() => router.push('/api/auth/signin')} className="text-sm text-primary hover:underline font-bold">Sign in to write a review</button>
                           )}
                        </div>
                     </div>

                     {session ? (
                       <form onSubmit={submitReview} className="bg-card border border-border rounded-xl p-6 md:p-8 mb-12 shadow-sm">
                         <h4 className="font-bold text-lg mb-6">Write a Review</h4>
                         {reviewError && <div className="p-3 bg-red-500/10 text-red-500 rounded-lg mb-6 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>{reviewError}</div>}
                         <div className="mb-6">
                           <label className="block text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">Overall Rating</label>
                           <div className="flex gap-2">
                             {[1, 2, 3, 4, 5].map((star) => (
                               <button 
                                 type="button" 
                                 key={star} 
                                 onClick={() => setRating(star)}
                                 className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                               >
                                 <Star className={`w-8 h-8 ${rating >= star ? 'fill-primary text-primary' : 'text-muted-foreground/30 hover:text-primary/50'}`} />
                               </button>
                             ))}
                           </div>
                         </div>
                         <div className="mb-6">
                           <label className="block text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">Your Comment</label>
                           <textarea
                             value={comment}
                             onChange={(e) => setComment(e.target.value)}
                             required
                             rows={4}
                             className="w-full bg-background border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                             placeholder="What did you like or dislike about this product?"
                           />
                         </div>
                         <button
                           type="submit"
                           disabled={submittingReview || !comment.trim()}
                           className={`w-full md:w-auto px-8 py-3 rounded-full font-bold transition-all ${submittingReview || !comment.trim() ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95"}`}
                         >
                           {submittingReview ? "Submitting..." : "Submit Review"} 
                         </button>
                       </form>
                     ) : (
                       <div className="bg-gradient-to-br from-secondary/10 to-transparent border border-border rounded-xl p-8 text-center mb-12 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <h4 className="font-bold text-lg mb-2 relative z-10">Join the Community</h4>
                         <p className="text-muted-foreground mb-6 relative z-10">You must be logged in to write a review and share your experience.</p>
                         <PremiumButton text="Login to Review" variant="black" onClick={() => router.push('/api/auth/signin')} className="mx-auto relative z-10" />
                       </div>
                     )}

                     <div className="space-y-6">
                       {loadingReviews ? (
                         <div className="flex items-center justify-center py-12">
                           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                         </div>
                       ) : reviews.length > 0 ? (
                         reviews.map((review) => (
                           <div key={review._id} className="bg-card border border-border/50 rounded-xl p-6 transition-all hover:border-border hover:shadow-sm">
                             <div className="flex items-start justify-between mb-4">
                               <div className="flex items-center gap-4">
                                 {review.user.image ? (
                                   <img src={review.user.image} alt={review.user.name} className="w-12 h-12 rounded-full border border-border object-cover" />
                                 ) : (
                                   <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center font-black text-lg">
                                     {review.user.name.charAt(0).toUpperCase()}
                                   </div>
                                 )}
                                 <div>
                                   <div className="font-bold text-foreground">{review.user.name}</div>
                                   <div className="text-xs text-muted-foreground mt-0.5">{new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                 </div>
                               </div>
                               <div className="flex gap-1 bg-secondary/30 px-3 py-1.5 rounded-full">
                                 {[...Array(5)].map((_, i) => (
                                   <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`} />
                                 ))}
                               </div>
                             </div>
                             <p className="text-muted-foreground leading-relaxed md:pl-16">
                               {review.comment}
                             </p>
                           </div>
                         ))
                       ) : (
                         <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-secondary/5">
                           <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                             <Star className="w-8 h-8 text-primary" />
                           </div>
                           <h4 className="font-bold text-lg mb-2">No reviews yet</h4>
                           <p className="text-muted-foreground">Be the first to review this product and help others make a decision!</p>
                         </div>
                       )}
                     </div>
                   </div>
                </div>
             )}
          </div>
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
