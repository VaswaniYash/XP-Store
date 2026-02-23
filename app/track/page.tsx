'use client';

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PremiumButton } from "@/components/uiverse/premium-button";
import { Package, Truck, Home, CheckCircle2, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense, FormEvent } from "react";

function TrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialAwb = searchParams.get('awb') || '';
  
  const [awbInput, setAwbInput] = useState(initialAwb);
  const [trackingAwb, setTrackingAwb] = useState(initialAwb);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTracking = async (awb: string) => {
      if (!awb) return;
      setLoading(true);
      setError('');
      try {
          const res = await fetch(`/api/track/${awb}`);
          const data = await res.json();
          if (data.success) {
              setStatus(data.data.status);
          } else {
              setError(data.message || 'Tracking number not found');
              setStatus(null);
          }
      } catch (err) {
          setError('Failed to fetch tracking data');
          setStatus(null);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      if (initialAwb) {
          fetchTracking(initialAwb);
      }
  }, [initialAwb]);

  const handleTrackSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!awbInput.trim()) return;
      setTrackingAwb(awbInput);
      router.push(`/track?awb=${awbInput}`);
  };

  const steps = [
      { id: 'Processing', label: 'Processing', icon: Package, date: 'Today, 10:00 AM' },
      { id: 'Shipped', label: 'Shipped', icon: Truck, date: 'Estimated: Tmrw' },
      { id: 'Out for Delivery', label: 'Out for Delivery', icon: Home, date: 'Estimated: 2 Days' },
      { id: 'Delivered', label: 'Delivered', icon: CheckCircle2, date: 'Estimated: 3 Days' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === status);
  const activeStepIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

  return (
      <main className="flex-1 container mx-auto px-4 py-12 lg:py-20 max-w-3xl">
          <div className="text-center mb-12 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                 <Package className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">Track Package</h1>
              <p className="text-muted-foreground mb-8">Enter your Airway Bill (AWB) number to see live updates.</p>
              
              <form onSubmit={handleTrackSubmit} className="max-w-md mx-auto flex gap-3">
                  <div className="relative flex-1">
                      <input 
                         type="text" 
                         value={awbInput}
                         onChange={(e) => setAwbInput(e.target.value)}
                         placeholder="e.g., XP-8A9F2K1M4N"
                         className="w-full h-12 rounded-xl bg-secondary/5 border border-border px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-mono uppercase"
                      />
                  </div>
                  <PremiumButton text="Track" variant="gold" onClick={() => {}} className="h-12" style={{ padding: '0 24px' }} />
              </form>
          </div>

          {loading && (
             <div className="flex justify-center py-12">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
             </div>
          )}

          {error && !loading && trackingAwb && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl p-6 text-center shadow-sm animate-in zoom-in duration-300">
                  <Package className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <h3 className="font-bold text-lg mb-1">{error}</h3>
                  <p className="text-sm opacity-80">Please check the number and try again. It may take up to 24 hours for a new AWB to appear in the system.</p>
              </div>
          )}

          {status && !loading && (
             <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden relative animate-in slide-in-from-bottom-8 duration-700">
                 {/* Decorative Top Banner */}
                 <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>

                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-8 border-b border-border/50">
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-1">Tracking Number</p>
                        <h2 className="font-mono text-xl md:text-2xl font-black text-primary">{trackingAwb.toUpperCase()}</h2>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-1">Current Status</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 font-bold rounded-full">
                           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                           {status}
                        </div>
                    </div>
                 </div>

                 {/* Vertical Timeline */}
                 <div className="relative pl-4 md:pl-8 space-y-12">
                     {/* Connecting Line */}
                     <div className="absolute left-10 md:left-14 top-4 bottom-8 w-1 bg-border/50 rounded-full hidden sm:block"></div>
                     {/* Connecting Line Progress */}
                     <div className="absolute left-10 md:left-14 top-4 w-1 bg-primary rounded-full transition-all duration-1000 hidden sm:block" 
                          style={{ bottom: activeStepIndex === 3 ? '2rem' : activeStepIndex === 2 ? '33%' : activeStepIndex === 1 ? '66%' : 'calc(100% - 2rem)' }}>
                     </div>

                     {steps.map((step, index) => {
                         const isCompleted = index <= activeStepIndex;
                         const isCurrent = index === activeStepIndex;
                         const Icon = step.icon;
                         
                         return (
                             <div key={step.id} className={`relative flex items-center gap-6 sm:gap-10 transition-opacity duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                                 {/* Icon Bubble */}
                                 <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                                     isCompleted 
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                                        : 'bg-secondary/20 text-muted-foreground border-2 border-border border-dashed'
                                 }`}>
                                     <Icon className={`w-5 h-5 ${isCurrent ? 'animate-bounce' : ''}`} />
                                     
                                     {/* Pulse effect for current step */}
                                     {isCurrent && (
                                         <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></span>
                                     )}
                                 </div>

                                 {/* Details */}
                                 <div className="flex-1">
                                     <h4 className={`text-lg font-bold mb-1 ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</h4>
                                     <p className="text-sm text-muted-foreground">{step.date}</p>
                                     {isCurrent && index === 1 && (
                                         <p className="text-xs text-primary mt-2 font-medium bg-primary/10 w-fit px-2 py-1 rounded">Package has left the processing facility.</p>
                                     )}
                                     {isCurrent && index === 2 && (
                                         <p className="text-xs text-primary mt-2 font-medium bg-primary/10 w-fit px-2 py-1 rounded">Package is on the vehicle for delivery today.</p>
                                     )}
                                 </div>
                             </div>
                         );
                     })}
                 </div>

             </div>
          )}
      </main>
  );
}

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
        <TrackingContent />
      </Suspense>
    </div>
  );
}
