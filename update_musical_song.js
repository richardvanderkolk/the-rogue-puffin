const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetSlug = 'slug: "learning-style-musical"';
const startIndex = content.indexOf(targetSlug);

if (startIndex === -1) {
    console.error("Could not find musical article!");
    process.exit(1);
}

// target string to replace
const contentKeyPattern = 'content: `';
const startContent = content.indexOf(contentKeyPattern, startIndex) + contentKeyPattern.length;
const endContent = content.indexOf('`\n    },', startContent);

if (startContent !== -1 && endContent !== -1 && endContent > startContent) {

    const htmlContent = `
<p class="lead text-xl text-slate-300 mb-8 leading-relaxed italic">"It’s not that you can’t catch the beat, it's just they’re playing off-sheet. Let’s tune it up, let’s find the groove, and watch the way your memory moves."</p>

<div class="bg-indigo-950/30 border border-indigo-500/20 p-8 md:p-12 rounded-3xl my-10 space-y-8 relative overflow-hidden">
    <!-- Background abstract music notes -->
    <div class="absolute top-10 right-10 text-indigo-500/10 text-9xl font-serif pointer-events-none select-none italic">𝄞</div>
    <div class="absolute bottom-10 left-10 text-indigo-500/10 text-9xl font-serif pointer-events-none select-none italic">♪</div>

    <div class="relative z-10">
        <p class="text-sm text-indigo-400 font-bold uppercase tracking-widest mb-2 border-b border-indigo-500/30 pb-2 inline-block">The Intro</p>
        <p class="text-slate-300 leading-relaxed text-lg">
            They stand at the front and they talk in a drone,<br/>
            Expecting your mind to just pick up the tone.<br/>
            They say you’re "not learning," they say you’re "too slow,"<br/>
            But they’re playing a song that you don't even know.
        </p>
    </div>

    <div class="relative z-10 p-6 bg-indigo-900/40 border-l-4 border-indigo-400 rounded-r-2xl transform md:scale-105 shadow-xl shadow-indigo-900/20">
        <p class="text-sm text-indigo-300 font-bold uppercase tracking-widest mb-2">The Chorus</p>
        <p class="text-white font-bold leading-relaxed text-xl">
            You’re not broken, you’re not out of tune,<br/>
            You just need a rhythm, a beat, or a croon.<br/>
            If they judge a fish by the way it can climb,<br/>
            It’ll think it’s a failure until the end of time.
        </p>
    </div>

    <div class="relative z-10 mt-12">
        <h3 class="text-2xl font-bold text-white mb-6">The Seven Beats of Intelligence</h3>
        <p class="text-slate-400 mb-8 italic">Howard Gardner wrote a different score. He found seven distinct grooves. Which tempo is yours?</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Verse 1: Linguistic -->
            <div class="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 hover:border-indigo-400 transition-colors">
                <p class="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-2">Verse 1: Linguistic</p>
                <p class="text-slate-300 leading-relaxed">
                    Some learn by the letter, the word, and the phrase,<br/>
                    Through stories and books, they navigate the maze.<br/>
                    A narrative structure is what they crave most,<br/>
                    The power of language from pillar to post.
                </p>
            </div>

            <!-- Verse 2: Logical -->
            <div class="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 hover:border-emerald-400 transition-colors">
                <p class="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-2">Verse 2: Logical</p>
                <p class="text-slate-300 leading-relaxed">
                    Some need an equation, a cause, and effect,<br/>
                    A puzzle to solve, an idea to dissect.<br/>
                    If A leads to B, and B leads to C,<br/>
                    Then the logical mind is happy and free.
                </p>
            </div>

            <!-- Verse 3: Visual -->
            <div class="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 hover:border-sky-400 transition-colors">
                <p class="text-xs text-sky-400 font-bold uppercase tracking-widest mb-2">Verse 3: Visual</p>
                <p class="text-slate-300 leading-relaxed">
                    Some need a canvas, a color, a chart,<br/>
                    To see the whole picture before they can start.<br/>
                    A map or a drawing will make it all clear,<br/>
                    When the image is sharp, the meaning is near.
                </p>
            </div>

            <!-- Verse 4: Kinesthetic -->
            <div class="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 hover:border-amber-400 transition-colors">
                <p class="text-xs text-amber-400 font-bold uppercase tracking-widest mb-2">Verse 4: Kinesthetic</p>
                <p class="text-slate-300 leading-relaxed">
                    Some learn by the motion, the touch, and the feel,<br/>
                    They have to build models to make it all real.<br/>
                    They pace round the room while the lecture goes on,<br/>
                    If they can't move their hands, then the focus is gone.
                </p>
            </div>

            <!-- Verse 5: Musical -->
            <div class="bg-indigo-900/50 p-6 rounded-2xl border border-indigo-400/80 shadow-[0_0_20px_rgba(99,102,241,0.2)] md:col-span-2 transform md:scale-105 z-10 mt-4 md:mt-0">
                <p class="text-xs text-indigo-300 font-bold uppercase tracking-widest mb-2">Verse 5: Musical (Your Superpower)</p>
                <p class="text-white leading-relaxed font-medium text-lg">
                    And some need the rhythm, the bass, and the snare,<br/>
                    They hear all the patterns just floating in air.<br/>
                    If the facts have a tempo, a rhyme, and a beat,<br/>
                    Then memory locks down and the lesson is sweet!
                </p>
            </div>

            <!-- Verse 6: Interpersonal -->
            <div class="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 hover:border-rose-400 transition-colors">
                <p class="text-xs text-rose-400 font-bold uppercase tracking-widest mb-2">Verse 6: Interpersonal</p>
                <p class="text-slate-300 leading-relaxed">
                    Some learn through debating, discussing out loud,<br/>
                    They bounce ideas off a collaborating crowd.<br/>
                    Through talking and sharing, the concept ignites,<br/>
                    Two minds working together reach dizzying heights.
                </p>
            </div>

            <!-- Verse 7: Intrapersonal -->
            <div class="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 hover:border-purple-400 transition-colors">
                <p class="text-xs text-purple-400 font-bold uppercase tracking-widest mb-2">Verse 7: Intrapersonal</p>
                <p class="text-slate-300 leading-relaxed">
                    And some need the silence, a space of their own,<br/>
                    To reflect on the knowledge completely alone.<br/>
                    They process deeply, away from the noise,<br/>
                    In internal focus, finding their poise.
                </p>
            </div>

        </div>
    </div>

    <!-- Outro -->
    <div class="relative z-10 pt-12 border-t border-indigo-500/20 mt-12 text-center">
        <p class="text-sm text-indigo-400 font-bold uppercase tracking-widest mb-4">The Outro</p>
        <p class="text-white font-medium leading-relaxed text-lg">
            So take all the dull facts and give them a rhyme,<br/>
            Tie them to a tempo, snap them in time.<br/>
            When the syllabus drags and the reading is long,<br/>
            Turn the whole chapter right into a song.
        </p>
    </div>
</div>

<div class="mt-12 space-y-4">
    <a href="/blog/know-your-learning-superpower" class="block p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group max-w-lg mx-auto text-center">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Back to Overview</p>
        <h4 class="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">Return to The Seven Intelligences<span class="text-indigo-500 ml-1">→</span></h4>
    </a>
</div>
    `;

    let newContent = content.substring(0, startContent) + '\n' + htmlContent + '\n        ' + content.substring(endContent);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced musical article with comprehensive 7-verse song!");
} else {
    console.error("Could not find content block for musical article.");
}
