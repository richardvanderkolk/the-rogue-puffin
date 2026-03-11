const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/articles.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Unifying callout boxes: bg-slate-900/40 border border-white/5 -> bg-slate-900/50 border border-slate-800
content = content.replace(/bg-slate-900\/40 border border-white\/5/g, 'bg-slate-900/50 border border-slate-800');

// Another similar callout
content = content.replace(/bg-slate-900\/40 border border-slate-800/g, 'bg-slate-900/50 border border-slate-800');

// Making sure all blockquotes have pl-6 and my-10
content = content.replace(/<blockquote class="([^"]*)">/g, (match, classes) => {
    let newClasses = classes;
    if (!newClasses.includes('pl-6')) newClasses += ' pl-6';
    if (!newClasses.includes('my-10')) newClasses = newClasses.replace(/my-8/g, 'my-10');
    // Clean up spaces
    newClasses = newClasses.replace(/\s+/g, ' ').trim();
    return `<blockquote class="${newClasses}">`;
});

// Fix list numbers and checks in older articles
// E.g., <span class="text-indigo-500 font-bold text-xl shrink-0 w-8">01</span>
// To: <span class="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-indigo-300 font-bold shrink-0">1</span>
content = content.replace(/<span class="text-indigo-500 font-bold text-xl shrink-0 w-8">0?([0-9]+)<\/span>/g, '<span class="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-indigo-300 font-bold shrink-0">$1</span>');

// E.g., <li class="flex items-center gap-3"><span class="text-indigo-500">✓</span> 8 hours of sleep</li>
// Replace just the span to match the rounded style if inside a list
content = content.replace(/<span class="text-indigo-500">✓<\/span>/g, '<span class="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-indigo-300 font-bold shrink-0 text-xs">✓</span>');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished updating classes.');
