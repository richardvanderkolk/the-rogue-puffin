const fs = require('fs');
const path = './src/data/articles.ts';
let content = fs.readFileSync(path, 'utf8');

const newArticle = `
    {
        slug: "the-science-of-goal-achievement",
        published: true,
        title: "The Science of Goal Achievement",
        category: "PART1_READY",
        excerpt: "Setting a goal is easy. Achieving it requires systems, friction planning, and neurological alignment. Here is the modern science of getting things done.",
        content: \`
            <p class="lead text-xl text-slate-300 mb-8 leading-relaxed">The previous chapter gave you a target. But if setting a goal was enough, everyone with a New Year's Resolution would be a master. The harsh truth is that goals don't dictate success. Systems do.</p>
            
            <p class="print:mb-6">If we distil the greatest insights from neuroscience, behavioural psychology, and habit formation, we find that the world's most effective learners don't just "try harder." They use a fundamentally different architecture for achievement.</p>

            <h2 class="text-2xl font-bold text-white mt-12 mb-6">1. Systems Over Goals (The James Clear Principle)</h2>
            <p class="print:mb-6">In <em>Atomic Habits</em>, James Clear makes a profound observation:</p>
            <blockquote class="my-8 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl font-serif text-lg text-white italic">
                "You do not rise to the level of your goals. You fall to the level of your systems."
            </blockquote>
            <p class="print:mb-6">A goal is the desired outcome (e.g., "I want to speak fluent Spanish"). A system is the collection of daily habits that get you there (e.g., "I will spend 20 minutes doing active recall flashcards every morning with my coffee").</p>
            <p class="print:mb-6">If you completely ignored your goal and only focused on your system, would you still succeed? Yes. Stop obsessing over the finish line and start obsessing over the daily rep.</p>

            <h2 class="text-2xl font-bold text-white mt-12 mb-6">2. Attach Dopamine to the Effort (The Huberman Protocol)</h2>
            <p class="print:mb-6">Dr. Andrew Huberman, a Stanford neuroscientist, highlights a critical mistake most people make: they reserve their sense of reward for the finish line. Neurologically, this is a disaster.</p>
            <p class="print:mb-6">Dopamine is the molecule of motivation. If you only get a dopamine hit when you achieve the final goal, you will run out of energy long before you get there. You must train your brain to release dopamine <strong>in response to the friction itself.</strong></p>
            <ul class="list-disc pl-6 space-y-2 my-6 text-slate-300">
                <li>Don't say: <em>"I'll be happy when I finish this textbook."</em></li>
                <li>Say: <em>"The fact that this is hard right now means I am actively growing. I am succeeding simply by doing the work."</em></li>
            </ul>
            <p class="font-medium text-indigo-300 my-6">👉 Learn to love the friction, because the friction is where the growth happens.</p>

            <h2 class="text-2xl font-bold text-white mt-12 mb-6">3. Plan for Failure (The WOOP Framework)</h2>
            <p class="print:mb-6">Psychologist Gabriele Oettingen discovered that pure positive visualization actually <em>decreases</em> the likelihood of achieving a goal. Why? Because it tricks the brain into feeling like it has already succeeded, draining your drive to act.</p>
            <p class="print:mb-6">Her solution is the <strong>WOOP</strong> framework: Wish, Outcome, Obstacle, Plan.</p>
            
            <div class="my-8 space-y-6">
                <div class="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                    <h3 class="text-lg font-bold text-emerald-400 mb-2">Wish & Outcome</h3>
                    <p class="text-slate-300 text-sm">Define what you want and vividly imagine the benefits of achieving it. This provides the initial spark.</p>
                </div>
                <div class="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                    <h3 class="text-lg font-bold text-rose-400 mb-2">Obstacle</h3>
                    <p class="text-slate-300 text-sm">Now, get brutally honest. What internal or external obstacles will stop you? (e.g., "I will be too tired after work to study.")</p>
                </div>
                <div class="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                    <h3 class="text-lg font-bold text-indigo-400 mb-2">Plan (Implementation Intention)</h3>
                    <p class="text-slate-300 text-sm">Create an "If/Then" rule. <em>"IF I am too tired to study at my desk, THEN I will lie on the floor and listen to a 10-minute educational podcast."</em></p>
                </div>
            </div>

            <h2 class="text-2xl font-bold text-white mt-12 mb-6">4. The Goldilocks Rule</h2>
            <p class="print:mb-6">Humans experience peak motivation when working on tasks that are right on the edge of their current abilities. Not too hard. Not too easy.</p>
            <p class="print:mb-6">If your goal is too ambitious (e.g., "I will read a book a day"), you will quit from burnout. If it is too easy, you will quit from boredom. You must find the sweet spot of manageable difficulty.</p>

            <h2 class="text-2xl font-bold text-white mt-12 mb-6">Bringing It Together</h2>
            <p class="print:mb-6">To upgrade your goal-setting from a wishlist to an inevitability, ask yourself these four questions:</p>
            <div class="my-8 p-6 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl">
                <ol class="list-decimal pl-5 space-y-4 font-medium text-white">
                    <li class="pl-2">What is the daily system that makes my goal inevitable?</li>
                    <li class="pl-2">How can I celebrate the effort instead of just the outcome?</li>
                    <li class="pl-2">What is the specific obstacle that will try to derail me, and what is my "If/Then" plan to beat it?</li>
                    <li class="pl-2">Is the daily step just hard enough to keep me engaged, but not so hard that I quit?</li>
                </ol>
            </div>
            
            <hr class="border-slate-800 my-16" />
            
            <h3 class="text-xl font-bold text-white mb-6">Continue Your Journey</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a href="/blog/feel-sharp" class="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Next in Curriculum</p>
                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">Feel Sharp <span class="text-indigo-500 ml-1">→</span></h4>
                </a>
                <a href="/rogue-session" class="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Apply These Concepts</p>
                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">The Rogue Session <span class="text-indigo-500 ml-1">→</span></h4>
                </a>
            </div>
        \`
    },`;

// Find where "set-your-goals" ends
const targetStr = `slug: "feel-sharp",`;
if (content.includes(targetStr)) {
    content = content.replace(targetStr, newArticle + '\n    {\n        ' + targetStr);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully inserted new article.');
} else {
    console.log('Could not find injection point.');
}
