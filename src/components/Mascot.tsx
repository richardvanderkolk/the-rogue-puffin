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
    <div className={cn("relative shrink-0 bg-slate-50 p-2 rounded-2xl shadow-xl shadow-indigo-500/10 border border-slate-800", className)} data-theme-ignore>
      <Image
        src={src}
        alt="The Rogue Puffin"
        width={size}
        height={size}
        className="w-full h-full object-contain drop-shadow-xl"
        priority
      />
    </div>
  );
}
