const fs = require('fs');
let content = fs.readFileSync('src/data/articles.ts', 'utf8');

// 1. Paragraph margins
content = content.replace(/<p>/g, '<p class="print:mb-6">');

// 2. Title break
content = content.replace(
    '<h1 class="text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-none">Know Your<br/>Why</h1>',
    '<h1 class="text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-none">Know Your<br class="print:hidden"/>Why</h1>'
);

// 3. Drill-Down padding
content = content.replace(
    'class="my-6 p-8 bg-indigo-950/20 border border-indigo-500/30 print:border-slate-400 print:border-[2px] print:border-dashed rounded-xl print:rounded-none relative shadow-lg print:break-inside-avoid print:bg-transparent print:shadow-none"',
    'class="my-6 p-8 print:p-5 bg-indigo-950/20 border border-indigo-500/30 print:border-slate-400 print:border-[2px] print:border-dashed rounded-xl print:rounded-none relative shadow-lg print:break-inside-avoid print:bg-transparent print:shadow-none"'
);

// 4. Title Box padding
content = content.replace(
    'class="flex flex-col items-center justify-center text-center pt-12 pb-16 border border-slate-300 rounded-sm mb-12 relative"',
    'class="flex flex-col items-center justify-center text-center pt-12 pb-16 print:pt-8 print:pb-10 border border-slate-300 rounded-sm mb-12 print:mb-8 relative"'
);

// 5. Drill-Down lines padding
content = content.replace(
    /<div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4"><span class="text-xs text-slate-400 font-serif italic">Why does that matter\?<\/span><\/div>/g,
    '<div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4 print:pb-1 print:pt-2"><span class="text-xs text-slate-400 font-serif italic">Why does that matter?</span></div>'
);
content = content.replace(
    '<div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4"><span class="text-xs text-slate-400 font-serif italic">1.<\/span><\/div>',
    '<div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4 print:pb-1 print:pt-2"><span class="text-xs text-slate-400 font-serif italic">1.</span></div>'
);
content = content.replace(
    '<div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4"><span class="text-xs text-slate-800 font-serif font-bold uppercase tracking-widest">My Core Why<\/span><\/div>',
    '<div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4 print:pb-1 print:pt-2"><span class="text-xs text-slate-800 font-serif font-bold uppercase tracking-widest">My Core Why</span></div>'
);

// 6. Drill-Down lines wrapper
content = content.replace(
    '<div class="hidden print:block mt-6 space-y-5 w-full">',
    '<div class="hidden print:block mt-6 print:mt-4 space-y-5 print:space-y-3 w-full">'
);

fs.writeFileSync('src/data/articles.ts', content);
