'use client';

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCartContext } from "@/components/cart-context";
import { PremiumButton } from "@/components/uiverse/premium-button";
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Lock,
  ChevronRight,
  Wallet,
  Info
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, itemCount } = useCartContext();
  const router = useRouter();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    saveInfo: true
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      // router.push('/');
    }
  }, [items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const shippingCost = total > 5000 ? 0 : 500;
  const grandTotal = total + shippingCost;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to success page (to be implemented)
      alert("Order Placed Successfully! (This is a demo)");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-foreground">Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Steps Indicator */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-primary' : 'text-green-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                   step === 'shipping' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-green-500/10 text-green-500'
                }`}>
                  {step === 'payment' ? <div className="w-2.5 h-2.5 bg-current rounded-full" /> : "1"}
                </div>
                <span className="font-bold">Shipping</span>
              </div>
              <div className="w-12 h-px bg-border"></div>
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                   step === 'payment' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-secondary/20'
                }`}>
                  2
                </div>
                <span className="font-bold">Payment</span>
              </div>
            </div>

            {step === 'shipping' && (
              <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-black">Contact Information</h2>
                   <Link href="/auth/login" className="text-sm text-primary hover:underline font-medium">
                     Already have an account?
                   </Link>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="you@example.com"
                      className="w-full h-12 rounded-xl bg-secondary/5 border border-border px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="newsletter" 
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary" 
                    />
                    <label htmlFor="newsletter" className="text-sm text-muted-foreground">Email me with news and offers</label>
                  </div>
                </div>

                <div className="h-px bg-border/50 my-6"></div>

                <h2 className="text-2xl font-black">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                   <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        className="w-full h-12 rounded-xl bg-secondary/5 border border-border px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                   </div>
                   <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        className="w-full h-12 rounded-xl bg-secondary/5 border border-border px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                   </div>
                   <div className="col-span-2">
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input 
                          type="text" 
                          name="address"
                          placeholder="123 Gaming Street"
                          className="w-full h-12 rounded-xl bg-secondary/5 border border-border pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                   </div>
                   <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input 
                        type="text" 
                        name="city"
                        className="w-full h-12 rounded-xl bg-secondary/5 border border-border px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                   </div>
                   <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium mb-2">ZIP / Postal Code</label>
                      <input 
                        type="text" 
                        name="zip"
                        className="w-full h-12 rounded-xl bg-secondary/5 border border-border px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        value={formData.zip}
                        onChange={handleInputChange}
                      />
                   </div>
                </div>

                <div className="pt-4">
                  <PremiumButton 
                    text="Continue to Payment"
                    variant="black"
                    onClick={() => setStep('payment')}
                    style={{ width: '100%' }} // temporary style fix if className not enough
                  />
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                 <div className="bg-secondary/5 border border-border rounded-xl p-4 flex items-center justify-between text-sm">
                    <div className="flex flex-col gap-1">
                       <span className="text-muted-foreground">Contact</span>
                       <span className="font-medium">{formData.email || 'guest@example.com'}</span>
                    </div>
                    <button onClick={() => setStep('shipping')} className="text-primary hover:underline">Change</button>
                 </div>
                 <div className="bg-secondary/5 border border-border rounded-xl p-4 flex items-center justify-between text-sm">
                    <div className="flex flex-col gap-1">
                       <span className="text-muted-foreground">Ship to</span>
                       <span className="font-medium">{formData.address || 'Your Address'}</span>
                    </div>
                    <button onClick={() => setStep('shipping')} className="text-primary hover:underline">Change</button>
                 </div>

                 <h2 className="text-2xl font-black mt-8">Payment Method</h2>
                 <p className="text-sm text-muted-foreground mb-4">All transactions are secure and encrypted.</p>
                 
                 <div className="space-y-3">
                   {/* Credit Card Option */}
                   <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                     paymentMethod === 'card' 
                       ? 'border-primary bg-primary/5 ring-1 ring-primary/20' 
                       : 'border-border bg-card hover:border-border/80'
                   }`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="card" 
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                           <span className="font-bold">Credit Card</span>
                           <div className="flex gap-2">
                              {/* Simple card icons */}
                              <div className="w-8 h-5 bg-white/10 rounded"></div>
                              <div className="w-8 h-5 bg-white/10 rounded"></div>
                           </div>
                        </div>
                        {paymentMethod === 'card' && (
                           <div className="grid grid-cols-2 gap-4 mt-4 animate-in fade-in zoom-in duration-300">
                              <div className="col-span-2">
                                <input placeholder="Card Number" className="w-full h-10 rounded-lg bg-background border border-border px-3 text-sm focus:border-primary outline-none" />
                              </div>
                              <div>
                                <input placeholder="MM / YY" className="w-full h-10 rounded-lg bg-background border border-border px-3 text-sm focus:border-primary outline-none" />
                              </div>
                              <div>
                                <input placeholder="CVC" className="w-full h-10 rounded-lg bg-background border border-border px-3 text-sm focus:border-primary outline-none" />
                              </div>
                           </div>
                        )}
                      </div>
                   </label>

                   {/* UPI Option */}
                   <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                     paymentMethod === 'upi' 
                       ? 'border-primary bg-primary/5 ring-1 ring-primary/20' 
                       : 'border-border bg-card hover:border-border/80'
                   }`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="upi" 
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                      <div className="flex-1 flex items-center gap-3">
                         <span className="font-bold">UPI / Netbanking</span>
                         <Wallet className="w-4 h-4 text-muted-foreground" />
                      </div>
                   </label>
                 </div>

                 <div className="pt-6">
                    <PremiumButton 
                        text={isProcessing ? "Processing..." : `Pay ₹${grandTotal.toLocaleString()}`}
                        variant="gold"
                        onClick={handlePlaceOrder}
                        icon={!isProcessing && <Lock className="w-4 h-4" />}
                        disabled={isProcessing}
                    />
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                       <ShieldCheck className="w-3 h-3 text-green-500" />
                       Secure encrypted payment
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
             <div className="bg-secondary/5 border border-border/50 rounded-2xl p-6 lg:p-8 backdrop-blur-sm shadow-xl">
               <h3 className="text-xl font-bold mb-6">Order Summary</h3>
               
               <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
                 {items.length === 0 ? (
                    <p className="text-muted-foreground">Your cart is empty.</p>
                 ) : (
                    items.map((item) => (
                      <div key={item._id} className="flex gap-4">
                         <div className="w-16 h-16 rounded-lg bg-white/5 border border-border/50 p-2 flex-shrink-0 relative">
                             <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                             <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                               {item.quantity}
                             </span>
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                         </div>
                         <div className="font-bold text-sm">
                            ₹{(item.price * item.quantity).toLocaleString()}
                         </div>
                      </div>
                    ))
                 )}
               </div>

               <div className="space-y-3 py-4 border-t border-border/50 text-sm">
                  <div className="flex justify-between">
                     <span className="text-muted-foreground">Subtotal</span>
                     <span className="font-medium">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-muted-foreground">Shipping</span>
                     <span className="font-medium">{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-muted-foreground">Tax (Estimated)</span>
                     <span className="font-medium">₹{(total * 0.18).toLocaleString()}</span>
                  </div>
               </div>

               <div className="flex justify-between items-center py-4 border-t border-border font-black text-xl">
                  <span>Total</span>
                  <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
               </div>
               
               {items.length > 0 && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex gap-3 text-xs text-primary/80 leading-relaxed">
                   <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                   You will earn {Math.floor(grandTotal / 100)} XP points with this order!
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
