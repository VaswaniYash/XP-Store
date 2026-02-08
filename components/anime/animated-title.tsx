"use client";

import React, { useEffect, useRef } from "react";
// @ts-ignore
import { animate } from "animejs";

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, className }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        translateY: [40, 0],
        opacity: [0, 1],
        filter: ['blur(8px)', 'blur(0px)'],
        textShadow: [
          '0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(6, 182, 212, 0.4)',
          '0 0 0px rgba(6, 182, 212, 0)'
        ],
        easing: "easeOutExpo",
        duration: 1400,
      });
    }
  }, [text]);

  return (
    <h1 
      className={`relative inline-block opacity-0 ${className}`} 
      ref={containerRef} 
      aria-label={text}
    >
      {text}
    </h1>
  );
};
