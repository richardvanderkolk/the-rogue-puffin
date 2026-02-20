import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Zap, BookOpen, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative px-6 pt-40 pb-32 md:pt-52 md:pb-40 overflow-hidden">
        {/* Subtle Background - Less blur, more clean space */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Headlines (Clean & Intelligent) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.95]">
              Learn faster. <br /> Understand more. <br /> Enjoy it.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed tracking-wide">
              Teaching you what they didn’t teach you at school.
            </p>
          </div>

          {/* Right Column: Rogue Session CTA Card (Premium & Practical) */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto group">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-2xl -z-10 transition-opacity duration-700 group-hover:opacity-75" />
            <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-8">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 bg-white/5 text-indigo-200 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">The Session</span>
                <h2 className="text-2xl font-medium text-white leading-snug">Let us prove that you can do more.</h2>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Increase your reading speed by <strong className="text-white font-medium">50-150%</strong> in just 30 minutes. Practical, measurable results.
              </p>

              <div className="pt-2">
                <Link
                  href="/rogue-session"
                  className="w-full block text-center px-6 py-4 bg-white text-black rounded-full font-medium text-base hover:bg-slate-200 transition-all active:scale-95"
                >
                  Start Session ($5)
                </Link>
                <p className="text-center text-slate-600 text-[10px] mt-3 flex items-center justify-center gap-1 uppercase tracking-wider">
                  <Shield className="w-3 h-3" /> Money-back guarantee
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
                <div className="text-center">
                  <p className="text-xl font-medium text-white">30</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Mins</p>
                </div>
                <div className="text-center border-l border-white/5">
                  <p className="text-xl font-medium text-white">2x</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Speed</p>
                </div>
                <div className="text-center border-l border-white/5">
                  <p className="text-xl font-medium text-white">100%</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Focus</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why It Matters (Spacious & Clean) */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div className="space-y-8 sticky top-32">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Why it Matters</h2>
              <div className="space-y-6">
                <p className="text-2xl text-indigo-300 font-light leading-normal">
                  Success in the age of information overload.
                </p>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  We live in a world where information doubles every few years, yet our processing methods haven't changed since elementary school.
                  <br /><br />
                  Learning faster isn't a hack—it's the new literacy.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <Clock className="text-indigo-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Reclaim Your Time</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Read books in days, not months. Finish work reports in half the time. Time is the one asset you can't buy more of.</p>
                </div>
              </div>
              <div className="group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <Zap className="text-indigo-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Deep Focus</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Fast reading requires flow. It eliminates the "mind wandering" that plagues slow readers and enhances comprehension.</p>
                </div>
              </div>
              <div className="group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <BookOpen className="text-indigo-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Better Retention</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Understanding comes from seeing the whole picture, not just individual words. See the forest, not just the trees.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Article Section: Insight / AI */}
      <section className="py-32 px-6 bg-slate-900/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em]">Latest Insight</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">AI & The Superpower Learning Style</h2>
          </div>

          <article className="prose prose-invert prose-lg mx-auto text-left py-8 border-y border-white/5">
            <p className="text-slate-300 font-light leading-loose">
              <span className="text-white font-medium">Coming Soon.</span> We are exploring how Artificial Intelligence can not only curate what you learn but adapt <em>how</em> you learn it. Imagine a system that translates complex material into your native "mental language"—whether that's visual, structural, or narrative.
            </p>
            <p className="text-slate-400 font-light leading-loose">
              The future of learning isn't just about accessing information; it's about personalized synthesis. Stay tuned for our deep dive into using AI to unlock your unique learning superpower.
            </p>
          </article>

          <div>
            <Link href="/blog" className="text-white border-b border-indigo-500 pb-1 hover:text-indigo-400 transition-colors">Read more articles</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-900 text-center text-slate-600 text-sm bg-black">
        <p>&copy; {new Date().getFullYear()} The Rogue Puffin. </p>
      </footer>
    </main>
  );
}
