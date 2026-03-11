const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const targetSlug = 'slug: "learning-style-musical"';
const startIndex = content.indexOf(targetSlug);

if (startIndex === -1) {
    console.error("Could not find musical article!");
    process.exit(1);
}

const startPattern = '<p class="lead text-xl text-slate-300 mb-8 leading-relaxed">Listen closely to the rhythm of this idea: Most people assume they are either “good at learning” or not. That note rings false.</p>';
const endPattern = '<p>Use rhythm to memorise sequences. Pay attention to the cadence of speakers. Try listening to specific ambient tracks while studying to anchor those memories to the sound.</p>';

const startReplace = content.indexOf(startPattern, startIndex);
const endReplace = content.indexOf(endPattern, startReplace);

if (startReplace !== -1 && endReplace !== -1 && endReplace > startReplace) {
    const replacementText = `
<p class="lead text-xl text-slate-300 mb-8 leading-relaxed italic">"It’s not that you can’t catch the beat, it's just they’re playing off-sheet. Let’s tune it up, let’s find the groove, and watch the way your memory moves."</p>

<div class="bg-indigo-950/30 border border-indigo-500/20 p-8 rounded-3xl my-10 space-y-6">
    <p class="text-lg text-white font-medium italic">Verse 1</p>
    <p class="text-slate-300 leading-relaxed">
        They stand at the front and they talk in a drone,<br/>
        Expecting your mind to just pick up the tone.<br/>
        They say you’re "not learning," they say you’re "too slow,"<br/>
        But they’re playing a song that you don't even know.
    </p>

    <p class="text-lg text-white font-medium italic pt-4">Chorus</p>
    <p class="text-indigo-300 font-bold leading-relaxed text-xl">
        You’re not broken, you’re not out of tune,<br/>
        You just need a rhythm, a beat, or a croon.<br/>
        If they judge a fish by the way it can climb,<br/>
        It’ll think it’s a failure until the end of time.
    </p>

    <p class="text-lg text-white font-medium italic pt-4">Verse 2</p>
    <p class="text-slate-300 leading-relaxed">
        So how do we fix it? How do we start?<br/>
        By letting the music right into the art.<br/>
        Take the dull facts and give them a rhyme,<br/>
        Tie them to a tempo, snap them in time.<br/>
        When the syllabus drags and the reading is long,<br/>
        Turn the whole chapter right into a song.
    </p>
</div>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">Finding Your Tempo</h2>
<p>Howard Gardner composed a broader orchestration of intelligence. He identified different frequencies—different ways people naturally tune into information.</p>
<p>As a musical learner, you are sensitive to the tone and flow of words. You might find yourself tapping your foot, remembering song lyrics instantly, or retaining information better when it possesses a certain cadence.</p>
<p>Use rhythm to memorise sequences. Pay attention to the cadence of speakers. Try listening to specific ambient tracks while studying to anchor those memories to the sound.</p>
`.trim();

    let newContent = content.substring(0, startReplace) + replacementText + content.substring(endReplace + endPattern.length);
    fs.writeFileSync(FILE_PATH, newContent);
    console.log("Successfully replaced the musical article with a song verse!");
} else {
    console.error("Could not find the text block to replace. Start:", startReplace, "End:", endReplace);
}
