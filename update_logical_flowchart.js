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
const endContent = content.indexOf('`', startContent);

if (startContent !== -1 && endContent !== -1 && endContent > startContent) {
    const replacementText = `
<p class="lead text-xl text-slate-300 mb-8 leading-relaxed">Hypothesis: Most people assume they are either “good at learning” or not. Conclusion: That hypothesis is false.</p>

<p>What is true is that most people have never executed the optimal algorithm for how they learn best. We all operate on different processing rules and frameworks.</p>

<blockquote class="my-10 pl-6 border-l-4 border-emerald-500 bg-slate-900/40 p-6 rounded-r-2xl border border-r-0 border-t-0 border-b-0 border-slate-800">
    <p class="text-xl font-medium text-white italic leading-relaxed"> "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid." </p>
    <footer class="mt-4 text-sm font-bold text-indigo-300 uppercase tracking-widest">— Often attributed to Albert Einstein </footer>
</blockquote>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">The Learning Algorithm (Flowchart)</h2>
<p class="mb-8 text-slate-300">As a logical learner, you must stop treating information as isolated facts and start treating it as a system. Execute the following process.</p>

<div class="my-12">
    <img src="/images/blog/logical_flowchart.png" alt="A sleek mathematical flowchart showing an algorithm" class="w-full h-auto rounded-3xl shadow-2xl border border-indigo-500/20" />
</div>

<!-- Step 1 -->
<div class="relative bg-slate-900/50 border border-indigo-500/30 rounded-2xl p-6 shadow-xl mb-4">
    <div class="flex items-center gap-4 mb-4">
        <div class="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center border border-indigo-500/30">01</div>
        <h3 class="text-lg font-bold text-white mb-0">Input Phase: Deconstruct the Data</h3>
    </div>
    <ul class="list-disc pl-14 text-sm text-slate-300 space-y-2">
        <li>Identify exactly what the goal or problem is.</li>
        <li>Isolate the variables (the core facts or concepts).</li>
        <li>Discard irrelevant narrative or emotional framing.</li>
    </ul>
</div>

<!-- Connector -->
<div class="flex justify-center my-2">
    <div class="w-0.5 h-8 bg-indigo-500/50"></div>
</div>
<!-- Arrow head -->
<div class="flex justify-center -mt-3 mb-2">
    <div class="w-3 h-3 border-r-2 border-b-2 border-indigo-500/50 transform rotate-45"></div>
</div>

<!-- Step 2 -->
<div class="relative bg-slate-900/50 border border-indigo-500/30 rounded-2xl p-6 shadow-xl mb-4">
    <div class="flex items-center gap-4 mb-4">
        <div class="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center border border-indigo-500/30">02</div>
        <h3 class="text-lg font-bold text-white mb-0">Processing Phase: Identify Conditional Logic</h3>
    </div>
    <ul class="list-disc pl-14 text-sm text-slate-300 space-y-2">
        <li>Establish <strong class="text-indigo-300">If/Then</strong> relationships between the variables.</li>
        <li>Ask: "If parameter A changes, how does parameter B respond?"</li>
        <li>Map out the cause-and-effect sequences governing the system.</li>
    </ul>
</div>

<!-- Connector -->
<div class="flex justify-center my-2">
    <div class="w-0.5 h-8 bg-indigo-500/50"></div>
</div>
<!-- Arrow head -->
<div class="flex justify-center -mt-3 mb-2">
    <div class="w-3 h-3 border-r-2 border-b-2 border-indigo-500/50 transform rotate-45"></div>
</div>

<!-- Step 3 -->
<div class="relative bg-slate-900/50 border border-emerald-500/30 rounded-2xl p-6 shadow-xl mb-8">
    <div class="flex items-center gap-4 mb-4">
        <div class="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center border border-emerald-500/30">03</div>
        <h3 class="text-lg font-bold text-white mb-0">Output Phase: Build the System Framework</h3>
    </div>
    <ul class="list-disc pl-14 text-sm text-slate-300 space-y-2">
        <li>Categorise your findings into governed rulesets.</li>
        <li>Visualise the entire flowchart or hierarchical structure.</li>
        <li>You will now remember the <em class="text-white">pattern</em>, not just the isolated facts.</li>
    </ul>
</div>

<p class="mt-8 text-slate-300">If you encounter an anomaly while studying, do not just memorize it as an exception. Isolate it, analyse why it breaks the established pattern, and update your mental algorithm accordingly.</p>
`;

    let newContent = content.substring(0, startContent) + '\\n' + replacementText + '\\n        ' + content.substring(endContent);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced the logical article with a flowchart format!");
} else {
    console.error("Could not find the content string block to replace.");
}
