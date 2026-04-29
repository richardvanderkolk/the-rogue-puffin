import Link from "next/link";
import { PrintButton } from "@/components/ui/PrintButton";
import { Brain, Zap, Target, BookOpen, Clock, Activity, CheckCircle2, ChevronRight, X } from "lucide-react";
import { ActionCheckbox } from "@/components/textbook/ActionCheckbox";
import { StudyPlannerMatrix } from "@/components/textbook/StudyPlannerMatrix";
import { ViewToggle } from "@/components/textbook/ViewToggle";

export const metadata = {
    title: "The Digital Textbook | The Rogue Puffin",
    description: "The complete playbook for the Ready/Aim/Learn framework.",
};

export default function TextbookPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 font-sans mt-20 md:mt-0 pb-32">
            
            {/* WEB NAVBAR */}
            <div className="print:hidden w-full bg-slate-900 border-b border-white/10 sticky top-16 md:top-0 z-40 shadow-xl">
                <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white tracking-tight">The Living Playbook</h1>
                            <p className="text-xs text-slate-400">The Rogue Puffin Masterclass</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <Link href="/masterclass" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Back to Course
                        </Link>
                        <PrintButton />
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 print:px-0 print:mx-0 print:max-w-none">
                
                <ViewToggle />

                {/* --- COVER PAGE --- */}
                <div className="print:h-[297mm] print:w-full print:flex print:flex-col print:justify-center relative bg-slate-900/40 print:bg-white rounded-3xl print:rounded-none border border-white/10 print:border-none p-12 md:p-24 mt-12 print:mt-0 overflow-hidden print:break-after-page">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 print:bg-indigo-50 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full justify-center">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            <span className="text-sm font-bold text-indigo-400 uppercase tracking-[0.2em]">Official Playbook</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-black text-white print:text-slate-950 tracking-tighter leading-[1.1] mb-6">
                            The Cognitive<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 print:text-indigo-600">Cheat Code.</span>
                        </h1>
                        
                        <p className="text-xl text-slate-400 print:text-slate-600 max-w-2xl leading-relaxed mb-12 font-light">
                            The definitive guide to bypassing your biological limits, destroying subvocalization, and learning complex material faster than you ever thought possible.
                        </p>
                        
                        <div className="mt-auto pt-16 border-t border-white/10 print:border-slate-200 flex justify-between items-end">
                            <div>
                                <p className="text-sm font-bold text-white print:text-slate-900 tracking-widest uppercase mb-1">The Rogue Puffin</p>
                                <p className="text-xs text-slate-500">Learning Mastery</p>
                            </div>
                            <Brain className="w-12 h-12 text-slate-800 print:text-slate-200" />
                        </div>
                    </div>
                </div>

                {/* --- TABLE OF CONTENTS --- */}
                <div className="mt-20 print:h-[297mm] print:mt-0 print:p-24 print:break-after-page">
                    <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 border-b border-white/10 print:border-slate-200 pb-4">
                        Table of Contents
                    </h2>
                    
                    <div className="space-y-12">
                        {/* TOC Section 1 */}
                        <div>
                            <h3 className="text-2xl font-bold text-white print:text-slate-900 mb-6 flex items-center gap-3">
                                <Target className="w-6 h-6 text-indigo-400" /> Phase I: Ready
                            </h3>
                            <ul className="space-y-4 pl-9">
                                <li className="flex items-center gap-3 text-slate-300 print:text-slate-700">
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                    <span>The 'Why' Vector: Setting the target</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 print:text-slate-700">
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                    <span>Your Learning Superpower</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 print:text-slate-700">
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                    <span>Creating the Laboratory</span>
                                </li>
                            </ul>
                        </div>

                        {/* TOC Section 2 */}
                        <div>
                            <h3 className="text-2xl font-bold text-white print:text-slate-900 mb-6 flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-emerald-400" /> Phase II: Aim
                            </h3>
                            <ul className="space-y-4 pl-9">
                                <li className="flex items-center gap-3 text-slate-300 print:text-slate-700">
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                    <span>The 80/20 Rule of Expertise</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 print:text-slate-700">
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                    <span>Slicing the Elephant: Deconstruction</span>
                                </li>
                            </ul>
                        </div>

                        {/* TOC Section 3 */}
                        <div>
                            <h3 className="text-2xl font-bold text-white print:text-slate-900 mb-6 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-purple-400" /> Phase III: Learn
                            </h3>
                            <ul className="space-y-4 pl-9">
                                <li className="flex items-center gap-3 text-slate-300 print:text-slate-700">
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                    <span className="font-medium text-white print:text-slate-900">Bypassing the Speed Limit (The Engine)</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 print:text-slate-700">
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                    <span>The Feynman Matrix</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 print:text-slate-700">
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                    <span>Spaced Active Recall</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* --- CHAPTER CONTENT --- */}
                <div className="mt-32 print:mt-0 print:p-24 prose prose-invert print:prose-slate max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-p:leading-relaxed prose-p:text-slate-300 print:prose-p:text-slate-700 prose-strong:text-white print:prose-strong:text-slate-900">
                    
                    {/* --- INTRODUCTION --- */}
                    <div className="print:break-after-page mb-32">
                        <h5 className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-2 not-prose">Introduction</h5>
                        <h1 className="mt-0 mb-12">The Rules of the Game</h1>
                        
                        <p className="lead text-xl text-white print:text-slate-900 font-medium">The traditional school system lied to you. It wasn't intentional, but it was systematic. They taught you <em>what</em> to learn, but they never taught you <em>how</em> your brain actually acquires and stores information.</p>
                        
                        <h2>The "Cheat Code" Philosophy</h2>
                        <p>Most students try to brute-force their way through material by staring at pages for hours, hoping the information sticks. This is like trying to drive a car with the emergency brake on. You are fighting against your own biology.</p>
                        <p>This playbook is different. We are going to treat your brain like a mechanical engine. We are going to use specific, empirical "exploits" to bypass your biological bottlenecks (like subvocalization) and trigger rapid neuroplasticity. We work <em>with</em> your biology, not against it.</p>
                        
                        <div className="bg-indigo-950/40 print:bg-indigo-50 border border-indigo-500/30 print:border-indigo-200 p-8 rounded-2xl my-12 not-prose break-inside-avoid">
                            <h3 className="text-indigo-400 print:text-indigo-700 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> The 60-Second Proof
                            </h3>
                            <ActionCheckbox 
                                id="intro_proof" 
                                steps={[
                                    "Stare at the tip of your nose right now. Notice how everything else in your vision is blurry.",
                                    "Without moving your eyes, shift your attention to your peripheral vision. Notice how much information your brain is capturing even when you aren't looking directly at it.",
                                    "Realize that your brain can process a massive field of vision instantly, yet you restrict it to looking at one tiny word at a time when reading."
                                ]} 
                            />
                        </div>
                    </div>

                    {/* --- PHASE I: READY --- */}
                    <div className="print:break-after-page mb-32">
                        <h5 className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-2 not-prose">Phase I: Ready</h5>
                        <h1 className="mt-0 mb-12">Preparing the Machine</h1>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-6 not-prose mb-12 items-start">
                            <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl xl:col-start-1 xl:row-start-1">
                                <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 print:bg-indigo-100 flex items-center justify-center shrink-0">
                                        <Target className="w-4 h-4 text-indigo-400 print:text-indigo-600" />
                                    </div>
                                    The 'Why' Vector
                                </h3>
                                <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                                    <p>Do not start reading until the objective is explicitly defined. Reading for deep, conceptual expertise requires a drastically different ingestion strategy than reading for broad, surface-level familiarity.</p>
                                    <p>Before you open the textbook, ask yourself: "Am I hunting for a specific fact, am I trying to understand a broad framework, or am I memorizing for a test?" This is your 'Why' Vector. It calibrates your brain's reticular activating system (RAS) to filter incoming data.</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl xl:col-start-1 xl:row-start-2">
                                <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 print:bg-indigo-100 flex items-center justify-center shrink-0">
                                        <Zap className="w-4 h-4 text-indigo-400 print:text-indigo-600" />
                                    </div>
                                    Your Learning Superpower
                                </h3>
                                <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                                    <p>Are you struggling because the material is hard, or because the format of the material fights your biology?</p>
                                    <p>Do not force a visual method if your brain heavily favors spatial logic or debate. Identifying your dominant cognitive learning style drastically reduces your friction of comprehension. If you are auditory, use text-to-speech engines. If kinesthetic, pace the room.</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl xl:col-start-1 xl:row-start-3">
                                <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 print:bg-indigo-100 flex items-center justify-center shrink-0">
                                        <Activity className="w-4 h-4 text-indigo-400 print:text-indigo-600" />
                                    </div>
                                    Creating the Laboratory
                                </h3>
                                <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                                    <p>Context-dependent memory is a biological fact. If you study in your bed, your brain associates the material with sleep and relaxation. You must build a specific environment—your "Lab"—that is exclusively reserved for high-velocity learning.</p>
                                    <p>Clear the visual field. Remove the phone. Use noise-canceling headphones with consistent, non-lyrical background noise (like brown noise) to anchor your focus.</p>
                                </div>
                            </div>

                            <div className="self-center xl:col-start-2 xl:row-start-3">
                                <img src="/images/phase_1_lab.png" alt="Distraction-Free Laboratory" className="w-full rounded-3xl shadow-2xl border border-white/10 print:border-slate-200" />
                            </div>
                        </div>

                        <div className="bg-indigo-950/40 print:bg-indigo-50 border border-indigo-500/30 print:border-indigo-200 p-8 rounded-2xl my-12 not-prose break-inside-avoid">
                            <h3 className="text-indigo-400 print:text-indigo-700 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Immediate Action Step
                            </h3>
                            <ActionCheckbox 
                                id="phase1_ready" 
                                steps={[
                                    "Define a specific 'Why' Vector for your next study session (e.g., 'I need to extract 3 arguments about macroeconomics').",
                                    "Identify one distraction in your current study environment and permanently remove it.",
                                    "Set up a dedicated 'Lab' space that is only used for deep work."
                                ]} 
                            />
                        </div>
                    </div>

                    {/* --- PHASE II: AIM --- */}
                    <div className="print:break-after-page mb-32">
                        <h5 className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-2 not-prose">Phase II: Aim</h5>
                        <h1 className="mt-0 mb-12">Targeting the 80/20</h1>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-6 not-prose mb-12 items-start">
                            <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl xl:col-start-2 xl:row-start-1">
                                <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 print:bg-emerald-100 flex items-center justify-center shrink-0">
                                        <Target className="w-4 h-4 text-emerald-400 print:text-emerald-600" />
                                    </div>
                                    The 80/20 Rule of Expertise
                                </h3>
                                <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                                    <p>The Pareto Principle dictates that 80% of the value in any subject is derived from just 20% of the core concepts. The biggest mistake amateur learners make is treating every page of a textbook as equally important.</p>
                                    <p>Your goal is to become an apex predator for that 20%. You must scan the material to find the structural pillars before you attempt to learn the granular details.</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl xl:col-start-2 xl:row-start-2">
                                <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 print:bg-emerald-100 flex items-center justify-center shrink-0">
                                        <Activity className="w-4 h-4 text-emerald-400 print:text-emerald-600" />
                                    </div>
                                    Slicing the Elephant
                                </h3>
                                <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                                    <p>Complex subjects induce cognitive paralysis. You cannot learn "Organic Chemistry" in a single session. You must deconstruct the subject into micro-skills.</p>
                                    <p>Slicing the elephant means breaking the massive, intimidating topic into small, manageable chunks that can be mastered in 25-minute blocks.</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl xl:col-start-2 xl:row-start-3">
                                <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 print:bg-emerald-100 flex items-center justify-center shrink-0">
                                        <Zap className="w-4 h-4 text-emerald-400 print:text-emerald-600" />
                                    </div>
                                    Garbage In, Garbage Out
                                </h3>
                                <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                                    <p>Your output is entirely dependent on the quality of your input. Stop reading poorly formatted, dense academic papers if a high-quality visual explainer exists.</p>
                                    <p>Curate your inputs mercilessly. If a textbook is not working for you, switch your source material immediately.</p>
                                </div>
                            </div>

                            <div className="self-center xl:col-start-1 xl:row-start-2">
                                <img src="/images/phase_2_aim.png" alt="Slicing the Elephant" className="w-full rounded-3xl shadow-2xl border border-white/10 print:border-slate-200" />
                            </div>
                        </div>

                        <div className="bg-emerald-950/40 print:bg-emerald-50 border border-emerald-500/30 print:border-emerald-200 p-8 rounded-2xl my-12 not-prose break-inside-avoid">
                            <h3 className="text-emerald-400 print:text-emerald-700 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Immediate Action Step
                            </h3>
                            <ActionCheckbox 
                                id="phase2_aim" 
                                steps={[
                                    "Take your current subject and identify the 20% of concepts that will yield 80% of the test results.",
                                    "Break your next massive study block down into three specific, 25-minute micro-skills.",
                                    "Preview the landscape: spend 5 minutes scanning headings and bold text before reading the chapter."
                                ]} 
                            />
                        </div>
                    </div>

                    {/* --- PHASE III: LEARN --- */}
                    <h5 className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-2 not-prose">Phase III: Learn</h5>
                    <h1 className="mt-0 mb-12">Bypassing the Speed Limit</h1>

                    <div className="bg-slate-900 print:bg-slate-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-12 not-prose">
                        <p className="text-sm text-slate-300 print:text-slate-700 mb-2 font-bold uppercase tracking-widest">The Objective</p>
                        <p className="text-lg text-white print:text-slate-900">Destroy your internal reading voice to unlock raw visual ingestion speeds.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 not-prose mb-16 items-center">
                        <div className="order-2 lg:order-1">
                            <img src="/images/subvocalization.png" alt="Subvocalization vs Visual Processing" className="w-full rounded-3xl shadow-2xl border border-white/10 print:border-slate-200" />
                        </div>
                        <div className="space-y-10 order-1 lg:order-2">
                            <div>
                                <h3 className="text-2xl font-bold text-white print:text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-rose-500/20 print:bg-rose-100 flex items-center justify-center shrink-0">
                                        <X className="w-5 h-5 text-rose-400 print:text-rose-600" />
                                    </div>
                                    The Myth: Subvocalization
                                </h3>
                                <div className="text-slate-400 print:text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base">
                                    <p>You were probably taught to read by sounding out words aloud. As you grew older, the teacher told you to "read silently in your head."</p>
                                    <p>But here is the neurological flaw: your brain is still acting like you are speaking. Because you can only <em>speak</em> at about 200 to 250 words per minute, your reading speed is permanently capped.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white print:text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 print:bg-emerald-100 flex items-center justify-center shrink-0">
                                        <Brain className="w-5 h-5 text-emerald-400 print:text-emerald-600" />
                                    </div>
                                    The Science: Visual Processing
                                </h3>
                                <div className="text-slate-400 print:text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base">
                                    <p>Your eyes and brain process visual information instantly. When you look at a stop sign, you don't sound out "S-T-O-P" in your head—you instantly comprehend the meaning.</p>
                                    <p>By bypassing the vocal mechanism and routing words directly to your visual cortex, you can ingest entire sentences in the time it used to take you to "say" a single word.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2>The Protocol</h2>
                    <p>
                        To break the habit of subvocalization, you must force your eyes to move faster than your internal voice can keep up with.
                    </p>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 my-12 not-prose items-center">
                        <div>
                            <img src="/images/protocol_comic.png" alt="The 3-Step Fast Reading Protocol Comic" className="w-full rounded-3xl shadow-2xl border border-white/10 print:border-slate-200" />
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 print:bg-indigo-100 flex items-center justify-center shrink-0">
                                    <span className="text-indigo-400 print:text-indigo-700 font-black text-xl">1</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2">The Pacer</h3>
                                    <p className="text-slate-400 print:text-slate-600 leading-relaxed text-sm">
                                        Never read with your eyes alone. Your eyes are naturally drawn to motion. When looking at a static page, they jump around wildly (called <em>saccades</em>). You must use a physical pacer—a pen, your finger, or a digital cursor—to drag your eyes across the text at a smooth, continuous pace.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 print:bg-indigo-100 flex items-center justify-center shrink-0">
                                    <span className="text-indigo-400 print:text-indigo-700 font-black text-xl">2</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2">The Gear Shift</h3>
                                    <p className="text-slate-400 print:text-slate-600 leading-relaxed text-sm">
                                        When you start pacing, you will feel the urge to slow down so your inner voice can catch up. <strong>Do not let it.</strong> Force your pacer to move twice as fast as your comfort zone. Your comprehension will temporarily drop to zero. Keep dragging your eyes at maximum speed for two full minutes.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 print:bg-indigo-100 flex items-center justify-center shrink-0">
                                    <span className="text-indigo-400 print:text-indigo-700 font-black text-xl">3</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2">The Drop-In</h3>
                                    <p className="text-slate-400 print:text-slate-600 leading-relaxed text-sm">
                                        After two minutes, slow your pacer down to a speed that feels manageable. You will find that your new "comfortable" speed is significantly faster than your old baseline. Your brain has adapted to the faster visual input, leaving the slow internal voice behind.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-950/40 print:bg-indigo-50 border border-indigo-500/30 print:border-indigo-200 p-8 rounded-2xl my-12 not-prose break-inside-avoid">
                        <h3 className="text-indigo-400 print:text-indigo-700 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Immediate Action Step
                        </h3>
                        <ActionCheckbox 
                            id="chapter_1" 
                            steps={[
                                "Open a book you are currently reading.",
                                "Read for 1 minute normally to establish your baseline.",
                                "Use your finger as a pacer and run it under the text at double speed for 2 minutes.",
                                "Slow down slightly and read for 1 final minute. Notice the inner voice is silent."
                            ]} 
                        />
                    </div>

                    <div className="print:break-after-page mb-32">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 not-prose mb-12 items-start mt-20">
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-4xl font-bold text-white print:text-slate-900 mb-6">The Feynman Matrix</h1>
                                    <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl">
                                        <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-500/20 print:bg-purple-100 flex items-center justify-center shrink-0">
                                                <Brain className="w-4 h-4 text-purple-400 print:text-purple-600" />
                                            </div>
                                            Proving Comprehension
                                        </h3>
                                        <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                                            <p>Do not confuse recognizing a concept with understanding it. To prove you actually comprehend what you just read, you must deploy the Feynman Technique. Close the source material completely. Attempt to verbally explain what you just ingested as if you were teaching a bright 12-year-old child.</p>
                                            <p>Where you stumble, hesitate, or rely on complex jargon to cover up your ignorance is exactly where your knowledge gap exists. This creates a highly targeted feedback loop. Go back to the text and fix only those specific gaps.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h1 className="text-4xl font-bold text-white print:text-slate-900 mb-6">Spaced Active Recall</h1>
                                    <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl">
                                        <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-500/20 print:bg-purple-100 flex items-center justify-center shrink-0">
                                                <Clock className="w-4 h-4 text-purple-400 print:text-purple-600" />
                                            </div>
                                            The Illusion of Competence
                                        </h3>
                                        <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                                            <p>Rereading and highlighting create the "Illusion of Competence." Because the text is in front of you, your brain feels familiar with it, tricking you into thinking it's stored in long-term memory. It isn't.</p>
                                            <p>True memory formation requires biological struggle. You must close the book and force your brain to pull the answer from nothing. This physical struggle is what builds the neural pathway.</p>
                                            <p>Because memories decay exponentially over time (The Ebbinghaus Forgetting Curve), you must space these recall sessions out: 1 day later, 3 days later, 7 days later.</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-4xl font-bold text-white print:text-slate-900 mb-6">Advanced Memory Protocol</h1>
                                    <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl">
                                        <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-500/20 print:bg-purple-100 flex items-center justify-center shrink-0">
                                                <BookOpen className="w-4 h-4 text-purple-400 print:text-purple-600" />
                                            </div>
                                            Building the Palace
                                        </h3>
                                        <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                                            <p>When you have to memorize abstract lists (like cranial nerves, historical dates, or legal statutes), rote repetition is inefficient. The human brain evolved to remember physical spaces and vivid imagery, not abstract text.</p>
                                            <p>The Memory Palace technique anchors abstract facts to physical locations in a familiar room. By converting boring data into absurd, multi-sensory images and placing them around your childhood home or current bedroom, you can permanently store entire chapters of information in a single pass.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="self-start">
                                <img src="/images/phase_3_feynman.png" alt="The Feynman Matrix" className="w-full rounded-3xl shadow-2xl border border-white/10 print:border-slate-200" />
                            </div>
                        </div>

                        <div className="bg-purple-950/40 print:bg-purple-50 border border-purple-500/30 print:border-purple-200 p-8 rounded-2xl my-12 not-prose break-inside-avoid">
                            <h3 className="text-purple-400 print:text-purple-700 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Immediate Action Step
                            </h3>
                            <ActionCheckbox 
                                id="phase3_completion" 
                                steps={[
                                    "Close your textbook right now and try to explain the last chapter you read out loud to an imaginary 12-year-old.",
                                    "Schedule your next 3 Active Recall review sessions using the Study Planner Matrix.",
                                    "Pick 5 abstract facts you need to memorize and visualize placing ridiculous images representing them around your bedroom."
                                ]} 
                            />
                        </div>
                    </div>

                </div>

                {/* --- STUDY PLANNER MATRIX --- */}
                <StudyPlannerMatrix />

            </div>
        </main>
    );
}
