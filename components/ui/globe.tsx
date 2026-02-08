import createGlobe from "cobe";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  
  // Track rotation state refs to avoid re-renders
  const phiRef = useRef(0);
  const thetaRef = useRef(0);
  
  // Drag state
  const pointerStart = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    let width = 0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6, 
      baseColor: [0.1, 0.1, 0.1], // Dark base for contrast
      markerColor: [0.1, 1, 0.5], // Initial Green
      glowColor: [0.1, 1, 0.5], // Initial Glow
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [51.5074, -0.1278], size: 0.05 }, // London
        { location: [35.6762, 139.6503], size: 0.07 }, // Tokyo
        { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
        { location: [19.0760, 72.8777], size: 0.06 }, // Mumbai
        { location: [1.3521, 103.8198], size: 0.04 }, // Singapore
        { location: [55.7558, 37.6173], size: 0.04 }, // Moscow
        { location: [-23.5505, -46.6333], size: 0.05 }, // Sao Paulo
        { location: [30.0444, 31.2357], size: 0.04 }, // Cairo
      ],
      onRender: (state) => {
        // Auto rotation only if not dragging
        if (!pointerStart.current) {
           phiRef.current += 0.005; // Slightly faster rotation
           thetaRef.current += 0.001; // Vertical drift
        }
        
        state.phi = phiRef.current;
        state.theta = thetaRef.current;
        state.width = width * 2
        state.height = width * 2
        
        // RGB Cycle for "Gaming Vibe"
        const hue = (Date.now() / 30) % 360;
        // Simple HSL to RGB conversion approximation for vibrant colors
        // Or just oscillating discrete values
        const t = Date.now() / 2000;
        const r = Math.sin(t) * 0.5 + 0.5;
        const g = Math.sin(t + 2) * 0.5 + 0.5;
        const b = Math.sin(t + 4) * 0.5 + 0.5;
        
        state.markerColor = [r, g, b];
        state.glowColor = [r * 0.5, g * 0.5, b * 0.5];
      },
    })
    
    setTimeout(() => canvasRef.current!.style.opacity = '1')
    return () => { 
      globe.destroy();
      window.removeEventListener('resize', onResize);
    }
  }, []);
  
  const updatePointer = (clientX: number, clientY: number) => {
    if (pointerStart.current) {
        const deltaX = clientX - pointerStart.current.x;
        const deltaY = clientY - pointerStart.current.y;
        
        // Adjust sensitivity
        phiRef.current += deltaX * 0.005;
        thetaRef.current += deltaY * 0.005;
        
        // Reset start to current for continuous delta
        pointerStart.current = { x: clientX, y: clientY };
    }
  }

  return (
    <div className={cn("relative w-full aspect-square max-w-[600px] mx-auto flex items-center justify-center", className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerStart.current = { x: e.clientX, y: e.clientY };
          canvasRef.current!.style.cursor = 'grabbing';
          (e.target as Element).setPointerCapture(e.pointerId);
        }}
        onPointerUp={(e) => {
          pointerStart.current = null;
          canvasRef.current!.style.cursor = 'grab';
          (e.target as Element).releasePointerCapture(e.pointerId);
        }}
        onPointerOut={() => {
           // Optional: clear if it escapes, but pointer capture should handle it
        }}
        onMouseMove={(e) => {
           updatePointer(e.clientX, e.clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) {
             updatePointer(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        style={{ 
          width: '100%', 
          height: '100%', 
          cursor: 'grab', 
          contain: 'layout paint size', 
          opacity: 0, 
          transition: 'opacity 1s ease',
          touchAction: 'none' 
        }}
      />
    </div>
  );
}
