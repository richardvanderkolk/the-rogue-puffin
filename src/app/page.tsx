import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Clock, Zap, BookOpen, Shield, School, Rocket, Brain, Quote } from "lucide-react";
import { headers } from "next/headers";
import { getCurrencyInfo } from "@/lib/currency";

export default async function Home() {
  const headersList = await headers();
  const country = headersList.get('x-vercel-ip-country');
  const { symbol } = getCurrencyInfo(country);

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 md:pt-[136px] pb-12 md:pb-16 overflow-hidden min-h-screen">
        {/* Subtle Background - Less blur, more clean space */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] -z-10" />

        <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-4 relative z-10">
          <div className="space-y-2 md:space-y-3">
            <div className="text-indigo-400 font-bold tracking-widest uppercase text-[10px] md:text-xs">Master the Mechanics of Learning</div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter text-white leading-tight md:leading-[1.1]">
              Learn faster. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 whitespace-nowrap">Understand more.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
              Apply verifiable cognitive science to instantly increase your understanding, reading speed and recall.
            </p>
          </div>
          
          <div className="flex justify-center pt-2">
            <Link
              href="/masterclass"
              className="group px-6 py-3 md:px-8 md:py-3.5 bg-indigo-500 text-white rounded-full font-bold text-sm md:text-base hover:bg-indigo-400 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/30 ring-4 ring-indigo-500/10 hover:ring-indigo-500/30"
            >
              Explore The Masterclass <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Before & After Visual Progression */}
        <div className="max-w-4xl mx-auto mt-6 md:mt-10 relative z-10 px-2 lg:px-0">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-2 md:p-3 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-center gap-3 w-full relative">
            
            {/* The Before */}
            <div className="flex-1 w-full relative group rounded-xl md:rounded-2xl overflow-hidden border border-white/5 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700">
              <div className="w-full relative aspect-video md:aspect-[16/10]">
                <Image src="/landing/hook_overload.png" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" alt="Overwhelmed student" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <p className="text-slate-300 text-xs md:text-sm font-medium tracking-wide">Information Overload</p>
              </div>
            </div>

            {/* The Arrow */}
            <div className="hidden md:flex shrink-0 -mx-8 z-20 flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-950 border border-white/10 shadow-xl flex items-center justify-center text-indigo-400 relative">
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-pulse" />
                <ArrowRight className="w-5 h-5 relative z-10" />
              </div>
            </div>

            {/* The After (Flow State) */}
            <div className="flex-1 w-full relative group rounded-xl md:rounded-2xl overflow-hidden border border-indigo-500/30 mt-2 md:mt-0 shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]">
              <div className="w-full relative aspect-video md:aspect-[16/10]">
                <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay z-10 pointer-events-none" />
                <Image src="/landing/hero_flow_v2.png" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-1000" alt="Mastery and Flow State" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="absolute bottom-3 left-3 bg-indigo-950/90 backdrop-blur-md border border-indigo-500/30 px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] animate-pulse" />
                <p className="text-white text-xs md:text-sm font-medium tracking-wide">Learning Mastery</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* The Outliers / Start with Why */}
      <OutliersSection />

      {/* The Hook: Information Overload vs Exponential Growth */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-slate-900/10">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Unlock the hidden mechanics of your mind.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Your brain already possesses the raw processing power to master any subject, book, or skill. By upgrading your approach to learning, you unlock a completely new level of potential.</p>
          </div>
            
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <div className="flex gap-4">
              <span className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 font-bold">1</span>
              <div>
                <h3 className="text-xl font-medium text-slate-100 mb-2">The Foundation</h3>
                <p className="text-slate-400 font-light leading-relaxed">Understand the elegant cognitive science behind neuroplasticity and memory to build a reliable, permanent framework for your intelligence.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <span className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 font-bold">2</span>
              <div>
                <h3 className="text-xl font-medium text-slate-100 mb-2">The Advantage</h3>
                <p className="text-slate-400 font-light leading-relaxed">By optimizing your natural intake mechanisms, you read faster, focus deeper, and achieve a permanent, unfair advantage in your career and life.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why It Matters (Spacious & Clean) */}
      <section className="py-16 md:py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div className="space-y-8 md:sticky top-32">
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

            <div className="space-y-16">
              <div className="group">
                <div className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden mb-6 border border-white/5 shadow-2xl bg-slate-900">
                   <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
                   <Image src="/landing/time_aspect.png" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" alt="Reclaim Your Time" />
                   <div className="absolute top-4 left-4 z-20 w-12 h-12 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                     <Clock className="text-indigo-400 w-5 h-5" />
                   </div>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-3">Reclaim Your Time</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-light">Read books in days, not months. Finish work reports in half the time. Time is the one asset you can't buy more of.</p>
                </div>
              </div>

              <div className="group">
                <div className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden mb-6 border border-white/5 shadow-2xl bg-slate-900">
                   <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
                   <Image src="/landing/focus_aspect.png" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" alt="Deep Focus" />
                   <div className="absolute top-4 left-4 z-20 w-12 h-12 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                     <Zap className="text-indigo-400 w-5 h-5" />
                   </div>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-3">Deep Focus</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-light">Fast reading requires flow. It eliminates the "mind wandering" that plagues slow readers and enhances comprehension.</p>
                </div>
              </div>

              <div className="group">
                <div className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden mb-6 border border-white/5 shadow-2xl bg-slate-900">
                   <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
                   <Image src="/landing/recall_aspect.png" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" alt="Better Retention" />
                   <div className="absolute top-4 left-4 z-20 w-12 h-12 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                     <BookOpen className="text-indigo-400 w-5 h-5" />
                   </div>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-3">Better Retention</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-light">Understanding comes from seeing the whole picture, not just individual words. See the forest, not just the trees.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAGrid symbol={symbol} />

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
            <div className="md:col-span-4 md:sticky top-32">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8 order-2 md:order-1">
              <div>
                <span className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mb-6 text-indigo-400">
                  <Zap className="w-6 h-6" />
                </span>
                <h3 className="text-3xl font-bold text-white tracking-tight leading-none mb-4">The Biological Truth</h3>
                <div className="h-1 w-12 bg-indigo-500 rounded-full mb-8" />
              </div>

              <div className="space-y-6 text-lg font-light leading-relaxed text-slate-300">
                <p>Speed reading isn't magic. It's about optimizing the biological intake mechanism of your brain.</p>
                
                <ul className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                  <li className="flex gap-3">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span className="text-base"><strong className="text-white font-medium">The Old Way:</strong> Eye → Mouth → Ear → Brain. (Throttled to speaking speed)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span className="text-base"><strong className="text-white font-medium">The Rogue Way:</strong> Eye → Brain. (Processed at the speed of thought)</span>
                  </li>
                </ul>

                <p>By removing inefficiencies, comprehension increases as your brain receives information at the speed it was designed to process it.</p>
              </div>
            </div>

            {/* Right Column: Brain Image */}
            <div className="relative aspect-[5/4] w-full max-w-md mx-auto md:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-white/10 group order-1 md:order-2">
              <div className="absolute inset-0 bg-slate-900/40 mix-blend-overlay z-10 pointer-events-none" />
              <Image 
                src="/landing/philosophy_brain.png"
                alt="Direct visual processing mechanics from eye to brain"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

          </div>

        </div>
      </section>

      <CTAGrid symbol={symbol} />

    </main>
  );
}

function CTAGrid({ symbol = "$" }: { symbol?: string }) {
  return (
    <section className="py-24 px-6 bg-slate-900/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Abridged Masterclass */}
        <div className="relative w-full group flex flex-col h-full">
          <div className="absolute inset-0 bg-violet-500/5 rounded-3xl blur-2xl -z-10 transition-opacity duration-700 group-hover:opacity-75" />
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col flex-grow space-y-8">
            <div className="space-y-3 flex-grow">
              <span className="inline-block px-3 py-1 bg-white/5 text-violet-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">Abridged Masterclass</span>
              <h2 className="text-2xl font-medium text-white leading-snug">The foundational principles of neuroplasticity.</h2>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2.5 py-1 bg-violet-500/20 text-violet-300 text-xs font-bold rounded-lg border border-violet-500/20 shadow-sm">Free</span>
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">6-Step Protocol</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-light mt-4">
                Discover the 6-step study system that the world's most effective learners use to master complex subjects quickly. Start your journey here.
              </p>
            </div>

            <div className="pt-2 mt-auto">
              <Link
                href="/abridged"
                className="w-full text-center px-6 py-4 bg-violet-500 text-white rounded-full font-medium text-sm hover:bg-violet-400 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Start Free Course <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Masterclass */}
        <div className="relative w-full group flex flex-col h-full">
          <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-2xl -z-10 transition-opacity duration-700 group-hover:opacity-75" />
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col flex-grow space-y-8">
            <div className="space-y-3 flex-grow">
              <span className="inline-block px-3 py-1 bg-white/5 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">Reading Masterclass</span>
              <h2 className="text-2xl font-medium text-white leading-snug">Let us prove you are capable of far more than you think.</h2>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2.5 py-1 bg-white/10 text-white text-xs font-bold rounded-lg border border-white/10 shadow-sm">{symbol}5.00</span>
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">One-time payment</span>
              </div>
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
              <h2 className="text-2xl font-medium text-white leading-snug">Discover a memory capacity you never knew you had.</h2>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/20 shadow-sm">{symbol}5.00</span>
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">One-time payment</span>
              </div>
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

      </div>
    </section>
  );
}

function OutliersSection() {
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
