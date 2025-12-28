import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from "@/lib/utils";

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ className, label = "Go Back", ...props }) => {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-start overflow-hidden rounded-xl bg-zinc-950 px-6 py-3 font-medium transition-all duration-300",
        "hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700",
        "shadow-lg hover:shadow-xl",
        className
      )}
      {...props}
    >
      {/* Subtle Gold Glow on Left */}
      <span className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-50 transition-all duration-300 group-hover:w-1 group-hover:opacity-100" />
      
      <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">
        <ArrowLeft className="h-4 w-4 text-zinc-400 group-hover:text-[#D4AF37] transition-colors" />
      </span>
      <span className="relative text-zinc-300 transition-colors duration-300 group-hover:text-white text-sm uppercase tracking-wider font-bold">
        {label}
      </span>
    </button>
  );
};
