import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Zap, BookOpen, Shield, School, Rocket, Brain } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative px-6 pt-40 pb-16 md:pt-52 md:pb-24 overflow-hidden">
        {/* Subtle Background - Less blur, more clean space */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">

          {/* Left Column: Headlines (Clean & Intelligent) */}
          <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-8">
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tighter text-white leading-[0.95]">
              Learn faster. <br /> <span className="whitespace-nowrap">Understand more.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-lg mx-auto xl:mx-0 font-light leading-relaxed tracking-wide">
              Master the mechanics of learning in our Masterclass. By applying the latest findings in cognitive science, you will discover exactly how your brain processes information—and put into practice the most efficient methods for lasting comprehension and recall.
            </p>
          </div>

          {/* Right Column: Rogue Session CTA Card (Premium & Practical) */}
          <div className="relative w-full max-w-md mx-auto xl:mx-0 xl:ml-auto group">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-2xl -z-10 transition-opacity duration-700 group-hover:opacity-75" />
            <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-8">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 bg-white/5 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">The Reading Masterclass</span>
                <h2 className="text-2xl font-medium text-white leading-snug">Let us prove you are capable of far more than you think.</h2>
              </div>

              <div className="space-y-4">
                <p className="text-slate-300 text-sm font-medium">In 30 minutes, you'll fix the 3 things slowing your reading down:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">→</span>
                    <p className="text-slate-400 text-sm font-light leading-relaxed"><strong className="text-slate-300 font-medium">The voice in your head</strong> that forces you to read at speaking speed.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">→</span>
                    <p className="text-slate-400 text-sm font-light leading-relaxed"><strong className="text-slate-300 font-medium">Your eye movement</strong> that causes constant backtracking and wasted time.</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">→</span>
                    <p className="text-slate-400 text-sm font-light leading-relaxed"><strong className="text-slate-300 font-medium">Your comfort with speed</strong> so reading faster finally feels natural, not stressful.</p>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  href="/rogue-session/start"
                  className="w-full block text-center px-6 py-4 bg-white text-black rounded-full font-medium text-base hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Yes, please show me <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/5">
                <div className="text-center">
                  <BookOpen className="w-5 h-5 mx-auto text-slate-500 mb-2" />
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Abridged</p>
                </div>
                <div className="text-center border-l border-white/5">
                  <Zap className="w-5 h-5 mx-auto text-slate-500 mb-2" />
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Practical</p>
                </div>
                <div className="text-center border-l border-white/5">
                  <CheckCircle className="w-5 h-5 mx-auto text-slate-500 mb-2" />
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Proven</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* The Hook: The Core Mechanism */}
      <section className="py-16 md:py-24 px-6 border-t border-white/5 bg-slate-900/10">
        <div className="max-w-5xl mx-auto text-center space-y-16">

          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">The 3 Cognitive Bottlenecks.</h2>
            <p className="text-xl md:text-2xl text-indigo-300 font-light leading-relaxed">
              School taught you what to learn, not how. We fix the 3 mechanical errors holding your brain back:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
              <Zap className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">1. Subvocalization</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Most people physically speak words in their head as they read, mathematically capping their intake at 250 WPM. We train your literal eye muscles to bypass the inner voice entirely.
              </p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
              <Brain className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">2. The Forgetting Curve</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                By default, your short-term memory purges 80% of what you learn within 7 days. We utilize Active Recall and Spaced Repetition frameworks to systematically encode long-term data.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
              <BookOpen className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">3. Format Mismatches</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Textbooks assume one learning style fits everyone. We diagnose your exact learning profile (Kinesthetic, Visual, Practical) so you can process information in the exact format your brain prefers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Why It Matters (Spacious & Clean) */}
      <section className="py-16 md:py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div className="space-y-8 sticky top-32">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">We sell verifiable mechanisms.</h2>
              <div className="space-y-6">
                <p className="text-2xl text-indigo-300 font-light leading-normal">
                  No empty motivation. No "hacks".
                </p>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  When you understand the exact biology and cognitive algorithms of the human brain, learning doesn't have to feel like grinding against a brick wall.
                  <br /><br />
                  It becomes a purely mechanical process of efficient input and permanent storage.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <Clock className="text-indigo-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Faster Input (Speed)</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Transform how you consume information. Break the physical vocalization barrier and visually absorb textbooks in days rather than months.</p>
                </div>
              </div>
              <div className="group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <Shield className="text-indigo-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Permanent Storage (Retention)</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Never study the same chapter twice. Systematically move data from short-term RAM storage directly into long-term encyclopedic memory.</p>
                </div>
              </div>
              <div className="group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <School className="text-indigo-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Personalized Output (Competence)</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Stop fighting how your brain naturally learns. Diagnose your precise learning mode and instantly translate raw theory into actionable skill.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAGrid />

      {/* Philosophy Section (Moved from About Page) */}
      <section className="px-6 py-24 md:py-32 bg-slate-950 border-t border-slate-900">
        <div className="max-w-5xl mx-auto space-y-24 md:space-y-32">

          {/* Intro Heading */}
          <div className="text-center space-y-6 mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-widest">
              <Brain className="w-3 h-3" /> The Philosophy
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
              The Missing <br /> Subject<span className="text-indigo-500">.</span>
            </h2>
          </div>

          {/* Block 1: The Problem */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
            <div className="md:col-span-4 sticky top-32">
              <span className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mb-6 text-indigo-400">
                <School className="w-6 h-6" />
              </span>
              <h3 className="text-3xl font-bold text-white tracking-tight leading-none mb-4">The Gap in <br /> the System</h3>
              <div className="h-1 w-12 bg-indigo-500 rounded-full" />
            </div>
            <div className="md:col-span-8 md:pl-8 space-y-8 text-lg font-light leading-relaxed text-slate-300">
              <p>
                We spent 12-16 years in school. We were taught history, mathematics, biology, and literature. We were taught <strong className="text-white font-medium">what</strong> to learn.
              </p>
              <p>
                But remarkably, in all those years, many of us were never explicitly taught <strong className="text-white font-medium">how</strong> to learn.
              </p>
              <p className="text-slate-400 border-l-2 border-slate-800 pl-6 italic">
                We were taught to read by reading aloud in class. And once we could recognize words, the instruction stopped. We are adults walking around with 6-year-old reading habits.
              </p>
            </div>
          </div>

          {/* Block 2: The Solution */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
            <div className="md:col-span-4 sticky top-32">
              <span className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mb-6 text-indigo-400">
                <Zap className="w-6 h-6" />
              </span>
              <h3 className="text-3xl font-bold text-white tracking-tight leading-none mb-4">The Biological <br /> Truth</h3>
              <div className="h-1 w-12 bg-indigo-500 rounded-full" />
            </div>
            <div className="md:col-span-8 md:pl-8 space-y-8 text-lg font-light leading-relaxed text-slate-300">
              <p>
                For example, speed reading isn't magic. It's biology. It's about optimizing the intake mechanism of your brain—your eyes and your visual cortex.
              </p>
              <p>
                The human brain is a pattern-matching supercomputer. It is capable of processing visual information thousands of times faster than auditory information. Yet, by reading with an "inner voice" (subvocalization), we throttle this supercomputer down to the speed of speech.
              </p>
              <p>
                By removing the inefficiencies of subvocalization and regression, you don't just read faster. You enter a state of flow. Comprehension increases because your brain is finally receiving information at the speed it was designed to process it.
              </p>
            </div>
          </div>

        </div>
      </section>

      <CTAGrid />

    </main>
  );
}

function CTAGrid() {
  return (
    <section className="py-24 px-6 bg-slate-900/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Masterclass */}
        <div className="relative w-full group flex flex-col h-full">
          <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-2xl -z-10 transition-opacity duration-700 group-hover:opacity-75" />
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col flex-grow space-y-8">
            <div className="space-y-3 flex-grow">
              <span className="inline-block px-3 py-1 bg-white/5 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">Reading Masterclass</span>
              <h2 className="text-2xl font-medium text-white leading-snug">Let us prove you are capable of far more than you think.</h2>
              <p className="text-slate-400 text-sm leading-relaxed font-light mt-4">
                Once you see how easily you can double your reading speed without losing comprehension, you'll realize just how much more you can achieve. This masterclass takes roughly 30 minutes.
              </p>
            </div>

            <div className="pt-2 mt-auto">
              <Link
                href="/rogue-session/start"
                className="w-full text-center px-6 py-4 bg-white text-black rounded-full font-medium text-sm hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Start Reading Training <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>

        {/* Memory Course */}
        <div className="relative w-full group flex flex-col h-full">
          <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl blur-2xl -z-10 transition-opacity duration-700 group-hover:opacity-75" />
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col flex-grow space-y-8">
            <div className="space-y-3 flex-grow">
              <span className="inline-block px-3 py-1 bg-white/5 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">Memory Masterclass</span>
              <h2 className="text-2xl font-medium text-white leading-snug">You don't have a bad memory, you've not been taught how to use it.</h2>
              <p className="text-slate-400 text-sm leading-relaxed font-light mt-4">
                Experience the memory techniques used by world champions. You will be amazed at what you are capably of remembering when you know how! This masterclass takes about 45 minutes.
              </p>
            </div>

            <div className="pt-2 mt-auto">
              <Link
                href="/rogue-memory-session"
                className="w-full text-center px-6 py-4 bg-emerald-500 text-slate-950 rounded-full font-bold text-sm hover:bg-emerald-400 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Start Memory Training <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Learning Like a Genius */}
        <div className="relative w-full group flex flex-col h-full">
          <div className="absolute inset-0 bg-violet-500/5 rounded-3xl blur-2xl -z-10 transition-opacity duration-700 group-hover:opacity-75" />
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col flex-grow space-y-8">
            <div className="space-y-3 flex-grow">
              <span className="inline-block px-3 py-1 bg-white/5 text-violet-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">Learning Masterclass</span>
              <h2 className="text-2xl font-medium text-white leading-snug">Learn how to learn like a genius.</h2>
              <p className="text-slate-400 text-sm leading-relaxed font-light mt-4">
                Discover the mental models and study systems that the world's most effective learners use to master complex subjects quickly.
              </p>
            </div>

            <div className="pt-2 mt-auto">
              <Link
                href="/blog"
                className="w-full text-center px-6 py-4 bg-violet-500 text-white rounded-full font-medium text-sm hover:bg-violet-400 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Read the Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
