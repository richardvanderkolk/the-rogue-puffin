const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetSlug = 'slug: "learning-style-kinesthetic"';
const startIndex = content.indexOf(targetSlug);

if (startIndex === -1) {
    console.error("Could not find kinesthetic article!");
    process.exit(1);
}

const contentKeyPattern = 'content: `';
const startContent = content.indexOf(contentKeyPattern, startIndex) + contentKeyPattern.length;
const endContent = content.indexOf('`\n    },', startContent);

if (startContent !== -1 && endContent !== -1 && endContent > startContent) {

    const htmlContent = `
<p class="lead text-xl text-slate-300 mb-8 leading-relaxed">Stop scrolling for a second. Take your hands off the keyboard and put down your phone.</p>

<p class="mb-4 text-lg">Imagine I handed you a complex, 100-piece wooden puzzle box right now. How would you figure out how to open it?</p>
<ul class="space-y-4 mb-10 text-slate-400 list-none mt-6">
    <li class="flex items-center gap-4"><div class="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center shrink-0">A</div> Would you read the instruction manual cover to cover before touching it?</li>
    <li class="flex items-center gap-4"><div class="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center shrink-0">B</div> Would you draw a diagram of how you think the interlocking gears work?</li>
    <li class="flex items-center gap-4"><div class="w-8 h-8 rounded-full border-2 border-amber-500 bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.3)]">C</div> <strong>...Or would you just pick it up, start twisting the pieces, and see how it feels in your hands?</strong></li>
</ul>

<p class="text-2xl text-amber-400 font-bold mb-10 text-center">If you chose C, welcome to the Kinesthetic mind.</p>

<div class="p-6 bg-slate-900/40 border-l-4 border-amber-500 rounded-r-2xl mb-12">
    <p class="text-xl font-medium text-white italic leading-relaxed mb-2"> "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid." </p>
    <footer class="text-sm font-bold text-amber-300 uppercase tracking-widest">— Albert Einstein </footer>
    <p class="mt-4 text-slate-300 text-sm">For you, sitting perfectly still at a desk reading a textbook is like trying to climb that tree. Your mind is built to swim through action, movement, and tangible touch.</p>
</div>

<h2 class="text-2xl font-bold text-white mt-16 mb-6">The Real-World Analogy: The Workshop</h2>
<p class="text-slate-300 mb-10">To understand how different people learn, don't think about a sterile classroom. Think about a physical workshop building a house. Howard Gardner identified 7 different tools (Intelligences) people use to construct understanding. You need to know which tool you are holding.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
    <!-- The 7 Tools -->
    <div class="bg-slate-800/50 p-6 rounded-2xl border-b-4 border-indigo-500 hover:bg-slate-800 transition-colors">
        <h4 class="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-1">Tool 1: The Instruction Manual</h4>
        <div class="text-lg font-bold text-white mb-2">Linguistic Intelligence</div>
        <p class="text-slate-400 text-sm">Learning by reading the text, detailing the vocabulary, and writing down notes.</p>
    </div>

    <div class="bg-slate-800/50 p-6 rounded-2xl border-b-4 border-emerald-500 hover:bg-slate-800 transition-colors">
        <h4 class="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-1">Tool 2: The Measuring Tape</h4>
        <div class="text-lg font-bold text-white mb-2">Logical Intelligence</div>
        <p class="text-slate-400 text-sm">Learning by measuring angles, calculating structural load, and deducing cause-and-effect systems.</p>
    </div>

    <div class="bg-slate-800/50 p-6 rounded-2xl border-b-4 border-sky-500 hover:bg-slate-800 transition-colors">
        <h4 class="text-sky-400 font-bold uppercase tracking-widest text-xs mb-1">Tool 3: The Blueprint</h4>
        <div class="text-lg font-bold text-white mb-2">Visual Intelligence</div>
        <p class="text-slate-400 text-sm">Learning by looking at the layout, navigating the spatial design, and visualizing the final shape.</p>
    </div>

    <div class="bg-amber-900/40 p-6 rounded-2xl border-4 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)] transform md:scale-105 z-10 my-4 md:my-0 relative overflow-hidden group">
        <div class="absolute inset-0 bg-amber-500/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <div class="relative z-10">
            <h4 class="text-amber-300 font-bold uppercase tracking-widest text-xs mb-1">Tool 4: The Hammer & Saw (You)</h4>
            <div class="text-xl font-bold text-white mb-2">Kinesthetic Intelligence</div>
            <p class="text-amber-100 font-medium text-sm leading-relaxed">Learning by grabbing the materials, feeling the weight of the wood, physically trying it, making mistakes, and building it with your own two hands.</p>
        </div>
    </div>

    <div class="bg-slate-800/50 p-6 rounded-2xl border-b-4 border-rose-500 hover:bg-slate-800 transition-colors">
        <h4 class="text-rose-400 font-bold uppercase tracking-widest text-xs mb-1">Tool 5: The Metronome</h4>
        <div class="text-lg font-bold text-white mb-2">Musical Intelligence</div>
        <p class="text-slate-400 text-sm">Learning by finding the rhythm of the machinery, the cadence of the work, and auditory patterns.</p>
    </div>

    <div class="bg-slate-800/50 p-6 rounded-2xl border-b-4 border-teal-500 hover:bg-slate-800 transition-colors">
        <h4 class="text-teal-400 font-bold uppercase tracking-widest text-xs mb-1">Tool 6: The Assembly Line</h4>
        <div class="text-lg font-bold text-white mb-2">Interpersonal Intelligence</div>
        <p class="text-slate-400 text-sm">Learning by coordinating with a team, talking through the physical process, and collaborating.</p>
    </div>

    <div class="bg-slate-800/50 p-6 rounded-2xl border-b-4 border-purple-500 md:col-span-2 text-center md:mx-auto md:w-2/3 hover:bg-slate-800 transition-colors">
        <h4 class="text-purple-400 font-bold uppercase tracking-widest text-xs mb-1">Tool 7: The Locked Door</h4>
        <div class="text-lg font-bold text-white mb-2">Intrapersonal Intelligence</div>
        <p class="text-slate-400 text-sm">Learning by shutting out all external distractions and focusing deeply in total solitary concentration.</p>
    </div>
</div>

<h2 class="text-2xl font-bold text-white mt-16 mb-6">Your Hands-On Action Plan</h2>
<p class="text-slate-300 mb-8">If the standard school system forced everybody to only use "The Instruction Manual," you likely felt broken because you needed "The Hammer." Here is a physical experiment you can do starting today to fix that:</p>

<div class="bg-gradient-to-br from-amber-950/40 to-slate-900/80 border border-amber-500/20 p-8 md:p-10 rounded-3xl mb-12 shadow-2xl">
    <ol class="list-decimal list-inside space-y-8 text-slate-300 text-lg marker:text-amber-500 marker:font-bold">
        <li class="pl-2">
            <strong class="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] text-xl block mb-2 mt-[-1.5rem] ml-6">Never read passively.</strong> 
            <span class="block ml-6 text-base text-slate-400">Always be holding a pen. Underline, circle, and physically attack the page. The physical movement of your hand actively anchors the memory into your brain.</span>
        </li>
        <li class="pl-2">
            <strong class="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] text-xl block mb-2 mt-[-1.5rem] ml-6">Stand up right now.</strong> 
            <span class="block ml-6 text-base text-slate-400">If you have to review material or listen to a lecture, pace the room. Physical movement increases blood flow and engages the kinesthetic learning pathways. Gravity and motion are your friends.</span>
        </li>
        <li class="pl-2">
            <strong class="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] text-xl block mb-2 mt-[-1.5rem] ml-6">Build the physical analogy.</strong> 
            <span class="block ml-6 text-base text-slate-400">If an abstract concept is confusing, map it to physical objects in front of you. "This coffee cup is the database, and this pen is the API sending data." Move them around with your hands until the logic clicks.</span>
        </li>
    </ol>
</div>

<div class="mt-12 space-y-4">
    <a href="/blog/know-your-learning-superpower" class="block p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-amber-500/30 hover:bg-slate-900 transition-all group text-center max-w-lg mx-auto">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Back to Overview</p>
        <h4 class="text-base font-bold text-white group-hover:text-amber-400 transition-colors">Return to The Seven Intelligences<span class="text-amber-500 ml-1">→</span></h4>
    </a>
</div>
    `;

    let newContent = content.substring(0, startContent) + '\n' + htmlContent + '\n        ' + content.substring(endContent);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced kinesthetic article with real-world physical workshop analogy!");
} else {
    console.error("Could not find content block for kinesthetic article.");
}
