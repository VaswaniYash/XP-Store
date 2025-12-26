"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CyberButton } from "@/components/uiverse/cyber-button";

export function FeaturedProducts() {
  const banners = [
    {
      id: 1,
      title: "Next-Gen Consoles",
      description: "Experience gaming like never before with the latest PlayStation 5 and Xbox Series X consoles",
      image: "/nextgen_consoles_banner.png",
      link: "/shop?category=consoles",
      gradient: "from-blue-600/20 via-purple-600/20 to-pink-600/20",
      hoverGradient: "group-hover:from-blue-600/30 group-hover:via-purple-600/30 group-hover:to-pink-600/30"
    },
    {
      id: 2,
      title: "Gaming Accessories",
      description: "Elevate your setup with premium headsets, keyboards, and controllers designed for victory",
      image: "/gaming_accessories_banner.png",
      link: "/shop?category=accessories",
      gradient: "from-green-600/20 via-cyan-600/20 to-blue-600/20",
      hoverGradient: "group-hover:from-green-600/30 group-hover:via-cyan-600/30 group-hover:to-blue-600/30"
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Featured Collections
            </h2>
            <p className="text-muted-foreground">Discover our handpicked gaming essentials</p>
          </div>
          <CyberButton 
            text="VIEW ALL PRODUCTS" 
            href="/shop"
            icon={<ArrowRight className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {banners.map((banner) => (
            <Link 
              key={banner.id}
              href={banner.link}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Banner Image */}
                <div className="relative h-[300px] md:h-[350px] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} ${banner.hoverGradient} transition-all duration-500 z-10`}></div>
                  <img 
                    src={banner.image} 
                    alt={banner.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay with shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20"></div>
                  
                  {/* Animated shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>

                  {/* Title overlay on image */}
                  <div className="absolute bottom-6 left-6 right-6 z-30">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                      {banner.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90 font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Text content below image */}
                <div className="p-6 bg-gradient-to-br from-card to-secondary/5">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {banner.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
