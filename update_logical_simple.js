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

// Find the end of this article's content specifically.
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

<h2 class="text-2xl font-bold text-white mt-12 mb-6">The Learning Process</h2>
<p class="mb-8 text-slate-300">If you are struggling to learn something, do not assume you are not smart enough. Instead, look at the process. Change the equation.</p>

<div class="my-12">
    <img src="/images/blog/simple_flowchart.png" alt="A simple flowchart showing a process of cause and effect" class="w-full h-auto rounded-3xl shadow-2xl border border-emerald-500/20" />
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
    console.log("Successfully replaced the logical article with a simple, visual, logic-style explanation!");
} else {
    console.error("Could not find the content string block to replace.");
}
