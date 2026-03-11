const fs = require('fs');
const files = [
  'src/app/page.tsx', 
  'src/components/layout/Header.tsx',
  'src/components/Mascot.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Global backgrounds
    content = content.replace(/bg-slate-950/g, 'bg-background');
    content = content.replace(/bg-slate-900/g, 'bg-slate-100 dark:bg-slate-900');
    content = content.replace(/text-slate-100/g, 'text-foreground');
    content = content.replace(/text-white/g, 'text-foreground');
    content = content.replace(/text-slate-300/g, 'text-slate-700 dark:text-slate-300');
    content = content.replace(/text-slate-400/g, 'text-slate-600 dark:text-slate-400');
    content = content.replace(/border-white\/10/g, 'border-slate-300 dark:border-white/10');
    content = content.replace(/border-white\/5/g, 'border-slate-200 dark:border-white/5');
    
    // Logo "fix": style the white box so it looks like a card in dark mode
    if (file.includes('Mascot.tsx')) {
       // We only add styling to Mascot's outer div to make it look intentional on dark mode
       content = content.replace(/className=\{cn\("relative shrink-0", className\)\}/, 'className={cn("relative shrink-0 dark:bg-slate-50 dark:p-2 dark:rounded-2xl dark:shadow-xl dark:shadow-indigo-500/10 dark:border dark:border-slate-800", className)}');
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated theme classes in ${file}`);
  }
});
