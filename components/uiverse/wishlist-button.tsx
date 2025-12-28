"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({ className }) => {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    if (!liked) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600); // 600ms animation
    }
    setLiked(!liked);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group flex items-center gap-2 text-sm font-medium transition-all duration-300",
        liked ? "text-red-500" : "text-muted-foreground hover:text-red-500",
        className
      )}
    >
      <div className="relative">
        <Heart
          className={cn(
            "w-5 h-5 transition-all duration-300",
            liked ? "fill-red-500 scale-110" : "scale-100 group-hover:scale-110"
          )}
        />
        {/* Particle bursts for the 'pop' effect */}
        {animating && (
           <>
             <span className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-red-500 animate-ping opacity-75"></span>
           </>
        )}
      </div>
      
      <span className={cn("relative overflow-hidden", liked && "font-bold")}>
        {liked ? "Wishlisted" : "Add to Wishlist"}
      </span>
    </button>
  );
};
