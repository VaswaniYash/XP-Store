"use client";

import React, { useEffect, useRef } from "react";
// @ts-ignore
import { animate, stagger } from "animejs";

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, className }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Ensure spans are ready
    const targets = containerRef.current?.querySelectorAll(".letter");
    if (targets && targets.length > 0) {
      animate(targets, {
        translateY: [-20, 0], 
        opacity: [0, 1],
        filter: ['blur(10px)', 'blur(0px)'],
        easing: "easeOutExpo",
        duration: 1200,
        delay: stagger(30, { start: 300 })
      });
    }
  }, [text]);

  const letters = text.split("");

  return (
    <h1 className={`relative inline-block ${className}`} ref={containerRef} aria-label={text}>
      {letters.map((char, index) => (
        <span 
          key={index} 
          className="letter inline-block opacity-0"
          style={{ minWidth: char === ' ' ? '0.3em' : 'auto' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
};
