const fs = require('fs');

const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const replacementGrid = `
<div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col h-full">
    <h3 class="text-lg font-bold text-indigo-300 mb-3"> 1. Linguistic </h3>
    <p class="text-white font-medium mb-2"> You think in words.</p>
    <p class="text-sm text-slate-400 mb-6 flex-grow"> You learn well through reading, writing, and explaining. You benefit from turning ideas into sentences.</p>
    <div class="flex gap-3 justify-start mt-auto">
        <a href="/blog/learning-style-linguistic" class="text-xs font-bold uppercase tracking-wide px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">Read Guide</a>
        <a href="?style=linguistic" class="text-xs font-bold uppercase tracking-wide px-4 py-2 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors" scroll="false">See Example</a>
    </div>
</div>

<div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col h-full">
    <h3 class="text-lg font-bold text-indigo-300 mb-3"> 2. Logical-Mathematical </h3>
    <p class="text-white font-medium mb-2"> You think in structure.</p>
    <p class="text-sm text-slate-400 mb-6 flex-grow"> You learn well through systems, patterns, and cause-and-effect. You naturally organise ideas and look for relationships.</p>
    <div class="flex gap-3 justify-start mt-auto">
        <a href="/blog/learning-style-logical" class="text-xs font-bold uppercase tracking-wide px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">Read Guide</a>
        <a href="?style=logical" class="text-xs font-bold uppercase tracking-wide px-4 py-2 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors" scroll="false">See Example</a>
    </div>
</div>

<div class= "bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col h-full">
    <h3 class= "text-lg font-bold text-indigo-300 mb-3"> 3. Visual-Spatial </h3>
    <p class="text-white font-medium mb-2"> You think in images.</p>
    <p class="text-sm text-slate-400 mb-6 flex-grow"> You learn well through diagrams, visual frameworks, and mental pictures. You remember what you see.</p>
    <div class="flex gap-3 justify-start mt-auto">
        <a href="/blog/learning-style-visual" class="text-xs font-bold uppercase tracking-wide px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">Read Guide</a>
        <a href="?style=visual" class="text-xs font-bold uppercase tracking-wide px-4 py-2 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors" scroll="false">See Example</a>
    </div>
</div>

<div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col h-full">
    <h3 class="text-lg font-bold text-indigo-300 mb-3"> 4. Bodily-Kinesthetic </h3>
    <p class="text-white font-medium mb-2"> You think through action.</p>
    <p class="text-sm text-slate-400 mb-6 flex-grow"> You learn best by doing, practising, and experimenting. Understanding comes through movement.</p>
    <div class="flex gap-3 justify-start mt-auto">
        <a href="/blog/learning-style-kinesthetic" class="text-xs font-bold uppercase tracking-wide px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">Read Guide</a>
        <a href="?style=kinesthetic" class="text-xs font-bold uppercase tracking-wide px-4 py-2 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors" scroll="false">See Example</a>
    </div>
</div>

<div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col h-full">
    <h3 class="text-lg font-bold text-indigo-300 mb-3"> 5. Musical </h3>
    <p class="text-white font-medium mb-2"> You think in rhythm and sound.</p>
    <p class="text-sm text-slate-400 mb-6 flex-grow"> You learn well through patterns, repetition, and sound. You may naturally remember through rhythm or tone.</p>
    <div class="flex gap-3 justify-start mt-auto">
        <a href="/blog/learning-style-musical" class="text-xs font-bold uppercase tracking-wide px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">Read Guide</a>
        <a href="?style=musical" class="text-xs font-bold uppercase tracking-wide px-4 py-2 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors" scroll="false">See Example</a>
    </div>
</div>

<div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col h-full">
    <h3 class="text-lg font-bold text-indigo-300 mb-3"> 6. Interpersonal </h3>
    <p class="text-white font-medium mb-2"> You think through interaction.</p>
    <p class="text-sm text-slate-400 mb-6 flex-grow"> You learn best by discussing, teaching others, and exploring ideas together. Conversation clarifies your thinking.</p>
    <div class="flex gap-3 justify-start mt-auto">
        <a href="/blog/learning-style-interpersonal" class="text-xs font-bold uppercase tracking-wide px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">Read Guide</a>
        <a href="?style=interpersonal" class="text-xs font-bold uppercase tracking-wide px-4 py-2 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors" scroll="false">See Example</a>
    </div>
</div>

<div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors md:col-span-2 flex flex-col h-full">
    <h3 class="text-lg font-bold text-indigo-300 mb-3"> 7. Intrapersonal </h3>
    <p class="text-white font-medium mb-2"> You think through reflection.</p>
    <p class="text-sm text-slate-400 mb-6 flex-grow"> You learn best by journaling, thinking deeply, and processing internally. Understanding develops quietly over time.</p>
    <div class="flex gap-3 justify-start mt-auto">
        <a href="/blog/learning-style-intrapersonal" class="text-xs font-bold uppercase tracking-wide px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">Read Guide</a>
        <a href="?style=intrapersonal" class="text-xs font-bold uppercase tracking-wide px-4 py-2 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors" scroll="false">See Example</a>
    </div>
</div>
`;

let beforeIndex = content.indexOf('<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">');
let afterIndex = content.indexOf('<div class="mt-16 p-8 bg-indigo-950/20 border border-indigo-500/20');
if (beforeIndex > -1 && afterIndex > -1 && beforeIndex < afterIndex) {
    let beforeString = content.substring(0, beforeIndex + '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">'.length);
    let afterString = content.substring(afterIndex);
    let replaced = beforeString + '\n' + replacementGrid + '\n' + afterString;
    fs.writeFileSync(FILE_PATH, replaced);
    console.log("Grid replaced successfully.");
} else {
    console.log("Could not find grid boundaries:", beforeIndex, afterIndex);
}
