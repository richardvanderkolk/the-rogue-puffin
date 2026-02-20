import Image from "next/image";
import { cn } from "@/lib/utils";

interface MascotProps {
  className?: string;
  variant?: "standard" | "headshot"; // We can expand this as we get more assets
  size?: number;
}

export function Mascot({ className, variant = "standard", size = 150 }: MascotProps) {
  const src = variant === "headshot" ? "/assets/logo-icon.png" : "/assets/mascot.png";
  
  return (
    <div className={cn("relative shrink-0", className)}>
      <Image 
        src={src} 
        alt="The Rogue Puffin" 
        width={size} 
        height={size}
        className="object-contain drop-shadow-xl"
        priority
      />
    </div>
  );
}
