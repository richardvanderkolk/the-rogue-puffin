const fs = require('fs');
let content = fs.readFileSync('src/data/articles.ts', 'utf8');

// The original content for Page 11 and 12 (Print + Screen)
const targetBlock = `<h2 class="text-2xl font-bold text-white print:text-slate-900 mt-0 pt-10 print:pt-0 mb-4 tracking-tight leading-tight pr-4 print:break-after-avoid">Your Why Needs to Go Beyond Surface Answers.</h2>
            <p class="print:mb-6">Most students settle for the first answer: <em>“I want good grades.”</em> While fine, these surface reasons lack the emotional weight to sustain you when learning becomes grueling. If your reason is weak, even the best techniques won’t hold you.</p>

            <div class="my-6 p-8 print:p-5 bg-indigo-950/20 border border-indigo-500/30 print:border-slate-400 print:border-[2px] print:border-dashed rounded-xl print:rounded-none relative shadow-lg print:break-inside-avoid print:bg-transparent print:shadow-none" style="page-break-inside: avoid; break-inside: avoid; display: inline-block; width: 100%;">
                <div class="absolute -left-3 top-6 w-1 h-12 bg-indigo-500 rounded-full print:hidden"></div>
                <h3 class="text-lg font-bold text-indigo-300 print:text-slate-800 mb-2 mt-0 uppercase tracking-widest print:font-serif">The Drill-Down Protocol</h3>
                <p class="text-sm !m-0">Take a blank page and write your initial goal. Then ask: <strong>"Why does that matter?"</strong></p>
                <p class="text-sm mt-2 mb-0">Repeat this process 4–5 times. Keep drilling down until you reach a reason that carries real emotional weight—a core "why" that will keep you on track when others give up.</p>
                <div class="hidden print:block mt-6 print:mt-4 space-y-5 print:space-y-3 w-full">
                    <div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4 print:pb-1 print:pt-2"><span class="text-xs text-slate-400 font-serif italic">1.</span></div>
                    <div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4 print:pb-1 print:pt-2"><span class="text-xs text-slate-400 font-serif italic">Why does that matter?</span></div>
                    <div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4 print:pb-1 print:pt-2"><span class="text-xs text-slate-400 font-serif italic">Why does that matter?</span></div>
                    <div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4 print:pb-1 print:pt-2"><span class="text-xs text-slate-400 font-serif italic">Why does that matter?</span></div>
                    <div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-2 pt-4 print:pb-1 print:pt-2"><span class="text-xs text-slate-800 font-serif font-bold uppercase tracking-widest">My Core Why</span></div>
                </div>

            </div>

            <p class="print:mb-6">A clear “why” brings order. It simplifies decisions. You stop drifting between tasks and start filtering distractions because you know what truly matters.</p>



            <div class="mt-10 mb-6 print:my-6 p-5 border border-indigo-500/30 bg-indigo-950/20 print:bg-transparent print:border-slate-300 print:shadow-none print:rounded-none rounded-xl relative shadow-lg print:break-inside-avoid" style="page-break-inside: avoid; break-inside: avoid;">
                <div class="absolute -left-3 top-6 w-1 h-12 bg-indigo-500 rounded-full print:hidden"></div>
                <p class="text-[14px] font-medium text-white print:text-slate-900 print:text-slate-900 print:text-slate-900 italic leading-snug !m-0">
                    "If you drill down and realize you don’t actually have a strong 'why,' you have a much more serious question to ask yourself: Is this the right path for me?"
                </p>
                <div class="mt-4 pt-3 border-t border-indigo-500/20">
                    <p class="text-indigo-400 print:text-indigo-800 print:text-indigo-800 text-[10px] uppercase tracking-widest font-bold !m-0">Note for Younger Learners</p>
                    <p class="text-slate-300 print:text-slate-700 text-[13px] mt-1 !mb-0 font-serif italic leading-snug">
                        If you aren't yet mature enough to see how your studies will impact your future, it is entirely valid to trust and "borrow" your parents' 'why' for now.
                    </p>
                </div>
            </div>

            <div class="print:hidden">
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

// The new content replacing it with 3D-specific structures + Print-specific linearly
const replacementBlock = `
            <!-- SCREEN VERSION PAGE 11 -->
            <div class="break-inside-avoid print:hidden">
                <div style="height: 160px; margin-top: 20px; margin-bottom: 16px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 16px;">
                    <h2 class="text-2xl font-bold text-slate-800 leading-tight m-0 tracking-tight text-center">Your Why Needs to Go Beyond Surface Answers.</h2>
                </div>
                <div style="height: 350px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 16px;">
                    <p class="!m-0">Most students settle for the first answer: <em>“I want good grades.”</em> While fine, these surface reasons lack the emotional weight to sustain you when learning becomes grueling. If your reason is weak, even the best techniques won’t hold you.</p>

                    <div class="my-6 p-5 bg-indigo-950/20 border border-indigo-500/30 rounded-xl relative shadow-lg w-full">
                        <div class="absolute -left-3 top-6 w-1 h-12 bg-indigo-500 rounded-full"></div>
                        <h3 class="text-lg font-bold text-indigo-300 mb-2 mt-0 uppercase tracking-widest font-serif">The Drill-Down Protocol</h3>
                        <p class="text-sm !m-0 text-slate-800">Take a blank page and write your initial goal. Then ask: <strong>"Why does that matter?"</strong></p>
                        <p class="text-sm mt-2 mb-0 text-slate-800">Repeat this process 4–5 times. Keep drilling down until you reach a reason that carries real emotional weight—a core "why" that will keep you on track when others give up.</p>
                    </div>

                    <p class="!mt-2 !mb-0">A clear “why” brings order. It simplifies decisions. You stop drifting between tasks and start filtering distractions because you know what truly matters.</p>
                </div>
            </div>

            <!-- SCREEN VERSION PAGE 12 -->
            <div class="break-inside-avoid print:hidden">
                <div style="height: 160px; margin-top: 20px; margin-bottom: 16px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 16px;">
                    <div class="p-5 border border-indigo-500/30 bg-indigo-950/20 rounded-xl relative shadow-lg w-full">
                        <div class="absolute -left-3 top-6 w-1 h-12 bg-indigo-500 rounded-full"></div>
                        <p class="text-[14px] font-medium text-slate-800 italic leading-snug !m-0">
                            "If you drill down and realize you don’t actually have a strong 'why,' you have a much more serious question to ask yourself: Is this the right path for me?"
                        </p>
                        <div class="mt-4 pt-3 border-t border-indigo-500/20">
                            <p class="text-indigo-800 text-[10px] uppercase tracking-widest font-bold !m-0">Note for Younger Learners</p>
                            <p class="text-slate-600 text-[13px] mt-1 !mb-0 font-serif italic leading-snug">
                                If you aren't yet mature enough to see how your studies will impact your future, it is entirely valid to trust and "borrow" your parents' 'why' for now.
                            </p>
                        </div>
                    </div>
                </div>
                <div style="height: 350px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 16px;">
                    <h3 class="text-xl font-bold text-slate-800 mt-0 mb-2">Most Stop Too Early</h3>
                    <p class="!m-0 text-[15px] leading-relaxed">The problem isn't lacking a reason—it's settling for the first one. Uncover a core motivation and your effort becomes purposeful. You'll push through when it feels slow.</p>

                    <div class="mt-6 pt-5 border-t border-slate-300 w-full mt-auto">
                        <p class="text-sm font-black text-indigo-500 uppercase tracking-widest !m-0 mb-2">⚠️ Action Required</p>
                        <p class="font-serif text-slate-900 font-bold italic text-sm mt-1 !mb-0 leading-snug">Stop reading. Grab a pen and write down your core 'why' before turning the page.</p>
                    </div>
                </div>
            </div>

            <!-- PRINT VERSION (Both Pages) -->
            <div class="hidden print:block">
                <h2 class="text-2xl font-bold text-slate-900 mt-0 pt-0 mb-4 tracking-tight leading-tight pr-4 break-after-avoid">Your Why Needs to Go Beyond Surface Answers.</h2>
                <p class="mb-6">Most students settle for the first answer: <em>“I want good grades.”</em> While fine, these surface reasons lack the emotional weight to sustain you when learning becomes grueling. If your reason is weak, even the best techniques won’t hold you.</p>

                <div class="my-6 p-5 border-slate-400 border-[2px] border-dashed rounded-none relative shadow-none break-inside-avoid bg-transparent" style="page-break-inside: avoid; break-inside: avoid; display: inline-block; width: 100%;">
                    <h3 class="text-lg font-bold text-slate-800 mb-2 mt-0 uppercase tracking-widest font-serif">The Drill-Down Protocol</h3>
                    <p class="text-sm !m-0">Take a blank page and write your initial goal. Then ask: <strong>"Why does that matter?"</strong></p>
                    <p class="text-sm mt-2 mb-0">Repeat this process 4–5 times. Keep drilling down until you reach a reason that carries real emotional weight—a core "why" that will keep you on track when others give up.</p>
                    <div class="mt-4 space-y-3 w-full">
                        <div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-1 pt-2"><span class="text-xs text-slate-400 font-serif italic">1.</span></div>
                        <div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-1 pt-2"><span class="text-xs text-slate-400 font-serif italic">Why does that matter?</span></div>
                        <div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-1 pt-2"><span class="text-xs text-slate-400 font-serif italic">Why does that matter?</span></div>
                        <div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-1 pt-2"><span class="text-xs text-slate-400 font-serif italic">Why does that matter?</span></div>
                        <div class="border-b-2 border-dashed border-slate-300 w-full flex items-end pb-1 pt-2"><span class="text-xs text-slate-800 font-serif font-bold uppercase tracking-widest">My Core Why</span></div>
                    </div>
                </div>

                <p class="mb-6">A clear “why” brings order. It simplifies decisions. You stop drifting between tasks and start filtering distractions because you know what truly matters.</p>

                <div class="my-6 p-5 bg-transparent border-slate-300 shadow-none rounded-none border relative break-inside-avoid" style="page-break-inside: avoid; break-inside: avoid;">
                    <p class="text-[14px] font-medium text-slate-900 italic leading-snug !m-0">
                        "If you drill down and realize you don’t actually have a strong 'why,' you have a much more serious question to ask yourself: Is this the right path for me?"
                    </p>
                    <div class="mt-4 pt-3 border-t border-indigo-500/20">
                        <p class="text-indigo-800 text-[10px] uppercase tracking-widest font-bold !m-0">Note for Younger Learners</p>
                        <p class="text-slate-700 text-[13px] mt-1 !mb-0 font-serif italic leading-snug">
                            If you aren't yet mature enough to see how your studies will impact your future, it is entirely valid to trust and "borrow" your parents' 'why' for now.
                        </p>
                    </div>
                </div>

                <h3 class="text-xl font-bold text-slate-900 mt-4 mb-2 break-after-avoid">Most Stop Too Early</h3>
                <p class="!m-0">The problem isn't that people don't have a reason—it's that they settle for the first one they think of. Once you uncover a core motivation, your effort changes. It isn't easy, but it becomes purposeful.</p>
                <p class="mt-3 mb-0">You will return to it when distracted, and you will push through when it feels slow.</p>

                <div class="mt-8 pt-6 border-t border-slate-300 break-inside-avoid" style="page-break-inside: avoid; break-inside: avoid;">
                    <p class="text-sm font-black text-slate-800 uppercase tracking-widest !m-0 mb-2">⚠️ Action Required</p>
                    <p class="font-serif text-slate-900 font-bold italic text-base mt-1 !mb-0 leading-snug">Stop reading. Grab a pen and write down your core 'why' before turning the page.</p>
                </div>
            </div>`;

if (content.includes(targetBlock)) {
    content = content.replace(targetBlock, replacementBlock);
    fs.writeFileSync('src/data/articles.ts', content);
    console.log("Successfully replaced the layout block!");
} else {
    console.error("Target block not found. Here is what we searched for:");
    console.error(targetBlock.substring(0, 100) + '...');
}
