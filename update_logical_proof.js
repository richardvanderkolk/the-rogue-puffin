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
// We look for the closing backtick and the end of the object block '    },'
const endContent = content.indexOf('`\n    },', startContent);

if (startContent !== -1 && endContent !== -1 && endContent > startContent) {
    const replacementText = `
<p class="lead text-xl text-slate-300 mb-8 leading-relaxed font-mono">
    <span class="text-indigo-400">Hypothesis:</span> Most people assume they are either “good at learning” or not.<br>
    <span class="text-rose-400">Status:</span> Mathematically incorrect.
</p>

<p>The traditional education system operates on a flawed algorithm. It assumes that "Intelligence" is a scalar value—a single number that dictates how well you learn. As a logical thinker, you understand that complex systems cannot be reduced to a single variable.</p>

<div class="my-10 p-8 rounded-3xl bg-slate-900/50 border border-slate-700 font-mono shadow-2xl overflow-x-auto">
    <h3 class="text-lg text-white font-bold mb-4 font-sans">The Standard Education Equation (Flawed)</h3>
    <p class="text-slate-300 mb-2">Let <span class="text-emerald-400">S</span> = A Student</p>
    <p class="text-slate-300 mb-2">Let <span class="text-emerald-400">E</span> = The Standard Educational Environment (Lectures, text, sitting still)</p>
    <p class="text-slate-300 mb-6">Let <span class="text-indigo-400">P(S, E)</span> = The Performance of <span class="text-emerald-400">S</span> in <span class="text-emerald-400">E</span></p>
    
    <div class="p-4 bg-black/40 rounded-xl mb-4 text-center border border-white/5">
        <span class="text-lg text-white">Assertion: P(S, E) ∝ Intrinsic Intelligence of S</span>
    </div>
    <p class="text-sm text-slate-400">This model assumes <span class="text-emerald-400">E</span> is a neutral constant. Therefore, if <span class="text-indigo-400">P</span> is low, it concludes that the intrinsic intelligence of <span class="text-emerald-400">S</span> must be low.</p>
</div>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">Proving the Flaw (The Fish Postulate)</h2>

<blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl">
    <p class="text-xl font-medium text-white italic leading-relaxed"> "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid." </p>
    <footer class="mt-4 text-sm font-bold text-indigo-300 uppercase tracking-widest">— Often attributed to Albert Einstein </footer>
</blockquote>

<p>Let’s apply logical deduction to Einstein’s postulate to disprove the Standard Equation.</p>

<ul class="space-y-3 mb-8 text-slate-300 list-disc pl-6 font-mono text-sm">
    <li>Let <span class="text-emerald-400">S₁</span> = Fish</li>
    <li>Let <span class="text-amber-400">E₁</span> = Climbing a Tree</li>
    <li>Let <span class="text-sky-400">E₂</span> = Swimming in Water</li>
</ul>

<div class="p-6 border-l-2 border-indigo-500 bg-slate-900/40 mb-10 space-y-4 text-slate-300 rounded-r-2xl font-mono text-sm">
  <p><span class="text-indigo-400">Observation 1:</span> P(S₁, E₁) = 0. Under the flawed standard equation, society incorrectly concludes the Fish has zero intelligence.</p>
  <p><span class="text-indigo-400">Observation 2:</span> P(S₁, E₂) = Optimal.</p>
  <p><strong class="text-white font-sans text-base block mt-4">Logical Conclusion:</strong> Performance (P) is not a measure of absolute intelligence, but rather a measure of the <em>intersection</em> between a student's processing style and the delivery method. If the vectors are completely misaligned (as with the fish and the tree), the resulting dot product is zero.</p>
</div>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">Updating the Variables</h2>
<p>Howard Gardner proved that intelligence cannot be reduced to a single scalar value. Instead, it is a matrix of distinct variables: Linguistic, Logical, Visual, Kinesthetic, Musical, Interpersonal, and Intrapersonal.</p>
<p>As a Logical-Mathematical learner, your dominant variables are structure, sequences, categorization, and causality. If you are struggling to comprehend a subject, do not assume your cognitive processing power is low. The error is likely in the format of the data.</p>
<p>To optimize your learning outcome, you must actively reformat your environment. Strip away the narrative noise. Extract the variables. Map out the causal relationships, and compile the information into a logical system your mind can easily execute.</p>
`;

    let newContent = content.substring(0, startContent) + '\n' + replacementText + '\n        ' + content.substring(endContent);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced the logical article with the mathematical proof format!");
} else {
    console.error("Could not find the content string block to replace. Check endContent pattern.");
}
