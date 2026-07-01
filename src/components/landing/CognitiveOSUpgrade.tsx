"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Database, Map, Play, AlertCircle, RefreshCw, CheckCircle2, ShieldCheck } from "lucide-react";

interface UpgradeLayer {
  id: string;
  layerNum: string;
  icon: React.ReactNode;
  simpleTitle: string;
  scientificHeading: string;
  description: string;
  objectionQuestion: string;
  objectionAnswer: string;
  gradient: string;
  glowColor: string;
}

export function CognitiveOSUpgrade() {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const layers: UpgradeLayer[] = [
    {
      id: "input",
      layerNum: "Layer 01: Input",
      icon: <Eye className="w-6 h-6 text-indigo-400" />,
      simpleTitle: "Think-Reading (Visual)",
      scientificHeading: "Shift from Hearing Speed to Thinking Speed",
      description: "Right now, you read by pronouncing every word silently in your head. That caps your speed at standard speech (150-250 WPM). We train your eyes to see words like pictures, moving at the speed of thought (400-800+ WPM).",
      objectionQuestion: "Is this just skimming and losing understanding?",
      objectionAnswer: "No! Skimming skips words. This is visual chunking—seeing groups of words together. Because your brain processes visual images 60,000x faster than sounds, this keeps your mind fully focused and actually increases comprehension.",
      gradient: "from-indigo-500/10 to-indigo-500/0",
      glowColor: "group-hover:border-indigo-550/30"
    },
    {
      id: "storage",
      layerNum: "Layer 02: Storage",
      icon: <Database className="w-6 h-6 text-purple-400" />,
      simpleTitle: "The Memory Cabinet",
      scientificHeading: "Shift from the Forgetting Cycle to Permanent Storage",
      description: "When you read or study passively, facts pile up on a messy floor—causing you to forget 80% within 48 hours. We build mental filing systems (using memory hooks and spaced repetition) to store information permanently.",
      objectionQuestion: "What if I just have a naturally bad memory?",
      objectionAnswer: "There is no such thing as a bad memory, only an unorganized one. Your brain remembers pictures and layouts naturally. We teach you how to file text away visually so you can retrieve it instantly.",
      gradient: "from-purple-500/10 to-purple-500/0",
      glowColor: "group-hover:border-purple-550/30"
    },
    {
      id: "compression",
      layerNum: "Layer 03: Compression",
      icon: <Map className="w-6 h-6 text-emerald-400" />,
      simpleTitle: "The Treasure Map",
      scientificHeading: "Shift from Copying Texts to Smart Synthesis",
      description: "Writing pages of notes is like photocoping a whole book—it is slow and useless. We teach you to compile notes like 'treasure maps' (non-linear notes and the Feynman technique) that isolate core concepts in seconds.",
      objectionQuestion: "I hate note-taking, it is boring.",
      objectionAnswer: "Passive note-taking is boring. Active concept mapping turns studying into a fast, creative game. You only write what matters, meaning you study 5x faster and recall it perfectly during exams.",
      gradient: "from-emerald-500/10 to-emerald-500/0",
      glowColor: "group-hover:border-emerald-550/30"
    },
    {
      id: "engine",
      layerNum: "Layer 04: The Engine",
      icon: <Play className="w-6 h-6 text-amber-400" />,
      simpleTitle: "Zero-Willpower Habits",
      scientificHeading: "Shift from relying on Willpower to Easy Action Triggers",
      description: "Lifting a boulder takes raw strength. Pushing a rolling ball is easy. We show you how to structure daily habit triggers so learning has zero activation friction—no willpower required.",
      objectionQuestion: "I lack self-discipline and motivation.",
      objectionAnswer: "Discipline is a myth. Successful learners don't have higher willpower; they have lower activation friction. We build daily triggers (If-Then planning) into your routine so you execute automatically.",
      gradient: "from-amber-500/10 to-amber-500/0",
      glowColor: "group-hover:border-amber-550/30"
    }
  ];

  return (
    <section className="py-24 px-6 border-t border-white/5 bg-slate-950 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute right-1/4 top-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2 shadow-md">
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} /> Cognitive Operating System
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            How We Upgrade Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Entire Learning System</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            School taught you <span className="italic text-slate-300">what</span> to learn, but never <span className="italic text-slate-300">how</span>. Learning Mastery is a day-by-day protocol that installs a new processing framework in your brain.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {layers.map((layer) => {
            const isFlipped = flippedCardId === layer.id;
            return (
              <div 
                key={layer.id} 
                className="relative min-h-[300px] rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 flex flex-col justify-between overflow-hidden group hover:border-slate-750 transition-all duration-500 cursor-pointer"
                onClick={() => setFlippedCardId(isFlipped ? null : layer.id)}
              >
                {/* Visual Card Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${layer.gradient} opacity-40 transition-opacity duration-500 group-hover:opacity-60 pointer-events-none`} />

                <AnimatePresence mode="wait">
                  {!isFlipped ? (
                    // FRONT SIDE
                    <motion.div
                      key="front"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col justify-between relative z-10 space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{layer.layerNum}</span>
                          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800">
                            {layer.icon}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs text-indigo-400 font-black uppercase tracking-widest">{layer.simpleTitle}</div>
                          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">{layer.scientificHeading}</h3>
                          <p className="text-sm text-slate-400 font-light leading-relaxed pt-1">{layer.description}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center text-xs text-slate-500 group-hover:text-indigo-300 transition-colors">
                        <span>Tap to check skepticism/objections</span>
                        <RefreshCw className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-500" />
                      </div>
                    </motion.div>
                  ) : (
                    // BACK SIDE (Objection Flip)
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col justify-between relative z-10 space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Objection Addressed</span>
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                            <AlertCircle className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold text-white tracking-tight leading-snug">"{layer.objectionQuestion}"</h4>
                          <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 text-sm text-slate-300 leading-relaxed font-light">
                            {layer.objectionAnswer}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-indigo-500/20 flex justify-between items-center text-xs text-indigo-400 font-bold">
                        <span>Tap to return to overview</span>
                        <RefreshCw className="w-3.5 h-3.5 rotate-180" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Expectation Settings Box */}
        <div className="max-w-3xl mx-auto bg-indigo-950/20 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white tracking-tight">The Prerequisite & Expectation Settings:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-300 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Requires 12+ reading ability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Not a magic pill—requires practice</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Increases comprehension, not just WPM</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Read slow when you want, speed up when needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
