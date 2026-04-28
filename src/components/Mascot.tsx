import Image from "next/image";
import { cn } from "@/lib/utils";

interface MascotProps {
  className?: string;
  variant?: "standard" | "headshot"; // We can expand this as we get more assets
  size?: number;
}

export function Mascot({ className, variant = "standard", size = 150 }: MascotProps) {
  const src = "/assets/premium-logo.png";

  if (variant === "headshot") {
    return (
      <div className={cn("relative shrink-0 overflow-hidden bg-slate-950 rounded-full", className)}>
        <Image
          src={src}
          alt="The Rogue Puffin"
          width={size * 2}
          height={size * 2}
          className="absolute max-w-none w-[180%] h-[180%] top-[-10%] left-[-40%] object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div className={cn("relative shrink-0 overflow-hidden", className)}>
      <Image
        src={src}
        alt="The Rogue Puffin"
        width={size}
        height={size}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}
