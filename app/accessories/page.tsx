"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";
import { useState, useEffect } from "react";
import { 
  Gamepad2, 
  Headphones, 
  HardDrive, 
  Shield, 
  Zap, 
  Video, 
  Filter,
  Search,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Accessories Data
const allAccessories: Product[] = [
  // Controllers Category
  {
    _id: "a1",
    name: "DualSense Wireless Controller - Cosmic Red",
    description: "Experience haptic feedback and adaptive triggers in a stunning cosmic red finish. Compatible with PS5.",
    price: 5999,
    image: "/Images/accessories/controller.png",
    category: "Controllers",
    stock: 30
  },
  {
    _id: "a2",
    name: "Xbox Wireless Controller - Electric Volt",
    description: "Textured grip, hybrid D-pad, and Bluetooth connectivity. Vibrant electric volt color for Xbox Series X|S and PC.",
    price: 5499,
    image: "/Images/accessories/controller.png",
    category: "Controllers",
    stock: 35
  },
  {
    _id: "a3",
    name: "Nintendo Switch Pro Controller",
    description: "Premium controller with motion controls, HD rumble, and built-in amiibo functionality for Nintendo Switch.",
    price: 5999,
    image: "/Images/accessories/controller.png",
    category: "Controllers",
    stock: 25
  },
  {
    _id: "a4",
    name: "DualSense Charging Station",
    description: "Charge up to two DualSense controllers simultaneously with this official PlayStation charging dock.",
    price: 2499,
    image: "/Images/accessories/charging.png",
    category: "Controllers",
    stock: 40
  },

  // Headsets Category
  {
    _id: "a5",
    name: "PlayStation 5 Pulse 3D Wireless Headset",
    description: "Fine-tuned for 3D Audio on PS5. Dual noise-cancelling microphones and up to 12 hours of wireless play.",
    price: 8999,
    image: "/Images/accessories/headset.png",
    category: "Headsets",
    stock: 20
  },
  {
    _id: "a6",
    name: "Xbox Wireless Headset",
    description: "Supports spatial sound technologies including Windows Sonic, Dolby Atmos, and DTS Headphone:X.",
    price: 8499,
    image: "/Images/accessories/headset.png",
    category: "Headsets",
    stock: 22
  },
  {
    _id: "a7",
    name: "SteelSeries Arctis 7+ Wireless",
    description: "Premium multi-platform gaming headset with 30+ hour battery life. Works with PlayStation, Xbox, Switch, and PC.",
    price: 12999,
    image: "/Images/accessories/headset.png",
    category: "Headsets",
    stock: 15
  },
  {
    _id: "a8",
    name: "HyperX Cloud II Gaming Headset",
    description: "Legendary comfort and sound quality. 7.1 surround sound and noise-cancelling microphone.",
    price: 7999,
    image: "/Images/accessories/headset.png",
    category: "Headsets",
    stock: 28
  },

  // Storage Category
  {
    _id: "a9",
    name: "Seagate 2TB Game Drive for PS5",
    description: "Officially licensed external HDD for PS5. Store and play PS4 games, archive PS5 games.",
    price: 6999,
    image: "/Images/accessories/storage.png",
    category: "Storage",
    stock: 18
  },
  {
    _id: "a10",
    name: "WD_BLACK 1TB SSD for Xbox Series X|S",
    description: "Officially licensed NVMe SSD expansion card. Plug and play, identical performance to internal storage.",
    price: 14999,
    image: "/Images/accessories/storage.png",
    category: "Storage",
    stock: 12
  },
  {
    _id: "a11",
    name: "SanDisk 512GB microSD for Nintendo Switch",
    description: "Officially licensed microSDXC card. Transfer speeds up to 100MB/s for fast game loading.",
    price: 4999,
    image: "/Images/accessories/storage.png",
    category: "Storage",
    stock: 45
  },
  {
    _id: "a12",
    name: "Samsung 980 PRO 2TB NVMe SSD",
    description: "Compatible with PS5 internal expansion. PCIe 4.0 speeds up to 7,000 MB/s. Includes heatsink.",
    price: 18999,
    image: "/Images/accessories/storage.png",
    category: "Storage",
    stock: 10
  },

  // Protection Category
  {
    _id: "a13",
    name: "dbrand PS5 Darkplates",
    description: "Premium matte black replacement panels for PS5. Precision-cut with perfect fit and finish.",
    price: 4999,
    image: "/Images/accessories/protection.png",
    category: "Protection",
    stock: 25
  },
  {
    _id: "a14",
    name: "Nintendo Switch OLED Screen Protector",
    description: "Tempered glass screen protector with 9H hardness. Crystal clear with oleophobic coating.",
    price: 999,
    image: "/Images/accessories/protection.png",
    category: "Protection",
    stock: 60
  },
  {
    _id: "a15",
    name: "Nintendo Switch Carrying Case - Deluxe",
    description: "Official Nintendo carrying case with game card slots and adjustable viewing stand.",
    price: 1999,
    image: "/Images/accessories/protection.png",
    category: "Protection",
    stock: 35
  },
  {
    _id: "a16",
    name: "Controller Skin Set - Carbon Fiber",
    description: "Premium vinyl skins for PlayStation, Xbox, or Nintendo controllers. Easy application, no residue.",
    price: 1499,
    image: "/Images/accessories/protection.png",
    category: "Protection",
    stock: 50
  },

  // Charging Category
  {
    _id: "a17",
    name: "PowerA Dual Charging Station for Xbox",
    description: "Charge two Xbox controllers simultaneously. Includes two rechargeable battery packs.",
    price: 2999,
    image: "/Images/accessories/charging.png",
    category: "Charging",
    stock: 30
  },
  {
    _id: "a18",
    name: "Anker USB-C Cable 10ft - Gaming Edition",
    description: "Braided USB-C cable for controllers and devices. 10ft length for comfortable gaming while charging.",
    price: 1299,
    image: "/Images/accessories/charging.png",
    category: "Charging",
    stock: 55
  },
  {
    _id: "a19",
    name: "Nintendo Switch Charging Dock",
    description: "Compact charging dock for Nintendo Switch. Supports TV mode with HDMI output.",
    price: 2499,
    image: "/Images/accessories/charging.png",
    category: "Charging",
    stock: 28
  },
  {
    _id: "a20",
    name: "Multi-Console Charging Tower",
    description: "Universal charging station for PlayStation, Xbox, and Nintendo controllers. LED indicators included.",
    price: 3999,
    image: "/Images/accessories/charging.png",
    category: "Charging",
    stock: 20
  },

  // Streaming Category
  {
    _id: "a21",
    name: "Elgato HD60 S+ Capture Card",
    description: "Stream and record in 1080p60 or 4K30 HDR10. Zero-lag passthrough for seamless gameplay.",
    price: 16999,
    image: "/Images/accessories/streaming.png",
    category: "Streaming",
    stock: 8
  },
  {
    _id: "a22",
    name: "Logitech C920 HD Pro Webcam",
    description: "Full HD 1080p streaming camera. Perfect for streaming, video calls, and content creation.",
    price: 6999,
    image: "/Images/accessories/streaming.png",
    category: "Streaming",
    stock: 15
  },
  {
    _id: "a23",
    name: "Blue Yeti USB Microphone",
    description: "Professional USB microphone for streaming and recording. Four pickup patterns for versatility.",
    price: 10999,
    image: "/Images/accessories/streaming.png",
    category: "Streaming",
    stock: 12
  },
  {
    _id: "a24",
    name: "Elgato Stream Deck",
    description: "15 customizable LCD keys for controlling your stream. One-touch operation for scenes, media, and more.",
    price: 12999,
    image: "/Images/accessories/streaming.png",
    category: "Streaming",
    stock: 10
  },
];

const categories = [
  { id: "Controllers", label: "Controllers", icon: Gamepad2, color: "text-purple-500", bg: "hover:bg-purple-500/10" },
  { id: "Headsets", label: "Headsets", icon: Headphones, color: "text-blue-500", bg: "hover:bg-blue-500/10" },
  { id: "Storage", label: "Storage", icon: HardDrive, color: "text-emerald-500", bg: "hover:bg-emerald-500/10" },
  { id: "Protection", label: "Protection", icon: Shield, color: "text-orange-500", bg: "hover:bg-orange-500/10" },
  { id: "Charging", label: "Charging", icon: Zap, color: "text-yellow-500", bg: "hover:bg-yellow-500/10" },
  { id: "Streaming", label: "Streaming", icon: Video, color: "text-pink-500", bg: "hover:bg-pink-500/10" },
];

const categoryGradients: Record<string, string> = {
  Controllers: "from-purple-600 to-indigo-600",
  Headsets: "from-blue-600 to-cyan-600",
  Storage: "from-emerald-600 to-green-600",
  Protection: "from-orange-600 to-red-600",
  Charging: "from-yellow-500 to-amber-600",
  Streaming: "from-pink-600 to-rose-600",
};

export default function AccessoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll to section function
  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Set active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      // 1. Check if we've reached the bottom of the page (activate last item)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveCategory(categories[categories.length - 1].id);
        return;
      }

      // 2. Standard spy logic
      const scrollPosition = window.scrollY + 150; // Trigger line 150px from top

      // If we are at the very top, clear active if needed, or keep first default?
      // Actually, keeping the first one active if we are near top is often better UX.
      if (window.scrollY < 50) {
        // Optional: setActiveCategory(null) or "Controllers"
      }

      for (const cat of categories) {
        const element = document.getElementById(cat.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          // offsetTop is the position of the element relative to the document
          // scrollPosition is the current "scanner line" position
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      
      <div className="flex flex-1">
        
        {/* Left Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-88px)] fixed left-0 top-[88px] border-r border-border bg-background/50 backdrop-blur-xl overflow-y-auto z-30">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span>Gear Vault</span>
            </h2>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-secondary/10 border border-secondary/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/70 text-foreground"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            
            <nav className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-left",
                    activeCategory === cat.id 
                      ? "bg-secondary/10 text-secondary font-bold shadow-sm border border-secondary/20" 
                      : `text-muted-foreground ${cat.bg} hover:text-foreground`
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    activeCategory === cat.id ? "bg-secondary text-white" : "bg-muted group-hover:bg-white inset-0" 
                  )}>
                    <cat.icon className={cn("w-4 h-4", activeCategory === cat.id ? "text-white" : "text-muted-foreground")} />
                  </div>
                  <span>{cat.label}</span>
                  
                  {activeCategory === cat.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  )}
                </button>
              ))}
            </nav>
            
            <div className="mt-10 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/10">
              <h3 className="font-bold text-sm mb-2">Need Help?</h3>
              <p className="text-xs text-muted-foreground mb-3">Not sure what fits your setup?</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                View Compatibility Guide
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full relative lg:ml-64">
          
          {/* Mobile Category Nav (Horizontal Scroll) */}
          <div className="lg:hidden sticky top-[73px] z-40 bg-background/95 backdrop-blur border-b border-border overflow-x-auto">
            <div className="flex p-4 gap-3 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all",
                    activeCategory === cat.id
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-card border-border text-muted-foreground"
                  )}
                >
                  <cat.icon className="w-3 h-3" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-20 max-w-7xl mx-auto">
            
            {/* Page Header */}
            <div className="relative overflow-hidden rounded-3xl bg-muted/30 dark:bg-zinc-900/50 border border-border/50 min-h-[300px] flex items-center p-8 md:p-16 shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/10 to-transparent z-10" />
              <img 
                src="/Images/accessories/hero.png" 
                alt="Accessories Hero" 
                className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-20 mask-image-linear-gradient-to-l" 
              />
              <div className="relative z-20 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-foreground">
                  ULTIMATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">LOADOUT</span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-md">
                  Upgrade your arsenal with pro-grade controllers, headsets, and tactical gear.
                </p>
                <div className="mt-8 flex gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                        <img src={`/Images/product-${i > 3 ? 1 : i}.webp`} className="w-full h-full object-cover rounded-full opacity-70" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-sm font-semibold text-foreground">
                    <span className="text-secondary mr-1">500+</span> Premium Items
                  </div>
                </div>
              </div>
            </div>

            {/* Sections */}
            {/* Sections or Search Results */}
            {searchQuery ? (
              <section className="animate-in fade-in duration-300">
                <div className="flex items-center gap-4 mb-8 border-b border-border/50 pb-4">
                   <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                     <Search className="w-8 h-8" />
                   </div>
                   <div>
                     <h2 className="text-3xl font-bold tracking-tight">Search Results</h2>
                     <p className="text-muted-foreground text-sm mt-1">
                       Found {allAccessories.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).length} matches for "{searchQuery}"
                     </p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {allAccessories
                    .filter(p => 
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((product) => (
                    <div key={product._id} className="group relative animate-in fade-in zoom-in duration-500 fill-mode-backwards">
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryGradients[product.category] || 'from-primary to-secondary'} rounded-xl opacity-0 group-hover:opacity-70 blur transition duration-500`} />
                      <div className="relative h-full">
                        <ProductCard product={product} />
                      </div>
                    </div>
                  ))}
                </div>
                
                {allAccessories.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-bold text-muted-foreground">No matches found</h3>
                    <p className="text-sm text-muted-foreground/70 mt-2">Try searching for something else or browse categories.</p>
                    <Button 
                      onClick={() => setSearchQuery("")}
                      variant="outline" 
                      className="mt-6"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </section>
            ) : (
              categories.map((cat) => {
                const categoryProducts = allAccessories.filter(p => p.category === cat.id);
                if (categoryProducts.length === 0) return null;
  
                return (
                  <section key={cat.id} id={cat.id} className="scroll-mt-32">
                    <div className="flex items-end justify-between mb-8 border-b border-border/50 pb-4">
                      <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-2xl bg-secondary/10", cat.color)}>
                          <cat.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold tracking-tight">{cat.label}</h2>
                          <p className="text-muted-foreground text-sm mt-1">
                            {categoryProducts.length} items available
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" className="hidden sm:flex items-center gap-2">
                        View All <span className="sr-only">{cat.label}</span>
                      </Button>
                    </div>
  
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                      {categoryProducts.map((product) => (
                        <div key={product._id} className="group relative animate-in fade-in zoom-in duration-500 fill-mode-backwards">
                          <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryGradients[product.category] || 'from-primary to-secondary'} rounded-xl opacity-0 group-hover:opacity-70 blur transition duration-500`} />
                          <div className="relative h-full">
                            <ProductCard product={product} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })
            )}

            {/* Empty State fallback */}
            {allAccessories.length === 0 && (
               <div className="text-center py-20">
                 <h3 className="text-2xl font-bold text-muted-foreground">No accessories found.</h3>
               </div>
            )}
          </div>
        </main>
      </div>

      <div className="lg:ml-64">
        <SiteFooter />
      </div>
    </div>
  );
}
