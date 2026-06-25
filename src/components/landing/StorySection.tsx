import { Mascot } from "@/components/Mascot";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function StorySection() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-slate-950 border-t border-white/5 overflow-hidden">
      {/* Dynamic background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Story Text (7 cols on large screens) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Our Mission
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Why I Built <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  The Rogue Puffin.
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-indigo-300 font-semibold tracking-tight italic pt-2">
                "I was so angry that no one had ever taught me how to learn."
              </p>
            </div>

            <div className="space-y-6 text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              <p>
                When I went to school, they taught me *what* to learn, but they never taught me *how* to learn. It wasn't until I finished university that I stumbled upon speed reading, memory, and study systems. The sudden shift in my own learning capacity made me angry. Why had I spent so many years reading word-by-word, struggling, and forgetting 80% of it, when a few simple biological shifts could have changed everything?
              </p>
              
              <p>
                I started teaching these skills as a side business. Over time, I recognized that these foundational learning methods are still not taught in mainstream education. Yet, when I speak to students, the excitement is still the same: they are blown away when they realize they can double their reading speed and recall dense textbooks in minutes.
              </p>

              <p>
                I built the **Free 30-Minute Session** to show you instantly what is possible, and the **14-Day Bootcamp** to embed these visual and memory habits permanently so you can study with ease.
              </p>
            </div>

            {/* Signature Block */}
            <div className="flex items-center gap-4 pt-4">
              <Mascot
                variant="headshot"
                size={56}
                className="w-14 h-14 border border-indigo-500/20 shadow-inner"
              />
              <div>
                <p className="font-handwriting text-3xl text-indigo-300 leading-none mb-1">
                  Richard John
                </p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Founder, The Rogue Puffin
                </p>
              </div>
            </div>
          </div>

          {/* Graphical Side-Card (5 cols on large screens) */}
          <div className="lg:col-span-5 relative group">
            {/* Ambient card glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[360px] transform group-hover:-translate-y-1 transition-all duration-300">
              
              {/* Decorative Puffin watermark background */}
              <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <Image
                  src="/assets/puffin-perfect.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <span className="text-xl font-bold text-white">1k+</span>
                </div>
                
                <h3 className="text-xl font-bold text-white leading-snug">
                  Thousands have broken their old reading boundaries.
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed font-light">
                  Most people read at the speed of their inner voice—about 200 words per minute—capping their intake at how fast they can hear words. By training your eyes to scan chunks visually, you unlock your ability to read at the speed of thought, processing text directly without saying it out loud.
                </p>
              </div>

              <div className="pt-8 relative z-10">
                <Link
                  href="/rogue-session/start?v2=true&mode=assessment"
                  className="w-full group/btn relative py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-2xl font-bold text-base transition-all active:scale-[0.98] flex items-center justify-center text-center gap-2 shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] border border-indigo-400/20"
                >
                  Double my reading speed for Free
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
