const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetArticleSlugIndex = content.indexOf('slug: "know-your-learning-superpower"');
if (targetArticleSlugIndex === -1) {
    console.error("Could not find article slug!");
    process.exit(1);
}

const startPattern = '<p class="lead text-xl text-slate-300 mb-8 leading-relaxed"> Most people assume they are either “good at learning” or not.</p>';
const endPattern = "<p> Here is a simplified version of Gardner's framework. Which of these feels most like you?</p>";

const startIndex = content.indexOf(startPattern, targetArticleSlugIndex);
const endIndex = content.indexOf(endPattern, startIndex);

if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const replacementText = `
<p class="lead text-xl text-slate-300 mb-8 leading-relaxed"> Most people assume they are either “good at learning” or not.</p>
<p> That’s not true. What is true is that most people have never been shown how they learn best. No two people are the same. We all have different strengths, different tendencies, different ways of processing information.<br/><br/>And yet, most of us were taught in exactly the same way.</p>

<blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl">
    <p class="text-xl font-medium text-white italic leading-relaxed"> "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid." </p>
    <footer class="mt-4 text-sm font-bold text-indigo-300 uppercase tracking-widest">— Often attributed to Albert Einstein </footer>
</blockquote>

<p> Many people don’t struggle with learning because they lack ability—they struggle because they are using the wrong approach for how their mind works.</p>

<h2 class="text-2xl font-bold text-white mt-12 mb-6"> The Seven Learning Intelligences </h2>
<p> Howard Gardner expanded the "Visual, Auditory, and Kinaesthetic" framework into a broader and more helpful one. He identified different forms of intelligence—different ways people naturally understand and engage with information.</p>
<p> Here is a simplified version of Gardner's framework. Which of these feels most like you?</p>
`.trim();

    let newContent = content.substring(0, startIndex) + replacementText + content.substring(endIndex + endPattern.length);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced the intro text in the correct article!");
} else {
    console.error("Could not find the text block to replace. Start:", startIndex, "End:", endIndex);
}
