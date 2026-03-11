const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetSlug = 'slug: "learning-style-logical"';
const startIndex = content.indexOf(targetSlug);

if (startIndex === -1) {
    console.error("Could not find logical article!");
    process.exit(1);
}

// Find the content string definition
const contentKeyPattern = 'content: `';
const startContent = content.indexOf(contentKeyPattern, startIndex) + contentKeyPattern.length;
const endContent = content.indexOf('`\n    },', startContent);

if (startContent !== -1 && endContent !== -1 && endContent > startContent) {
    const replacementText = `
<p class="lead text-xl text-slate-300 mb-8 leading-relaxed">Most people assume they are either “good at learning” or not. Let's look at why that doesn't add up.</p>

<div class="my-10 p-8 rounded-3xl bg-slate-900/50 border border-slate-700 shadow-2xl overflow-x-auto text-center">
    <h3 class="text-xl text-white font-bold mb-8 text-center">The Flawed Equation:</h3>
    <div class="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xl md:text-2xl font-bold font-mono">
        <div class="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">Hard Work</div>
        <div class="text-slate-500 text-3xl">+</div>
        <div class="px-4 py-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">Standard Schooling</div>
        <div class="text-slate-500 text-3xl">=</div>
        <div class="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white">Smart Student</div>
    </div>
    <p class="text-center mt-8 text-slate-400 max-w-2xl mx-auto">If a student fails, this equation implies the student didn't work hard enough. But it's missing a huge piece of the puzzle.</p>
</div>

<blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl">
    <p class="text-xl font-medium text-white italic leading-relaxed"> "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid." </p>
    <footer class="mt-4 text-sm font-bold text-indigo-300 uppercase tracking-widest">— Often attributed to Albert Einstein </footer>
</blockquote>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">The Real Equation (Cause and Effect)</h2>
<p class="text-slate-300 mb-8">Let's look at the cause and effect of Einstein's fish.</p>

<div class="space-y-4 mb-12">
    <!-- Equation 1 -->
    <div class="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-900/80 border border-rose-500/30 rounded-2xl gap-6">
        <div class="flex flex-col md:flex-row items-center gap-4 text-lg font-bold w-full md:w-auto">
            <span class="text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl text-center w-full md:w-auto">Fish</span> 
            <span class="text-slate-500 text-2xl">+</span> 
            <span class="text-rose-400 bg-rose-500/10 px-4 py-2 rounded-xl text-center w-full md:w-auto">Climbing a Tree</span>
        </div>
        <div class="text-slate-500 text-2xl transform rotate-90 md:rotate-0">➜</div>
        <div class="flex flex-col items-center md:items-start gap-2 w-full md:w-auto text-center md:text-left">
            <span class="px-4 py-2 bg-rose-500/20 text-rose-400 rounded-xl font-bold border border-rose-500/30 w-full md:w-auto">Result: Failure</span>
            <span class="text-slate-400 text-sm">(Fish feels stupid)</span>
        </div>
    </div>

    <!-- Equation 2 -->
    <div class="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-900/80 border border-emerald-500/30 rounded-2xl gap-6">
        <div class="flex flex-col md:flex-row items-center gap-4 text-lg font-bold w-full md:w-auto">
            <span class="text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl text-center w-full md:w-auto">Fish</span> 
            <span class="text-slate-500 text-2xl">+</span> 
            <span class="text-sky-400 bg-sky-500/10 px-4 py-2 rounded-xl text-center w-full md:w-auto">Swimming in Water</span>
        </div>
        <div class="text-slate-500 text-2xl transform rotate-90 md:rotate-0">➜</div>
        <div class="flex flex-col items-center md:items-start gap-2 w-full md:w-auto text-center md:text-left">
            <span class="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl font-bold border border-emerald-500/30 w-full md:w-auto">Result: Success</span>
            <span class="text-slate-400 text-sm">(Fish is a genius)</span>
        </div>
    </div>
</div>

<div class="p-6 bg-indigo-950/40 border-l-4 border-indigo-500 rounded-r-2xl mb-12">
    <p class="text-xl font-medium text-white mb-0">Conclusion: <br/><span class="text-indigo-300">Intelligence isn't a single score. It's the result of matching the right person with the right environment.</span></p>
</div>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">The 7 Environmental Variables</h2>
<p class="mb-6 text-slate-300">If intelligence is about matching the person to the environment, what are the different environments? Howard Gardner identified 7 distinct cognitive variables (learning styles). You must find which system matches your mind.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-sm">
    <div class="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl flex items-start gap-4 hover:border-indigo-400/50 transition-colors">
        <div class="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center border border-indigo-500/30 shrink-0">1</div>
        <div>
            <strong class="text-white block mb-1 text-base">Linguistic</strong>
            <span class="text-slate-400">Processes via narrative, reading, and vocabulary.</span>
        </div>
    </div>
    <div class="bg-sky-950/30 border border-sky-500/20 p-4 rounded-xl flex items-start gap-4 hover:border-sky-400/50 transition-colors">
        <div class="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center border border-sky-500/30 shrink-0">2</div>
        <div>
            <strong class="text-white block mb-1 text-base">Logical-Mathematical</strong>
            <span class="text-slate-400">Processes via structured data, cause/effect, and systems.</span>
        </div>
    </div>
    <div class="bg-teal-950/30 border border-teal-500/20 p-4 rounded-xl flex items-start gap-4 hover:border-teal-400/50 transition-colors">
        <div class="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center border border-teal-500/30 shrink-0">3</div>
        <div>
            <strong class="text-white block mb-1 text-base">Visual-Spatial</strong>
            <span class="text-slate-400">Processes via diagrams, imagery, and visual structure.</span>
        </div>
    </div>
    <div class="bg-emerald-950/30 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-4 hover:border-emerald-400/50 transition-colors">
        <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/30 shrink-0">4</div>
        <div>
            <strong class="text-white block mb-1 text-base">Kinesthetic</strong>
            <span class="text-slate-400">Processes via physical action, touch, and building models.</span>
        </div>
    </div>
    <div class="bg-amber-950/30 border border-amber-500/20 p-4 rounded-xl flex items-start gap-4 hover:border-amber-400/50 transition-colors">
        <div class="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center border border-amber-500/30 shrink-0">5</div>
        <div>
            <strong class="text-white block mb-1 text-base">Musical</strong>
            <span class="text-slate-400">Processes via rhythm, tone, and auditory patterns.</span>
        </div>
    </div>
    <div class="bg-rose-950/30 border border-rose-500/20 p-4 rounded-xl flex items-start gap-4 hover:border-rose-400/50 transition-colors">
        <div class="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center border border-rose-500/30 shrink-0">6</div>
        <div>
            <strong class="text-white block mb-1 text-base">Interpersonal</strong>
            <span class="text-slate-400">Processes via dialogue, debate, and social collaboration.</span>
        </div>
    </div>
    <div class="bg-purple-950/30 border border-purple-500/20 p-4 rounded-xl flex items-start gap-4 hover:border-purple-400/50 transition-colors md:col-span-2">
        <div class="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center border border-purple-500/30 shrink-0">7</div>
        <div>
            <strong class="text-white block mb-1 text-base">Intrapersonal</strong>
            <span class="text-slate-400">Processes via critical self-reflection and isolated concentration.</span>
        </div>
    </div>
</div>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">The Learning Process</h2>
<p class="mb-8 text-slate-300">If you are struggling to learn something, do not assume you are not smart enough. Instead, look at the process. Change the equation.</p>

<div class="my-12">
    <div class="my-16 flex flex-col items-center mx-auto max-w-md w-full relative">
        <!-- Connecting Line Background for the return loop -->
        <div class="absolute left-1/2 top-10 bottom-32 -ml-[180px] w-[180px] border-l-2 border-t-2 border-b-2 border-indigo-500/40 rounded-l-3xl z-0 hidden sm:block"></div>
        <div class="absolute left-1/2 top-[50px] -ml-[185px] w-3 h-3 border-b-2 border-r-2 border-indigo-500/50 transform -rotate-45 hidden sm:block"></div>
        
        <!-- CAUSE -->
        <div class="w-full relative z-10 group">
            <div style="clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 50%);" class="bg-indigo-950/80 border-2 border-indigo-400/80 p-8 text-center shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all group-hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]">
                <h4 class="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-1">Cause</h4>
                <div class="text-xl font-bold text-white mb-2">Find the Cause</div>
                <p class="text-slate-300 text-sm max-w-[200px] mx-auto">Identify what exactly is confusing you.</p>
            </div>
            <!-- Arrow -->
            <div class="flex flex-col items-center relative z-0">
                <div class="h-10 w-0.5 bg-indigo-400"></div>
                <div class="w-3 h-3 border-b-2 border-r-2 border-indigo-400 transform rotate-45 -mt-2"></div>
            </div>
        </div>
        
        <!-- REACTION -->
        <div class="w-full relative z-10 group px-4">
            <div style="clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);" class="bg-sky-950/80 border-2 border-sky-400/80 p-10 text-center shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all group-hover:shadow-[0_0_40px_rgba(56,189,248,0.5)]">
                <h4 class="text-sky-300 font-bold uppercase tracking-widest text-xs mb-1 mt-4">Reaction</h4>
                <div class="text-xl font-bold text-white mb-2">Change the Input</div>
                <p class="text-slate-300 text-sm max-w-[200px] mx-auto mb-4">Try a video, diagram, or moving around.</p>
            </div>
            <!-- Arrow -->
            <div class="flex flex-col items-center relative z-0 -mt-2">
                <div class="h-10 w-0.5 bg-sky-400"></div>
                <div class="w-3 h-3 border-b-2 border-r-2 border-sky-400 transform rotate-45 -mt-2"></div>
            </div>
        </div>

        <!-- IMPLEMENTATION / OUTCOME -->
        <div class="w-full relative z-10 group px-8">
            <div style="clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);" class="bg-teal-950/80 border-2 border-teal-400/80 p-6 text-center shadow-[0_0_30px_rgba(45,212,191,0.2)] transition-all group-hover:shadow-[0_0_40px_rgba(45,212,191,0.5)]">
                 <h4 class="text-teal-300 font-bold uppercase tracking-widest text-xs mb-1">Outcome</h4>
                <div class="text-xl font-bold text-white mb-2">Observe Effect</div>
                <p class="text-slate-300 text-sm max-w-[220px] mx-auto">Did changing the method make it easier?</p>
            </div>
            <!-- Arrow -->
            <div class="flex flex-col items-center mt-2 relative z-0">
                <div class="h-10 w-0.5 bg-teal-400"></div>
                <div class="w-3 h-3 border-b-2 border-r-2 border-teal-400 transform rotate-45 -mt-2"></div>
            </div>
        </div>

        <!-- FINAL RESULT -->
        <div class="w-[80%] relative z-10 group mt-2">
            <div class="bg-emerald-950/80 border-4 border-emerald-400/80 rounded-full py-10 px-6 text-center shadow-[0_0_40px_rgba(52,211,153,0.3)] transition-all group-hover:shadow-[0_0_60px_rgba(52,211,153,0.6)]">
                <h4 class="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-2">Final Result</h4>
                <div class="text-2xl font-bold text-white mb-1">Formula Found</div>
                <p class="text-emerald-200/80 text-sm">Keep doing it.</p>
            </div>
        </div>
    </div>
</div>

<h3 class="text-lg font-bold text-white mb-6">How to find your formula:</h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative">
    
    <!-- Step 1 -->
    <div class="bg-indigo-950/30 border border-indigo-500/20 p-6 rounded-2xl flex flex-col items-center text-center relative z-10">
        <div class="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-xl border border-indigo-500/30 mb-4 shadow-lg shadow-indigo-500/20">1</div>
        <strong class="text-white block mb-2 text-lg">Find the Cause</strong>
        <span class="text-sm text-slate-400">Identify what exactly is confusing you. Break a big problem into small pieces.</span>
    </div>
    
    <!-- Step 2 -->
    <div class="bg-indigo-950/30 border border-indigo-500/20 p-6 rounded-2xl flex flex-col items-center text-center relative z-10">
        <div class="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-xl border border-indigo-500/30 mb-4 shadow-lg shadow-indigo-500/20">2</div>
        <strong class="text-white block mb-2 text-lg">Change the Input</strong>
        <span class="text-sm text-slate-400">If reading a book doesn't work, try watching a video, drawing a diagram, or moving around.</span>
    </div>
    
    <!-- Step 3 -->
    <div class="bg-emerald-950/30 border border-emerald-500/20 p-6 rounded-2xl flex flex-col items-center text-center relative z-10">
        <div class="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-xl border border-emerald-500/30 mb-4 shadow-lg shadow-emerald-500/20">3</div>
        <strong class="text-white block mb-2 text-lg">Observe Effect</strong>
        <span class="text-sm text-slate-400">Did changing the method make it easier? If yes, keep doing it. You have found your formula.</span>
    </div>

</div>
`;

    let newContent = content.substring(0, startContent) + '\n' + replacementText + '\n        ' + content.substring(endContent);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced the logical article with the full version including the 7 styles!");
} else {
    console.error("Could not find the content string block to replace. Check endContent pattern.");
}
