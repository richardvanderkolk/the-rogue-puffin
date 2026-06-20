import Link from "next/link";
import { Brain, Search, Map, Anchor, MessageSquare, Repeat, Zap } from "lucide-react";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata = {
    title: "The 7-Step Protocol Checklist | The Rogue Puffin",
    description: "Your printable cheat sheet for mastering complex subjects.",
    robots: {
        index: false,
        follow: false,
    }
};

export default function ProtocolChecklistPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 font-sans mt-20 md:mt-0 pb-20">
            
            {/* --- WEB ONLY: Navigation & Print Toolbar --- */}
            <div className="print:hidden w-full bg-slate-900 border-b border-white/10 sticky top-16 md:top-0 z-40">
                <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                            <Brain className="w-4 h-4 text-indigo-400" />
                        </div>
                        <h1 className="font-bold text-white tracking-tight">The 7-Step Protocol</h1>
                    </div>
                    
                    <div className="flex gap-4">
                        <PrintButton />
                    </div>
                </div>
            </div>

            {/* --- A4 DOCUMENT PAGE CONTAINER --- */}
            {/* We force exact color matching for printing so backgrounds render. */}
            <div 
                className="max-w-5xl mx-auto p-4 sm:p-8 xl:p-12 print:p-0 print:m-0"
                style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
            >
                <div className="print:h-[290mm] print:w-full bg-[#f8fafc] sm:rounded-3xl shadow-2xl relative overflow-hidden flex flex-col print:rounded-none print:shadow-none border border-slate-200">
                    
                    {/* DESIGNER HEADER (DARK) */}
                    <header className="bg-slate-950 text-white px-8 sm:px-12 py-10 print:py-8 flex justify-between items-end relative overflow-hidden shrink-0">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/30 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/2"></div>
                        <div className="absolute top-0 right-8 w-24 h-full bg-white/[0.02] -skew-x-[20deg] origin-bottom scale-y-150"></div>
                        
                        <div className="relative z-10 w-full flex justify-between items-end">
                            <div>
                                <div className="flex gap-2 items-center mb-4">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em]">Official Directive</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-2 leading-none">
                                    The Protocol.
                                </h1>
                                <p className="text-slate-400 font-medium max-w-lg leading-relaxed text-sm">
                                    The empirical 7-step framework for mastering high-complexity material in record time. Execute sequentially.
                                </p>
                            </div>
                            
                            {/* Logo / Brand Watermark */}
                            <div className="text-right hidden sm:block relative z-10 mb-1">
                                <h2 className="text-sm font-black tracking-widest text-white uppercase">The Rogue Puffin</h2>
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium mt-1">Learning Mastery</p>
                            </div>
                        </div>
                    </header>

                    {/* MAIN CHECKLIST CONTENT - 2 COLUMN GRID */}
                    <div className="px-8 sm:px-12 py-10 flex-1 bg-white print:bg-white text-slate-900 grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-12 gap-y-10 sm:gap-y-12">
                        
                        {/* STEP 1 */}
                        <div className="group break-inside-avoid">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg shrink-0">
                                    <span className="text-white font-black text-lg">1</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-slate-950">Define the 'Why' Vector</h3>
                            </div>
                            <div className="pl-14">
                                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                    Do not start reading until the objective is explicitly defined. Reading for deep expertise requires drastically different ingestion than reading for broad familiarity.
                                </p>
                                <div className="bg-slate-50 text-xs text-slate-500 p-3 rounded-md border border-slate-100 font-medium">
                                    <strong>ACTION:</strong> Write the objective on a physical sticky note before page 1.
                                </div>
                            </div>
                        </div>

                        {/* STEP 2 */}
                        <div className="group break-inside-avoid">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg shrink-0">
                                    <span className="text-white font-black text-lg">2</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-slate-950">Identify Your Learning Style</h3>
                            </div>
                            <div className="pl-14">
                                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                    Do not force a visual method if your brain favors spatial logic or debate. Identifying your dominant cognitive learning style drastically reduces your friction of comprehension.
                                </p>
                                <div className="bg-slate-50 text-xs text-slate-500 p-3 rounded-md border border-slate-100 font-medium">
                                    <strong>ACTION:</strong> Align your study inputs precisely with your strongest sensory pathway.
                                </div>
                            </div>
                        </div>

                        {/* STEP 3 */}
                        <div className="group break-inside-avoid">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg shrink-0">
                                    <span className="text-white font-black text-lg">3</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-slate-950">Preview the Landscape</h3>
                            </div>
                            <div className="pl-14">
                                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                    You do not build a puzzle by picking up piece #1 and staring at it. You look at the picture on the box to get an overview first. 
                                </p>
                                <div className="bg-slate-50 text-xs text-slate-500 p-3 rounded-md border border-slate-100 font-medium">
                                    <strong>ACTION:</strong> Scan headings, indexes, and bold terms to find the structural 80/20 before reading linearly.
                                </div>
                            </div>
                        </div>

                        {/* STEP 4 */}
                        <div className="group break-inside-avoid relative">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)] shrink-0">
                                    <span className="text-white font-black text-lg">4</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-indigo-600">Rapid Ingestion (Engine)</h3>
                            </div>
                            <div className="pl-14 border-l-2 border-indigo-100 ml-[18px]">
                                <p className="text-slate-600 text-sm leading-relaxed mb-3 pl-3">
                                    Consume visually. Subvocalization (reading words in your head) artificially caps your speed at ~250 WPM. Your brain processes visual input infinitely faster.
                                </p>
                                <div className="ml-3 bg-slate-50 text-xs text-slate-500 p-3 rounded-md border border-slate-100 font-medium">
                                    <strong>ACTION:</strong> Use a visual pacer to force the brain into intake-mode.
                                </div>
                            </div>
                        </div>

                        {/* STEP 5 */}
                        <div className="group break-inside-avoid">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg shrink-0">
                                    <span className="text-white font-black text-lg">5</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-slate-950">Feynman Brain Dump</h3>
                            </div>
                            <div className="pl-14">
                                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                    Close the source material. Attempt to verbally explain what you just ingested as if you were teaching a bright 12-year-old child.
                                </p>
                                <div className="bg-slate-50 text-xs text-slate-500 p-3 rounded-md border border-slate-100 font-medium">
                                    <strong>ACTION:</strong> Where you stumble or use complex jargon is exactly where your knowledge gap exists.
                                </div>
                            </div>
                        </div>

                        {/* STEP 6 */}
                        <div className="group break-inside-avoid relative">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)] shrink-0">
                                    <span className="text-white font-black text-lg">6</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-indigo-600">Advanced Memory Protocol</h3>
                            </div>
                            <div className="pl-14 border-l-2 border-indigo-100 ml-[18px]">
                                <p className="text-slate-600 text-sm leading-relaxed mb-3 pl-3">
                                    Experience the exact visualization routines used by memory champions to permanently store information by anchoring abstract concepts to familiar spatial environments.
                                </p>
                                <div className="ml-3 bg-slate-50 text-xs text-slate-500 p-3 rounded-md border border-slate-100 font-medium">
                                    <strong>ACTION:</strong> Encode your knowledge into a physical memory palace.
                                </div>
                            </div>
                        </div>

                        {/* STEP 7 */}
                        <div className="group break-inside-avoid relative md:col-span-2 max-w-2xl mx-auto w-full mt-4">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg shrink-0">
                                    <span className="text-white font-black text-lg">7</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-slate-950">Spaced Active Recall</h3>
                            </div>
                            <div className="pl-14">
                                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                    Rereading creates the "Illusion of Competence." True memory formation requires the physical struggle of pulling the answer from memory.
                                </p>
                                <div className="bg-slate-50 text-xs text-slate-500 p-3 rounded-md border border-slate-100 font-medium">
                                    <strong>ACTION:</strong> Recall facts precisely 1 day, 3 days, and 7 days later.
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    {/* DESIGNER FOOTER */}
                    <div className="bg-slate-50 border-t border-slate-200 px-8 py-6 mt-auto shrink-0 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <div>theroguepuffin.com</div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-3 h-3 text-indigo-400" /> Print Version 1.0
                        </div>
                    </div>
                </div>

                {/* --- WEB ONLY: The Trojan Horse Upsell --- */}
                <div className="mt-20 print:hidden bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 sm:p-16 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6">
                            <Zap className="w-8 h-8 text-indigo-400" />
                        </div>
                        <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">Step 4 requires the Engine</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Stop slowly reading every word.</h2>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                            You now have the framework. But your biological reading engine is still running at 200 Words Per Minute. Break the plateau with the 30-Minute Speed Diagnostic.
                        </p>
                        
                        <Link 
                            href="/rogue-session/start"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white hover:bg-slate-100 text-indigo-950 rounded-full font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                        >
                            Start The Reading Drill
                            <span className="bg-indigo-100/50 text-indigo-900 px-3 py-1 rounded-full text-sm ml-2">$5.00</span>
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
