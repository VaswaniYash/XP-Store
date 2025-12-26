"use client";

import Link from "next/link";
import Image from "next/image";

interface VideoProduct {
  id: number;
  thumbnail: string;
  productLink: string;
}

import { CyberButton } from "@/components/uiverse/cyber-button";

export function WatchAndShop() {
  const videoProducts: VideoProduct[] = [
    {
      id: 1,
      thumbnail: "/video-console.png",
      productLink: "/shop?category=consoles"
    },
    {
      id: 2,
      thumbnail: "/video-headset.png",
      productLink: "/shop?category=accessories"
    },
    {
      id: 3,
      thumbnail: "/video-controller.png",
      productLink: "/shop?category=accessories"
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 bg-background reveal">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Watch & Shop
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the products in action before you shop.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoProducts.map((video) => (
            <Link
              key={video.id}
              href={video.productLink}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer border border-border hover:border-primary/50"
            >
              {/* Video Container - Full Size */}
              <div className="relative aspect-[4/3] overflow-hidden bg-card">
                {/* Product Thumbnail */}
                <Image
                  src={video.thumbnail}
                  alt="Product Video"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>

                {/* Hover Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <CyberButton 
            text="VIEW ALL PRODUCTS" 
            href="/shop"
          />
        </div>
      </div>
    </section>
  );
}
