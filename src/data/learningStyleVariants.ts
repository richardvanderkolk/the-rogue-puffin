export function getArticleVariant(slug: string, style: string): string {
    const variants: Record<string, Record<string, string>> = {
        'know-your-learning-superpower': {
            'linguistic': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Word Smart (Linguistic) — A Short Written Summary</strong></p>
                <p>Every person learns differently.</p>
                <p>For many years, schools focused mainly on reading, writing, and mathematics. But psychologist Howard Gardner proposed that intelligence is broader than this. He suggested that humans possess multiple intelligences, each representing a different way the mind understands the world.</p>
                <p>Some people learn best through words. Others through pictures, music, movement, relationships, reflection, or nature.</p>
                <p>Discovering your strongest intelligence can help you learn more effectively. Instead of asking “How smart am I?”, Gardner encourages us to ask:</p>
                <blockquote class="italic text-indigo-300 border-l-4 border-indigo-500 pl-4 my-6 text-xl">“How am I smart?”</blockquote>
                <p>When you understand your learning superpower, learning becomes more natural and enjoyable.</p>
            `,
            'logical': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Number Smart (Logical–Mathematical) — A Logical Model</strong></p>
                <h3 class="text-lg font-bold text-white mt-8 mb-2">Problem:</h3>
                <p>Students often struggle in school.</p>
                
                <h3 class="text-lg font-bold text-white mt-6 mb-2">Hypothesis:</h3>
                <p>The problem may not be intelligence, but mismatched learning methods.</p>
                
                <h3 class="text-lg font-bold text-white mt-6 mb-2">Observation:</h3>
                <p>Different students respond best to different learning approaches.</p>
                
                <h3 class="text-lg font-bold text-white mt-6 mb-2">Theory (Gardner):</h3>
                <p>Human intelligence includes multiple domains:</p>
                <ul class="list-disc pl-6 space-y-1 text-slate-300 my-4">
                    <li>Linguistic</li>
                    <li>Logical</li>
                    <li>Spatial</li>
                    <li>Bodily</li>
                    <li>Musical</li>
                    <li>Interpersonal</li>
                    <li>Intrapersonal</li>
                    <li>Naturalistic</li>
                </ul>
                
                <h3 class="text-lg font-bold text-white mt-6 mb-2">Conclusion:</h3>
                <p>Learning improves when teaching methods match a student's dominant intelligence.</p>
                
                <h3 class="text-lg font-bold text-white mt-6 mb-2">Application:</h3>
                <p>Identify your strongest intelligence → use learning strategies that align with it.</p>
            `,
            'visual': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Picture Smart (Spatial) — Visual Map of the Article</strong></p>
                <p>Think of intelligence like a wheel with eight spokes.</p>
                
                <div class="my-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-700 font-mono text-sm text-center text-indigo-300 overflow-x-auto whitespace-pre">
                 WORD SMART
                     |
         PICTURE ----|---- NUMBER
           SMART     |      SMART
                     |
      MUSIC -------- YOU -------- PEOPLE
       SMART                      SMART
                     |
          BODY ----- | ----- SELF
          SMART              SMART
                     |
                NATURE
                 SMART
                </div>
                
                <h3 class="text-lg font-bold text-white mt-8 mb-2">Key idea in the center:</h3>
                <p>Everyone is intelligent — but in different ways.</p>
                <p>Each spoke represents a different learning pathway.</p>
                
                <h3 class="text-lg font-bold text-white mt-8 mb-2">Your task:</h3>
                <p>Find which pathway your mind travels most naturally.</p>
            `,
            'kinesthetic': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Body Smart (Kinesthetic) — A Physical Activity Version</strong></p>
                <p>To understand this article, try this activity.</p>
                
                <div class="my-6 p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/50">
                    <p class="text-lg font-bold text-indigo-300 mb-4">Stand up.</p>
                    <p>Imagine eight corners of a room, each representing an intelligence:</p>
                    <ul class="list-none space-y-2 my-4 columns-2">
                        <li>👉 <span class="text-white">Words</span></li>
                        <li>👉 <span class="text-white">Numbers</span></li>
                        <li>👉 <span class="text-white">Pictures</span></li>
                        <li>👉 <span class="text-white">Movement</span></li>
                        <li>👉 <span class="text-white">Music</span></li>
                        <li>👉 <span class="text-white">People</span></li>
                        <li>👉 <span class="text-white">Self-reflection</span></li>
                        <li>👉 <span class="text-white">Nature</span></li>
                    </ul>
                    <p class="font-bold text-emerald-400 mt-6">Walk to the corner that feels most like how you learn best.</p>
                </div>
                
                <p>Ask yourself:</p>
                <ul class="list-disc pl-6 space-y-2 text-slate-300 my-4">
                    <li>Why did I choose this?</li>
                    <li>When do I learn most easily?</li>
                </ul>
                <p>This movement demonstrates the main idea:</p>
                <p class="font-bold text-white mt-2">People learn best through different pathways.</p>
            `,
            'musical': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Music Smart (Musical) — A Rhyming Version</strong></p>
                
                <div class="my-8 p-8 rounded-3xl bg-slate-900/40 border-l-4 border-indigo-500 italic text-lg leading-loose">
                    <p>Everyone learns in their own special way,<br/>
                    Some through words, some through play.<br/>
                    Some see pictures in their mind,<br/>
                    Others love the patterns they find.</p>
                    
                    <p class="mt-4">Some hear rhythms, beats, and song,<br/>
                    Some build things and move along.<br/>
                    Some learn best with friends nearby,<br/>
                    Some reflect and wonder why.</p>
                    
                    <p class="mt-4">Some explore the earth and trees,<br/>
                    Learning through the birds and bees.<br/>
                    Gardner said what we should start<br/>
                    Is asking not how smart you are,</p>
                    
                    <p class="mt-4 text-xl font-bold text-indigo-300">But discovering from the start:<br/>
                    How you're truly smart.</p>
                </div>
            `,
            'interpersonal': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">People Smart (Interpersonal) — Conversation Format</strong></p>
                
                <div class="space-y-6 my-8">
                    <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">🎓</div>
                        <div class="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none">
                            <p class="font-bold text-slate-300 text-sm mb-1">Student</p>
                            <p>I think I'm just not very smart.</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 flex-row-reverse">
                        <div class="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center shrink-0">🦉</div>
                        <div class="bg-indigo-900/50 p-4 rounded-2xl rounded-tr-none text-right">
                            <p class="font-bold text-indigo-300 text-sm mb-1">Teacher</p>
                            <p>Why do you think that?</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">🎓</div>
                        <div class="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none">
                            <p class="font-bold text-slate-300 text-sm mb-1">Student</p>
                            <p>I struggle with lectures and long readings.</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 flex-row-reverse">
                        <div class="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center shrink-0">🦉</div>
                        <div class="bg-indigo-900/50 p-4 rounded-2xl rounded-tr-none text-right">
                            <p class="font-bold text-indigo-300 text-sm mb-1">Teacher</p>
                            <p>That might not mean you're not intelligent. It might mean you learn differently.</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">🎓</div>
                        <div class="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none">
                            <p class="font-bold text-slate-300 text-sm mb-1">Student</p>
                            <p>What do you mean?</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 flex-row-reverse">
                        <div class="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center shrink-0">🦉</div>
                        <div class="bg-indigo-900/50 p-4 rounded-2xl rounded-tr-none text-right text-base leading-relaxed">
                            <p class="font-bold text-indigo-300 text-sm mb-1">Teacher</p>
                            <p>Psychologist Howard Gardner discovered that people have different types of intelligence. Some learn through words, others through pictures, music, movement, people, reflection, or nature.</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">🎓</div>
                        <div class="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none">
                            <p class="font-bold text-slate-300 text-sm mb-1">Student</p>
                            <p>So learning isn't one-size-fits-all?</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 flex-row-reverse">
                        <div class="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center shrink-0">🌟</div>
                        <div class="bg-emerald-900/30 border border-emerald-500/30 p-4 rounded-2xl rounded-tr-none text-right">
                            <p class="font-bold text-emerald-400 text-sm mb-1">Teacher</p>
                            <p>Exactly. Your task is to discover your learning superpower.</p>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Self Smart (Intrapersonal) — Reflection Exercise</strong></p>
                <p>Pause and think about your learning experiences.</p>
                
                <h3 class="text-xl font-bold text-white mt-8 mb-4">Ask yourself:</h3>
                <ul class="space-y-4 mb-8">
                    <li class="p-4 bg-slate-900 border border-slate-700 rounded-xl">💭 When do I feel most engaged while learning?</li>
                    <li class="p-4 bg-slate-900 border border-slate-700 rounded-xl">⚡ When do ideas suddenly become clear to me?</li>
                    <li class="p-4 bg-slate-900 border border-slate-700 rounded-xl">🚀 What kind of activities make learning enjoyable?</li>
                </ul>
                
                <h3 class="text-xl font-bold text-white mt-8 mb-4">Now consider these possibilities:</h3>
                <div class="flex gap-2 flex-wrap mb-8">
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">words</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">patterns</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">images</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">movement</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">music</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">conversation</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">reflection</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">nature</span>
                </div>
                
                <p class="text-lg">Your answers may reveal the natural strengths of your mind.</p>
                <p class="text-emerald-400 font-bold mt-2">Understanding these strengths can help you learn more effectively.</p>
            `,
            'naturalistic': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Nature Smart (Naturalistic) — Nature Analogy</strong></p>
                <p>In nature, every organism has a role.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div class="bg-sky-900/30 p-4 rounded-2xl border border-sky-500/30 text-center">
                        <div class="text-3xl mb-2">🦅</div>
                        <p class="text-sky-200">Birds navigate the sky.</p>
                    </div>
                    <div class="bg-emerald-900/30 p-4 rounded-2xl border border-emerald-500/30 text-center">
                        <div class="text-3xl mb-2">🌳</div>
                        <p class="text-emerald-200">Trees convert sunlight into energy.</p>
                    </div>
                    <div class="bg-amber-900/30 p-4 rounded-2xl border border-amber-500/30 text-center">
                        <div class="text-3xl mb-2">🐝</div>
                        <p class="text-amber-200">Bees pollinate flowers.</p>
                    </div>
                </div>
                
                <p class="text-xl font-medium text-white text-center mb-8">Each species thrives because it uses its natural strengths.</p>
                
                <div class="bg-slate-900/50 p-6 md:p-8 rounded-3xl border-l-4 border-indigo-500">
                    <p class="text-lg mb-6">Human learning works in a similar way.</p>
                    <ul class="space-y-2 text-slate-300 mb-6">
                        <li>Some minds grow best through <strong>language</strong>.</li>
                        <li>Others through <strong>patterns, images, music, or movement</strong>.</li>
                        <li>Some understand <strong>people</strong> deeply.</li>
                        <li>Others notice patterns in <strong>nature</strong>.</li>
                    </ul>
                    <p class="italic text-indigo-300">Just as ecosystems depend on diversity, human intelligence also thrives through different kinds of thinking.</p>
                    <p class="font-bold text-white mt-6">Your goal is to discover how your mind naturally grows.</p>
                </div>
            `
        }
    };

    return variants[slug]?.[style] || "<p>Variant not found for this learning style.</p>";
}

export function getArticleExample(slug: string, style: string): string {
    const examples: Record<string, Record<string, string>> = {
        'know-your-learning-superpower': {

            'linguistic': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Word Smart (Linguistic) — A Short Written Summary</strong></p>
                <p>Every person learns differently.</p>
                <p>For many years, schools focused mainly on reading, writing, and mathematics. But psychologist Howard Gardner proposed that intelligence is broader than this. He suggested that humans possess multiple intelligences, each representing a different way the mind understands the world.</p>
                <p>Some people learn best through words. Others through pictures, music, movement, relationships, reflection, or nature.</p>
                <p>Discovering your strongest intelligence can help you learn more effectively. Instead of asking “How smart am I?”, Gardner encourages us to ask:</p>
                <blockquote class="italic text-indigo-300 border-l-4 border-indigo-500 pl-4 my-6 text-xl">“How am I smart?”</blockquote>
                <p>When you understand your learning superpower, learning becomes more natural and enjoyable.</p>
            `,
            'logical': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Number Smart (Logical–Mathematical) — A Logical Model</strong></p>
                <h3 class="text-lg font-bold text-white mt-8 mb-2">Problem:</h3>
                <p>Students often struggle in school.</p>
                
                <h3 class="text-lg font-bold text-white mt-6 mb-2">Hypothesis:</h3>
                <p>The problem may not be intelligence, but mismatched learning methods.</p>
                
                <h3 class="text-lg font-bold text-white mt-6 mb-2">Observation:</h3>
                <p>Different students respond best to different learning approaches.</p>
                
                <h3 class="text-lg font-bold text-white mt-6 mb-2">Theory (Gardner):</h3>
                <p>Human intelligence includes multiple domains:</p>
                <ul class="list-disc pl-6 space-y-1 text-slate-300 my-4">
                    <li>Linguistic</li>
                    <li>Logical</li>
                    <li>Spatial</li>
                    <li>Bodily</li>
                    <li>Musical</li>
                    <li>Interpersonal</li>
                    <li>Intrapersonal</li>
                    <li>Naturalistic</li>
                </ul>
                
                <h3 class="text-lg font-bold text-white mt-6 mb-2">Conclusion:</h3>
                <p>Learning improves when teaching methods match a student's dominant intelligence.</p>
                
                <h3 class="text-lg font-bold text-white mt-6 mb-2">Application:</h3>
                <p>Identify your strongest intelligence → use learning strategies that align with it.</p>
            `,
            'visual': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Picture Smart (Spatial) — Visual Map of the Article</strong></p>
                <p>Think of intelligence like a wheel with eight spokes.</p>
                
                <div class="my-10 w-full overflow-hidden flex justify-center bg-slate-900/40 rounded-3xl border border-slate-700 shadow-2xl p-4 md:p-8">
                    <img src="/images/blog/learning-superpower-map.jpg" alt="Learning Superpower Visual Map" class="w-full h-auto rounded-xl drop-shadow-xl" />
                </div>
                
                <h3 class="text-lg font-bold text-white mt-8 mb-2">Key idea in the center:</h3>
                <p>Everyone is intelligent — but in different ways.</p>
                <p>Each spoke represents a different learning pathway.</p>
                
                <h3 class="text-lg font-bold text-white mt-8 mb-2">Your task:</h3>
                <p>Find which pathway your mind travels most naturally.</p>
            `,
            'kinesthetic': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Body Smart (Kinesthetic) — A Physical Activity Version</strong></p>
                <p>To understand this article, try this activity.</p>
                
                <div class="my-6 p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/50">
                    <p class="text-lg font-bold text-indigo-300 mb-4">Stand up.</p>
                    <p>Imagine eight corners of a room, each representing an intelligence:</p>
                    <ul class="list-none space-y-2 my-4 columns-2">
                        <li>👉 <span class="text-white">Words</span></li>
                        <li>👉 <span class="text-white">Numbers</span></li>
                        <li>👉 <span class="text-white">Pictures</span></li>
                        <li>👉 <span class="text-white">Movement</span></li>
                        <li>👉 <span class="text-white">Music</span></li>
                        <li>👉 <span class="text-white">People</span></li>
                        <li>👉 <span class="text-white">Self-reflection</span></li>
                        <li>👉 <span class="text-white">Nature</span></li>
                    </ul>
                    <p class="font-bold text-emerald-400 mt-6">Walk to the corner that feels most like how you learn best.</p>
                </div>
                
                <p>Ask yourself:</p>
                <ul class="list-disc pl-6 space-y-2 text-slate-300 my-4">
                    <li>Why did I choose this?</li>
                    <li>When do I learn most easily?</li>
                </ul>
                <p>This movement demonstrates the main idea:</p>
                <p class="font-bold text-white mt-2">People learn best through different pathways.</p>
            `,
            'musical': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Music Smart (Musical) — A Rhyming Version</strong></p>
                
                <div class="my-8 p-8 rounded-3xl bg-slate-900/40 border-l-4 border-indigo-500 italic text-lg leading-loose">
                    <p>Everyone learns in their own special way,<br/>
                    Some through words, some through play.<br/>
                    Some see pictures in their mind,<br/>
                    Others love the patterns they find.</p>
                    
                    <p class="mt-4">Some hear rhythms, beats, and song,<br/>
                    Some build things and move along.<br/>
                    Some learn best with friends nearby,<br/>
                    Some reflect and wonder why.</p>
                    
                    <p class="mt-4">Some explore the earth and trees,<br/>
                    Learning through the birds and bees.<br/>
                    Gardner said what we should start<br/>
                    Is asking not how smart you are,</p>
                    
                    <p class="mt-4 text-xl font-bold text-indigo-300">But discovering from the start:<br/>
                    How you're truly smart.</p>
                </div>
            `,
            'interpersonal': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">People Smart (Interpersonal) — Conversation Format</strong></p>
                
                <div class="space-y-6 my-8">
                    <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">🎓</div>
                        <div class="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none">
                            <p class="font-bold text-slate-300 text-sm mb-1">Student</p>
                            <p>I think I'm just not very smart.</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 flex-row-reverse">
                        <div class="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center shrink-0">��</div>
                        <div class="bg-indigo-900/50 p-4 rounded-2xl rounded-tr-none text-right">
                            <p class="font-bold text-indigo-300 text-sm mb-1">Teacher</p>
                            <p>Why do you think that?</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">🎓</div>
                        <div class="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none">
                            <p class="font-bold text-slate-300 text-sm mb-1">Student</p>
                            <p>I struggle with lectures and long readings.</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 flex-row-reverse">
                        <div class="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center shrink-0">🦉</div>
                        <div class="bg-indigo-900/50 p-4 rounded-2xl rounded-tr-none text-right">
                            <p class="font-bold text-indigo-300 text-sm mb-1">Teacher</p>
                            <p>That might not mean you're not intelligent. It might mean you learn differently.</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">🎓</div>
                        <div class="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none">
                            <p class="font-bold text-slate-300 text-sm mb-1">Student</p>
                            <p>What do you mean?</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 flex-row-reverse">
                        <div class="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center shrink-0">🦉</div>
                        <div class="bg-indigo-900/50 p-4 rounded-2xl rounded-tr-none text-right text-base leading-relaxed">
                            <p class="font-bold text-indigo-300 text-sm mb-1">Teacher</p>
                            <p>Psychologist Howard Gardner discovered that people have different types of intelligence. Some learn through words, others through pictures, music, movement, people, reflection, or nature.</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">🎓</div>
                        <div class="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none">
                            <p class="font-bold text-slate-300 text-sm mb-1">Student</p>
                            <p>So learning isn't one-size-fits-all?</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 flex-row-reverse">
                        <div class="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center shrink-0">🌟</div>
                        <div class="bg-emerald-900/30 border border-emerald-500/30 p-4 rounded-2xl rounded-tr-none text-right">
                            <p class="font-bold text-emerald-400 text-sm mb-1">Teacher</p>
                            <p>Exactly. Your task is to discover your learning superpower.</p>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Self Smart (Intrapersonal) — Reflection Exercise</strong></p>
                <p>Pause and think about your learning experiences.</p>
                
                <h3 class="text-xl font-bold text-white mt-8 mb-4">Ask yourself:</h3>
                <ul class="space-y-4 mb-8">
                    <li class="p-4 bg-slate-900 border border-slate-700 rounded-xl">💭 When do I feel most engaged while learning?</li>
                    <li class="p-4 bg-slate-900 border border-slate-700 rounded-xl">⚡ When do ideas suddenly become clear to me?</li>
                    <li class="p-4 bg-slate-900 border border-slate-700 rounded-xl">🚀 What kind of activities make learning enjoyable?</li>
                </ul>
                
                <h3 class="text-xl font-bold text-white mt-8 mb-4">Now consider these possibilities:</h3>
                <div class="flex gap-2 flex-wrap mb-8">
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">words</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">patterns</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">images</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">movement</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">music</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">conversation</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">reflection</span>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">nature</span>
                </div>
                
                <p class="text-lg">Your answers may reveal the natural strengths of your mind.</p>
                <p class="text-emerald-400 font-bold mt-2">Understanding these strengths can help you learn more effectively.</p>
            `,
            'naturalistic': `
                <p class="lead text-xl text-slate-300 mb-8 leading-relaxed"><strong class="text-white">Nature Smart (Naturalistic) — Nature Analogy</strong></p>
                <p>In nature, every organism has a role.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div class="bg-sky-900/30 p-4 rounded-2xl border border-sky-500/30 text-center">
                        <div class="text-3xl mb-2">🦅</div>
                        <p class="text-sky-200">Birds navigate the sky.</p>
                    </div>
                    <div class="bg-emerald-900/30 p-4 rounded-2xl border border-emerald-500/30 text-center">
                        <div class="text-3xl mb-2">🌳</div>
                        <p class="text-emerald-200">Trees convert sunlight into energy.</p>
                    </div>
                    <div class="bg-amber-900/30 p-4 rounded-2xl border border-amber-500/30 text-center">
                        <div class="text-3xl mb-2">🐝</div>
                        <p class="text-amber-200">Bees pollinate flowers.</p>
                    </div>
                </div>
                
                <p class="text-xl font-medium text-white text-center mb-8">Each species thrives because it uses its natural strengths.</p>
                
                <div class="bg-slate-900/50 p-6 md:p-8 rounded-3xl border-l-4 border-indigo-500">
                    <p class="text-lg mb-6">Human learning works in a similar way.</p>
                    <ul class="space-y-2 text-slate-300 mb-6">
                        <li>Some minds grow best through <strong>language</strong>.</li>
                        <li>Others through <strong>patterns, images, music, or movement</strong>.</li>
                        <li>Some understand <strong>people</strong> deeply.</li>
                        <li>Others notice patterns in <strong>nature</strong>.</li>
                    </ul>
                    <p class="italic text-indigo-300">Just as ecosystems depend on diversity, human intelligence also thrives through different kinds of thinking.</p>
                    <p class="font-bold text-white mt-6">Your goal is to discover how your mind naturally grows.</p>
                </div>
            `
        }
    };
    return examples[slug]?.[style] || "<p>Example not found for this learning style.</p>";
}
