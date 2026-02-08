"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FeaturedProducts } from "@/components/products/featured-products";
import { CustomerReviews } from "@/components/marketing/customer-reviews";
import { WatchAndShop } from "@/components/marketing/watch-and-shop";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GlitchButton } from "@/components/uiverse/glitch-button";
import { MagicCard } from "@/components/uiverse/magic-card";
import { NeonButton } from "@/components/uiverse/neon-button";
import { AnimatedTitle } from "@/components/anime/animated-title";
import { useCartContext } from "@/components/providers/cart-context";
import { products } from "@/lib/products";

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { addToCart } = useCartContext();

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150) {
          el.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-foreground">
      {/* ======= Banners ======= */}
      <div className="bg-black text-white text-[10px] md:text-xs text-center py-1.5 px-4 tracking-wide">
        <span className="font-bold text-secondary">NEW:</span> Cash on Delivery Now Available! 🎮
      </div>
      <div className="bg-gradient-to-r from-playstation via-primary to-xbox text-white text-[10px] md:text-xs text-center py-1.5 px-4 font-medium tracking-wide">
        🔥 Today's Exclusive Deals – Level Up Your Gear!
      </div>

      <SiteHeader />

      {/* ======= Hero Banner ======= */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-6">
        <picture>
          <source media="(max-width: 639px)" srcSet="/Images/phone_images/hero_banner.webp" />
          <img
            src="/Images/Image_WEPB/home.webp"
            alt="XP Store"
            className="w-full h-full object-cover object-center"
          />
        </picture>

        <div className="absolute inset-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white flex items-center justify-center text-center">
          <div className="bg-black/80 backdrop-blur-sm p-6 md:p-10 rounded-lg max-w-3xl border border-white/10">
            <AnimatedTitle 
              text="XP Store" 
              className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight text-white block"
            />
            <p className="text-base mb-6 text-blue-300 md:text-lg max-w-2xl mx-auto">
              Your ultimate marketplace for consoles, accessories & premium game titles.
            </p>
            <div className="flex justify-center">
              <GlitchButton text="SHOP NOW" href="/shop" />
            </div>
          </div>
        </div>
      </div>

      {/* ======= Featured Collection Banner ======= */}
      <div className="px-6 md:px-12 mb-8 reveal">
        <div className="block relative w-full h-[200px] md:h-[250px] rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-primary to-blue-900 transition-transform duration-700 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-[url('/Images/product-1.webp')] opacity-20 bg-cover bg-center mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight group-hover:scale-105 transition-transform duration-300">
              Featured Collection
            </h2>
            <p className="text-blue-100 mb-6 max-w-lg text-sm md:text-base opacity-90 hidden md:block">
              Discover the gear that defines the next generation of gaming.
            </p>
            <div className="transform transition-transform duration-300 group-hover:scale-110">
                <NeonButton text="EXPLORE NOW" href="/shop" />
            </div>
          </div>
        </div>
      </div>

      {/* ======= Featured Products ======= */}
      <FeaturedProducts />

      {/* ======= Best Sellers Section (Replaced with Magic Cards) ======= */}
      <section className="py-12 px-6 md:px-12 bg-background reveal">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-foreground">Best Sellers</h2>
          <p className="text-muted-foreground mb-10">Explore our most popular picks loved by gamers and collectors.</p>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 h-[380px]">
             {products
               .filter(p => ["1", "2", "3", "a5"].includes(p._id))
               .map((item) => (
              <div key={item._id} className="h-full group">
                <Link href={`/product/${item._id}?source=home`} className="block h-full cursor-pointer">
                  <MagicCard 
                    title={item.name} 
                    image={item.image}
                    price={item.price}
                    onAddToCart={() => addToCart(item, 1)}
                  />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======= Carousel Section ======= */}
      <section className="bg-accent/30 py-12 reveal">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-foreground">New Arrivals</h2>

          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {[1, 2, 3].map((n) => (
                <div key={n} className="min-w-full px-4">
                  <img src={`/Images/slide-${n}.webp`} alt={`Slide ${n}`} className="rounded-lg w-full h-96 object-cover" />
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${activeSlide === i ? "bg-primary w-8" : "bg-muted-foreground/50 hover:bg-primary/50"}`}
                  onClick={() => setActiveSlide(i)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======= Watch & Shop ======= */}
      <WatchAndShop />

      {/* ======= Customer Reviews ======= */}
      <CustomerReviews />

      <SiteFooter />
    </div>
  );
}