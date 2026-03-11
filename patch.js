const fs = require('fs');
const file = 'src/data/articles.ts';
let content = fs.readFileSync(file, 'utf8');

const newArticle = `
    {
        slug: 'the-4-stages-of-learning',
        title: 'The 4 Stages of Learning',
        excerpt: 'Why new skills feel impossible at first, and how to push through to mastery.',
        category: 'MINDSET',
        content: \`
            <div class="space-y-6 text-lg text-slate-300">
                <p>Do you remember learning to drive a car?</p>
                <p>The first time you sat behind the wheel, the amount of information you had to process was overwhelming. Check the mirrors. Indicate. Brake softly. Accelerate smoothly. Check the blind spot. Steer with both hands. It felt like you needed three brains and six feet just to get out of the driveway.</p>
                
                <blockquote class="pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl font-medium text-white italic my-10">
                    This is what learning looks like. We go from knowing nothing, to knowing exactly how much we suck, to being painfully aware of every tiny action we take, before finally reaching a point where we don't even have to think about it anymore.
                </blockquote>

                <p>Psychologists call this progression the <strong>Four Stages of Competence</strong>. Understanding this model is the key to why so many people give up when learning gets hard—and how you can push through the friction.</p>

                <div class="my-12 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 shadow-xl">
                    <h2 class="text-2xl font-bold text-white mb-6">Stage 1: Unconscious Incompetence</h2>
                    <h3 class="text-xl font-bold text-indigo-300 mb-4">"I don't know what I don't know."</h3>
                    <p class="mb-4">This is the blissful ignorance stage. Before you ever drove a car, you probably sat in the passenger seat and thought, <em>"This looks easy."</em> You didn't realize how complex the skill actually was.</p>
                    <p>In the context of <em>The Rogue Puffin</em>, this is the person who assumes they already know how to learn because they've been doing it their whole life—even if their methods are slow, exhausting, and ineffective.</p>
                </div>

                <div class="my-12 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 shadow-xl">
                    <h2 class="text-2xl font-bold text-white mb-6">Stage 2: Conscious Incompetence</h2>
                    <h3 class="text-xl font-bold text-indigo-300 mb-4">"I now know exactly how much I suck."</h3>
                    <p class="mb-4">This is the danger zone. The moment you first sat behind the steering wheel, the reality hit you. <em>"There is way too much to think about."</em> It feels impossible. Many people quit here.</p>
                    <p>When you start applying advanced learning skills like <a href="/blog/active-recall" class="text-indigo-400 hover:text-indigo-300 font-bold transition-colors underline decoration-indigo-500/30 underline-offset-4">Active Recall</a> or <a href="/rogue-session" class="text-indigo-400 hover:text-indigo-300 font-bold transition-colors underline decoration-indigo-500/30 underline-offset-4">Speed Reading</a>, it will initially feel harder and slower than your old, familiar (but inefficient) methods. This friction isn't failure—it's the feeling of your brain building new pathways.</p>
                </div>

                <div class="my-12 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 shadow-xl">
                    <h2 class="text-2xl font-bold text-white mb-6">Stage 3: Conscious Competence</h2>
                    <h3 class="text-xl font-bold text-indigo-300 mb-4">"I can do this, but it takes all my focus."</h3>
                    <p class="mb-4">You are finally learning to drive. You can navigate traffic, but you have to turn down the radio to parallel park. You are capable, but it requires massive cognitive load. Every action is calculated.</p>
                    <p>As you practice breaking down material and using <a href="/blog/the-art-of-review" class="text-indigo-400 hover:text-indigo-300 font-bold transition-colors underline decoration-indigo-500/30 underline-offset-4">Spaced Repetition</a>, you will feel this phase. It works, and you see the results, but it still demands your absolute, undivided attention to execute the techniques correctly.</p>
                </div>

                <div class="my-12 p-8 rounded-3xl bg-slate-900/40 border border-slate-500/30 shadow-indigo-500/10 shadow-2xl">
                    <h2 class="text-2xl font-bold text-white mb-6">Stage 4: Unconscious Competence</h2>
                    <h3 class="text-xl font-bold text-indigo-400 mb-4">"I don't even have to think about it anymore."</h3>
                    <p class="mb-4">This is mastery. Think about how you drive today. You can carry on a conversation, listen to a podcast, and navigate complex traffic without consciously thinking about your feet or hands. It has become second nature.</p>
                    <p>This is the ultimate goal of the <em>Learning Like A Genius Masterclass</em>. Right now, learning how to learn requires deliberate, conscious effort. But with practice, these skills will fade into the background. You won't have to <em>try</em> to learn efficiently; it will simply be the way your mind operates.</p>
                </div>

                <h2 class="text-2xl font-bold text-white mt-12 mb-6">The Reality of the Dip</h2>
                <p>The transition from Stage 2 to Stage 3 is where the friction lives. When you abandon the comfortable illusion of your old methods and face the demanding reality of new, effective techniques, it will feel uncomfortable.</p>
                <p>Expect it. Welcome it. That discomfort is the exact sensation of growth. Just like learning to drive, once you push through that initial demanding phase, you will possess a lifelong skill that effortlessly takes you wherever you want to go.</p>

                <h2 class="text-2xl font-bold text-white mt-16 mb-6">Continue Your Journey</h2>
                <div class="grid sm:grid-cols-2 gap-4 mt-8">
                    <a href="/blog/initiate-a-learning-mindset" class="block p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group">
                        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2 block">First Step</span>
                        <h4 class="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">A Learning Mindset</h4>
                        <p class="text-sm text-slate-400">Prime your brain for the demanding journey of mastering new skills.</p>
                    </a>
                </div>
            </div>
        \`
    }
`;

content = content.replace(/\s*\];\s*$/, ',\n' + newArticle + '\n];\n');
fs.writeFileSync(file, content, 'utf8');
console.log('Article injected successfully.');
