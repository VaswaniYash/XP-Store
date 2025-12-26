"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCartContext } from "@/components/cart-context"; // Import CartContext

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const pathname = usePathname();
  
  // Use Cart Context
  const { items, itemCount, total, removeFromCart, updateQuantity } = useCartContext();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const toggleCart = () => setCartOpen((prev) => !prev);
  const closeCart = () => setCartOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  // Check for logged in user
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  return (
    <>
      {/* ======= Mobile Navbar ======= */}
      <div className="fixed top-0 w-full z-[100] bg-background/95 backdrop-blur-md border-b border-border lg:hidden transition-all duration-300">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={toggleMenu} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent transition-colors">
            <i className="ri-menu-line text-xl"></i>
          </button>
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm animate-logo">XP</div>
            <span className="font-bold text-xl tracking-tighter animate-gradient">STORE</span>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs font-medium max-w-[80px] truncate">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent transition-colors" title="Logout">
                  <i className="ri-logout-box-line text-xl"></i>
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent transition-colors relative"> 
                <i className="ri-user-line text-xl"></i>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
            )}
            <button onClick={toggleCart} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-accent transition-colors relative">
              <i className="ri-shopping-cart-line text-xl"></i>
              {itemCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[90] bg-background/95 lg:hidden flex flex-col pt-20 px-6 animate-in slide-in-from-left duration-300">
             <nav className="flex flex-col gap-4 text-lg font-medium">
                <Link href="/" onClick={closeMenu} className="hover:text-primary transition-colors">Home</Link>
                <Link href="/consoles" onClick={closeMenu} className="hover:text-primary transition-colors">Consoles</Link>
                <Link href="/games" onClick={closeMenu} className="hover:text-primary transition-colors">Games</Link>
                <Link href="/accessories" onClick={closeMenu} className="hover:text-primary transition-colors">Accessories</Link>
             </nav>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-[65px] lg:hidden"></div>

      {/* ======= Desktop Navbar ======= */}
      <div className="hidden lg:block fixed top-0 w-full z-[100] bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20 animate-logo">XP</div>
            <span className="font-bold text-2xl tracking-tighter animate-gradient">XP STORE</span>
          </Link>
          
          <nav className="flex items-center space-x-8 bg-secondary/5 px-6 py-2 rounded-full border border-secondary/10">
            <Link href="/" className={`text-sm font-medium hover:text-primary transition-colors relative group ${pathname === '/' ? 'text-primary' : ''}`}>
              Home
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === '/' ? 'w-full' : 'w-0'}`}></span>
            </Link>
            <Link href="/consoles" className={`text-sm font-medium hover:text-primary transition-colors relative group ${pathname === '/consoles' ? 'text-primary' : ''}`}>
              Consoles
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === '/consoles' ? 'w-full' : 'w-0'}`}></span>
            </Link>
            <Link href="/games" className={`text-sm font-medium hover:text-primary transition-colors relative group ${pathname === '/games' ? 'text-primary' : ''}`}>
              Games
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === '/games' ? 'w-full' : 'w-0'}`}></span>
            </Link>
            <Link href="/accessories" className={`text-sm font-medium hover:text-primary transition-colors relative group ${pathname === '/accessories' ? 'text-primary' : ''}`}>
              Accessories
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === '/accessories' ? 'w-full' : 'w-0'}`}></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 border-r border-border pr-4 mr-2">
              <ThemeToggle />
              <button className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-destructive">
                <i className="ri-heart-line text-lg"></i>
              </button>
              <button onClick={toggleCart} className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-secondary relative">
                <i className="ri-shopping-cart-line text-lg"></i>
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent border border-border">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2"
                  >
                    <i className="ri-logout-box-line text-lg"></i>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 relative"
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full absolute -left-1"></span>
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-0.5"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Spacer for fixed navbar */}
      <div className="hidden lg:block h-[88px]"></div>

      {/* ======= Side Cart ======= */}
      <div
        className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-card border-l border-border shadow-2xl z-[999] transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-border bg-background/50">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <i className="ri-shopping-cart-line text-primary"></i>
            Your Cart <span className="text-sm font-normal text-muted-foreground">({itemCount} items)</span>
          </h3>
          <button 
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <i className="ri-shopping-cart-line text-4xl mb-2 opacity-50"></i>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border hover:border-primary transition-colors group">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary/5">
                   <img 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.name} 
                      className="object-cover w-full h-full"
                   />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate pr-2">{item.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                     <div className="flex items-center gap-2 bg-secondary/10 rounded-md p-0.5">
                        <button 
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-background text-xs"
                          aria-label="Decrease quantity"
                        >
                          <i className="ri-subtract-line"></i>
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-background text-xs"
                          aria-label="Increase quantity"
                        >
                          <i className="ri-add-line"></i>
                        </button>
                     </div>
                    <p className="text-xs font-bold text-primary">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-2 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Remove item"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
          <div className="flex justify-between font-bold mb-3 text-foreground">
            <span>Total</span>
            <span className="text-primary text-xl">₹{total.toLocaleString()}</span>
          </div>
          <button 
            disabled={items.length === 0}
            className={`w-full py-3 rounded-lg font-medium transition-all shadow-lg ${
              items.length === 0 
                ? "bg-muted text-muted-foreground cursor-not-allowed" 
                : "bg-primary text-white hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/40"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>
      
      {/* Overlay for Cart */}
      {cartOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-[998] backdrop-blur-sm"
            onClick={closeCart}
        ></div>
      )}
    </>
  );
}
