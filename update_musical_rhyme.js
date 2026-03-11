const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetSlug = 'slug: "learning-style-musical"';
const startIndex = content.indexOf(targetSlug);

if (startIndex === -1) {
    console.error("Could not find musical article!");
    process.exit(1);
}

const contentKeyPattern = 'content: `';
const startContent = content.indexOf(contentKeyPattern, startIndex) + contentKeyPattern.length;
const endContent = content.indexOf('`\n    },', startContent);

if (startContent !== -1 && endContent !== -1 && endContent > startContent) {

    // The specific section we want to replace/insert before
    const insertTarget = `<h3 class="text-2xl font-bold text-white mb-6">The Seven Beats of Intelligence</h3>
        <p class="text-slate-400 mb-8 italic">Howard Gardner wrote a different score. He found seven distinct grooves. Which tempo is yours?</p>`;

    const mnemonicRhyme = `
        <h3 class="text-2xl font-bold text-white mb-2">The Seven Beats of Intelligence</h3>
        <p class="text-slate-400 mb-8 italic">Howard Gardner wrote a different score. He found seven distinct grooves. Which tempo is yours?</p>
        
        <!-- The Mnemonic Bridge -->
        <div class="bg-indigo-900/40 border-l-4 border-indigo-400 p-6 rounded-r-2xl mb-12 shadow-inner">
            <p class="text-sm text-indigo-300 font-bold uppercase tracking-widest mb-2">The Bridge (How to remember them all)</p>
            <p class="text-indigo-100 font-medium leading-relaxed text-lg italic">
                Words and Logic, Space to see,<br/>
                Body moving, Melody,<br/>
                With the Group or all Alone,<br/>
                Seven ways to find your tone!
            </p>
        </div>
    `.trim();

    content = content.replace(insertTarget, mnemonicRhyme);
    fs.writeFileSync(FILE_PATH, content);
    console.log("Successfully inserted the mnemonic rhyme bridge into the musical article!");
} else {
    console.error("Could not find content block for musical article.");
}
