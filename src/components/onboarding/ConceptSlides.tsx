"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Search, Sparkles, Eye, Clock, TrendingUp, Zap } from "lucide-react";

// --- Shared Slide Component ---
export function Slide({ title, children, icon, onNext, onBack, customButtonText }: { title: string, children: React.ReactNode, icon?: React.ReactNode, onNext: () => void, onBack?: () => void, customButtonText?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center w-full max-w-5xl mx-auto h-full max-h-[85vh] px-4"
        >
            <div className="flex-shrink-0 flex flex-col items-center mb-1">
                {icon && <div className="p-4 bg-slate-900 rounded-full border border-slate-800 mb-4">{icon}</div>}
                <div className="h-24 flex items-center justify-center flex-shrink-0 px-4">
                    <h2 className="text-2xl md:text-5xl font-bold font-heading text-white leading-tight">{title}</h2>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto w-full flex flex-col items-center min-h-0">
                <div className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl space-y-6 w-full">
                    {children}
                </div>
            </div>

            <div className="flex-shrink-0 mt-6 mb-2 pt-4 bg-gradient-to-t from-slate-950 to-transparent w-full flex justify-center items-center gap-4 relative">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="absolute left-0 p-4 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5 z-50"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-8 h-8" />
                    </button>
                )}
                <button onClick={onNext} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 transition-all flex items-center gap-2 group shadow-lg shadow-indigo-900/50">
                    {customButtonText || "Next"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}

// --- F Exercise Components ---
export function IntroductionToFs({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    const [phase, setPhase] = useState<'intro' | 'interactive' | 'reveal'>('intro');

    const handleNext = () => {
        if (phase === 'intro') setPhase('interactive');
        else if (phase === 'interactive') setPhase('reveal');
        else onNext();
    };

    const handleBack = () => {
        if (phase === 'reveal') setPhase('interactive');
        else if (phase === 'interactive') setPhase('intro');
        else onBack();
    };

    return (
        <AnimatePresence mode="wait">
            {phase === 'intro' ? (
                <Slide key="intro" title="How Many Times Does The Letter 'F' Appear?" icon={<Search className="w-12 h-12 text-blue-400" />} onNext={handleNext} onBack={handleBack}>
                    <div className="space-y-8 max-w-2xl mx-auto">
                        <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 space-y-6">
                            <p className="text-lg text-slate-300">We're going to show you a short text on the next screen.</p>
                            <p className="text-xl text-white">Your job is to count how many times the letter <strong className="text-blue-400 text-2xl">'F'</strong> appears.</p>
                        </div>
                        <p className="text-2xl font-semibold text-center text-slate-200">Are you ready?</p>
                    </div>
                </Slide>
            ) : (
                <FSlide key="f-slide" mode={phase as 'interactive' | 'reveal'} onNext={handleNext} onBack={handleBack} />
            )}
        </AnimatePresence>
    );
}

function FSlide({ mode, onNext, onBack }: { mode: 'interactive' | 'reveal', onNext: () => void, onBack: () => void }) {
    const PopF = ({ mode }: { mode: 'interactive' | 'reveal' }) => (
        <motion.span
            animate={mode === 'reveal' ? {
                color: "#e11d48",
                scale: [1, 1.5, 1.2],
            } : {
                color: "currentColor",
                scale: 1
            }}
            transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }}
            className="inline-block"
        >
            F
        </motion.span>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white text-slate-900 p-6 md:p-8 rounded-2xl shadow-2xl relative max-w-4xl w-full mx-auto flex flex-col max-h-[90vh]"
        >
            <div className="relative h-12 mb-4 w-full flex-shrink-0">
                <AnimatePresence initial={false}>
                    {mode === 'interactive' ? (
                        <motion.div
                            key="title-interactive"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute inset-0 flex items-center justify-center w-full"
                        >
                            <button onClick={onBack} className="absolute left-0 p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors z-10"><ArrowLeft className="w-6 h-6" /></button>
                            <h3 className="text-lg md:text-xl font-bold text-center text-slate-500 uppercase tracking-widest w-full">Count the F's</h3>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="title-reveal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 1.5 } }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center w-full"
                        >
                            <button onClick={onBack} className="absolute left-0 p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors z-10"><ArrowLeft className="w-6 h-6" /></button>
                            <h3 className="text-lg md:text-xl font-bold text-center text-slate-500 uppercase tracking-widest w-full">There Are 21 F's</h3>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="font-serif text-lg md:text-2xl leading-relaxed font-bold select-none bg-slate-50 p-6 rounded-xl border border-slate-200 overflow-y-auto flex-shrink transition-all duration-1000 hyphens-none break-normal">
                <p className="mb-4">
                    <span className="whitespace-nowrap"><PopF mode={mode} />RED</span> <span className="whitespace-nowrap"><PopF mode={mode} />LINTSTONE</span> WAS <span className="whitespace-nowrap">O<PopF mode={mode} /></span> THE OPINION THAT THE YEARS <span className="whitespace-nowrap">O<PopF mode={mode} /></span> RESEARCH INTO THE <span className="whitespace-nowrap">LI<PopF mode={mode} />E</span> <span className="whitespace-nowrap">O<PopF mode={mode} /></span> DINOSAURS WAS <span className="whitespace-nowrap">O<PopF mode={mode} /></span> THE UTMOST IMPORTANCE TO THE <span className="whitespace-nowrap"><PopF mode={mode} />UTURE</span> <span className="whitespace-nowrap">O<PopF mode={mode} /></span> BEDROCK.
                </p>
                <p>
                    <span className="whitespace-nowrap">I<PopF mode={mode} /></span> HE WAS <span className="whitespace-nowrap">O<PopF mode={mode} /><PopF mode={mode} />ICIAL</span> MAYOR HE WOULD <span className="whitespace-nowrap">O<PopF mode={mode} /><PopF mode={mode} />ER</span> <span className="whitespace-nowrap"><PopF mode={mode} />OOD</span> <span className="whitespace-nowrap">O<PopF mode={mode} /></span> THE <span className="whitespace-nowrap"><PopF mode={mode} />INEST</span> QUALITY TO EVERY CITIZEN REGARDLESS <span className="whitespace-nowrap">O<PopF mode={mode} /></span> THEIR <span className="whitespace-nowrap"><PopF mode={mode} />INANCIAL</span> STATE OR <span className="whitespace-nowrap"><PopF mode={mode} />EAR</span> <span className="whitespace-nowrap">O<PopF mode={mode} /></span> <span className="whitespace-nowrap"><PopF mode={mode} />AMINE</span>.
                </p>
            </div>

            <div className="mt-auto pt-6 flex-shrink-0 relative min-h-[8rem]">
                <AnimatePresence initial={false}>
                    {mode === 'interactive' ? (
                        <motion.div
                            key="btn-interactive"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 w-full"
                        >
                            <button onClick={onNext} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">
                                I've Counted Them
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="btn-reveal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 1.5 } }} // Delay footer appearance
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 space-y-4 text-center w-full"
                        >
                            <p className="text-base md:text-lg text-slate-600">
                                The ones you missed are most likely the F's that you didn't sound out in your head ... probably words like "of" and "if."
                            </p>

                            <button onClick={onNext} className="w-full bg-slate-100 text-slate-900 py-3 md:py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                                Next Concept
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// --- Triangle Components ---
export function TrianglesExercise({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    const [phase, setPhase] = useState<'reading' | 'explanation'>('reading');

    const handleNext = () => {
        if (phase === 'reading') setPhase('explanation');
        else onNext();
    };

    const handleBack = () => {
        if (phase === 'explanation') setPhase('reading');
        else onBack();
    };

    return (
        <AnimatePresence mode="wait">
            {phase === 'reading' && (
                <TriangleSlide key="reading" onNext={handleNext} onBack={handleBack} />
            )}
            {phase === 'explanation' && (
                <Slide key="explanation" title="Your Brain Is Efficient" icon={<Sparkles className="w-12 h-12 text-amber-400" />} onNext={handleNext} onBack={handleBack}>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 my-4">
                        <p className="text-xl italic text-slate-300">"Isn't it amazing that your eyes skip over some of the words without you even realising it! That is also because of how we predict what is written."</p>
                    </div>
                    <p className="text-lg text-slate-300">You already read without hearing every word in your head.</p>
                    <p className="text-xl font-bold text-white mt-4">We are going to train you to do it <span className="text-emerald-400">much better</span>.</p>
                </Slide>
            )}
        </AnimatePresence>
    );
}

function TriangleSlide({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    const [revealed, setRevealed] = useState(false);

    const PopWord = ({ revealed, children }: { revealed: boolean, children: React.ReactNode }) => (
        <motion.span
            animate={revealed ? {
                color: "#e11d48",
                scale: [1, 1.4, 1.1],
            } : {
                color: "inherit",
                scale: 1,
            }}
            transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }}
            className="inline-block"
        >
            {children}
        </motion.span>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center w-full max-w-5xl mx-auto h-full max-h-[85vh] px-4 relative"
        >
            {/* --- HEADER SECTION (Animates) --- */}
            <div className="flex-shrink-0 flex flex-col items-center mb-8 h-32 justify-center w-full relative">
                <AnimatePresence mode="wait">
                    {!revealed ? (
                        <motion.div
                            key="header-read"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute inset-x-0 top-0 flex flex-col items-center"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white leading-tight mb-4">READ THESE 3 PHRASES:</h2>
                            <p className="text-xl text-slate-300">Read the text inside the triangles.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="header-reveal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 1.5 } }} // Delayed fade-in
                            exit={{ opacity: 0 }}
                            className="absolute inset-x-0 top-0 flex flex-col items-center"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white leading-tight mb-4">DID YOU NOTICE THE REPEATED WORDS?</h2>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* --- CONTENT SECTION (Static / Internal Animation) --- */}
            <div className="flex-1 w-full flex flex-col items-center justify-center relative">
                <div className="flex flex-col items-center justify-center gap-0 pb-12 transform scale-110">
                    {/* Top Triangle */}
                    <div className="w-56 h-48 relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                            <path d="M50 5 L95 95 L5 95 Z" fill="white" stroke="#3b82f6" strokeWidth="2" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center pt-24 pb-2 px-1 text-center">
                            <p className={`text-slate-900 font-bold leading-tight text-lg transition-colors duration-[2000ms] ${revealed ? "text-slate-400" : ""}`}>
                                Never in <PopWord revealed={revealed}>a</PopWord><br />
                                <PopWord revealed={revealed}>a</PopWord> million years.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex gap-16 -mt-12">
                        {/* Bottom Left Triangle */}
                        <div className="w-56 h-48 relative">
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                                <path d="M50 5 L95 95 L5 95 Z" fill="white" stroke="#3b82f6" strokeWidth="2" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center pt-24 pb-2 px-1 text-center">
                                <p className={`text-slate-900 font-bold leading-tight text-lg transition-colors duration-[2000ms] ${revealed ? "text-slate-400" : ""}`}>
                                    Call it <PopWord revealed={revealed}>a</PopWord><br />
                                    <PopWord revealed={revealed}>a</PopWord> night.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Right Triangle */}
                        <div className="w-56 h-48 relative">
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                                <path d="M50 5 L95 95 L5 95 Z" fill="white" stroke="#3b82f6" strokeWidth="2" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center pt-24 pb-2 px-1 text-center">
                                <p className={`text-slate-900 font-bold leading-tight text-lg transition-colors duration-[2000ms] ${revealed ? "text-slate-400" : ""}`}>
                                    The best <PopWord revealed={revealed}>of</PopWord><br />
                                    <PopWord revealed={revealed}>of</PopWord> both worlds.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FOOTER SECTION (Animates) --- */}
            <div className="flex-shrink-0 mt-6 mb-2 pt-4 w-full h-24 relative flex justify-center items-center">
                <AnimatePresence mode="wait">
                    {!revealed ? (
                        <motion.div
                            key="footer-read"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center gap-4"
                        >
                            <button
                                onClick={onBack}
                                className="absolute left-0 p-4 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5 z-50 transform -translate-x-full md:translate-x-0"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-8 h-8" />
                            </button>
                            <button onClick={() => setRevealed(true)} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/50">
                                I've Read Them
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="footer-reveal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 1.5 } }} // Delayed fade-in
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center gap-4"
                        >
                            <button
                                onClick={onBack}
                                className="absolute left-0 p-4 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5 z-50 transform -translate-x-full md:translate-x-0"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-8 h-8" />
                            </button>
                            <button onClick={onNext} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/50">
                                What Does This Mean?
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// --- Not Every Word Components ---
export function NotEveryWordSlide({ onNext, onBack }: { onNext: () => void, onBack?: () => void }) {
    return (
        <Slide title="Focussing On Every Word?" icon={null} onNext={onNext} onBack={onBack}>
            <div className="text-left space-y-3 bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                <div>
                    <p className="text-base leading-relaxed text-white">
                        We won't teach you skimming or scanning, but it is important to know that many words are included in the text in order to get the grammar correct, but are not necessary to understand it.
                    </p>
                    <p className="text-right text-rose-500 text-xs mt-1 font-mono font-bold">35 Words</p>
                </div>
                <div className="h-px bg-slate-800 w-full" />
                <div>
                    <p className="text-base leading-relaxed font-bold text-white">
                        Won't teach skimming or scanning, but important to know many words included to get grammar correct, but not necessary to understand.
                    </p>
                    <p className="text-right text-emerald-400 text-xs mt-1 font-mono font-bold">21 Words</p>
                </div>
            </div>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
                Having said that, words like <strong>NOT</strong> are very important! 😉 ... but as we've seen, we already do this ... we just need to learn how to do it more effectively.
            </p>
        </Slide>
    );
}

// --- Peripheral Vision Components ---

export function PeripheralVisionPassive({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    return (
        <Slide title="Peripheral Vision" icon={<Eye className="w-12 h-12 text-emerald-400" />} onNext={onNext} onBack={onBack}>
            <div className="text-center p-2 w-full flex flex-col items-center">

                <div className="relative h-72 w-full max-w-5xl mx-auto border border-slate-700/50 rounded-3xl bg-slate-950 overflow-hidden flex flex-col items-center justify-center shadow-2xl">

                    {/* Instruction Text at Top of Box */}
                    <div className="absolute top-6 left-0 right-0 z-40 px-4">
                        <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
                            Allow your peripheral vision to see the <span className="text-purple-400">purple shapes</span> as you look at the <span className="text-red-500">red dot</span>.
                        </p>
                    </div>

                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-50" />

                    {/* Central Red Dot System */}
                    <div className="relative z-30 flex items-center justify-center w-full h-full pt-8">

                        {/* Red Dot - Pulsing */}
                        <motion.div
                            animate={{
                                opacity: [1, 0.2, 1], // Bright -> Dim -> Bright
                                boxShadow: [
                                    "0 0 15px rgba(239, 68, 68, 0.8)", // Bright glow
                                    "0 0 5px rgba(239, 68, 68, 0.2)",  // Dim glow
                                    "0 0 15px rgba(239, 68, 68, 0.8)"  // Bright glow
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-4 h-4 bg-red-500 rounded-full absolute mix-blend-screen"
                        />
                    </div>

                    {/* Peripheral Shapes - Left Side (Purple Filled) */}
                    <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-around items-center opacity-80 py-8">
                        {/* Star */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0], opacity: [0, 0.8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                        {/* Circle */}
                        <motion.div
                            animate={{ scale: [1, 0.8, 1], opacity: [0, 0.6, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        />
                        {/* Diamond */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [45, 90, 45], opacity: [0, 0.7, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="w-6 h-6 rounded-sm bg-purple-500 rotate-45 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        />
                    </div>

                    {/* Peripheral Shapes - Right Side (Purple Filled) */}
                    <div className="absolute right-4 top-0 bottom-0 flex flex-col justify-around items-center opacity-80 py-8">
                        {/* Triangle */}
                        <motion.div
                            animate={{ y: [0, -5, 0], opacity: [0, 0.8, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                                <path d="M12 3L22 21H2L12 3Z" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                        {/* Square */}
                        <motion.div
                            animate={{ rotate: [0, 45, 0], opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                            className="w-5 h-5 bg-purple-500 rounded-sm shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        />
                        {/* Star (Small) */}
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0, 0.7, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                    </div>

                </div>
            </div>
        </Slide>
    );
}

export function PeripheralVisionPrep({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    return (
        <Slide title="Discovering More" icon={<Eye className="w-12 h-12 text-emerald-400" />} onNext={onNext} onBack={onBack}>
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 space-y-6 text-center max-w-2xl mx-auto">
                <p className="text-xl text-white font-medium">
                    The next screen may seem a bit confusing at first.
                </p>
            </div>

            <div className="space-y-8 max-w-2xl mx-auto text-center mt-8">
                <p className="text-xl text-slate-200 leading-relaxed">
                    Spend some time allowing yourself to practice using your <span className="text-emerald-400 font-bold">peripheral vision</span>.
                </p>
                <p className="text-xl text-slate-200 leading-relaxed">
                    Experiment with focusing in different ways while keeping your eyes <span className="text-indigo-300 font-bold">relaxed</span>.
                </p>
            </div>
        </Slide>
    );
}

export function PeripheralVisionSequence({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    const [cycle, setCycle] = useState(0);

    const phrases = [
        "stare here",
        "as you stare",
        "at the red dot",
        "you will see",
        "the purple shapes",
        "using your",
        "peripheral vision",
        "without moving",
        "your eyes",
        "and as you",
        "keep your",
        "gaze softened",
        "you will be able",
        "to read all",
        "of these words too.",
        "You can see",
        "more than you think",
        "in your field of vision.",
        "As we cycle",
        "through these words",
        "allow your eyes",
        "try different things",
        "like softening",
        "your focus",
        "opening your",
        "eyes wider.",
        "" // 1 second break
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCycle(c => (c + 1) % phrases.length);
        }, 2000); // Slowed down to 2-second cycle (half speed)
        return () => clearInterval(interval);
    }, [phrases.length]);

    return (
        <Slide title="Peripheral Awareness" icon={<Eye className="w-12 h-12 text-emerald-400" />} onNext={onNext} onBack={onBack}>
            <div className="text-center p-2 w-full flex flex-col items-center">

                <div className="relative h-72 w-full max-w-5xl mx-auto border border-slate-700/50 rounded-3xl bg-slate-950 overflow-hidden flex flex-col items-center justify-center shadow-2xl">

                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-50" />

                    {/* Central Red Dot & Text System */}
                    <div className="relative z-30 flex items-center justify-center w-full h-full">

                        {/* Red Dot - Pulsing inverse to text (Opacity only) */}
                        <motion.div
                            key={cycle} // Force re-render every cycle for perfect sync
                            initial={{ opacity: 1, boxShadow: "0 0 15px rgba(239, 68, 68, 0.8)" }}
                            animate={{
                                opacity: [1, 0.2, 1], // Bright -> Dim -> Bright
                                boxShadow: [
                                    "0 0 15px rgba(239, 68, 68, 0.8)", // Bright glow
                                    "0 0 5px rgba(239, 68, 68, 0.2)",  // Dim glow
                                    "0 0 15px rgba(239, 68, 68, 0.8)"  // Bright glow
                                ]
                            }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="w-4 h-4 bg-red-500 rounded-full absolute mix-blend-screen"
                        />

                        {/* Text - Appears when dot dims (middle of cycle) */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={cycle}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 1, 0], // Stay visible longer at peak (middle)
                                }}
                                transition={{ duration: 2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
                                className="text-base font-bold tracking-widest uppercase text-center whitespace-nowrap text-emerald-400 absolute z-40 drop-shadow-md pb-1"
                            >
                                {phrases[cycle]}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Peripheral Shapes - Left Side (Purple Filled) */}
                    <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-around items-center opacity-80 py-8">
                        {/* Star */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0], opacity: [0, 0.8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                        {/* Circle */}
                        <motion.div
                            animate={{ scale: [1, 0.8, 1], opacity: [0, 0.6, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        />
                        {/* Diamond */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [45, 90, 45], opacity: [0, 0.7, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="w-6 h-6 rounded-sm bg-purple-500 rotate-45 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        />
                    </div>

                    {/* Peripheral Shapes - Right Side (Purple Filled) */}
                    <div className="absolute right-4 top-0 bottom-0 flex flex-col justify-around items-center opacity-80 py-8">
                        {/* Triangle */}
                        <motion.div
                            animate={{ y: [0, -5, 0], opacity: [0, 0.8, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                                <path d="M12 3L22 21H2L12 3Z" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                        {/* Square */}
                        <motion.div
                            animate={{ rotate: [0, 45, 0], opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                            className="w-5 h-5 bg-purple-500 rounded-sm shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        />
                        {/* Star (Small) */}
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0, 0.7, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                    </div>

                </div>
            </div>
        </Slide>
    );
}

export function PeripheralVisionComparison({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    const [ballIndex, setBallIndex] = useState(0);

    const raceText = "Reading one word at a time is very slow and extremely tiring for your brain.";
    const words = raceText.split(" ");

    // Green bar moves to next third-position with each word hop
    // ballIndex cycles 0,1,2,3,4... so ballIndex % 3 gives us 0,1,2,0,1,2...
    const barPosition = ballIndex % 3;
    const barLeftPosition = `${barPosition * 33}%`;
    // Ball hopping logic - one word every 500ms
    useEffect(() => {
        const interval = setInterval(() => {
            setBallIndex(prev => (prev + 1) % (words.length + 1));
        }, 500);

        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <Slide title="Eye Movement" icon={<TrendingUp className="w-12 h-12 text-emerald-400" />} onNext={onNext} onBack={onBack}>
            <div className="flex flex-col w-full max-w-4xl mx-auto items-stretch h-full justify-center gap-12">

                {/* --- LANE 1: Word-by-Word Hopping --- */}
                <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
                    <p className="font-serif text-xl md:text-2xl text-slate-400 text-left leading-relaxed relative z-10 px-1 whitespace-nowrap">
                        {words.map((word, i) => (
                            <span key={i} className="inline-block mr-2 relative">
                                {word}
                                {i === ballIndex && (
                                    <motion.div
                                        layoutId="bouncing-ball"
                                        className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)]"
                                        initial={{ y: 0 }}
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    />
                                )}
                            </span>
                        ))}
                    </p>
                </div>

                {/* --- LANE 2: Smooth Gliding in 3 Steps --- */}
                <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 border-emerald-500/30 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                    <p className="font-serif text-xl md:text-2xl text-slate-200 text-left leading-relaxed relative z-10 px-1 whitespace-nowrap">
                        {raceText}
                    </p>

                    {/* Gliding Bar - synchronized with ball timing */}
                    <div className="absolute top-0 left-6 right-6 h-full pointer-events-none z-0">
                        <motion.div
                            className="absolute top-4 bottom-4 w-1/3 bg-emerald-500/20 rounded-lg blur-sm border border-emerald-500/30"
                            animate={{
                                left: barLeftPosition
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                        />
                    </div>
                </div>

            </div>
        </Slide>
    );
}
