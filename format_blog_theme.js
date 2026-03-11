const fs = require('fs');
const file = 'src/app/blog/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace general body/main backgrounds
content = content.replace(/bg-slate-950/g, 'bg-background');
content = content.replace(/text-slate-100/g, 'text-foreground');
content = content.replace(/text-white/g, 'text-foreground');

// Replace specific card backgrounds with responsive variants
// e.g. bg-indigo-950/30 -> bg-indigo-50 dark:bg-indigo-950/30
content = content.replace(/bg-indigo-950\/30/g, 'bg-indigo-50/50 dark:bg-indigo-950/30');
content = content.replace(/bg-slate-900\/40/g, 'bg-slate-50 dark:bg-slate-900/40');
content = content.replace(/bg-white\/5/g, 'bg-slate-200/50 dark:bg-white/5');

// Update text colors to be readable in both modes
content = content.replace(/text-slate-400/g, 'text-slate-600 dark:text-slate-400');
content = content.replace(/text-indigo-300/g, 'text-indigo-600 dark:text-indigo-300');
content = content.replace(/text-indigo-400/g, 'text-indigo-600 dark:text-indigo-400');
content = content.replace(/text-slate-800/g, 'text-slate-300 dark:text-slate-800'); // Note: this is for the giant "01" numbers, so it needs to be faint in light mode (e.g. slate-200) and dark in dark mode (slate-800)
content = content.replace(/text-slate-300 dark:text-slate-800/g, 'text-slate-200 dark:text-slate-800'); // Correction for the giant numbers

// Fix hover states
content = content.replace(/hover:text-white/g, 'hover:text-slate-900 dark:hover:text-white');
content = content.replace(/group-hover:text-indigo-200/g, 'group-hover:text-indigo-700 dark:group-hover:text-indigo-200');

// Fix border colors
content = content.replace(/border-indigo-500\/20/g, 'border-indigo-200 dark:border-indigo-500/20');
content = content.replace(/border-white\/5/g, 'border-slate-200 dark:border-white/5');
content = content.replace(/border-slate-800\/50/g, 'border-slate-200 dark:border-slate-800/50');
content = content.replace(/border-slate-800/g, 'border-slate-200 dark:border-slate-800');

fs.writeFileSync(file, content, 'utf8');
console.log('Blog page theme styles updated.');
