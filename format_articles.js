const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/articles.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix Headers with emojis
// From: <h2 class="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><span class="text-indigo-400">🚀</span> Give Yourself a Head Start</h2>
// To: <h2 class="text-2xl font-bold text-white mt-12 mb-6">Give Yourself a Head Start</h2>
content = content.replace(/<h([234]) class="([^"]*)flex items-center gap-3([^"]*)"><span class="text-indigo-[0-9]{3}">.*?<\/span>\s*(.*?)<\/h\1>/g, (match, tag, clsBefore, clsAfter, text) => {
    let newCls = (clsBefore + clsAfter).trim().replace(/\s+/g, ' ');
    if (newCls.endsWith(' ')) newCls = newCls.slice(0, -1);
    return `<h${tag} class="${newCls}">${text.trim()}</h${tag}>`;
});

// 2. Fix blockquotes
// <blockquote class="border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl font-medium text-white italic my-8 mb-8">
// To: <blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl">\n<p class="text-xl font-medium text-white italic leading-relaxed">...</p>
content = content.replace(/<blockquote class="border-l-4 border-indigo-500 bg-slate-900\/40 p-6 rounded-r-2xl font-medium text-white italic my-8(?: mb-8)?">\s*([\s\S]*?)\s*<\/blockquote>/g, (match, text) => {
    return `<blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl">
                <p class="text-xl font-medium text-white italic leading-relaxed">${text.trim()}</p>
            </blockquote>`;
});

// 3. Fix lists with checkmarks '✓' or arrows '→' or numbers if they match the old pattern
// Old: <ul class="space-y-4 my-6 text-slate-300 bg-slate-900/40 p-6 rounded-2xl border border-white/5">
// Old: <ul class="space-y-4 my-6 text-slate-300 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
// Old: <div class="space-y-3 my-8">... <div class="flex items-start gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl"><span class="text-indigo-400 text-lg shrink-0">→</span>...

// Doing this perfectly with regex is hard, let's write custom replacers for specific list patterns found in the articles.
// Let's just save the file for now and check if headers and blockquotes worked.
fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished formatting headers and blockquotes.');
