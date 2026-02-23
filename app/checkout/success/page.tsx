'use client';

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PremiumButton } from "@/components/uiverse/premium-button";
import { CheckCircle2, Package, MapPin, ExternalLink, Hash } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const awb = searchParams.get('awb');
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!orderId || !awb) {
        // router.push('/');
    }
  }, [orderId, awb, router]);

  if (!mounted) return null;

  return (
      <main className="flex-1 container mx-auto px-4 py-16 lg:py-24 max-w-4xl text-center">
        <div className="animate-in zoom-in duration-500 mb-8">
            <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground mb-12">
               Your payment was successful and your order is now being processed.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 animate-in slide-in-from-bottom-8 duration-700">
            {/* Tracking Card */}
            <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <Package className="w-10 h-10 text-primary mb-4" />
                 <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Tracking Number (AWB)</p>
                 <div className="bg-primary/10 border border-primary/20 text-primary font-mono text-xl md:text-2xl py-3 px-6 rounded-xl font-bold mb-6 flex items-center justify-center gap-2">
                    <Hash className="w-5 h-5 opacity-50" />
                    {awb || 'XP-PENDING'}
                 </div>
                 <PremiumButton 
                    text="Track Package" 
                    variant="outline" 
                    icon={<ExternalLink className="w-4 h-4" />}
                    onClick={() => router.push(`/track?awb=${awb}`)}
                 />
            </div>

             {/* Order Details Card */}
             <div className="bg-secondary/5 border border-border/50 rounded-2xl p-8 shadow-sm text-left flex flex-col justify-center">
                 <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                    Order Details
                 </h3>
                 <div className="space-y-4">
                     <div className="flex justify-between items-center border-b border-border/50 pb-4">
                        <span className="text-muted-foreground">Order ID</span>
                        <span className="font-mono text-sm font-medium">#{orderId?.substring(0, 8).toUpperCase() || 'UNKNOWN'}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-border/50 pb-4">
                        <span className="text-muted-foreground">Status</span>
                        <span className="text-orange-500 font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            Processing
                        </span>
                     </div>
                     <div className="flex items-start gap-3 pt-2">
                        <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We will send a shipping confirmation email with your tracking information as soon as your order ships.
                        </p>
                     </div>
                 </div>
             </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in duration-1000 delay-300">
             <PremiumButton 
                text="Continue Shopping" 
                variant="gold" 
                onClick={() => router.push('/games')}
             />
             <PremiumButton 
                text="View Order History" 
                variant="black" 
                onClick={() => router.push('/profile?tab=orders')}
             />
        </div>
      </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
        <SuccessContent />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
