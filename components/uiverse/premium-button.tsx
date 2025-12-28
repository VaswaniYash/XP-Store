import React from 'react';
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'black';
  icon?: React.ReactNode;
  text: string;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  className, 
  variant = 'gold', 
  icon, 
  text,
  ...props 
}) => {
  if (variant === 'gold') {
    return (
      <button 
        className={cn(
          "relative overflow-hidden group w-full h-14 rounded-xl font-bold uppercase tracking-wider",
          "bg-gradient-to-r from-[#D4AF37] via-[#F2D06B] to-[#D4AF37] bg-[length:200%_auto]",
          "text-black shadow-lg hover:shadow-[#D4AF37]/40 transition-all duration-300 hover:bg-right hover:scale-[1.02]",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 z-10 w-full h-full"></div>
        <span className="relative z-20 flex items-center justify-center gap-2">
           {icon}
           {text}
        </span>
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button 
        className={cn(
          "relative w-full h-14 rounded-xl font-bold uppercase tracking-wider overflow-hidden group",
          "border-2 border-[#D4AF37] text-foreground bg-transparent",
          "transition-all duration-300 hover:text-black",
          className
        )}
        {...props}
      > 
        <div className="absolute inset-0 w-full h-full bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
        <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300">
           {icon}
           {text}
        </span>
      </button>
    );
  }

  return (
    <button 
      className={cn(
        "relative w-full h-14 rounded-xl font-bold uppercase tracking-wider text-white bg-zinc-950 overflow-hidden group",
        "border border-zinc-800 shadow-xl",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 z-0"></div>
      <span className="relative z-10 flex items-center justify-center gap-2">
         {icon}
         {text}
      </span>
    </button>
  );
};
