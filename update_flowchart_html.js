const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetSlug = 'slug: "learning-style-logical"';
const startIndex = content.indexOf(targetSlug);

if (startIndex === -1) {
    console.error("Could not find logical article!");
    process.exit(1);
}

// target string to replace
const replaceTarget = '<img src="/images/blog/simple_flowchart.png" alt="A simple flowchart showing a process of cause and effect" class="w-full h-auto rounded-3xl shadow-2xl border border-emerald-500/20" />';
const i = content.indexOf(replaceTarget, startIndex);

if (i !== -1) {
    const htmlFlowchart = `
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
    `.trim();

    content = content.replace(replaceTarget, htmlFlowchart);
    fs.writeFileSync(FILE_PATH, content);
    console.log("Successfully replaced image with HTML flowchart!");
} else {
    console.error("Could not find image tag to replace!");
}
