const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetSlug = 'slug: "learning-style-logical"';
const startIndex = content.indexOf(targetSlug);

if (startIndex === -1) {
    console.error("Could not find logical article!");
    process.exit(1);
}

// Find the content string definition
const contentKeyPattern = 'content: `';
const startContent = content.indexOf(contentKeyPattern, startIndex) + contentKeyPattern.length;

// Find the end of this article's content specifically.
// We look for the closing backtick and the end of the object block '    },'
const endContent = content.indexOf('`\n    },', startContent);

if (startContent !== -1 && endContent !== -1 && endContent > startContent) {
    const replacementText = `
<p class="lead text-xl text-slate-300 mb-8 leading-relaxed">Most people assume they are either “good at learning” or not. Let's break down why this conclusion is logically unsound.</p>

<p>The standard education model applies a single algorithm to all inputs. If the student (Input A) fails to process the lecture (Function B), the model concludes the student is faulty. This ignores a critical variable: the processing type.</p>

<blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-6 rounded-r-2xl">
    <p class="text-xl font-medium text-white italic leading-relaxed"> "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid." </p>
    <footer class="mt-4 text-sm font-bold text-indigo-300 uppercase tracking-widest">— Often attributed to Albert Einstein </footer>
</blockquote>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">Analyzing the Error (The Fish Problem)</h2>
<p class="mb-6 text-slate-300">To comprehend the flaw in standard education, we must engage in critical thinking and analyze cause-and-effect relationships within Einstein's postulate:</p>

<div class="my-8 p-6 bg-slate-900/80 border border-slate-700 rounded-2xl shadow-xl font-mono text-sm space-y-4">
    <div class="flex gap-4 items-start">
        <span class="text-indigo-400 font-bold">1/</span>
        <div class="text-slate-300"><strong>Isolate the Variable:</strong> <span class="text-emerald-400 text-sm bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Subject = Fish</span></div>
    </div>
    <div class="flex gap-4 items-start">
        <span class="text-indigo-400 font-bold">2/</span>
        <div class="text-slate-300"><strong>Test Condition A (Tree Climbing):</strong> The environment requires vertical dexterity. The subject lacks the necessary physiological components (arms, claws).<br/><span class="text-rose-400 mt-2 block">Result = Absolute Failure.</span></div>
    </div>
    <div class="flex gap-4 items-start">
        <span class="text-indigo-400 font-bold">3/</span>
        <div class="text-slate-300"><strong>Test Condition B (Swimming):</strong> The environment requires streamlined propulsion. The subject possesses the exact required components (gills, fins).<br/><span class="text-emerald-400 mt-2 block">Result = Optimal Success.</span></div>
    </div>
</div>

<p class="font-bold text-white text-lg">Logical Conclusion:</p>
<p class="mb-10 text-slate-300">Intelligence is not a fixed, singular score. It is highly dependent on the intersection between the subject's natural processing method and the format of the information.</p>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">The Theory of Multiple Intelligences</h2>
<p class="mb-6 text-slate-300">Howard Gardner identified patterns in human cognition and categorized them into seven distinct systems (learning styles). If you are struggling, you are likely using the wrong system for your type.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-sm">
    <div class="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl">
        <strong class="text-white block mb-1">1. Linguistic</strong>
        <span class="text-slate-400">Processes via narrative, reading, and vocabulary.</span>
    </div>
    <div class="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl">
        <strong class="text-white block mb-1">2. Logical-Mathematical</strong>
        <span class="text-slate-400">Processes via structured data, cause/effect, and systems.</span>
    </div>
    <div class="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl">
        <strong class="text-white block mb-1">3. Visual-Spatial</strong>
        <span class="text-slate-400">Processes via diagrams, imagery, and spatial metaphors.</span>
    </div>
    <div class="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl">
        <strong class="text-white block mb-1">4. Kinesthetic</strong>
        <span class="text-slate-400">Processes via physical action, touch, and models.</span>
    </div>
    <div class="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl">
        <strong class="text-white block mb-1">5. Musical</strong>
        <span class="text-slate-400">Processes via rhythm, tone, and auditory patterns.</span>
    </div>
    <div class="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl">
        <strong class="text-white block mb-1">6. Interpersonal</strong>
        <span class="text-slate-400">Processes via dialogue, debate, and social collaboration.</span>
    </div>
    <div class="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl md:col-span-2">
        <strong class="text-white block mb-1">7. Intrapersonal</strong>
        <span class="text-slate-400">Processes via critical self-reflection and isolated concentration.</span>
    </div>
</div>

<h3 class="text-xl font-bold text-white mt-10 mb-4">Practical Application</h3>
<p class="text-slate-300">To optimize your learning, you must identify your dominant variable (your superpower) from the list above. Once identified, never accept information entirely in its default format again. When faced with a difficult concept, actively translate the material into your native processing style.</p>
`;

    let newContent = content.substring(0, startContent) + '\n' + replacementText + '\n        ' + content.substring(endContent);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced the logical article with a teaching module!");
} else {
    console.error("Could not find the content string block to replace.");
}
