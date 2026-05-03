const fs = require('fs');
let content = fs.readFileSync('src/data/articles.ts', 'utf8');

content = content.replace(
    '<div class="my-6 p-5 border border-indigo-500/30 bg-indigo-950/20 print:bg-transparent print:border-slate-300 print:shadow-none print:rounded-none rounded-xl relative shadow-lg print:break-inside-avoid" style="page-break-inside: avoid; break-inside: avoid;">',
    '<div class="mt-10 mb-6 print:my-6 p-5 border border-indigo-500/30 bg-indigo-950/20 print:bg-transparent print:border-slate-300 print:shadow-none print:rounded-none rounded-xl relative shadow-lg print:break-inside-avoid" style="page-break-inside: avoid; break-inside: avoid;">'
);

const targetBlock = `<h3 class="text-xl font-bold text-white print:text-slate-900 mt-4 mb-2 print:break-after-avoid">Most Stop Too Early</h3>
            <p class="!m-0">The problem isn't that people don't have a reason—it's that they settle for the first one they think of. Once you uncover a core motivation, your effort changes. It isn't easy, but it becomes purposeful.</p>
            <p class="mt-3 mb-0">You will return to it when distracted, and you will push through when it feels slow.</p>

            <div class="mt-8 pt-6 border-t border-slate-300 print:break-inside-avoid" style="page-break-inside: avoid; break-inside: avoid;">
                <p class="text-sm font-black text-indigo-500 print:text-slate-800 uppercase tracking-widest !m-0 mb-2">⚠️ Action Required</p>
                <p class="font-serif text-slate-900 font-bold italic text-base mt-1 !mb-0 leading-snug">Stop reading. Grab a pen and physically write down your core 'why' in the lines provided above before turning the page.</p>
            </div>`;

const replacementBlock = `<div class="print:hidden">
                <h3 class="text-xl font-bold text-white mt-4 mb-2">Most Stop Too Early</h3>
                <p class="!m-0 text-[15px] leading-relaxed">The problem isn't lacking a reason—it's settling for the first one. Uncover a core motivation and your effort becomes purposeful. You'll push through when it feels slow.</p>
            </div>
            <div class="hidden print:block">
                <h3 class="text-xl font-bold text-slate-900 mt-4 mb-2 print:break-after-avoid">Most Stop Too Early</h3>
                <p class="!m-0">The problem isn't that people don't have a reason—it's that they settle for the first one they think of. Once you uncover a core motivation, your effort changes. It isn't easy, but it becomes purposeful.</p>
                <p class="mt-3 mb-0">You will return to it when distracted, and you will push through when it feels slow.</p>
            </div>

            <div class="mt-5 pt-5 print:mt-8 print:pt-6 border-t border-slate-300 print:break-inside-avoid" style="page-break-inside: avoid; break-inside: avoid;">
                <p class="text-sm font-black text-indigo-500 print:text-slate-800 uppercase tracking-widest !m-0 mb-2">⚠️ Action Required</p>
                <p class="font-serif text-slate-900 font-bold italic text-sm print:text-base mt-1 !mb-0 leading-snug">Stop reading. Grab a pen and write down your core 'why' before turning the page.</p>
            </div>`;

content = content.replace(targetBlock, replacementBlock);
fs.writeFileSync('src/data/articles.ts', content);
