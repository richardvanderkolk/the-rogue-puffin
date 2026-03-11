const fs = require('fs');

let content = fs.readFileSync('src/data/articles.ts', 'utf8');

// 1. That's not true
content = content.replace(
    /Most people assume they are either “good at learning” or not\.<\/p>\s*<p>\s*That’s not true\.<\/p>/,
    'Most people assume they are either “good at learning” or not. That’s not true.</p>'
);

// 2. Spaces after full stops
content = content.replace(
    /best\.No two people are the same\.We all have different strengths/,
    'best. No two people are the same. We all have different strengths'
);

// 3. Line break after processing information
content = content.replace(
    /different ways of processing information\.<\/p>\s*<p>\s*And yet/,
    'different ways of processing information.</p><br/>\n<p> And yet'
);

// 4. Remove whether or not he said it
content = content.replace(
    /<p>\s*Whether or not he said it, the point stands\.<\/p>/,
    ''
);

// 5. Remove "Not Just Visual" bridging section
content = content.replace(
    /<h2[^>]*>\s*Not Just “Visual, Auditory, Kinaesthetic”<\/h2>[\s\S]*?<h2[^>]*>\s*The Seven Learning Intelligences\s*<\/h2>\s*<p>\s*Here is a simplified version of Gardner's framework\. Which of these feels most like you\?<\/p>/,
    '<h2 class="text-2xl font-bold text-white mt-12 mb-6"> The Seven Learning Styles </h2>\n<p> Here is a framework of seven different ways people naturally understand and engage with information. Which of these feels most like you?</p>'
);

// 6. Grid boxes update
const gridRegex = /<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">([\s\S]*?)<div class="mt-16 p-8 bg-indigo-950\/20/m;
const gridContent = `
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
    <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col">
        <div class="flex-grow">
            <h3 class="text-lg font-bold text-indigo-300 mb-3"> 1. Linguistic </h3>
            <p class="text-white font-medium mb-2"> You think in words.</p>
            <p class="text-sm text-slate-400"> You learn well through reading, writing, and explaining. You benefit from turning ideas into sentences.</p>
        </div>
        <div class="pt-6 mt-6 border-t border-slate-800/50 space-y-3">
            <a href="/blog/learning-style-linguistic" class="flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Guide: How to Use Linguistic Style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
            <a href="?style=linguistic" class="flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Pop-up: Read article in Linguistic style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
        </div>
    </div>

    <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col">
        <div class="flex-grow">
            <h3 class="text-lg font-bold text-indigo-300 mb-3"> 2. Logical-Mathematical </h3>
            <p class="text-white font-medium mb-2"> You think in structure.</p>
            <p class="text-sm text-slate-400"> You learn well through systems, patterns, and cause-and-effect. You naturally organise ideas and look for relationships.</p>
        </div>
        <div class="pt-6 mt-6 border-t border-slate-800/50 space-y-3">
            <a href="/blog/learning-style-logical" class="flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Guide: How to Use Logical Style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
            <a href="?style=logical" class="flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Pop-up: Read article in Logical style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
        </div>
    </div>

    <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col">
        <div class="flex-grow">
            <h3 class="text-lg font-bold text-indigo-300 mb-3"> 3. Visual-Spatial </h3>
            <p class="text-white font-medium mb-2"> You think in images.</p>
            <p class="text-sm text-slate-400"> You learn well through diagrams, visual frameworks, and mental pictures. You remember what you see.</p>
        </div>
        <div class="pt-6 mt-6 border-t border-slate-800/50 space-y-3">
            <a href="/blog/learning-style-visual" class="flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Guide: How to Use Visual Style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
            <a href="?style=visual" class="flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Pop-up: Read article in Visual style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
        </div>
    </div>

    <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col">
        <div class="flex-grow">
            <h3 class="text-lg font-bold text-indigo-300 mb-3"> 4. Bodily-Kinesthetic </h3>
            <p class="text-white font-medium mb-2"> You think through action.</p>
            <p class="text-sm text-slate-400"> You learn best by doing, practising, and experimenting. Understanding comes through movement.</p>
        </div>
        <div class="pt-6 mt-6 border-t border-slate-800/50 space-y-3">
            <a href="/blog/learning-style-kinesthetic" class="flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Guide: How to Use Kinesthetic Style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
            <a href="?style=kinesthetic" class="flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Pop-up: Read article in Kinesthetic style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
        </div>
    </div>

    <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col">
        <div class="flex-grow">
            <h3 class="text-lg font-bold text-indigo-300 mb-3"> 5. Musical </h3>
            <p class="text-white font-medium mb-2"> You think in rhythm and sound.</p>
            <p class="text-sm text-slate-400"> You learn well through patterns, repetition, and sound. You may naturally remember through rhythm or tone.</p>
        </div>
        <div class="pt-6 mt-6 border-t border-slate-800/50 space-y-3">
            <a href="/blog/learning-style-musical" class="flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Guide: How to Use Musical Style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
            <a href="?style=musical" class="flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Pop-up: Read article in Musical style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
        </div>
    </div>

    <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col">
        <div class="flex-grow">
            <h3 class="text-lg font-bold text-indigo-300 mb-3"> 6. Interpersonal </h3>
            <p class="text-white font-medium mb-2"> You think through interaction.</p>
            <p class="text-sm text-slate-400"> You learn best by discussing, teaching others, and exploring ideas together. Conversation clarifies your thinking.</p>
        </div>
        <div class="pt-6 mt-6 border-t border-slate-800/50 space-y-3">
            <a href="/blog/learning-style-interpersonal" class="flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Guide: How to Use Interpersonal Style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
            <a href="?style=interpersonal" class="flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Pop-up: Read article in Interpersonal style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
        </div>
    </div>

    <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors flex flex-col md:col-span-2 max-w-2xl mx-auto w-full">
        <div class="flex-grow">
            <h3 class="text-lg font-bold text-indigo-300 mb-3"> 7. Intrapersonal </h3>
            <p class="text-white font-medium mb-2"> You think through reflection.</p>
            <p class="text-sm text-slate-400"> You learn best by journaling, thinking deeply, and processing internally. Understanding develops quietly over time.</p>
        </div>
        <div class="pt-6 mt-6 border-t border-slate-800/50 space-y-3">
            <a href="/blog/learning-style-intrapersonal" class="flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Guide: How to Use Intrapersonal Style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
            <a href="?style=intrapersonal" class="flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Pop-up: Read article in Intrapersonal style <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></a>
        </div>
    </div>
</div>
<div class="mt-16 p-8 bg-indigo-950/20`;

content = content.replace(gridRegex, gridContent);

fs.writeFileSync('src/data/articles.ts', content, 'utf8');
console.log('Update script executed.');
