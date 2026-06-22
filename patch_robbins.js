const fs = require('fs');
const path = './src/data/articles.ts';
let content = fs.readFileSync(path, 'utf8');

const newArticle = `
    {
        slug: "raise-your-standards",
        published: true,
        title: "Raise Your Standards",
        category: "PART1_READY",
        excerpt: "Goals alone don't change your life. Your standards do. If you want to accelerate your learning, you must shift your goals from 'shoulds' into 'musts'.",
        content: \`
            <p class="lead text-xl text-slate-300 mb-8 leading-relaxed">The science of goal achievement gives you the mechanics. But mechanics without fuel will stall. If you want to move fast, you have to look at the psychology of high performance—specifically, the teachings of Tony Robbins.</p>
            
            <p class="print:mb-6">Robbins has coached presidents, billionaire athletes, and peak performers for decades. His observation about human behaviour is brutally simple: We do not get our goals. We get our standards.</p>

            <h2 class="text-2xl font-bold text-white mt-12 mb-6">1. Turn Your "Shoulds" Into "Musts"</h2>
            <p class="print:mb-6">Everyone has a list of things they "should" do. <em>"I should study more." "I should read that textbook." "I should stop scrolling on my phone."</em></p>
            <p class="print:mb-6">People rarely achieve their "shoulds". When things get difficult, a "should" is the first thing to be abandoned. But people will do whatever it takes to meet their "musts". A "must" is an absolute standard—it is the baseline you are willing to tolerate in your own life.</p>
            <blockquote class="my-8 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl font-serif text-lg text-white italic">
                "If you want to change your life, you have to raise your standards. You get what you tolerate in yourself."
            </blockquote>
            <p class="print:mb-6">Your current level of knowledge and skill is exactly what you have tolerated up to this point. If you want to accelerate your learning, it can no longer be something you <em>should</em> do. It has to become something you <em>must</em> do.</p>

            <h2 class="text-2xl font-bold text-white mt-12 mb-6">2. The RPM System (Rapid Planning Method)</h2>
            <p class="print:mb-6">Most people write "To-Do" lists. Robbins argues that To-Do lists are depressing because they focus entirely on the friction (the activity) without connecting it to the reward. Instead, he uses RPM:</p>
            
            <div class="my-8 space-y-6">
                <div class="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                    <h3 class="text-lg font-bold text-indigo-400 mb-2">R = Result</h3>
                    <p class="text-slate-300 text-sm">What is the exact, specific result you are after? "I want to learn" is not a result. "I want to score 90% on my organic chemistry final" is a result. Clarity is power.</p>
                </div>
                <div class="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                    <h3 class="text-lg font-bold text-emerald-400 mb-2">P = Purpose</h3>
                    <p class="text-slate-300 text-sm">Why do you want it? Reasons come first, answers come second. If your reason is big enough, you will figure out how to get it done. Connect your result to an emotional driver.</p>
                </div>
                <div class="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                    <h3 class="text-lg font-bold text-rose-400 mb-2">M = Massive Action Plan</h3>
                    <p class="text-slate-300 text-sm">Don't just plan one way to achieve it. Brainstorm 5 or 6 different actions that could get you there. If your first approach fails, you immediately pivot to the next. You don't freeze; you execute.</p>
                </div>
            </div>

            <h2 class="text-2xl font-bold text-white mt-12 mb-6">3. State Management</h2>
            <p class="print:mb-6">You cannot attack a massive goal while in a weak physical or emotional state. Robbins emphasizes that motion creates emotion. How you sit, how you breathe, and the look on your face fundamentally alters the biochemistry of your brain.</p>
            <p class="print:mb-6">Before you sit down for a deep study session, check your state. If you are slouched over, breathing shallowly, and feeling frustrated, your brain is closed for business. Stand up. Take a deep breath. Shift your physiology before you shift your focus.</p>

            <h2 class="text-2xl font-bold text-white mt-12 mb-6">Bringing It Together</h2>
            <p class="print:mb-6">Setting a goal is a cognitive exercise. Raising your standards is a shift in identity. When you define exactly what you want (Result), connect it to a burning reason (Purpose), and refuse to tolerate anything less than giving it your absolute all—you become unstoppable.</p>
            
            <hr class="border-slate-800 my-16" />
            
            <h3 class="text-xl font-bold text-white mb-6">Continue Your Journey</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a href="/blog/know-your-learning-superpower" class="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Next in Curriculum</p>
                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">Know Your Learning Superpower <span class="text-indigo-500 ml-1">→</span></h4>
                </a>
                <a href="/rogue-session" class="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Apply These Concepts</p>
                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">The Rogue Session <span class="text-indigo-500 ml-1">→</span></h4>
                </a>
            </div>
        \`
    },`;

// First, inject the new article before the feel-sharp article (or whatever comes after the-science-of-goal-achievement)
// Since we know the-science-of-goal-achievement was added right before feel-sharp, let's insert it before feel-sharp.
const targetStr = `slug: "feel-sharp",`;
if (content.includes(targetStr)) {
    content = content.replace(targetStr, newArticle + '\n    {\n        ' + targetStr);
    
    // Also, update the "Continue Your Journey" section of "the-science-of-goal-achievement"
    // to point to "raise-your-standards" instead of "know-your-learning-superpower" (or "feel-sharp")
    content = content.replace(
        /href="\/blog\/know-your-learning-superpower"([\s\S]*?)Know Your Learning Superpower/g,
        (match, p1) => {
            // we only want to replace the FIRST occurrence in the-science-of-goal-achievement
            // actually let's do a more targeted replace.
            return match;
        }
    );
    
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully inserted Tony Robbins article.');
} else {
    console.log('Could not find injection point.');
}
