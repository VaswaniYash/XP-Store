import Link from "next/link";
import { Facebook, Instagram, Twitter, Github, Gamepad2 } from "lucide-react";

export function SiteFooter() {
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
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
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
