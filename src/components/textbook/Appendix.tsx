import { Target, Zap, Activity } from "lucide-react";
import { ActionCheckbox } from "./ActionCheckbox";

export default function Appendix() {
    return (
        <div className="print:break-before-page pt-32" id="appendix">
            <h2 className="text-4xl sm:text-5xl font-black text-white print:text-slate-950 leading-tight mt-0 tracking-tight mb-16">
                Appendix: Foundational Concepts
            </h2>
            <div className="space-y-12 not-prose mb-12 items-start break-inside-avoid-page">
                <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 print:bg-indigo-100 flex items-center justify-center shrink-0">
                            <Target className="w-4 h-4 text-indigo-400 print:text-indigo-600" />
                        </div>
                        The 'Why' Vector
                    </h3>
                    <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                        <p>Do not start reading until the objective is explicitly defined. Reading for deep, conceptual expertise requires a drastically different ingestion strategy than reading for broad, surface-level familiarity.</p>
                        <p>Before you open the textbook, ask yourself: "Am I hunting for a specific fact, am I trying to understand a broad framework, or am I memorizing for a test?" This calibrates your brain's reticular activating system (RAS) to filter incoming data.</p>
                    </div>
                </div>

                <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl break-inside-avoid">
                    <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 print:bg-indigo-100 flex items-center justify-center shrink-0">
                            <Zap className="w-4 h-4 text-indigo-400 print:text-indigo-600" />
                        </div>
                        Sleep: The Ultimate Nootropic
                    </h3>
                    <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                        <p>The "all-nighter" is a biological delusion. When you learn, data is stored temporarily in the hippocampus. If you do not enter Deep Sleep that night, the data is never permanently written to your neocortex (Memory Consolidation).</p>
                        <p>Skipping sleep means you are literally erasing the information you just spent hours studying. 8 hours is non-negotiable for high-performance learning.</p>
                    </div>
                </div>

                <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl break-inside-avoid">
                    <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 print:bg-indigo-100 flex items-center justify-center shrink-0">
                            <Activity className="w-4 h-4 text-indigo-400 print:text-indigo-600" />
                        </div>
                        Defeating Procrastination
                    </h3>
                    <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                        <p>Procrastination is not a time-management issue; it is an emotion-regulation issue. Your brain is avoiding the anxiety of a massive task.</p>
                        <p>Use the <strong>5-Minute Rule</strong>: Commit to doing the task for just 5 minutes. The friction is always in the starting. Once you begin, the Zeigarnik effect (our brain's desire to finish what it starts) takes over.</p>
                    </div>
                </div>

                <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 p-6 rounded-2xl break-inside-avoid">
                    <h3 className="text-xl font-bold text-white print:text-slate-900 mb-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 print:bg-indigo-100 flex items-center justify-center shrink-0">
                            <Activity className="w-4 h-4 text-indigo-400 print:text-indigo-600" />
                        </div>
                        Creating the Deep Work Laboratory
                    </h3>
                    <div className="text-slate-400 print:text-slate-600 leading-relaxed text-sm space-y-3">
                        <p>Your phone drains your intelligence simply by being in the room. The act of ignoring it exhausts cognitive bandwidth. Your "Lab" must be a dedicated space with zero visual or digital distractions.</p>
                    </div>
                </div>
            </div>

            <div className="bg-indigo-950/40 print:bg-indigo-50/50 border border-indigo-500/30 print:border-indigo-200 p-8 rounded-2xl my-12 not-prose break-inside-avoid">
                <h3 className="text-indigo-400 print:text-indigo-700 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Immediate Action Step
                </h3>
                <ActionCheckbox 
                    id="phase_appendix" 
                    steps={[
                        "Set a non-negotiable 8-hour sleep schedule for tonight.",
                        "Identify one digital distraction in your current study environment and physically move it to another room.",
                        "Apply the 5-Minute Rule to the task you have been putting off the longest."
                    ]} 
                />
            </div>
        </div>
    );
}
