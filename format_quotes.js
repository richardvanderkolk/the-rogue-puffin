const fs = require('fs');
const file = 'src/data/articles.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/<blockquote class=\"[^\"]+\"/g, (match) => {
    let classes = ['pl-6', 'border-l-4', 'border-indigo-500', 'bg-slate-900/40', 'p-6', 'rounded-r-2xl', 'font-medium', 'text-white', 'italic', 'my-10'];
    if (match.includes('space-y-2')) classes.push('space-y-2');
    return `<blockquote class="${classes.join(' ')}"`;
});
fs.writeFileSync(file, content, 'utf8');
console.log('Blockquotes reformatted');
