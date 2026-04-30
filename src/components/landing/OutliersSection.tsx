import Image from "next/image";
import { Quote } from "lucide-react";

export function OutliersSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6 mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-widest">
            The Outliers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            The ultimate unfair advantage.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            They didn't get to the top by working longer hours. They got there by aggressively compounding their knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Buffett */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 hover:bg-slate-900/80 transition-all duration-500 group relative shadow-xl">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-white/5 group-hover:text-indigo-500/10 transition-colors" />
            <div className="relative z-10 flex flex-col h-full">
              <p className="text-slate-300 text-lg leading-relaxed font-light italic mb-8 mt-4 flex-grow">
                "Read 500 pages like this every day. That's how knowledge works. It builds up, like compound interest. All of you can do it, but I guarantee not many of you will do it."
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-slate-900 relative">
                   <Image src="/assets/buffett.jpg" alt="Warren Buffett" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Warren Buffett</h4>
                  <p className="text-sm text-slate-500">CEO, Berkshire Hathaway</p>
                </div>
              </div>
            </div>
          </div>

          {/* Musk */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl hover:-translate-y-2 hover:border-indigo-500/30 hover:bg-slate-900/80 transition-all duration-500 group relative shadow-xl md:translate-y-8">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-white/5 group-hover:text-indigo-500/10 transition-colors" />
            <div className="relative z-10 flex flex-col h-full">
              <p className="text-slate-300 text-lg leading-relaxed font-light italic mb-8 mt-4 flex-grow">
                "I was raised by books. Books, and then my parents." <br/><br/>
                <span className="text-sm text-slate-500 not-italic">(When asked how he learned to build rockets)</span> "I read books."
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-slate-900 relative">
                   <Image src="/assets/musk.jpg" alt="Elon Musk" fill className="object-cover grayscale group-hover:grayscale-0 object-top transition-all duration-500" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Elon Musk</h4>
                  <p className="text-sm text-slate-500">CEO, SpaceX & Tesla</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gates */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 hover:bg-slate-900/80 transition-all duration-500 group relative shadow-xl">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-white/5 group-hover:text-indigo-500/10 transition-colors" />
            <div className="relative z-10 flex flex-col h-full">
              <p className="text-slate-300 text-lg leading-relaxed font-light italic mb-8 mt-4 flex-grow">
                "I really had a lot of dreams when I was a kid, and I think a great deal of that grew out of the fact that I had a chance to read a lot."
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-slate-900 relative">
                   <Image src="/assets/gates.jpg" alt="Bill Gates" fill className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500" />
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
    </section>
  );
}
