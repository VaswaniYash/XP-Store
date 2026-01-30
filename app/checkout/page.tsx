'use client';

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useCartContext } from "@/components/providers/cart-context";
import { PremiumButton } from "@/components/uiverse/premium-button";
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Lock,
  ChevronRight,
  Wallet,
  Info,
  Check
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { items, total, itemCount } = useCartContext();
  const router = useRouter();
  const { data: session } = useSession();
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

  // Auto-fill user data if logged in
  useEffect(() => {
    if (session?.user) {
      const parts = session.user.name?.split(' ') || [];
      const first = parts[0] || '';
      const last = parts.slice(1).join(' ') || '';
      
      setFormData(prev => ({
        ...prev,
        email: session.user?.email || prev.email,
        firstName: first || prev.firstName,
        lastName: last || prev.lastName
      }));
    }
  }, [session]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      alert("Order successfully placed!");
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
            <nav aria-label="Progress">
              <ol role="list" className="flex items-center">
                <li className={`relative pr-8 sm:pr-20 ${step === 'shipping' ? 'text-primary' : 'text-green-500'}`}>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-primary" />
                  </div>
                  <a href="#" className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90">
                    {step === 'payment' ? <Check className="h-5 w-5" /> : <span>1</span>}
                  </a>
                  <span className="absolute left-0 -bottom-6 text-xs font-semibold uppercase tracking-wider">Shipping</span>
                </li>
                <li className={`relative ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
                   <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-0.5 w-full ${step === 'payment' ? 'bg-primary' : 'bg-border'}`} />
                  </div>
                  <a href="#" className={`relative flex h-8 w-8 items-center justify-center rounded-full ${step === 'payment' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                    <span>2</span>
                  </a>
                  <span className="absolute left-0 -bottom-6 text-xs font-semibold uppercase tracking-wider">Payment</span>
                </li>
              </ol>
            </nav>

            {step === 'shipping' && (
              <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
                {/* Contact Section */}
                <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-bold flex items-center gap-2">
                       <span className="w-1 h-6 bg-primary rounded-full"></span>
                       Contact Information
                     </h2>
                     {!session && (
                       <Link href="/auth/login" className="text-sm text-primary hover:underline font-medium">
                         Already have an account?
                       </Link>
                     )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="you@example.com"
                        className="w-full h-11 rounded-lg bg-background border border-input px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="newsletter" 
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-background" 
                      />
                      <label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer select-none">Email me with news and exclusive offers</label>
                    </div>
                  </div>
                </div>

                {/* Shipping Address Section */}
                <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                     <span className="w-1 h-6 bg-primary rounded-full"></span>
                     Shipping Address
                  </h2>
                  <div className="grid grid-cols-2 gap-5">
                     <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5 ml-1">First Name</label>
                        <input 
                          type="text" 
                          name="firstName"
                          className="w-full h-11 rounded-lg bg-background border border-input px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                     </div>
                     <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5 ml-1">Last Name</label>
                        <input 
                          type="text" 
                          name="lastName"
                          className="w-full h-11 rounded-lg bg-background border border-input px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                     </div>
                     <div className="col-span-2">
                        <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5 ml-1">Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input 
                            type="text" 
                            name="address"
                            placeholder="Street address, apartment, suite, etc."
                            className="w-full h-11 rounded-lg bg-background border border-input pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                     </div>
                     <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5 ml-1">City</label>
                        <input 
                          type="text" 
                          name="city"
                          className="w-full h-11 rounded-lg bg-background border border-input px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                     </div>
                     <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs uppercase font-bold text-muted-foreground mb-1.5 ml-1">ZIP / Postal Code</label>
                        <input 
                          type="text" 
                          name="zip"
                          className="w-full h-11 rounded-lg bg-background border border-input px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          value={formData.zip}
                          onChange={handleInputChange}
                        />
                     </div>
                  </div>
                </div>

                <div className="pt-2">
                  <PremiumButton 
                    text="Continue to Payment"
                    variant="black"
                    onClick={() => setStep('payment')}
                    style={{ width: '100%', height: '56px', fontSize: '1.1rem' }} 
                  />
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                 {/* Review Section */}
                 <div className="bg-card border border-border/50 rounded-2xl overflow-hidden divide-y divide-border/50 shadow-sm">
                    <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact</span>
                          <span className="font-medium text-foreground">{formData.email || 'guest@example.com'}</span>
                       </div>
                       <button onClick={() => setStep('shipping')} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Change</button>
                    </div>
                    <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Ship to</span>
                          <span className="font-medium text-foreground">{formData.address || 'Your Address'}</span>
                       </div>
                       <button onClick={() => setStep('shipping')} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Change</button>
                    </div>
                 </div>

                 {/* Payment Method Section */}
                 <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
                   <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <span className="w-1 h-6 bg-primary rounded-full"></span>
                      Payment Method
                   </h2>
                   <p className="text-sm text-muted-foreground mb-6">All transactions are secure and encrypted.</p>
                   
                   <div className="space-y-4">
                     {/* Credit Card Option */}
                     <label className={`relative flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                       paymentMethod === 'card' 
                         ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-md' 
                         : 'border-border bg-background hover:border-border/80 hover:bg-accent/5'
                     }`}>
                        <div className="flex items-center h-5">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="card" 
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="w-4 h-4 text-primary border-border focus:ring-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                             <span className="font-bold text-foreground">Credit Card</span>
                             <div className="flex gap-1.5 opacity-80">
                                {/* Improved Card Icons Placeholders */}
                                <div className="w-8 h-5 bg-foreground/10 rounded flex items-center justify-center text-[8px] font-bold text-muted-foreground">VISA</div>
                                <div className="w-8 h-5 bg-foreground/10 rounded flex items-center justify-center text-[8px] font-bold text-muted-foreground">MC</div>
                             </div>
                          </div>
                          
                          <div className={`grid grid-cols-2 gap-4 mt-4 transition-all duration-300 overflow-hidden ${paymentMethod === 'card' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="col-span-2">
                                  <input placeholder="Card Number" className="w-full h-11 rounded-lg bg-background border border-input px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50" />
                                </div>
                                <div>
                                  <input placeholder="MM / YY" className="w-full h-11 rounded-lg bg-background border border-input px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50" />
                                </div>
                                <div>
                                  <input placeholder="CVC" className="w-full h-11 rounded-lg bg-background border border-input px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50" />
                                </div>
                          </div>
                        </div>
                     </label>

                     {/* UPI Option */}
                     <label className={`relative flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                       paymentMethod === 'upi' 
                         ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-md' 
                         : 'border-border bg-background hover:border-border/80 hover:bg-accent/5'
                     }`}>
                        <div className="flex items-center h-5">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="upi" 
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                            className="w-4 h-4 text-primary border-border focus:ring-primary"
                          />
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                           <span className="font-bold text-foreground">UPI / Netbanking</span>
                           <Wallet className="w-5 h-5 text-muted-foreground" />
                        </div>
                     </label>
                   </div>
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
