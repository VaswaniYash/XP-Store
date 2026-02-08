"use client";

import React from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProductCard } from "@/components/products/product-card";
import { Product } from "@/lib/types";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Gamepad2, Tv, Zap, Trophy } from "lucide-react";

import { products } from "@/lib/products";

const allConsoles = products.filter(p => !p._id.startsWith('g') && !p._id.startsWith('a'));

const categories = [
  { id: "All", label: "All Consoles", icon: Gamepad2 },
  { id: "PlayStation", label: "PlayStation", icon: Tv },
  { id: "Xbox", label: "Xbox", icon: Zap },
  { id: "Nintendo", label: "Nintendo", icon: Trophy },
];

// Memoize banner configurations
const bannerConfigs = {
  PlayStation: {
    image: "/Images/product-1.webp",
    title: "PLAYSTATION 5",
    subtitle: "Play Has No Limits",
    description: "Experience the power of next-gen gaming with lightning-fast SSD, haptic feedback, and stunning 4K graphics.",
    indicatorColor: "bg-blue-500",
    bgGradient: "from-blue-600/90 via-blue-500/20 to-background dark:from-blue-950 dark:via-blue-900/40 dark:to-background"
  },
  Xbox: {
    image: "/Images/product-2.webp",
    title: "XBOX SERIES X",
    subtitle: "Power Your Dreams",
    description: "The fastest, most powerful Xbox ever. Play thousands of games across four generations with Game Pass.",
    indicatorColor: "bg-green-500",
    bgGradient: "from-green-600/90 via-green-500/20 to-background dark:from-green-950 dark:via-green-900/40 dark:to-background"
  },
  Nintendo: {
    image: "/Images/product-3.webp",
    title: "NINTENDO SWITCH",
    subtitle: "Play Anytime, Anywhere",
    description: "Play at home or on the go with the versatile Nintendo Switch. Experience gaming freedom like never before.",
    indicatorColor: "bg-red-500",
    bgGradient: "from-red-600/90 via-red-500/20 to-background dark:from-red-950 dark:via-red-900/40 dark:to-background"
  },
  All: {
    image: "/Images/slide-1.webp",
    title: "NEXT-GEN GAMING",
    subtitle: "Choose Your Platform",
    description: "Discover the ultimate gaming experiences with the latest hardware from PlayStation, Xbox, and Nintendo.",
    indicatorColor: "bg-purple-500",
    bgGradient: "from-purple-600/90 via-purple-500/20 to-background dark:from-purple-950 dark:via-background/80 dark:to-background"
  }
};

export default function ConsolesPage() {
  const [filter, setFilter] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 100);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Memoized filtered consoles
  const filteredConsoles = useMemo(() => {
    return filter === "All" 
      ? allConsoles 
      : allConsoles.filter(c => c.category === filter);
  }, [filter]);

  // Memoized banner content
  const banner = useMemo(() => {
    return bannerConfigs[filter as keyof typeof bannerConfigs] || bannerConfigs.All;
  }, [filter]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Immersive Hero Section */}
        <div className="relative h-[65vh] w-full overflow-hidden flex items-center">
          {/* Background Image with Parallax-like fixity or just static */}
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 bg-gradient-to-t ${banner.bgGradient} z-10`} />
            <div className="absolute inset-0 bg-black/10 dark:bg-black/40 z-10" />
            <img 
              key={filter}
              src={banner.image} 
              alt={banner.title}
              loading="eager"
              className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000"
            />
          </div>

          <div className="container relative z-20 mx-auto px-6 pt-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className={`h-1 w-12 rounded-full ${banner.indicatorColor} animate-in slide-in-from-left-4 duration-500`} />
                <span className="text-sm font-bold tracking-widest uppercase text-white/90 dark:text-white/80 animate-in fade-in duration-700 drop-shadow-md">
                  {banner.subtitle}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100 drop-shadow-lg">
                {banner.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/95 dark:text-white/80 max-w-xl leading-relaxed animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200 drop-shadow-md">
                {banner.description}
              </p>
            </div>
          </div>
        </div>

        {/* Floating Filter Bar */}
        <div className={`sticky top-20 z-40 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8 -mt-16'}`}>
          <div className="container mx-auto px-6">
            <div className={`
              flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl
              ${isScrolled 
                ? 'bg-background/80 backdrop-blur-md border border-border/50 shadow-lg' 
                : 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl'} 
              transition-all duration-300 max-w-fit mx-auto
            `}>
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = filter === cat.id;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300
                      ${isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                        : isScrolled
                          ? 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="container mx-auto px-6 py-12">
          <div className="mb-10 flex items-end justify-between border-b border-border/50 pb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {filter === "All" ? "All Consoles" : `${filter} Consoles`}
              </h2>
              <p className="text-muted-foreground mt-2">
                Showing {filteredConsoles.length} results
              </p>
            </div>
            {/* Optional sort/filter dropdowns component could go here */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredConsoles.map((item, index) => (
              <ConsoleCardWrapper key={item._id} item={item} index={index} />
            ))}
          </div>

          {filteredConsoles.length === 0 && (
            <div className="text-center py-32 bg-secondary/20 rounded-3xl border border-dashed border-border">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
                <Gamepad2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">No consoles found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

// Memoized console card wrapper to prevent unnecessary re-renders
const ConsoleCardWrapper = React.memo(({ item, index }: { item: Product; index: number }) => (
  <div 
    className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="h-full transform transition-all duration-300 hover:-translate-y-2">
      <ProductCard product={item} />
    </div>
  </div>
));

ConsoleCardWrapper.displayName = 'ConsoleCardWrapper';
