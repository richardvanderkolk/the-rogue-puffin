const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetSlug = 'slug: "learning-style-visual"';
const startIndex = content.indexOf(targetSlug);

if (startIndex === -1) {
    console.error("Could not find visual article!");
    process.exit(1);
}

// target string to replace
const contentKeyPattern = 'content: `';
const startContent = content.indexOf(contentKeyPattern, startIndex) + contentKeyPattern.length;
const endContent = content.indexOf('`\n    },', startContent);


if (startContent !== -1 && endContent !== -1 && endContent > startContent) {

    const htmlContent = `
<p class="lead text-xl text-slate-300 mb-8 leading-relaxed">For a visual learner, words are often just the raw materials. Let's arrange them into a picture.</p>

<div class="my-10 border border-slate-700 bg-slate-900/50 rounded-3xl p-8 relative overflow-hidden">
    <!-- Abstract visual background elements -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

    <div class="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <!-- Visual 1: The Standard Path (Straight Line) -->
        <div class="flex-1 w-full text-center">
            <h3 class="text-white font-bold mb-6 tracking-wide">The "Normal" Expectation</h3>
            <div class="h-2 w-full bg-slate-700 relative rounded-full mb-4">
                <div class="absolute left-0 top-1/2 -mt-2 w-4 h-4 rounded-full bg-slate-400"></div>
                <div class="absolute right-0 top-1/2 -mt-2 w-4 h-4 rounded-full bg-rose-500"></div>
            </div>
            <p class="text-sm text-slate-400">A straight, rigid line where everyone learns the exact same way. If you fall off the line, you are "bad at learning."</p>
        </div>

        <div class="w-px h-32 bg-slate-800 hidden md:block"></div>
        <div class="h-px w-full bg-slate-800 md:hidden"></div>

        <!-- Visual 2: The Constellation (Visual Path) -->
        <div class="flex-1 w-full text-center">
            <h3 class="text-white font-bold mb-6 tracking-wide">The Reality</h3>
            <div class="relative h-24 mb-4 flex items-center justify-center">
                <!-- Constellation nodes -->
                <div class="absolute top-0 left-1/4 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
                <div class="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                <div class="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)]"></div>
                <div class="absolute bottom-0 right-1/4 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
                
                <!-- SVG lines connecting them -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none" style="filter: drop-shadow(0 0 4px rgba(255,255,255,0.2))">
                    <line x1="25%" y1="0%" x2="33%" y2="75%" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
                    <line x1="33%" y1="75%" x2="66%" y2="33%" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
                    <line x1="66%" y1="33%" x2="75%" y2="100%" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
                    <line x1="25%" y1="0%" x2="66%" y2="33%" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
                </svg>
            </div>
            <p class="text-sm text-slate-400">Intelligence is a unique map of interconnected strengths.</p>
        </div>
    </div>
</div>

<blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl">
    <div class="flex items-center gap-6">
        <div class="w-16 h-16 shrink-0 bg-indigo-950 rounded-2xl flex items-center justify-center border border-indigo-500/30">
            <svg class="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        </div>
        <div>
            <p class="text-xl font-medium text-white italic leading-relaxed"> "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid." </p>
            <footer class="mt-2 text-sm font-bold text-indigo-300 uppercase tracking-widest">— Albert Einstein </footer>
        </div>
    </div>
</blockquote>

<h2 class="text-2xl font-bold text-white mt-12 mb-8">The Pattern of Intelligence</h2>
<p class="text-slate-300 mb-8">Let's look at Howard Gardner's 7 Intelligences, mapped not as a list, but as a spatial diagram demonstrating how they branch from a central core of understanding.</p>

<div class="my-16 mb-24 relative w-full flex justify-center">
    <div class="relative w-full max-w-2xl px-4 flex flex-col items-center">
        <!-- Central Node -->
        <div class="w-24 h-24 bg-white shadow-[0_0_40px_rgba(255,255,255,0.3)] rounded-2xl rotate-45 flex items-center justify-center relative z-20 mb-16 transition-transform hover:scale-110 duration-500">
            <div class="-rotate-45 text-slate-900 font-bold text-center leading-tight tracking-tight uppercase">Core<br/>Mind</div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 w-full relative z-10 p-4">
            <!-- Interconnecting lines using abstract svg styling behind -->
            <div class="absolute inset-0 pointer-events-none -z-10 hidden lg:block opacity-30">
                 <svg class="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
                     <path d="M400,0 C400,100 150,100 150,200" stroke="white" stroke-width="2" fill="none"/>
                     <path d="M400,0 L400,200" stroke="white" stroke-width="2" fill="none"/>
                     <path d="M400,0 C400,100 650,100 650,200" stroke="white" stroke-width="2" fill="none"/>
                     <path d="M400,0 C400,300 150,300 150,400" stroke="white" stroke-width="2" fill="none"/>
                     <path d="M400,0 C400,300 650,300 650,400" stroke="white" stroke-width="2" fill="none"/>
                 </svg>
            </div>

            <!-- Linguistic -->
            <div class="bg-slate-900/80 border border-slate-700/50 p-5 rounded-2xl hover:border-indigo-400 group transition-all text-center">
                <div class="w-10 h-10 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </div>
                <h4 class="text-white font-bold text-sm mb-1 uppercase tracking-widest text-indigo-300">Linguistic</h4>
                <p class="text-xs text-slate-400">Words, stories, and narrative structures.</p>
            </div>

            <!-- Logical -->
            <div class="bg-slate-900/80 border border-slate-700/50 p-5 rounded-2xl hover:border-emerald-400 group transition-all text-center">
                <div class="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                </div>
                <h4 class="text-white font-bold text-sm mb-1 uppercase tracking-widest text-emerald-300">Logical</h4>
                <p class="text-xs text-slate-400">Systems, equations, and cause-and-effect.</p>
            </div>

            <!-- Visual -->
            <div class="bg-indigo-900/40 border border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)] p-5 rounded-2xl hover:border-indigo-400 group transition-all text-center transform scale-105 z-10">
                <div class="w-10 h-10 mx-auto rounded-full bg-indigo-500/30 text-white flex items-center justify-center mb-3">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </div>
                <h4 class="text-white font-bold text-sm mb-1 uppercase tracking-widest text-indigo-300">Visual</h4>
                <p class="text-xs text-slate-300 font-medium">Diagrams, space, and color. (Your Superpower)</p>
            </div>

            <!-- Kinesthetic -->
            <div class="bg-slate-900/80 border border-slate-700/50 p-5 rounded-2xl hover:border-amber-400 group transition-all text-center lg:translate-x-1/2">
                <div class="w-10 h-10 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                </div>
                <h4 class="text-white font-bold text-sm mb-1 uppercase tracking-widest text-amber-300">Kinesthetic</h4>
                <p class="text-xs text-slate-400">Physical interaction, movement, and touch.</p>
            </div>

            <!-- Musical -->
            <div class="bg-slate-900/80 border border-slate-700/50 p-5 rounded-2xl hover:border-rose-400 group transition-all text-center lg:translate-x-1/2">
                <div class="w-10 h-10 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
                </div>
                <h4 class="text-white font-bold text-sm mb-1 uppercase tracking-widest text-rose-300">Musical</h4>
                <p class="text-xs text-slate-400">Rhythm, tone, and auditory patterns.</p>
            </div>
            
            <!-- Interpersonal & Intrapersonal -->
             <div class="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center mt-6 lg:mt-12 gap-6 sm:gap-12 flex-wrap">
                  <!-- Interpersonal -->
                <div class="bg-slate-900/80 border border-slate-700/50 p-5 rounded-2xl hover:border-sky-400 group transition-all text-center w-[200px]">
                    <div class="w-10 h-10 mx-auto rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <h4 class="text-white font-bold text-sm mb-1 uppercase tracking-widest text-sky-300">Interpersonal</h4>
                    <p class="text-xs text-slate-400">Group dynamics and collaboration.</p>
                </div>
                <!-- Intrapersonal -->
                 <div class="bg-slate-900/80 border border-slate-700/50 p-5 rounded-2xl hover:border-purple-400 group transition-all text-center w-[200px]">
                    <div class="w-10 h-10 mx-auto rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <h4 class="text-white font-bold text-sm mb-1 uppercase tracking-widest text-purple-300">Intrapersonal</h4>
                    <p class="text-xs text-slate-400">Deep reflection and solitude.</p>
                </div>
             </div>
        </div>
    </div>
</div>

<div class="mt-16 p-8 border border-white/10 bg-gradient-to-br from-indigo-900/20 to-slate-900/50 rounded-3xl relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
        <svg class="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
    </div>
    <h3 class="text-xl font-bold text-white mb-4">How to Re-Draw Your Learning</h3>
    <ul class="space-y-4">
        <li class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-md bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5"><div class="w-2 h-2 bg-indigo-400 rounded-sm"></div></div>
            <p class="text-slate-300"><strong class="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Color-code the dense text.</strong> When reading plain text, use highlighters to categorize ideas spatially.</p>
        </li>
        <li class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5"><div class="w-2 h-2 bg-emerald-400 rounded-sm"></div></div>
            <p class="text-slate-300"><strong class="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Build a hierarchy.</strong> Your brain wants to see the shape of the idea. Re-draw linear text into a pyramid or branching tree.</p>
        </li>
        <li class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-md bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-rose-400 shrink-0 mt-0.5"><div class="w-2 h-2 bg-rose-400 rounded-sm"></div></div>
            <p class="text-slate-300"><strong class="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Replace words with icons.</strong> If a concept can be represented by a simple symbol instead of a paragraph, draw it.</p>
        </li>
    </ul>
</div>
    `;

    let newContent = content.substring(0, startContent) + '\n' + htmlContent + '\n        ' + content.substring(endContent);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced visual article with purely HTML/CSS visual layout!");
} else {
    console.error("Could not find content block for visual article.");
}
