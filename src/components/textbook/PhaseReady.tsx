export default function PhaseReady() {
    return (
        <div className="print:break-before-page" id="phase-ready">
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center not-prose print:h-[1050px] print:break-after-page mb-32 border-y border-white/5 py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
                <h5 className="text-indigo-400 font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-6 relative z-10">Phase I</h5>
                <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-none relative z-10">READY</h1>
                <p className="text-2xl md:text-3xl font-serif text-slate-400 italic max-w-2xl relative z-10">Preparing the Machine</p>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-emerald-400 mt-16 mx-auto rounded-full relative z-10"></div>
            </div>
        </div>
    );
}
