const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetArticleSlugIndex = content.indexOf('slug: "know-your-learning-superpower"');
if (targetArticleSlugIndex === -1) {
    console.error("Could not find article slug!");
    process.exit(1);
}

const styles = ['linguistic', 'logical', 'visual', 'kinesthetic', 'musical', 'interpersonal', 'intrapersonal'];

let numReplaced = 0;

styles.forEach(style => {
    // Current buttons
    const oldReadGuide = `<a href="/blog/learning-style-${style}" class="text-xs font-bold uppercase tracking-wide px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">Read Guide</a>`;
    const oldSeeExample = `<a href="?style=${style}" class="text-xs font-bold uppercase tracking-wide px-4 py-2 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors" scroll="false">See Example</a>`;

    // New buttons: swap hrefs, keeping classes exactly same (so "Read Guide" retains solid styling but goes to the popup, etc.) Wait, does the user want the solid button for Read Guide and outline for See Example? 
    // They said: "The current popups for the 7 Learning styles should be what people get when they click on 'Read Guide' not when they click on 'See example'"
    // This implies they just want the buttons swapped.
    // I will give "Read Guide" the `?style=${style}` and `scroll="false"`
    // And "See Example" the `/blog/...`

    const newReadGuide = `<a href="?style=${style}" class="text-xs font-bold uppercase tracking-wide px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors" scroll="false">Read Guide</a>`;
    const newSeeExample = `<a href="/blog/learning-style-${style}" class="text-xs font-bold uppercase tracking-wide px-4 py-2 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors">See Example</a>`;

    // Only replace within the "know your learning superpower" article scope. 
    // We can do a global replace since these exact strings only appear there anyway.
    if (content.indexOf(oldReadGuide) !== -1) {
        content = content.replace(oldReadGuide, newReadGuide);
        numReplaced++;
    } else {
        console.error("Failed to find 'Read Guide' for:", style);
    }

    if (content.indexOf(oldSeeExample) !== -1) {
        content = content.replace(oldSeeExample, newSeeExample);
        numReplaced++;
    } else {
        console.error("Failed to find 'See Example' for:", style);
    }
});

fs.writeFileSync(FILE_PATH, content);
console.log('Done replacing button links. Total replaced:', numReplaced);
