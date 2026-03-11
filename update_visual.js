const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetSlug = 'slug: "learning-style-visual"';
const startIndex = content.indexOf(targetSlug);

if (startIndex === -1) {
    console.error("Could not find visual article!");
    process.exit(1);
}

const startPattern = '<p class="lead text-xl text-slate-300 mb-8 leading-relaxed">Imagine two distinct paths';
const alternativeEndPattern = '</ul>'; // simpler end pattern

const startReplace = content.indexOf(startPattern, startIndex);

// Let's just find the end of the content string block for this article.
let endBlock = content.indexOf('</div>', content.indexOf('Visual Mapping Core Principles:', startIndex));

if (startReplace !== -1 && endBlock !== -1 && endBlock > startReplace) {
    const replacementText = `
<p class="lead text-xl text-slate-300 mb-8 leading-relaxed">Imagine two distinct paths. Most people assume they are either on the “good at learning” path or the bad one. That road sign is pointing the wrong way entirely.</p>

<p>Picture something different. What is true is that most people have never seen the blueprint for how they learn best. No two mental maps are the same. We all have different lenses, different perspectives, different ways of painting a picture in our minds.</p>

<div class="my-12">
    <img src="/images/blog/abstract_fish.png" alt="An abstract fish floating near an ancient tree in space" class="w-full h-auto rounded-3xl shadow-2xl border border-white/10" />
</div>

<blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl">
    <p class="text-xl font-medium text-white italic leading-relaxed"> "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid." </p>
    <footer class="mt-4 text-sm font-bold text-indigo-300 uppercase tracking-widest">— Often attributed to Albert Einstein </footer>
</blockquote>

<p>If you're struggling to grasp a concept, it's not because you lack the vision. It's because the information isn't being displayed in the right colors or shapes for your mind's eye.</p>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">Designing Your Learning</h2>
<p>Howard Gardner illustrated a broader framework of intelligence. He identified different designs—different ways people naturally see and engage with information.</p>

<div class="my-12">
    <img src="/images/blog/visual_mindmap.png" alt="A glowing abstract mind map representing visual learning" class="w-full h-auto rounded-3xl shadow-2xl border border-indigo-500/20" />
</div>

<div class="p-6 bg-slate-800/50 border-l-2 border-indigo-400 my-6">
    <p class="text-indigo-300 font-bold mb-2">Visual Mapping Core Principles:</p>
    <ul class="space-y-2">
        <li class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-emerald-400"></div> <span>Translate dense text into diagrams or mind maps.</span></li>
        <li class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-amber-400"></div> <span>Use color-coding to group related concepts.</span></li>
        <li class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-rose-400"></div> <span>Rely on strong spatial metaphors (e.g., a pyramid or a branching tree).</span></li>
    </ul>
</div>
`.trim();

    let newContent = content.substring(0, startReplace) + replacementText + content.substring(endBlock + '</div>'.length);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced the visual article with images!");
} else {
    console.error("Could not find the text block to replace. Start:", startReplace, "End:", endBlock);
}
