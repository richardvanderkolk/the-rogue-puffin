const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetSlug = 'slug: "learning-style-logical"';
const startIndex = content.indexOf(targetSlug);

if (startIndex === -1) {
    console.error("Could not find logical article!");
    process.exit(1);
}

const startPattern = '<p class="lead text-xl text-slate-300 mb-8 leading-relaxed">Hypothesis: Most people assume they are either “good at learning” or not. Conclusion: That hypothesis is false.</p>';
const endPattern = '<li><strong class="text-white">Analyse cause and effect:</strong> You will naturally categorise disorganised concepts. Use this instinct to build logical mental models.</li>\\n            </ol>';
const backupEndPattern = '</ol>';

const startReplace = content.indexOf(startPattern, startIndex);
let endReplace = content.indexOf(endPattern, startReplace);

if (endReplace === -1) {
    endReplace = content.indexOf(backupEndPattern, startReplace);
    if (endReplace !== -1) {
        endReplace += backupEndPattern.length;
    }
} else {
    endReplace += endPattern.length;
}

if (startReplace !== -1 && endReplace !== -1 && endReplace > startReplace) {
    const replacementText = `
<p class="lead text-xl font-mono text-indigo-300 mb-8 p-6 bg-slate-900/50 rounded-2xl border border-indigo-500/20 shadow-xl overflow-x-auto">
  <span class="text-emerald-400">let</span> <span class="text-rose-400">learningAbility</span> = <span class="text-amber-400">false</span>;<br/>
  <span class="text-slate-500">// ERROR: Invalid assumption detected on line 1</span>
</p>

<h2 class="text-2xl font-bold text-white mt-12 mb-4">Theorem 1: The Myth of Absolute Ability</h2>
<div class="p-6 border-l-2 border-indigo-500 bg-slate-900/40 mb-8 space-y-4 text-slate-300 rounded-r-2xl">
  <p><strong class="text-white">Given:</strong> The standard societal assumption that intelligence ($I$) is a binary state: either $I = 1$ (Effective) or $I = 0$ (Ineffective).</p>
  <p><strong class="text-white">Proof of Contradiction:</strong> If $I$ were a universal constant, the same educational algorithm $f(x)$ applied to any individual $x$ would yield predictable results. Real-world observations show extreme variance in outcomes. Therefore, $I$ cannot be a single binary variable.</p>
  <p><strong class="text-white">Conclusion:</strong> The traditional paradigm $f(x)$ is systemically flawed because it fails to account for the multi-dimensional vectors of human processing pathways.</p>
</div>

<blockquote class="my-10 pl-6 border-l-4 border-emerald-500 bg-slate-900/40 p-6 rounded-r-2xl font-mono text-sm leading-relaxed overflow-x-auto shadow-lg">
    <p class="text-white">
        <span class="text-indigo-400">if</span> (Fish.Habitat === <span class="text-amber-400">'Water'</span> && Task === <span class="text-amber-400">'ClimbTree'</span>) {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;Result = <span class="text-rose-400">Failure</span>;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-slate-500">// ∴ Fish incorrectly deduces Intelligence = Low</span><br/>
        }
    </p>
    <footer class="mt-4 text-xs font-bold text-emerald-400 uppercase tracking-widest font-sans">— The Einstein Equivalency </footer>
</blockquote>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">Optimising Your Processing Algorithm</h2>
<p>You operate using structured logic. If you are struggling to parse information, it is an architectural problem, not a processing speed limitation. You are trying to compile chaotic, unstructured data without a schema.</p>

<div class="my-8 p-6 bg-[#0E1117] rounded-3xl border border-slate-800 font-mono text-sm overflow-x-auto shadow-2xl">
<pre><code class="text-slate-300"><span class="text-indigo-400">function</span> <span class="text-emerald-400">processLogicalData</span>(input) {
  <span class="text-slate-500">// Step 1: Deconstruct into variables</span>
  <span class="text-indigo-400">const</span> structure = extractFramework(input);
  
  <span class="text-slate-500">// Step 2: Identify causality</span>
  <span class="text-indigo-400">const</span> mechanics = findPatterns(structure);
  
  <span class="text-slate-500">// Step 3: Formalize constraints</span>
  <span class="text-indigo-400">return</span> applySystemsThinking(mechanics);
}</code></pre>
</div>

<ul class="space-y-4 mb-8 text-slate-300">
    <li class="flex items-start gap-4">
        <span class="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono text-sm mt-0.5 border border-indigo-500/30">01</span>
        <div><strong class="text-white block mb-1">Seek the Underlying Architecture:</strong> Do not just accept the output. Reverse-engineer the sequence of causal steps that arrived at that conclusion.</div>
    </li>
    <li class="flex items-start gap-4">
        <span class="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono text-sm mt-0.5 border border-indigo-500/30">02</span>
        <div><strong class="text-white block mb-1">Convert Chaos to Systems:</strong> When confronted with massive blocks of ambiguous text, structurally re-format them into flowcharts, conditional logic trees, or hierarchical outlines.</div>
    </li>
    <li class="flex items-start gap-4">
        <span class="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono text-sm mt-0.5 border border-indigo-500/30">03</span>
        <div><strong class="text-white block mb-1">Categorise Variables:</strong> Always group raw data into arrays or objects based on defined rules. If a concept breaks a pattern, isolate it as an anomaly and analyse the exception.</div>
    </li>
</ul>
`.trim();

    let newContent = content.substring(0, startReplace) + replacementText + content.substring(endReplace);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced the logical article with an algorithmic format!");
} else {
    console.error("Could not find the text block to replace. Start:", startReplace, "End:", endReplace);
}
