const fs = require('fs');
const FILE_PATH = 'src/components/train/SessionPlayer.tsx';

let content = fs.readFileSync(FILE_PATH, 'utf-8');

// 1. Update the isComplete check to exclude 'recall' mode too.
content = content.replace(
    "const isComplete = (currentStep?.mode === 'read' || currentStep?.mode === 'message') ? false : timeLeft === 0;",
    "const isComplete = (currentStep?.mode === 'read' || currentStep?.mode === 'message' || currentStep?.mode === 'recall') ? false : timeLeft === 0;"
);

// 2. Update the time format rendering to accommodate recall
content = content.replace(
    "{(currentStep.mode === 'read' || currentStep.mode === 'message') ? formatTime(elapsedTime) : formatTime(timeLeft)}",
    "{(currentStep?.mode === 'read' || currentStep?.mode === 'message') ? formatTime(elapsedTime) : formatTime(timeLeft)}"
);
content = content.replace(
    "{(currentStep.mode === 'read' || currentStep.mode === 'message') ? \"Time Elapsed\" : \"Time Left\"}",
    "{(currentStep?.mode === 'read' || currentStep?.mode === 'message') ? \"Time Elapsed\" : (currentStep?.mode === 'recall' ? \"Recall Timer\" : \"Time Left\")}"
);

// 3. Update the Outro screen to include the speed test
const oldOutroButtons = `<button
                        onClick={onComplete}
                        className="mt-8 py-4 px-12 bg-white text-black text-lg font-bold rounded-full hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        See you tomorrow
                    </button>`;

const newOutroButtons = `<div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full max-w-lg mx-auto">
                        <Link
                            href="/test/after"
                            className="w-full py-4 px-8 bg-indigo-500 hover:bg-indigo-400 text-white text-base md:text-lg font-bold rounded-full transition-all flex items-center justify-center hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                        >
                            Test your new reading speed <FastForward className="w-5 h-5 ml-2" />
                        </Link>
                        <button
                            onClick={onComplete}
                            className="w-full py-4 px-8 bg-slate-800 hover:bg-slate-700 text-slate-300 text-base md:text-lg font-bold rounded-full transition-all hover:scale-105 border border-slate-700 hover:border-slate-500"
                        >
                            No thanks, see you tomorrow
                        </button>
                    </div>`;

content = content.replace(oldOutroButtons, newOutroButtons);

// Make sure Link is imported if not already there
if (!content.includes("import Link from")) {
    content = content.replace("import { Play, Pause", "import Link from 'next/link';\nimport { Play, Pause");
}

// 4. Update the Pacer Viewport to handle recall mode
const pacerViewportRegex = /(<div className="relative">\s*\{activeInterruption \? \([\s\S]*?\) : \(\s*)(<PacerEngine[\s\S]*?\/>)(\s*\))/;
const pacerEngineMatch = content.match(pacerViewportRegex);

if (pacerEngineMatch) {
    const originalPacer = pacerEngineMatch[2];

    const recallModeUI = `currentStep?.mode === 'recall' ? (
                    <div className="w-full h-[60vh] flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 text-center shadow-inner rounded-3xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                        
                        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 z-10 drop-shadow-lg">
                            {currentStep.text}
                        </h3>
                        
                        <div className="relative w-48 h-48 flex items-center justify-center z-10 mb-8">
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="96" cy="96" r="88" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                                <motion.circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    fill="none"
                                    stroke="#818CF8"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    initial={{ strokeDasharray: "553 553", strokeDashoffset: 0 }}
                                    animate={{ strokeDashoffset: 553 * (1 - (timeLeft / currentStep.duration)) }}
                                    transition={{ duration: 0.5, ease: "linear" }}
                                />
                            </svg>
                            <span className="text-7xl font-mono font-black text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                {timeLeft}
                            </span>
                        </div>
                        
                        <p className="text-slate-400 text-lg z-10 max-w-md mx-auto">
                            Do not write anything down. This is an exercise in holding raw sensory data in your working memory. Next set starts automatically.
                        </p>
                    </div>
                ) : (
                    ${originalPacer}
                )`;

    content = content.replace(pacerViewportRegex, `$1${recallModeUI}$3`);
}

fs.writeFileSync(FILE_PATH, content);
console.log("Successfully updated SessionPlayer.tsx with recall mode UI and speed test outro!");
