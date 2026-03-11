const fs = require('fs');
const file = 'src/data/articles.ts';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // General text colors
    content = content.replace(/text-white/g, 'text-foreground');
    content = content.replace(/text-slate-100/g, 'text-foreground');
    content = content.replace(/text-slate-300/g, 'text-slate-700 dark:text-slate-300');
    content = content.replace(/text-slate-400/g, 'text-slate-600 dark:text-slate-400');
    content = content.replace(/text-slate-500/g, 'text-slate-500 dark:text-slate-400');
    
    // Backgrounds and borders
    content = content.replace(/bg-slate-900\/40/g, 'bg-slate-100 dark:bg-slate-900/40');
    content = content.replace(/bg-slate-900\/50/g, 'bg-slate-100 dark:bg-slate-900/50');
    content = content.replace(/bg-slate-900\/60/g, 'bg-slate-100 dark:bg-slate-900/60');
    content = content.replace(/bg-slate-900/g, 'bg-slate-200 dark:bg-slate-900');
    content = content.replace(/bg-slate-800\/50/g, 'bg-slate-200 dark:bg-slate-800/50');
    content = content.replace(/bg-slate-800/g, 'bg-slate-200 dark:bg-slate-800');
    content = content.replace(/border-slate-800\/60/g, 'border-slate-300 dark:border-slate-800/60');
    content = content.replace(/border-slate-800/g, 'border-slate-300 dark:border-slate-800');
    content = content.replace(/border-white\/5/g, 'border-slate-200 dark:border-white/5');

    // Indigo elements
    content = content.replace(/text-indigo-300/g, 'text-indigo-600 dark:text-indigo-300');
    content = content.replace(/text-indigo-400/g, 'text-indigo-600 dark:text-indigo-400');
    content = content.replace(/text-indigo-500/g, 'text-indigo-600 dark:text-indigo-500');
    content = content.replace(/border-indigo-500\/30/g, 'border-indigo-300 dark:border-indigo-500/30');
    content = content.replace(/border-indigo-500\/50/g, 'border-indigo-300 dark:border-indigo-500/50');
    content = content.replace(/bg-indigo-950\/30/g, 'bg-indigo-50 dark:bg-indigo-950/30');

    // Group hover states
    content = content.replace(/group-hover:text-indigo-300/g, 'group-hover:text-indigo-700 dark:group-hover:text-indigo-300');
    content = content.replace(/hover:bg-slate-900/g, 'hover:bg-slate-200 dark:hover:bg-slate-900');
    content = content.replace(/hover:bg-slate-800\/80/g, 'hover:bg-slate-200 dark:hover:bg-slate-800/80');

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated articles.ts theme classes');
}
