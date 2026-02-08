"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Github, Gamepad2 } from "lucide-react";
import { Globe } from "@/components/ui/globe";
import { useRef, useState } from "react";

export function SiteFooter() {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!textContainerRef.current) return;
    const rect = textContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <footer className="bg-background border-t border-border relative overflow-hidden mt-20">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="font-bold text-2xl tracking-tighter">XP STORE</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              The ultimate destination for next-gen gaming gear. Level up your setup with premium consoles, games, and accessories.
            </p>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/consoles" className="hover:text-primary transition-colors">Consoles</Link></li>
              <li><Link href="/games" className="hover:text-primary transition-colors">Games</Link></li>
              <li><Link href="/accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-foreground">Support</h3>
             <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Order Status</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping &amp; Returns</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter / Socials */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">Stay Connected</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
               <a href="#" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
            </div>
             <p className="text-xs text-muted-foreground">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
          </div>
        </div>

        {/* ===== FULL-WIDTH VISUAL SECTION ===== */}
        <div className="relative flex flex-row items-end justify-start w-full -mt-16 mb-8 overflow-visible select-none">
          {/* Globe on the left */}
          <div className="relative z-10 flex-shrink-0">
            <Globe className="w-80 h-80 md:w-96 md:h-96 opacity-100 transition-opacity" />
          </div>
          
          {/* Text centered with cursor-following light effect */}
          <div 
            ref={textContainerRef}
            className="relative flex-1 flex items-center justify-center pb-8 md:pb-16 rounded-2xl overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Bento/Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />
            
            {/* Base visible text - darker and more visible */}
            <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] leading-none font-black uppercase tracking-wide whitespace-nowrap z-10 text-zinc-800 dark:text-zinc-700 opacity-50 transition-opacity duration-300">
              XP STORE
            </h1>
            
            {/* Overlay text - Fully colored but revealed only by mask */}
            {/* This ensures NO box background, as the background is clipped to text and mask hides the rest */}
            <h1 
              className="absolute text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] leading-none font-black uppercase tracking-wide whitespace-nowrap z-20 pointer-events-none transition-opacity duration-300 text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600"
              style={{
                opacity: isHovering ? 1 : 0,
                WebkitMaskImage: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, black 20%, transparent 100%)`,
                maskImage: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, black 20%, transparent 100%)`,
              }}
            >
              XP STORE
            </h1>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-medium text-xs">© 2025. All rights reserved.</p>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full hover:bg-white/5 transition-colors cursor-default">
             <div className="relative">
               {/* Enhanced Pixel Heart with Gradient feel */}
               <svg width="24" height="21" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-5 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
                 <path d="M2 2H4V3H2V2Z" fill="#FDBA74"/> {/* Light Orange */}
                 <path d="M6 2H8V3H6V2Z" fill="#FDBA74"/>
                 <path d="M1 3H3V4H1V3Z" fill="#FB923C"/> {/* Mid Orange */}
                 <path d="M3 3H5V4H3V3Z" fill="#F97316"/>
                 <path d="M5 3H7V4H5V3Z" fill="#F97316"/>
                 <path d="M7 3H9V4H7V3Z" fill="#FB923C"/>
                 <path d="M1 4H9V5H1V4Z" fill="#F97316"/> {/* Vibrant Orange */}
                 <path d="M2 5H8V6H2V5Z" fill="#EA580C"/> {/* Darker Orange */}
                 <path d="M3 6H7V7H3V6Z" fill="#EA580C"/>
                 <path d="M4 7H6V8H4V7Z" fill="#C2410C"/> {/* Red-Orange Tip */}
               </svg>
             </div>
             <span className="text-zinc-500 font-medium text-sm tracking-tight">
               Made with passion by <span className="text-foreground font-bold">XP Store</span>
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
