"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2.5 hover:bg-accent/50 rounded-xl transition-all duration-300 text-muted-foreground relative overflow-hidden">
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  const currentTheme = resolvedTheme;
  const isDark = currentTheme === "dark";

  const handleToggle = () => {
    setIsAnimating(true);
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button
      onClick={handleToggle}
      className="group relative p-2.5 hover:bg-accent/50 rounded-xl transition-all duration-300 text-muted-foreground hover:text-primary overflow-hidden"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Animated background pulse */}
      <div className={`
        absolute inset-0 bg-gradient-to-r 
        ${isDark ? 'from-yellow-500/20 to-orange-500/20' : 'from-blue-500/20 to-purple-500/20'}
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl
      `} />
      
      {/* Icon container with smooth transition */}
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun className={`
          absolute inset-0 w-full h-full
          transition-all duration-500 ease-in-out
          ${isDark 
            ? 'opacity-0 rotate-90 scale-50' 
            : 'opacity-100 rotate-0 scale-100'
          }
          ${isAnimating ? 'animate-spin' : ''}
          group-hover:text-yellow-500
        `} />
        
        {/* Moon Icon */}
        <Moon className={`
          absolute inset-0 w-full h-full
          transition-all duration-500 ease-in-out
          ${isDark 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-50'
          }
          ${isAnimating ? 'animate-pulse' : ''}
          group-hover:text-blue-400
        `} />
      </div>

      {/* Ripple effect on click */}
      {isAnimating && (
        <span className="absolute inset-0 rounded-xl bg-current opacity-20 animate-ping" />
      )}
    </button>
  );
}
