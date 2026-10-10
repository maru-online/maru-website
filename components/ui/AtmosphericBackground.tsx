"use client";

import { CloudWireframe } from "@/components/ui/CloudWireframe";
import { WireframePolyhedron } from "@/components/ui/WireframePolyhedron";
import { cn } from "@/lib/utils";

interface AtmosphericBackgroundProps {
  variant?: "hero" | "overlay" | "sidebar" | "subtle" | "default";
  className?: string;
  theme?: "light" | "dark";
}

export function AtmosphericBackground({ variant = "hero", className }: AtmosphericBackgroundProps) {
  const strokeColor = "text-[var(--color-cyan-primary)]"; // Maru Brand Cyan

  if (variant === "overlay") {
    // ... existing overlay code ...
    return (
      <div className={cn("hidden sm:block absolute inset-0 pointer-events-none overflow-hidden select-none", className)}>
        <div className="absolute top-[-20%] right-[-10%] scale-[0.8] origin-top-right opacity-50">
           <div className="absolute top-0 right-0 w-[800px] h-[600px]">
              <CloudWireframe 
                 className={cn("w-full h-full rotate-12", strokeColor)} 
                 duration={40} 
                 delay={0} 
                 strokeWidth={1.2} 
                 showNodes={true}
                 opacity={0.5}
              />
           </div>
           <div className="absolute top-[10%] right-[20%] w-[900px] h-[700px] -z-10">
              <CloudWireframe 
                 className={cn("w-full h-full -rotate-6", strokeColor)} 
                 duration={50} 
                 delay={2}
                 opacity={0.4}
              />
           </div>
        </div>
      </div>
    );
  }

  if (variant === "sidebar" || variant === "subtle") {
    // Sidebar/Subtle: Side/Vertical flow (for inner pages)
    return (
      <div className={cn("hidden sm:block absolute inset-y-0 right-0 w-[50%] pointer-events-none overflow-hidden select-none", className)}>
        <div className="absolute top-[10%] right-[-10%] opacity-40">
           <CloudWireframe 
              className={cn("w-[600px] h-[400px] -rotate-45", strokeColor)} 
              duration={45} 
              delay={0}
              strokeWidth={1}
           />
        </div>
        <div className="absolute bottom-[20%] right-[-5%] opacity-30">
           <CloudWireframe 
              className={cn("w-[700px] h-[500px] rotate-12", strokeColor)} 
              duration={55} 
              delay={3}
              strokeWidth={0.8}
           />
        </div>
      </div>
    );
  }

  // Hero / Default: Single dominant dodecahedron — top-right corner
  return (
    <div className={cn("hidden sm:block absolute inset-0 pointer-events-none overflow-hidden select-none", className)}>
      {/* Top-right: large, center ~(1300px, 250px) on 1440px — dominant corner piece */}
      <div className="absolute" style={{ top: "-210px", right: "-330px" }}>
        <WireframePolyhedron
          size={920}
          color="rgb(130, 130, 130)"
          strokeWidth={2.64}
          opacity={0.9}
          speedX={0.0006}
          speedY={0.0013}
          speedZ={0.0003}
          initY={0.5}
        />
      </div>
    </div>
  );
}
