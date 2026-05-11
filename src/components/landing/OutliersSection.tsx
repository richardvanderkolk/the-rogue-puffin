import Image from "next/image";
import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

export function OutliersSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />
      
      {/* 1. The Competitive Edge */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest">
              The Competitive Edge
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Build Knowledge Like <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Compound Interest.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              In a world drowning in noise, those who can process information fastest win. President JFK used speed reading to consume 6 newspapers before breakfast. Now, you can use those same neurological protocols to stay ahead of the curve.
            </p>
            <Link 
                href="/rogue-session/start?v2=true" 
                className="inline-flex px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-slate-200 transition-all active:scale-95 items-center gap-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
            >
                Unlock My Competitive Edge <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="relative">
            {/* Buffett Card */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10">
              <Quote className="absolute top-8 left-8 w-16 h-16 text-white/5" />
              <div className="relative z-10">
                <p className="text-slate-300 text-xl md:text-2xl leading-relaxed font-light italic mb-10 mt-4">
                  "Read 500 pages like this every day. That's how knowledge works. It builds up, like compound interest. All of you can do it, but I guarantee not many of you will do it."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white/10 bg-slate-900 relative">
                     <Image src="/assets/buffett.jpg" alt="Warren Buffett" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Warren Buffett</h4>
                    <p className="text-sm text-slate-500">CEO, Berkshire Hathaway</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-[2.5rem] blur-2xl -z-10 opacity-50" />
          </div>
        </div>
      </div>

      {/* 2. Leadership & Growth */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest">
              Leadership & Growth
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Leadership and Learning are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Indispensable.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              From Tony Robbins reading 700 books in 7 years to Elon Musk "downloading" expertise, the world's most impactful people are voracious readers. Speed reading isn't just about finishing a book—it's about becoming the person who has the answers first.
            </p>
            <div className="pt-4">
                <Link 
                    href="/rogue-session/start?v2=true" 
                    className="inline-flex px-8 py-4 bg-slate-800 text-white rounded-full font-bold text-lg hover:bg-slate-700 transition-all active:scale-95 items-center gap-3 border border-slate-700"
                >
                    Start Reading Like a Leader <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:order-1 relative">
             <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-[2.5rem] blur-2xl -z-10 opacity-50" />
             
             {/* Musk Card */}
             <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300">
               <div className="flex flex-col h-full">
                 <p className="text-slate-300 text-lg leading-relaxed font-light italic mb-6">
                   "I was raised by books. Books, and then my parents." <br/>
                   <span className="text-sm text-slate-500 not-italic">(When asked how he learned to build rockets)</span> "I read books."
                 </p>
                 <div className="flex items-center gap-4 mt-auto">
                   <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-slate-900 relative">
                      <Image src="/assets/musk.jpg" alt="Elon Musk" fill className="object-cover object-top" />
                   </div>
                   <div>
                     <h4 className="text-white font-medium">Elon Musk</h4>
                     <p className="text-sm text-slate-500">CEO, SpaceX & Tesla</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Gates Card */}
             <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 lg:translate-x-8">
               <div className="flex flex-col h-full">
                 <p className="text-slate-300 text-lg leading-relaxed font-light italic mb-6">
                   "I really had a lot of dreams when I was a kid, and I think a great deal of that grew out of the fact that I had a chance to read a lot."
                 </p>
                 <div className="flex items-center gap-4 mt-auto">
                   <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-slate-900 relative">
                      <Image src="/assets/gates.jpg" alt="Bill Gates" fill className="object-cover object-top" />
                   </div>
                   <div>
                     <h4 className="text-white font-medium">Bill Gates</h4>
                     <p className="text-sm text-slate-500">Co-founder, Microsoft</p>
                   </div>
                 </div>
               </div>
             </div>

          </div>

        </div>
      </div>

    </section>
  );
}
