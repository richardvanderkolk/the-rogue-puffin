export function getArticleVariant(slug: string, style: string): string {
    const slugMap: Record<string, string> = {
        'know-your-why': 'day-4-know-your-why',
        'initiate-a-learning-mindset': 'day-5-learning-mindset',
        'know-your-learning-superpower': 'know-your-learning-superpower',
        'feel-sharp': 'day-6-feel-sharp',
        'friction-of-starting': 'day-7-activation-energy',
        'preview-the-material': 'day-8-overview',
        'active-recall': 'day-9-active-reading',
        'genius-note-taking': 'day-10-genius-notes',
        'feynman-technique': 'day-11-feynman',
        'the-art-of-review': 'day-12-review',
        'psychology-of-time-and-deadlines': 'day-13-parkinsons',
        'studying-with-others': 'day-14-community'
    };

    const variantKey = slugMap[slug] || slug;

    const variants: Record<string, Record<string, string>> = {
        'day-4-know-your-why': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">The Narrative of Purpose</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            <span class="float-left text-6xl text-white font-bold mr-4 mt-2 leading-none">A</span>
                            narrative without a central conflict is merely a sequence of events. In the same way, learning without a deeply rooted "why" is just rote memorization. Before you embark on acquiring a new skill, you must write the prologue: why does this matter to your personal story?
                        </p>
                        <p>
                            Friedrich Nietzsche famously wrote, "He who has a why to live for can bear almost any how." Your extrinsic motivations—passing a test, pleasing a boss—are fragile plot devices. Intrinsic motivation, the genuine curiosity of the protagonist, is what carries a story through its darkest chapters.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">Variable: The Anchor Condition</p>
                    <div class="font-mono text-sm md:text-base space-y-4">
                        <div class="bg-slate-900 border-2 border-indigo-900/50 rounded-xl p-6 shadow-lg">
                            <p class="text-indigo-400 font-bold">IF (Motivation == Extrinsic)</p>
                            <p class="text-slate-300 ml-4">Friction = High</p>
                            <p class="text-slate-300 ml-4">Burnout_Probability = 85%</p>
                            <p class="text-indigo-400 font-bold mt-4">ELSE IF (Motivation == Intrinsic)</p>
                            <p class="text-slate-300 ml-4">Friction = Low</p>
                            <p class="text-slate-300 ml-4">State = Flow</p>
                        </div>
                        <p class="text-slate-300 mt-4">Your "Why" is the anchor condition of your learning algorithm. Without defining this variable, the system will eventually crash under stress.</p>
                    </div>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">The Compass Graphic</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-slate-300">
                        <div class="space-y-6">
                            <div class="bg-slate-900/50 p-6 rounded-2xl border-l-4 border-amber-500">
                                <h3 class="font-bold text-white mb-2">True North</h3>
                                <p>Visualize a boat caught in a violent storm. When the unexpected things of life or distractions come your way, you need a way to see through the dark. Your "Why" is that glowing compass in the sky—it keeps you focused on the direction you are going, even when it is easy to lose sight of it.</p>
                            </div>
                        </div>
                        <div class="bg-slate-900 rounded-3xl border border-amber-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.1)] overflow-hidden">
                            <img src="/images/storm-compass.png" alt="A paper sailboat in a storm guided by a glowing true north compass" class="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-500 mb-8 border-b border-slate-700 pb-4">Action Protocol: Finding the Core</p>
                    <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg text-slate-300">
                        <h3 class="font-bold text-white text-lg mb-4">The "5 Whys" Drill</h3>
                        <p class="mb-4">Don't just think about it—physically write it out. Grab a pen and physically cross out the superficial reasons.</p>
                        <ol class="list-decimal pl-6 space-y-4">
                            <li>Write down why you are learning this.</li>
                            <li>Ask yourself, "Why does that matter?" and write the next answer below it.</li>
                            <li>Repeat this physical action 4 more times until you hit the emotional bedrock.</li>
                        </ol>
                        <p class="mt-6 text-orange-400 font-bold">You will feel a physical shift in your gut when you hit the real reason.</p>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto text-center font-serif text-lg text-slate-300">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Baseline</p>
                    <div class="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
                        <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Slow, steady heartbeat rhythm ]</p>
                        <p class="font-bold text-white mb-2">♪ If you don't know the reason, you'll fall out of time ♪</p>
                        <p class="font-bold text-white mb-6">♪ The pressure will build, and you'll lose the rhyme ♪</p>
                        <p class="text-slate-400 italic mb-6">Your "Why" is the metronome. When the work gets hard and the distractions get loud, your intrinsic reason is the steady 4/4 beat that keeps you moving forward without hesitation.</p>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">Dialogue: The Core Motivator</p>
                    <div class="bg-slate-900/80 rounded-3xl border border-slate-700 p-6 shadow-2xl space-y-4">
                        <div class="flex items-end gap-2 w-3/4">
                            <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                            <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none">I'm learning this because I need it for my career.</div>
                        </div>
                        <div class="flex items-end gap-2 w-4/5 self-end flex-row-reverse">
                            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                            <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none">That's an external demand. What happens when it gets too difficult? External demands breed resentment. You need to connect it to the people you care about. How does mastering this allow you to help others or elevate your community?</div>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">Internal Reflection</p>
                    <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-10 rounded-3xl border border-slate-800 shadow-2xl text-center">
                        <p class="text-xl text-slate-300 font-serif italic leading-relaxed mb-6">
                            Close your eyes. Strip away the expectations of your peers, your parents, and your industry.
                        </p>
                        <p class="text-lg text-slate-400 leading-relaxed">
                            If no one ever knew you learned this skill, would you still want to learn it? What deeply held value inside of you does this knowledge satisfy? When you align learning with your core identity, burnout becomes impossible.
                        </p>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-8 border-b border-slate-700 pb-4">The Deep Root</p>
                    <div class="bg-[#f8f9fa] text-slate-800 p-8 rounded-xl border-4 border-double border-slate-300 shadow-xl font-serif">
                        <p class="text-lg leading-relaxed mb-4">
                            <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Observation:</span> A tree with shallow roots will be toppled by the first strong storm. 
                        </p>
                        <p class="text-lg leading-relaxed">
                            <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Application:</span> Extrinsic motivation (learning for a test) is a shallow root. Intrinsic motivation (genuine curiosity) is the taproot that drives deep into the bedrock. Cultivate the taproot, and your learning ecosystem will survive any harsh weather.
                        </p>
                    </div>
                </div>
            `
        },
        'day-5-learning-mindset': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">The Power of the Prelude</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            <span class="float-left text-6xl text-white font-bold mr-4 mt-2 leading-none">L</span>
                            anguage shapes reality. The sentences you speak to yourself before opening a book dictate how much of that book you will absorb. If your internal monologue whispers, "I am bad at this," your brain literally constructs defensive barriers against the incoming text.
                        </p>
                        <p>
                            To master a subject, you must first master your internal dialogue. Rewrite the script from hesitation to a posture of Confidence and Curiosity. Treat the learning process not as an interrogation, but as a compelling dialogue with the author.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">State-Based Processing</p>
                    <div class="flex flex-col items-center font-mono text-sm w-full max-w-2xl mx-auto pt-4 pb-8">
                        <div class="px-6 py-3 bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 rounded-lg shadow-lg text-center font-bold relative z-10">New Information Input</div>
                        
                        <div class="h-8 w-px bg-slate-600"></div>
                        
                        <div class="w-full flex items-start justify-center relative">
                            <div class="absolute top-0 w-1/2 border-t border-slate-600"></div>
                            <div class="absolute top-0 left-1/4 h-6 w-px bg-slate-600"></div>
                            <div class="absolute top-0 right-1/4 h-6 w-px bg-slate-600"></div>
                            
                            <div class="w-1/2 flex flex-col items-center px-2 sm:px-4 pt-6">
                                <div class="px-3 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-lg shadow-lg text-center w-full max-w-[200px]">State = Defensive</div>
                                <div class="h-6 w-px bg-slate-600"></div>
                                <div class="p-3 sm:p-4 bg-slate-900/80 border border-slate-800 rounded-xl w-full max-w-[200px] text-center shadow-lg">
                                    <div class="text-rose-400 font-bold mb-1 text-xs sm:text-sm">Friction: MAX</div>
                                    <div class="text-slate-400 text-xs sm:text-sm">Retention: 15%</div>
                                </div>
                            </div>
                            
                            <div class="w-1/2 flex flex-col items-center px-2 sm:px-4 pt-6">
                                <div class="px-3 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg shadow-lg text-center w-full max-w-[200px]">State = Curious</div>
                                <div class="h-6 w-px bg-slate-600"></div>
                                <div class="p-3 sm:p-4 bg-slate-900/80 border border-slate-800 rounded-xl w-full max-w-[200px] text-center shadow-lg">
                                    <div class="text-emerald-400 font-bold mb-1 text-xs sm:text-sm">Friction: MIN</div>
                                    <div class="text-slate-400 text-xs sm:text-sm">Retention: 85%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-slate-300 mt-2 bg-slate-900/50 p-6 rounded-2xl border-l-4 border-teal-500">Your brain is an input processor. Curiosity acts as the bypass command, turning off the firewalls and allowing data to be written directly to long-term memory.</p>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">The Locked Door Graphic</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-slate-300">
                        <div class="space-y-6">
                            <div class="bg-slate-900/50 p-6 rounded-2xl border-l-4 border-amber-500">
                                <p>Imagine your brain is a massive vault. When you feel anxious or inadequate, heavy steel doors slam shut. No matter how brightly colored the information is, it bounces off the steel.</p>
                                <p class="mt-4 text-amber-400 font-bold">Curiosity is the master key that turns the lock, opening the vault to receive new images.</p>
                            </div>
                        </div>
                        <div class="bg-slate-900 p-8 rounded-2xl border border-amber-500/30 flex items-center justify-center shadow-xl">
                            <div class="text-center">
                                <span class="text-6xl block mb-2">🔓</span>
                                <span class="text-amber-400 font-bold tracking-widest uppercase">Open State</span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-500 mb-8 border-b border-slate-700 pb-4">Action Protocol: The Posture Check</p>
                    <div class="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg text-slate-300">
                        <p class="mb-4">Your mind follows your body. If you sit hunched over with shallow breathing, your brain goes into defense mode.</p>
                        <h3 class="font-bold text-white text-lg mb-2">Reading Drill:</h3>
                        <ol class="list-decimal pl-6 space-y-2 mb-6">
                            <li>Sit upright, open your chest, and take a deep breath.</li>
                            <li>Physically relax the muscles in your jaw and shoulders.</li>
                            <li>Lean slightly forward—the physical posture of curiosity.</li>
                        </ol>
                        <p class="text-orange-400 font-bold">Hold this physical stance while you read. Your mind will match the physical state of readiness.</p>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto text-center font-serif text-lg text-slate-300">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Tuning Fork</p>
                    <div class="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
                        <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Clear, resonant hum ]</p>
                        <p class="italic mb-6">Before an orchestra plays, they tune their instruments. If the strings are too tight (anxiety) or too loose (apathy), the music will be discordant.</p>
                        <p class="font-bold text-white text-xl">Confidence and Curiosity tune your mind to perfect pitch, allowing the information to resonate freely.</p>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">Dialogue: Setting the Room</p>
                    <div class="bg-slate-900/80 rounded-3xl border border-slate-700 p-6 shadow-2xl space-y-4">
                        <div class="flex items-end gap-2 w-3/4">
                            <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                            <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none">I just don't think I'm the kind of person who can learn this.</div>
                        </div>
                        <div class="flex items-end gap-2 w-4/5 self-end flex-row-reverse">
                            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                            <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none">When you walk into a room assuming everyone hates you, you act defensive, and they end up disliking you. It's a self-fulfilling prophecy. Learning is a relationship between you and the material. Approach it like meeting a fascinating new friend—with open curiosity—and it will open up to you.</div>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">Internal Reflection</p>
                    <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-10 rounded-3xl border border-slate-800 shadow-2xl text-center">
                        <p class="text-xl text-slate-300 font-serif italic leading-relaxed mb-6">
                            Notice the silent expectations you place on yourself.
                        </p>
                        <p class="text-lg text-slate-400 leading-relaxed">
                            Do you demand instant perfection? That demand creates fear, which shuts down learning. Give yourself the grace to be a beginner. Confidence isn't believing you know everything; it's believing you have the capacity to figure it out.
                        </p>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-8 border-b border-slate-700 pb-4">Soil Preparation</p>
                    <div class="bg-[#f8f9fa] text-slate-800 p-8 rounded-xl border-4 border-double border-slate-300 shadow-xl font-serif">
                        <p class="text-lg leading-relaxed mb-4">
                            <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Observation:</span> You cannot plant a seed in frozen, hardened soil and expect it to grow, no matter how much you water it.
                        </p>
                        <p class="text-lg leading-relaxed">
                            <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Application:</span> Your mindset is the soil. Anxiety and self-doubt freeze the ground. Curiosity and Confidence till the soil, making it soft and receptive to the seeds of new information.
                        </p>
                    </div>
                </div>
            `
        },
        'know-your-learning-superpower': {
            
            // 📖 LINGUISTIC: Classic Editorial Layout (Drop caps, serif fonts)
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">Chapter 1: The Word Smart Way</p>
                    
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            <span class="float-left text-6xl text-white font-bold mr-4 mt-2 leading-none">T</span>
                            he core thesis of this framework is elegantly simple: every person possesses a unique cognitive signature. For decades, the traditional education system evaluated human intelligence through an incredibly narrow, monolithic lens—primarily rewarding those who naturally excelled in linguistic and mathematical comprehension.
                        </p>
                        
                        <p class="mb-6">
                            However, developmental psychologist Howard Gardner revolutionized this archaic understanding with his seminal <em>Theory of Multiple Intelligences</em>. Gardner persuasively argued that cognitive ability cannot be quantified by a single metric. Instead, we possess at least eight distinct forms of intelligence. 
                        </p>

                        <blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/50 p-6 rounded-r-2xl italic text-slate-200">
                            "When you cease forcing yourself to study using methodologies that inherently clash with your natural cognitive wiring, the act of learning ceases to be a chore and transforms into a highly efficient, deeply engaging process."
                        </blockquote>

                        <p>
                            To put it plainly: your objective is not to force your mind to understand a foreign language, but to translate the world's information into your mind's native tongue.
                        </p>
                    </div>
                </div>
            `,

            // 🧩 LOGICAL: Flowchart / Algorithm Layout
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">Algorithm 1.0: The Logic Smart Way</p>
                    
                    <div class="font-mono text-sm md:text-base space-y-4">
                        
                        <!-- Problem Node -->
                        <div class="bg-slate-900 border-2 border-rose-900/50 rounded-xl p-6 text-center shadow-lg relative">
                            <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-900 text-white px-3 py-1 rounded-full text-xs font-bold">STATE: PROBLEM</span>
                            <p class="text-slate-300 mt-2">Traditional Education Model = Single Input Method (Lecture/Text)</p>
                            <p class="text-slate-400 mt-2">IF (Student_Brain != Single_Input_Method) THEN [Result = Failure]</p>
                        </div>

                        <!-- Arrow -->
                        <div class="flex justify-center text-slate-600">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </div>

                        <!-- Theory Node -->
                        <div class="bg-slate-900 border-2 border-indigo-900/50 rounded-xl p-6 shadow-lg relative">
                            <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-900 text-white px-3 py-1 rounded-full text-xs font-bold">VARIABLE: GARDNER'S MULTIPLE INTELLIGENCES</span>
                            <div class="grid grid-cols-2 gap-4 mt-4 text-center text-xs text-indigo-300">
                                <div class="bg-slate-950 p-2 rounded">1. Linguistic</div>
                                <div class="bg-slate-950 p-2 rounded">2. Logical</div>
                                <div class="bg-slate-950 p-2 rounded">3. Spatial</div>
                                <div class="bg-slate-950 p-2 rounded">4. Kinesthetic</div>
                                <div class="bg-slate-950 p-2 rounded">5. Musical</div>
                                <div class="bg-slate-950 p-2 rounded">6. Interpersonal</div>
                                <div class="bg-slate-950 p-2 rounded">7. Intrapersonal</div>
                                <div class="bg-slate-950 p-2 rounded">8. Naturalistic</div>
                            </div>
                        </div>

                        <!-- Arrow -->
                        <div class="flex justify-center text-slate-600">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </div>

                        <!-- Solution Node -->
                        <div class="bg-slate-900 border-2 border-emerald-900/50 rounded-xl p-6 text-center shadow-lg relative">
                            <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-900 text-white px-3 py-1 rounded-full text-xs font-bold">STATE: OPTIMIZATION</span>
                            <p class="text-emerald-400 font-bold mt-2">Identify primary cognitive variable (1-8)</p>
                            <p class="text-emerald-400 font-bold mt-2">Align study inputs to match variable</p>
                            <p class="text-white mt-4 font-bold border-t border-emerald-900/50 pt-4">RETURN: Maximized Retention & Processing Speed</p>
                        </div>

                    </div>
                </div>
            `,

            // 🖼️ VISUAL: Image + Spatial layout
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">Gallery View: The Picture Smart Way</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div class="order-2 md:order-1 space-y-6 text-slate-300">
                            <div class="bg-slate-900/50 p-6 rounded-2xl border-l-4 border-amber-500">
                                <h3 class="font-bold text-white mb-2">The Control Room</h3>
                                <p>Imagine your brain is a highly complex, multi-monitor control room. Different types of information appear on different screens.</p>
                            </div>
                            
                            <div class="bg-slate-900/50 p-6 rounded-2xl border-l-4 border-amber-500">
                                <h3 class="font-bold text-white mb-2">The Brightest Screen</h3>
                                <p>For you, the "Picture" monitor is a massive, high-definition display. When data is routed there, you understand it instantly. The "Word" monitor might just be a small, blurry black-and-white screen.</p>
                            </div>

                            <div class="bg-slate-900/50 p-6 rounded-2xl border-l-4 border-amber-500">
                                <h3 class="font-bold text-white mb-2">The Solution</h3>
                                <p>Stop forcing yourself to stare at the small blurry screen. Take any concept you need to learn, and visually map it so it displays on your biggest monitor.</p>
                            </div>
                        </div>

                        <div class="order-1 md:order-2 w-full overflow-hidden flex justify-center bg-slate-900/80 rounded-3xl border border-slate-700 shadow-2xl p-4">
                            <img src="/images/blog/learning-superpower-map.jpg" alt="Learning Superpower Visual Map" class="w-full h-auto rounded-xl drop-shadow-xl hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            `,

            // 🏃 KINESTHETIC: Procedural / Action Manual
            'kinesthetic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-500 mb-8 border-b border-slate-700 pb-4">Training Manual: The Body Smart Way</p>
                    
                    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-orange-500 before:to-slate-800">
                        
                        <!-- Step 1 -->
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">1</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The Muscle Memory Rule</h3>
                                <p class="text-slate-400">If you want to get better at hitting a baseball, you don't sit in a chair and read a textbook. You pick up a bat, step up to the plate, and physically practice the motion.</p>
                            </div>
                        </div>

                        <!-- Step 2 -->
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">2</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">Mental Fast-Twitch Fibers</h3>
                                <p class="text-slate-400">Your brain works exactly the same way. You have different "mental muscles." Discovering your learning style is simply figuring out which mental muscles have the most fast-twitch fibers.</p>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">3</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-emerald-900/50 shadow-lg border-l-4 border-l-emerald-500">
                                <h3 class="font-bold text-emerald-400 text-lg mb-2">Do The Heavy Lifting</h3>
                                <p class="text-slate-400">Stop trying to lift weights with your weakest muscles. Take the concept off the page, build a model, write it on a whiteboard, or walk around while you learn it.</p>
                            </div>
                        </div>

                    </div>
                </div>
            `,

            // 🎵 MUSICAL: Lyric sheet / Rhythm
            'musical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Music Smart Way: The Learning Jingle</p>
                    
                    <div class="bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 font-serif text-lg md:text-xl text-slate-300 relative overflow-hidden shadow-2xl">
                        
                        <!-- Decorative music notes background -->
                        <div class="absolute -right-10 -top-10 opacity-5 text-9xl pointer-events-none">𝄞</div>
                        <div class="absolute -left-10 bottom-10 opacity-5 text-9xl pointer-events-none">♫</div>

                        <div class="space-y-10 relative z-10 text-center">
                            
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Snappy, upbeat pop rhythm - 4/4 Time ]</p>
                                <p class="italic text-slate-400 text-sm mb-2">(Verse 1 - Sing to a bouncy, catchy melody)</p>
                                <p class="font-bold text-white">♪ Everybody’s got a different kind of brain! ♪</p>
                                <p class="font-bold text-white">♪ Some like to listen, and some like to train! ♪</p>
                                <p class="font-bold text-white">♪ If you try to learn in a way that doesn’t fit... ♪</p>
                                <p class="font-bold text-white">♪ You’re gonna get tired, you’re gonna wanna quit! ♪</p>
                            </div>

                            <div>
                                <p class="italic text-slate-400 text-sm mb-2">(Pre-Chorus - Building up the energy)</p>
                                <p class="italic">So drop the heavy textbook, stop staring at the screen...</p>
                                <p class="italic">Your mind is like an engine, the best you've ever seen...</p>
                                <p class="italic">You just need the right fuel, to make the motor hum...</p>
                                <p class="italic">So listen to the rhythm, and bang your own drum! 🥁</p>
                            </div>

                            <div>
                                <p class="italic text-slate-400 text-sm mb-2">(Chorus - Big, loud, and triumphant!)</p>
                                <p class="font-bold text-pink-400 text-2xl mb-2">♪ Find your rhythm, find your beat! ♪</p>
                                <p class="font-bold text-pink-400 text-2xl mb-2">♪ Make the learning feel so sweet! ♪</p>
                                <p class="font-bold text-white text-xl mt-4">♪ When you speak your mind's own native tongue... ♪</p>
                                <p class="font-bold text-white text-xl">♪ The learning isn't hard, the learning is FUN! ♪</p>
                            </div>

                        </div>
                    </div>
                </div>
            `,

            // 💬 INTERPERSONAL: Chat Interface
            'interpersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">Thread: The People Smart Way</p>
                    
                    <div class="bg-slate-900/80 rounded-3xl border border-slate-700 p-6 shadow-2xl flex flex-col space-y-4 max-h-[600px] overflow-y-auto">
                        
                        <!-- System Message -->
                        <div class="text-center text-xs text-slate-500 my-2 font-medium">Today 10:42 AM</div>

                        <!-- Chat Bubbles -->
                        <div class="flex flex-col space-y-4">
                            
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-3/4">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    I just don't think I'm cut out for this. Everyone else grasps the lectures so easily, but I always fall behind. I don't think I'm smart enough.
                                </div>
                            </div>

                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    Let me ask you something. Imagine you only speak Spanish, and a brilliant professor gives a lecture in German. Would you understand it?
                                </div>
                            </div>

                            <!-- Student -->
                            <div class="flex items-end gap-2 w-3/4">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                                    No, of course not. But that's a language barrier.
                                </div>
                            </div>

                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-4/5 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    Exactly! Learning styles work the exact same way. It doesn't matter how smart you are; if the information is being broadcast in "Visual" and your brain only speaks "Interpersonal", you won't absorb it.
                                </div>
                            </div>

                            <!-- Mentor (Consecutive) -->
                            <div class="flex items-end gap-2 w-4/5 self-end flex-row-reverse mt-1">
                                <div class="w-8 h-8 rounded-full shrink-0 invisible"></div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm font-bold">
                                    You aren't failing because you aren't intelligent. You're failing because the information isn't being translated into your native cognitive language. 🚀
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            `,

            // 🧘 INTRAPERSONAL: Journal / Mindfulness App
            'intrapersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">Entry #01: The Self Smart Way</p>
                    
                    <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-10 md:p-16 rounded-3xl border border-slate-800 shadow-2xl relative">
                        
                        <div class="absolute top-8 right-8 text-purple-500/20 text-6xl font-serif">"</div>

                        <div class="space-y-12 text-center max-w-xl mx-auto">
                            
                            <div>
                                <p class="text-xl md:text-2xl text-slate-300 font-serif italic leading-relaxed">
                                    Think back to a moment in your life when you learned something so effortlessly that time seemed to fly by.
                                </p>
                            </div>

                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>

                            <div>
                                <p class="text-lg text-slate-400 leading-relaxed">
                                    You were in a state of flow. Completely absorbed. The concepts didn't just make sense—they resonated. 
                                </p>
                                <p class="text-lg text-slate-400 leading-relaxed mt-6">
                                    Now, contrast that with a time when you were staring at a textbook, re-reading the same paragraph over and over, feeling utterly drained.
                                </p>
                            </div>

                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>

                            <div>
                                <p class="text-xl text-white font-medium leading-relaxed">
                                    The difference between those two states wasn't your level of intelligence. The difference was <span class="text-purple-400">alignment</span>.
                                </p>
                                <p class="text-base text-slate-500 mt-6 uppercase tracking-widest font-bold">
                                    Understanding your learning style is an act of deep self-awareness. It is giving yourself permission to honor the unique way your mind was built.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            `,

            // 🌿 NATURALISTIC: Field Guide Classification
            'naturalistic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-8 border-b border-slate-700 pb-4">Field Notes: The Nature Smart Way</p>
                    
                    <div class="bg-[#f8f9fa] text-slate-800 p-8 md:p-12 rounded-xl border-4 border-double border-slate-300 shadow-xl font-serif relative">
                        
                        <!-- Vintage botanical corner accents -->
                        <div class="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-slate-400"></div>
                        <div class="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-400"></div>
                        <div class="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-400"></div>
                        <div class="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-slate-400"></div>

                        <div class="text-center mb-8 border-b-2 border-slate-300 pb-6">
                            <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Ecosystems of the Mind</h2>
                            <p class="text-slate-500 italic mt-2">A study in human cognitive environments.</p>
                        </div>

                        <div class="space-y-6 text-lg leading-relaxed">
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Observation:</span> 
                                Look closely at any thriving ecosystem. A fish does not spend its life trying to climb a tree, and a bird does not feel inadequate because it cannot breathe underwater.
                            </p>
                            
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Hypothesis:</span> 
                                In nature, every organism has evolved highly specific traits that allow it to survive and thrive perfectly within its unique environment. Human intelligence is, in essence, an ecosystem.
                            </p>

                            <div class="bg-slate-100 p-6 rounded border border-slate-200 my-6">
                                <ul class="list-disc pl-6 space-y-2 text-slate-700">
                                    <li><strong>The Canopy:</strong> Abstract logic and mathematics.</li>
                                    <li><strong>The Rivers:</strong> Deep currents of interpersonal relationships.</li>
                                    <li><strong>The Soil:</strong> Tactile, kinesthetic, hands-on creation.</li>
                                </ul>
                            </div>

                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Conclusion:</span> 
                                The traditional classroom assumes the entire world is a desert and forces every organism to act like a cactus. Discovering your learning superpower is simply discovering which environment you naturally evolved to thrive in.
                            </p>
                            <p class="text-center font-bold text-xl text-emerald-700 mt-8 italic">
                                Stop trying to be a cactus. Grow where your roots naturally take hold.
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        'day-6-feel-sharp': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">The Syntax of Physiology</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            Words require breath, and complex sentences require sustained mental energy. Your body is the instrument through which your intellect speaks. When you are sleep-deprived or dehydrated, your cognitive vocabulary shrinks. You lose access to nuanced thought.
                        </p>
                        <p>
                            Treat your physical state like the grammar of your learning process. If the grammar is broken, the message is lost. Hydration, movement, and rest are the punctuation marks that give rhythm and clarity to your mind's output.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">System Parameters: Biological Inputs</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <div class="p-6 bg-slate-900/50 rounded-xl border border-slate-800 font-mono text-sm space-y-4">
                            <p><span class="text-teal-400">INPUT:</span> Sleep &lt; 7 hours</p>
                            <p><span class="text-rose-400">OUTPUT:</span> Working memory capacity reduced by 30%.</p>
                            <div class="w-full h-px bg-slate-800 my-4"></div>
                            <p><span class="text-teal-400">INPUT:</span> Dehydration (2% body weight)</p>
                            <p><span class="text-rose-400">OUTPUT:</span> Impaired attention and executive function.</p>
                        </div>
                        <p>
                            You cannot optimize the software (learning techniques) if the hardware (your brain) is overheating. Viewing your physical health as a set of non-negotiable systemic inputs is the most rational approach to sustained intellectual output.
                        </p>
                    </div>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">The Clarity of the Lens</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p class="leading-relaxed">
                            Imagine trying to appreciate a masterpiece painting while wearing smudged, dirty glasses. That is what trying to learn in a compromised physical state feels like. 
                        </p>
                        <div class="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                            <img src="/images/smudged-glasses-painting.png" alt="A pair of glasses looking at a painting, one lens is completely smudged and the other is crystal clear" class="w-full h-auto" />
                        </div>
                        <p class="text-center italic">Sleep, water, and movement are what wipe the lens clean.</p>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-400 mb-8 border-b border-slate-700 pb-4">The Somatic Engine</p>
                    <div class="text-slate-300 text-lg leading-relaxed">
                        <p class="mb-6">
                            For you, the mind and body are not separate. You literally <em>feel</em> your cognitive friction in your muscles. When you are tired, your posture collapses; when you are energized, you lean into the material.
                        </p>
                        <p class="mb-6">
                            Use your body to hack your brain. Before a heavy learning session, do 20 jumping jacks or a quick stretch. The physical movement increases blood flow to the prefrontal cortex, immediately sharpening your focus. Your body is the engine; keep the idle RPMs up.
                        </p>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Biological Rhythm</p>
                    <div class="text-slate-300 text-lg leading-relaxed">
                        <p class="mb-6">
                            Your body operates on a circadian rhythm—a precise biological tempo. When you lack sleep, skip meals, or become dehydrated, you are forcing your brain to play out of time. The beat feels rushed, the melody feels sluggish.
                        </p>
                        <p>
                            Aligning your physical foundations (sleep, water, movement) is like tuning your instrument before a performance. When the physiological tempo is steady, the cognitive flow state emerges effortlessly.
                        </p>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">The Social Battery</p>
                    <div class="text-slate-300 text-lg leading-relaxed">
                        <p class="mb-6">
                            You intuitively understand when a friend or colleague is "off"—they are irritable, distracted, or lethargic. You know that interacting with them in that state is unproductive. 
                        </p>
                        <p>
                            Apply that exact same empathy to yourself. Your brain cannot engage deeply with new ideas when your physical "social battery" is dead. Tending to your sleep and nutrition isn't just self-care; it is ensuring you show up to your learning sessions as your best, most engaged self.
                        </p>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">The Internal Environment</p>
                    <div class="text-slate-300 text-lg leading-relaxed">
                        <p class="mb-6">
                            You are highly attuned to your internal state. You can feel the exact moment when mental fatigue sets in or when your focus begins to drift.
                        </p>
                        <p>
                            Use this self-awareness as a diagnostic tool. Instead of judging yourself for losing focus, ask your body what it needs. Is it water? Is it a 5-minute walk to reset? Honoring your physical state is the highest form of intellectual self-respect.
                        </p>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-400 mb-8 border-b border-slate-700 pb-4">The Ecosystem of the Mind</p>
                    <div class="text-slate-300 text-lg leading-relaxed">
                        <p class="mb-6">
                            You cannot expect a plant to thrive in barren soil without water or sunlight. Your brain is no different; it is a biological organism that requires a specific environment to flourish.
                        </p>
                        <p>
                            Sleep is the dark period of consolidation. Hydration is the rain that allows neural transmission. Nutrition is the soil quality. Cultivate your physical ecosystem carefully, and cognitive growth will happen organically as a natural byproduct.
                        </p>
                    </div>
                </div>
            `
        },
        'day-7-activation-energy': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">The Blank Page</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            <span class="float-left text-6xl text-white font-bold mr-4 mt-2 leading-none">E</span>
                            very writer knows the terror of the blank page. The friction of starting to write is always greater than the friction of continuing to write. Learning a new subject feels exactly the same.
                        </p>
                        <blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/50 p-6 rounded-r-2xl italic text-slate-200">
                            "You can't edit a blank page. Write the shitty first draft."
                        </blockquote>
                        <p>
                            The 5-Minute Rule is your rough draft. You don't have to write a masterpiece today; you just have to write one sentence. Tell yourself, "I will just read one paragraph" or "I will just outline the chapter." Once the ink is flowing, the words will follow.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">Overcoming Static Friction</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p>
                            In physics, <em>static friction</em> (the force required to move a stationary object) is always higher than <em>kinetic friction</em> (the force required to keep it moving). 
                        </p>
                        <div class="my-8 p-6 border border-slate-800 rounded-xl bg-slate-900/50">
                            <h4 class="text-teal-400 font-bold mb-4 flex items-center gap-2">Formula for Activation</h4>
                            <p class="text-slate-400">If perceived task effort > perceived current energy = Procrastination.</p>
                        </div>
                        <p>
                            The 5-Minute Rule artificially lowers the "perceived task effort" variable in your brain's algorithm. By committing to an impossibly small timeframe, you bypass the static friction and enter a state of kinetic motion.
                        </p>
                    </div>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">The First Brushstroke</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p class="leading-relaxed">
                            When faced with an empty canvas, the sheer number of possibilities is paralyzing. The activation energy is the fear of making the wrong first mark.
                        </p>
                        <div class="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                            <img src="/images/visual_day7_brushstroke.png" alt="A single dot of vibrant paint on a pristine white canvas" class="w-full h-auto" />
                        </div>
                        <p class="leading-relaxed mt-4">
                            The 5-Minute Rule is simply putting a single dot of paint on the canvas. It breaks the pristine, intimidating void. Once the first mark is there, your visual brain will automatically want to connect it, shape it, and build upon it.
                        </p>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-500 mb-8 border-b border-slate-700 pb-4">Action Protocol: The 5-Minute Push</p>
                    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-orange-500 before:to-slate-800">
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">1</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The Sled Push</h3>
                                <p class="text-slate-400">Think about pushing a heavy sled at the gym. Getting it to move the first inch requires every ounce of strength you have.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">2</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The First 5 Minutes</h3>
                                <p class="text-slate-400">Your brain is the same. The first 5 minutes of studying are the heavy push. Your instinct is to stop because it feels heavy.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">3</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-emerald-900/50 shadow-lg border-l-4 border-l-emerald-500">
                                <h3 class="font-bold text-emerald-400 text-lg mb-2">Gliding</h3>
                                <p class="text-slate-400">If you just keep pushing for 5 minutes, the momentum takes over. The sled glides, and the physical friction melts away.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Rhythm of the Intro</p>
                    <div class="bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 font-serif text-lg md:text-xl text-slate-300 relative overflow-hidden shadow-2xl">
                        <div class="absolute -right-10 -top-10 opacity-5 text-9xl pointer-events-none">𝄞</div>
                        <div class="absolute -left-10 bottom-10 opacity-5 text-9xl pointer-events-none">♫</div>
                        <div class="space-y-10 relative z-10 text-center">
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Slow, tentative piano keys ]</p>
                                <p class="italic text-slate-400 text-sm mb-4">When learning a new piece of music, looking at the entire sheet can be overwhelming. The activation energy is the silence before you play.</p>
                                <p class="font-bold text-white mb-2">♪ Don't try to play the whole damn song ♪</p>
                                <p class="font-bold text-white mb-6">♪ Just play the first bar, you can't go wrong ♪</p>
                            </div>
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Tempo increases, drums kick in ]</p>
                                <p class="italic text-slate-400 text-sm">Getting the rhythm started is the hardest part. Once the beat is established for just 5 minutes, your hands will naturally want to keep playing the melody.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">Thread: The Social Contract</p>
                    <div class="bg-slate-900/80 rounded-3xl border border-slate-700 p-6 shadow-2xl flex flex-col space-y-4 max-h-[600px] overflow-y-auto">
                        <div class="text-center text-xs text-slate-500 my-2 font-medium">Friday 6:00 PM</div>
                        <div class="flex flex-col space-y-4">
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-3/4">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    I'm dreading this networking event tonight. I really don't want to go. I might just cancel.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    Have you ever dreaded going out, but once you arrive and talk to the first person, you end up having a great time? The hardest part is the commute, not the conversation.
                                </div>
                            </div>
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-3/4">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    Yeah, usually. Getting dressed and getting out the door is the worst part.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-4/5 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    Studying is exactly the same! The 5-Minute Rule is like saying, "I'll just go for one drink and leave early if I want to." Lower the stakes. Introduce yourself to the material for 5 minutes. You'll likely find you want to stay for the whole event.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">Entry #07: Bypassing the Ego</p>
                    <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-10 md:p-16 rounded-3xl border border-slate-800 shadow-2xl relative">
                        <div class="absolute top-8 right-8 text-purple-500/20 text-6xl font-serif">"</div>
                        <div class="space-y-12 text-center max-w-xl mx-auto">
                            <div>
                                <p class="text-xl md:text-2xl text-slate-300 font-serif italic leading-relaxed">
                                    Procrastination is often a defense mechanism to protect your self-esteem. If you never start, you can't fail.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-lg text-slate-400 leading-relaxed">
                                    The activation energy is actually fear of inadequacy. It is the ego refusing to engage in something difficult where it might not look perfect immediately.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-xl text-white font-medium leading-relaxed">
                                    The 5-Minute Rule is a profound act of <span class="text-purple-400">self-compassion</span>.
                                </p>
                                <p class="text-base text-slate-500 mt-6 uppercase tracking-widest font-bold">
                                    It tells your ego: "We are not testing our worth today; we are just looking at a book for 300 seconds." By completely removing the pressure to perform, you disarm the internal resistance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-8 border-b border-slate-700 pb-4">Field Notes: The Spark and the Fire</p>
                    <div class="bg-[#f8f9fa] text-slate-800 p-8 md:p-12 rounded-xl border-4 border-double border-slate-300 shadow-xl font-serif relative">
                        <div class="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-slate-400"></div>
                        <div class="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-400"></div>
                        <div class="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-400"></div>
                        <div class="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-slate-400"></div>
                        <div class="text-center mb-8 border-b-2 border-slate-300 pb-6">
                            <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Thermodynamics of Wood</h2>
                            <p class="text-slate-500 italic mt-2">A study in creating self-sustaining reactions.</p>
                        </div>
                        <div class="space-y-6 text-lg leading-relaxed">
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Observation:</span> 
                                Starting a fire with damp wood requires intense, concentrated friction. You have to blow on the tiny ember when it seems like nothing is happening.
                            </p>
                            <div class="bg-slate-100 p-6 rounded border border-slate-200 my-6 italic text-slate-700">
                                The first 5 minutes of learning is that initial friction. Your brain is damp and resistant.
                            </div>
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Application:</span> 
                                The 5-Minute Rule forces you to stay with the friction long enough to create a spark. Once the kindling catches, the fire will sustain itself. Just protect the flame for the first 5 minutes.
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        'day-8-overview': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">Reading the Table of Contents</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            <span class="float-left text-6xl text-white font-bold mr-4 mt-2 leading-none">F</span>
                            or a Word Smart learner, the structure of language is deeply comforting. You intuitively understand how a thesis statement governs a paragraph, and how chapters govern a book.
                        </p>
                        <blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/50 p-6 rounded-r-2xl italic text-slate-200">
                            "The skeleton of the narrative must be established before the flesh of the details can be applied."
                        </blockquote>
                        <p>
                            When previewing, spend extra time on the Table of Contents and the chapter summaries. Read them aloud. Let the author's intended narrative arc wash over you. By understanding the linguistic skeleton of the book, your brain will effortlessly map the specific arguments and facts to the correct chapters as you read.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">Constructing the Logical Tree</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p>
                            Information is not linear; it is hierarchical. Your brain is a master at navigating logical dependencies.
                        </p>
                        <div class="my-10 w-full max-w-md mx-auto">
                            <!-- Root -->
                            <div class="flex flex-col items-center">
                                <div class="px-6 py-3 rounded-xl border border-teal-500/50 bg-teal-500/10 shadow-[0_0_20px_rgba(20,184,166,0.1)] text-center w-full relative z-10">
                                    <p class="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider mb-1">Core Premise</p>
                                    <p class="text-white font-medium">The Book Title</p>
                                </div>
                                
                                <!-- Connecting Line -->
                                <div class="w-px h-6 bg-teal-500/50"></div>
                                
                                <!-- Level 2 container -->
                                <div class="w-full flex justify-between relative">
                                    <!-- Horizontal Line -->
                                    <div class="absolute top-0 left-1/4 right-1/4 h-px bg-teal-500/50"></div>
                                    
                                    <!-- Branch 1 -->
                                    <div class="flex flex-col items-center w-1/2">
                                        <div class="w-px h-4 bg-teal-500/50"></div>
                                        <div class="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/80 text-center w-[90%] relative z-10 shadow-lg">
                                            <p class="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Argument A</p>
                                            <p class="text-slate-200 text-sm">Chapter 1</p>
                                        </div>
                                        
                                        <div class="w-px h-6 bg-slate-700"></div>
                                        
                                        <div class="px-3 py-2 rounded-lg border border-slate-700/50 border-dashed bg-slate-900/80 text-center w-[80%] opacity-80">
                                            <p class="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Evidence</p>
                                            <p class="text-slate-400 text-xs">Section 1</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Branch 2 -->
                                    <div class="flex flex-col items-center w-1/2">
                                        <div class="w-px h-4 bg-teal-500/50"></div>
                                        <div class="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/80 text-center w-[90%] relative z-10 shadow-lg">
                                            <p class="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Argument B</p>
                                            <p class="text-slate-200 text-sm">Chapter 2</p>
                                        </div>
                                        
                                        <div class="w-px h-6 bg-slate-700"></div>
                                        
                                        <div class="px-3 py-2 rounded-lg border border-slate-700/50 border-dashed bg-slate-900/80 text-center w-[80%] opacity-80">
                                            <p class="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Evidence</p>
                                            <p class="text-slate-400 text-xs">Section 2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>
                            Your previewing session should be spent identifying the parent nodes and child nodes. Don't read the evidence yet. Just map the logical tree. Once the tree is built, reading is simply the act of verifying the author's logic at each node.
                        </p>
                    </div>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">The Visual Blueprint</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p class="leading-relaxed">
                            You are the architect. You need to see the floor plan before you can furnish the rooms.
                        </p>
                        <div class="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                            <img src="/images/visual_day8_blueprint.png" alt="An architectural blueprint of a textbook chapter" class="w-full h-auto" />
                        </div>
                        <p class="leading-relaxed mt-4">
                            When you preview, ignore the paragraphs completely. Flip through the pages looking <em>only</em> at the typography and images. Look at the bold headers, the charts, the diagrams, the pull quotes. 
                        </p>
                        <div class="p-6 bg-slate-900/50 border-l-4 border-amber-500 mt-6">
                            <p class="italic">Take out a blank piece of paper and literally sketch the shape of the chapter. Draw boxes for the main sections. When you finally read, your brain will place the text perfectly inside the boxes you drew.</p>
                        </div>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-500 mb-8 border-b border-slate-700 pb-4">Action Protocol: Tactile Mapping</p>
                    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-orange-500 before:to-slate-800">
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">1</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The Agony of Sitting</h3>
                                <p class="text-slate-400">For you, learning is a physical act. Sitting still and trying to mentally map a book is agonizing.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">2</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">Sticky Note Audit</h3>
                                <p class="text-slate-400">Make your previewing physical. Use sticky notes. Flip through the chapter and place a colored sticky note on the page of every major heading. Physically touch the structure of the book.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">3</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-emerald-900/50 shadow-lg border-l-4 border-l-emerald-500">
                                <h3 class="font-bold text-emerald-400 text-lg mb-2">The Pacing Summary</h3>
                                <p class="text-slate-400">As you write your 1-minute summary, stand up and write it on a whiteboard, or walk around the room while summarizing it aloud.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">Finding the Motif</p>
                    <div class="bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 font-serif text-lg md:text-xl text-slate-300 relative overflow-hidden shadow-2xl">
                        <div class="absolute -right-10 -top-10 opacity-5 text-9xl pointer-events-none">𝄞</div>
                        <div class="absolute -left-10 bottom-10 opacity-5 text-9xl pointer-events-none">♫</div>
                        <div class="space-y-10 relative z-10 text-center">
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Repeated, iconic 4-note motif ]</p>
                                <p class="italic text-slate-400 text-sm mb-4">Every great symphony has a recurring motif—a core musical phrase that the composer returns to and varies throughout the piece.</p>
                                <p class="font-bold text-white mb-2">♪ When you scan through all the noise ♪</p>
                                <p class="font-bold text-white mb-6">♪ Listen for the author's voice ♪</p>
                            </div>
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Harmonic resolution ]</p>
                                <p class="italic text-slate-400 text-sm">When you preview a text, you are scanning for the author's motif. What phrase keeps showing up in the headings? Once you identify the "melody," the details (the harmony) will make perfect sense.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">Thread: Mapping the Author's Intent</p>
                    <div class="bg-slate-900/80 rounded-3xl border border-slate-700 p-6 shadow-2xl flex flex-col space-y-4 max-h-[600px] overflow-y-auto">
                        <div class="text-center text-xs text-slate-500 my-2 font-medium">Study Group Chat</div>
                        <div class="flex flex-col space-y-4">
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-3/4">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    I'm supposed to preview this textbook chapter, but the headings are so boring. It's just dry facts.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    You excel at reading people and understanding their underlying motives. Don't look at it as a list of facts. Look at it as an argument someone is desperately trying to win.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse mt-1">
                                <div class="w-8 h-8 rounded-full shrink-0 invisible"></div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm font-bold">
                                    Ask: "Who is the author writing this for, and what are they trying to convince them of?"
                                </div>
                            </div>
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-3/4">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    Okay, so they are trying to convince me that... their theory is the only one that works. The headings are their main debating points.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">Entry #08: The Personal Scaffold</p>
                    <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-10 md:p-16 rounded-3xl border border-slate-800 shadow-2xl relative">
                        <div class="absolute top-8 right-8 text-purple-500/20 text-6xl font-serif">"</div>
                        <div class="space-y-12 text-center max-w-xl mx-auto">
                            <div>
                                <p class="text-xl md:text-2xl text-slate-300 font-serif italic leading-relaxed">
                                    Your strongest memory hooks are tied to your personal experiences and internal reflections.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-lg text-slate-400 leading-relaxed">
                                    When building your mental scaffold during the preview phase, immediately link the main headings to something in your own life. How does this chapter relate to a problem you are currently trying to solve?
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-xl text-white font-medium leading-relaxed">
                                    Anchor the objective structure of the book to your <span class="text-purple-400">subjective internal world</span>.
                                </p>
                                <p class="text-base text-slate-500 mt-6 uppercase tracking-widest font-bold">
                                    If you make the author's outline deeply relevant to your own inner monologue, you will rarely forget it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-8 border-b border-slate-700 pb-4">Field Notes: Surveying the Landscape</p>
                    <div class="bg-[#f8f9fa] text-slate-800 p-8 md:p-12 rounded-xl border-4 border-double border-slate-300 shadow-xl font-serif relative">
                        <div class="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-slate-400"></div>
                        <div class="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-400"></div>
                        <div class="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-400"></div>
                        <div class="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-slate-400"></div>
                        <div class="text-center mb-8 border-b-2 border-slate-300 pb-6">
                            <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Topography of the Text</h2>
                            <p class="text-slate-500 italic mt-2">A study in mapping unknown territories.</p>
                        </div>
                        <div class="space-y-6 text-lg leading-relaxed">
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Observation:</span> 
                                When entering a new forest, an experienced tracker doesn't immediately stare at the dirt looking for footprints. They stand on a ridge and survey the layout of the valley, the water sources, and the tree lines.
                            </p>
                            <div class="bg-slate-100 p-6 rounded border border-slate-200 my-6 italic text-slate-700">
                                Previewing is surveying the landscape. Identify the major landmarks (headings) and the flow of the terrain (the arguments).
                            </div>
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Application:</span> 
                                Once you have a map of the territory in your mind, you can descend into the text and track the specific details without ever getting lost.
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        'day-9-active-reading': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">The Dialogue</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            <span class="float-left text-6xl text-white font-bold mr-4 mt-2 leading-none">F</span>
                            or you, active reading is quite literal. You are having a debate with the author.
                        </p>
                        <blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/50 p-6 rounded-r-2xl italic text-slate-200">
                            "Do not let the author make assertions without challenging them. Talk back to the book."
                        </blockquote>
                        <p>
                            Write in the margins. When you finish a section, summarize it by speaking out loud as if you were explaining the author's point to a friend. The act of translating their written words into your spoken words is the ultimate proof of comprehension.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">The Active Reading Algorithm</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p>
                            Active reading is an algorithmic loop. You are not a sponge; you are a parser looking for structural data. Here is your execution protocol:
                        </p>
                        <div class="my-10 w-full max-w-md mx-auto flex flex-col items-center">
                            <!-- Pre-computation -->
                            <div class="px-6 py-3 rounded-xl border border-teal-500/50 bg-teal-500/10 shadow-[0_0_20px_rgba(20,184,166,0.1)] text-center w-full max-w-xs relative z-10">
                                <p class="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider mb-1">Pre-Computation</p>
                                <p class="text-white font-medium">Define 3-5 Guiding Questions</p>
                            </div>
                            
                            <!-- Arrow down -->
                            <div class="w-px h-6 bg-teal-500/50 flex items-end justify-center relative">
                                <div class="absolute -left-4 -top-2 w-4 h-full border-l border-t border-slate-700 rounded-tl-lg opacity-0"></div> <!-- Placeholder for loop back -->
                                <div class="w-2 h-2 border-b-2 border-r-2 border-teal-500/50 rotate-45 transform translate-y-1"></div>
                            </div>
                            
                            <!-- Execution -->
                            <div class="px-6 py-3 rounded-xl border border-teal-500/50 bg-teal-500/10 shadow-[0_0_20px_rgba(20,184,166,0.1)] text-center w-full max-w-xs relative z-10" id="execution-step">
                                <p class="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider mb-1">Execution loop</p>
                                <p class="text-white font-medium">Parse Section to Find the "Spine"</p>
                            </div>

                            <!-- Arrow down -->
                            <div class="w-px h-6 bg-teal-500/50 flex items-end justify-center">
                                <div class="w-2 h-2 border-b-2 border-r-2 border-teal-500/50 rotate-45 transform translate-y-1"></div>
                            </div>
                            
                            <!-- Validation Box -->
                            <div class="px-6 py-4 rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 text-center w-full max-w-xs relative z-10 diamond-shape">
                                <p class="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">Validation (Pause)</p>
                                <p class="text-white text-sm font-medium">Can you summarise without looking?</p>
                            </div>
                            
                            <!-- Split Paths -->
                            <div class="w-full max-w-xs flex justify-between relative mt-4">
                                <div class="absolute top-0 left-1/4 right-1/4 h-px bg-teal-500/50"></div>
                                
                                <!-- Yes Branch -->
                                <div class="flex flex-col items-center w-1/2">
                                    <div class="w-px h-4 bg-teal-500/50"></div>
                                    <div class="px-4 py-2 rounded-lg border border-emerald-500/50 bg-emerald-500/10 text-center w-[80%]">
                                        <p class="text-emerald-400 font-bold text-sm">True</p>
                                        <p class="text-slate-300 text-xs mt-1">Break (Rest) / Next Section</p>
                                    </div>
                                </div>
                                
                                <!-- No Branch -->
                                <div class="flex flex-col items-center w-1/2">
                                    <div class="w-px h-4 bg-teal-500/50 relative"></div>
                                    <div class="px-4 py-2 rounded-lg border border-rose-500/50 bg-rose-500/10 text-center w-[80%] relative z-10">
                                        <p class="text-rose-400 font-bold text-sm">False</p>
                                        <p class="text-slate-300 text-xs mt-1">Loop back & Re-parse</p>
                                    </div>
                                    <!-- Visual loop back arrow logic could be complex in CSS, we'll imply it -->
                                </div>
                            </div>
                        </div>
                        <p>
                            If you read with the strict intention of executing this loop, your brain will naturally remain highly focused and analytical throughout the entire session. The questions are your variables; the summary is your output test.
                        </p>
                    </div>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">Color-Coded Interrogation</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p class="leading-relaxed">
                            You think in color and space. Your active reading should be intensely visual.
                        </p>
                        <div class="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                            <img src="/images/visual_day9_corkboard.png" alt="A detective's corkboard covered in documents connected by glowing red, blue, and yellow neon strings" class="w-full h-auto" />
                        </div>
                        <p class="leading-relaxed mt-4">
                            Develop a highlighting system. Use yellow for main claims, blue for supporting evidence, and red for things you disagree with or don't understand. By actively color-coding the text as you read, you are forcing your brain to categorize information visually in real-time.
                        </p>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-500 mb-8 border-b border-slate-700 pb-4">Action Protocol: Reading with a Pen</p>
                    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-orange-500 before:to-slate-800">
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">1</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The Pen Requirement</h3>
                                <p class="text-slate-400">Never read without a pen in your hand. The physical act of holding the pen keeps your body engaged and prevents your mind from drifting.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">2</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">Vigorous Marking</h3>
                                <p class="text-slate-400">Underline vigorously. Draw stars, arrows, and exclamation points. React physically to the text.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">3</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-emerald-900/50 shadow-lg border-l-4 border-l-emerald-500">
                                <h3 class="font-bold text-emerald-400 text-lg mb-2">Pacing Recovery</h3>
                                <p class="text-slate-400">If you feel yourself losing focus, stand up and read the next page while pacing the room. Physicalizing the interrogation process keeps your energy levels high.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Rhythm of Pause</p>
                    <div class="bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 font-serif text-lg md:text-xl text-slate-300 relative overflow-hidden shadow-2xl">
                        <div class="absolute -right-10 -top-10 opacity-5 text-9xl pointer-events-none">𝄞</div>
                        <div class="absolute -left-10 bottom-10 opacity-5 text-9xl pointer-events-none">♫</div>
                        <div class="space-y-10 relative z-10 text-center">
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Silence. A beat rests. ]</p>
                                <p class="italic text-slate-400 text-sm mb-4">Music is defined as much by the silence between the notes as by the notes themselves. Active reading requires strategic silence.</p>
                                <p class="font-bold text-white mb-2">♪ Let the words ring out and clear ♪</p>
                                <p class="font-bold text-white mb-6">♪ Let the silence bring them near ♪</p>
                            </div>
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Steady, resonant bass ]</p>
                                <p class="italic text-slate-400 text-sm">Your interrogation technique is the pause. Read a page, then look away and let the ideas resonate for ten seconds. Feel the rhythm of the author's argument. If the rhythm feels disjointed, you missed something. Go back and find the missing beat.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">Thread: The Interview</p>
                    <div class="bg-slate-900/80 rounded-3xl border border-slate-700 p-6 shadow-2xl flex flex-col space-y-4 max-h-[600px] overflow-y-auto">
                        <div class="text-center text-xs text-slate-500 my-2 font-medium">Interview Transcript</div>
                        <div class="flex flex-col space-y-4">
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-3/4">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎤</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    I'm treating this text like a transcript of an interview. I am a journalist, and the author is sitting across from me.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    Excellent frame! So, as you read, imagine asking them tough questions.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse mt-1">
                                <div class="w-8 h-8 rounded-full shrink-0 invisible"></div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm font-bold">
                                    "Why did you phrase it that way?" "What are you hiding in this chapter?"
                                </div>
                            </div>
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-4/5">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎤</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    "Who are you really trying to persuade?" It definitely makes the reading more engaging. Projecting a human element onto the text utilizes my natural empathy to enhance comprehension.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">Entry #09: The Mirror Test</p>
                    <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-10 md:p-16 rounded-3xl border border-slate-800 shadow-2xl relative">
                        <div class="absolute top-8 right-8 text-purple-500/20 text-6xl font-serif">"</div>
                        <div class="space-y-12 text-center max-w-xl mx-auto">
                            <div>
                                <p class="text-xl md:text-2xl text-slate-300 font-serif italic leading-relaxed">
                                    Your deepest insights come from within. Your primary active reading question should always be: "How does this change my worldview?"
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-lg text-slate-400 leading-relaxed">
                                    As you interrogate the text, constantly compare the author's ideas against your own beliefs.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-xl text-white font-medium leading-relaxed">
                                    If the text challenges a core belief, pause and write down exactly <span class="text-purple-400">why it makes you uncomfortable</span>.
                                </p>
                                <p class="text-base text-slate-500 mt-6 uppercase tracking-widest font-bold">
                                    This deep, internal reflection makes the material impossible to forget.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-8 border-b border-slate-700 pb-4">Field Notes: Categorizing the Flora</p>
                    <div class="bg-[#f8f9fa] text-slate-800 p-8 md:p-12 rounded-xl border-4 border-double border-slate-300 shadow-xl font-serif relative">
                        <div class="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-slate-400"></div>
                        <div class="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-400"></div>
                        <div class="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-400"></div>
                        <div class="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-slate-400"></div>
                        <div class="text-center mb-8 border-b-2 border-slate-300 pb-6">
                            <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Taxonomy of Ideas</h2>
                            <p class="text-slate-500 italic mt-2">A study in organizing abstract thought.</p>
                        </div>
                        <div class="space-y-6 text-lg leading-relaxed">
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Observation:</span> 
                                You have a natural talent for recognizing patterns, categorizing details, and understanding how small parts fit into complex systems.
                            </p>
                            <div class="bg-slate-100 p-6 rounded border border-slate-200 my-6 italic text-slate-700">
                                Interrogate the text by categorizing the information. As you read, mentally sort facts into buckets: "This is a root cause," "This is a symptom," "This is an environmental factor."
                            </div>
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Application:</span> 
                                By applying a naturalist's taxonomy to abstract information, you give it structure and meaning, anchoring it within an ecosystem of knowledge.
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        'day-10-genius-notes': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">The Syntax of Thought</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            <span class="float-left text-6xl text-white font-bold mr-4 mt-2 leading-none">A</span>
                            s a linguistic learner, you naturally want to write in complete, flowing sentences. This is your greatest strength in communication, but it is a trap in note-taking.
                        </p>
                        <blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/50 p-6 rounded-r-2xl italic text-slate-200">
                            "To master the mind map, you must strip away the grammar."
                        </blockquote>
                        <p>
                            Distill your thoughts into raw nouns and verbs. Imagine you are writing a telegram where every extra word costs money. This intense summarization forces your brain to extract the absolute essence of the concept. The sentences will naturally return when you recall the keywords later.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">Mapping Dependencies</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p>
                            A mind map is essentially a visual database schema or a dependency tree. 
                        </p>
                        <div class="my-8 p-6 border border-slate-800 rounded-xl bg-slate-900/50">
                            <p class="text-teal-400 font-mono text-sm mb-4">Node -> Edge -> Node</p>
                            <p class="text-slate-300">
                                Think of the central idea as your root directory. The thick branches are the primary sub-directories. The thin branches are the files. Use the lines connecting them to indicate explicit logical relationships (causes, correlations, subsets).
                            </p>
                        </div>
                        <p>
                            By drawing these connections, you aren't just storing data; you are compiling the logic of the entire system onto a single page.
                        </p>
                    </div>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">The Canvas of Comprehension</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p class="leading-relaxed">
                            Mind mapping is the native language of the visual learner. You are moving from a text-based interface to a graphical user interface.
                        </p>
                        <div class="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                            <img src="/images/visual_day10_mindmap.png" alt="A huge, colorful, detailed mind map drawn on a glass wall" class="w-full h-auto" />
                        </div>
                        <p class="leading-relaxed mt-4">
                            Embrace the visual aspect entirely. Use different colored pens for different branches. Draw small doodles, icons, and symbols next to the keywords. Thicken the lines that represent strong connections. Make your mind map a piece of art that instantly evokes the memory of the concept when you look at it.
                        </p>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-500 mb-8 border-b border-slate-700 pb-4">Action Protocol: Physicalizing Knowledge</p>
                    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-orange-500 before:to-slate-800">
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">1</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The Linear Trap</h3>
                                <p class="text-slate-400">Typing linear notes on a keyboard requires very little physical engagement. Mind mapping changes this.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">2</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">Sweeping Gestures</h3>
                                <p class="text-slate-400">Drawing a mind map is an inherently kinesthetic activity. The physical act of moving your hand across a large piece of paper, drawing sweeping branches, and creating spatial relationships locks the information into your muscle memory.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">3</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-emerald-900/50 shadow-lg border-l-4 border-l-emerald-500">
                                <h3 class="font-bold text-emerald-400 text-lg mb-2">The Whiteboard Variation</h3>
                                <p class="text-slate-400">To take this further, buy a large whiteboard and build your mind maps standing up.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Frequency of Information</p>
                    <div class="bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 font-serif text-lg md:text-xl text-slate-300 relative overflow-hidden shadow-2xl">
                        <div class="absolute -right-10 -top-10 opacity-5 text-9xl pointer-events-none">𝄞</div>
                        <div class="absolute -left-10 bottom-10 opacity-5 text-9xl pointer-events-none">♫</div>
                        <div class="space-y-10 relative z-10 text-center">
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ A complex chord is struck and held ]</p>
                                <p class="italic text-slate-400 text-sm mb-4">Linear notes are like reading sheet music from left to right. A mind map is like hearing the entire chord played at once.</p>
                                <p class="font-bold text-white mb-2">♪ The center is the root, the thick branch is the fifth ♪</p>
                                <p class="font-bold text-white mb-6">♪ The harmony of concepts is a fascinating gift ♪</p>
                            </div>
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Overtone frequencies ring out ]</p>
                                <p class="italic text-slate-400 text-sm">The thin branches are the complex overtones. A mind map allows you to perceive the harmony and resonance of the entire concept simultaneously, rather than sequentially.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">Thread: The Social Network of Ideas</p>
                    <div class="bg-slate-900/80 rounded-3xl border border-slate-700 p-6 shadow-2xl flex flex-col space-y-4 max-h-[600px] overflow-y-auto">
                        <div class="text-center text-xs text-slate-500 my-2 font-medium">Coffee Shop Convo</div>
                        <div class="flex flex-col space-y-4">
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    You understand people by mapping their social connections: who knows who, who influences who, who conflicts with who.
                                </div>
                            </div>
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-3/4">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    Exactly. I can tell you the entire drama of my friend group in 30 seconds.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    So treat a mind map exactly like a sociogram. The central idea is the main character. The branches are their friends, enemies, and influences.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-4/5 self-end flex-row-reverse mt-1">
                                <div class="w-8 h-8 rounded-full shrink-0 invisible"></div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm font-bold">
                                    By mapping the "relationships" between the keywords, you leverage your natural interpersonal intelligence to understand abstract academic concepts.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">Entry #10: The Subjective Structure</p>
                    <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-10 md:p-16 rounded-3xl border border-slate-800 shadow-2xl relative">
                        <div class="absolute top-8 right-8 text-purple-500/20 text-6xl font-serif">"</div>
                        <div class="space-y-12 text-center max-w-xl mx-auto">
                            <div>
                                <p class="text-xl md:text-2xl text-slate-300 font-serif italic leading-relaxed">
                                    A linear list implies an objective, universal order. A mind map is intensely personal and subjective.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-lg text-slate-400 leading-relaxed">
                                    Your mind map does not need to look like anyone else's. Organize the branches based on how the information makes sense to <em>you</em>.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-xl text-white font-medium leading-relaxed">
                                    Create a branch specifically for <span class="text-purple-400">"My Thoughts"</span> or "How This Changes My Perspective."
                                </p>
                                <p class="text-base text-slate-500 mt-6 uppercase tracking-widest font-bold">
                                    Make the mind map a reflection of your own internal processing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-8 border-b border-slate-700 pb-4">Field Notes: Organic Growth</p>
                    <div class="bg-[#f8f9fa] text-slate-800 p-8 md:p-12 rounded-xl border-4 border-double border-slate-300 shadow-xl font-serif relative">
                        <div class="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-slate-400"></div>
                        <div class="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-400"></div>
                        <div class="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-400"></div>
                        <div class="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-slate-400"></div>
                        <div class="text-center mb-8 border-b-2 border-slate-300 pb-6">
                            <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Fractal Geometries</h2>
                            <p class="text-slate-500 italic mt-2">A study in natural organizational structures.</p>
                        </div>
                        <div class="space-y-6 text-lg leading-relaxed">
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Observation:</span> 
                                A mind map is not a rigid grid; it is an organic structure. It looks exactly like the roots of a tree, the veins of a leaf, or a river delta.
                            </p>
                            <div class="bg-slate-100 p-6 rounded border border-slate-200 my-6 italic text-slate-700">
                                This format is deeply aligned with how you perceive the world. Let the mind map grow naturally.
                            </div>
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Application:</span> 
                                Start with the central "trunk" and let the branches split and divide organically as you explore the material. You are mapping the natural taxonomy of the subject.
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        'day-11-feynman': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">The Ultimate Translation</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            <span class="float-left text-6xl text-white font-bold mr-4 mt-2 leading-none">Y</span>
                            ou love words, which means you have a large vocabulary to hide behind. When you don't fully understand a concept, you can mask your ignorance with eloquent phrasing.
                        </p>
                        <blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/50 p-6 rounded-r-2xl italic text-slate-200">
                            "If you cannot explain the concept using the vocabulary of a 12-year-old, your comprehension is an illusion."
                        </blockquote>
                        <p>
                            The Feynman technique strips you of this defense mechanism. Your challenge is to translate complex academic prose into a children's story. Embrace the challenge of profound simplicity. True mastery is writing a complex idea in words so simple that anyone can read it.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">Decompiling the Code</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p>
                            Complex academic concepts are like pre-compiled software. They run smoothly on the surface, but the underlying mechanics are hidden in a "black box" of abstraction.
                        </p>
                        <div class="my-8 p-6 border border-slate-800 rounded-xl bg-slate-900/50">
                            <h4 class="text-teal-400 font-bold mb-4 flex items-center gap-2">
                                <span class="font-mono bg-teal-900/50 px-2 py-1 rounded text-xs text-teal-300 border border-teal-500/30">sys.audit()</span>
                                The Feynman Decompilation
                            </h4>
                            <p class="text-slate-400">When you use the Feynman technique, you are decompiling the "black box" back into fundamental logic gates to verify that your internal model actually works.</p>
                        </div>
                        <p>
                            By forcing yourself to explain the concept from first principles, you are running a unit test on your own brain. If you hit a point where you cannot explain <em>why</em> something happens clearly and simply, you have found a bug in your understanding. You must return to the source material to patch that specific logic error before you can proceed.
                        </p>
                    </div>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">The Whiteboard Test</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p class="leading-relaxed">
                            For you, the Feynman technique should not be purely verbal. It should be visual.
                        </p>
                        <div class="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                            <img src="/images/visual_day11_whiteboard.png" alt="A sleek glass whiteboard with an elegantly simple hand-drawn diagram summarizing a complex machine" class="w-full h-auto" />
                        </div>
                        <p class="leading-relaxed mt-4">
                            Can you explain the concept to a 12-year-old using only a marker and a whiteboard? Can you draw the mechanism? If you have to resort to writing paragraphs on the board, you don't understand the spatial and visual reality of the concept. Draw it simply.
                        </p>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-500 mb-8 border-b border-slate-700 pb-4">Action Protocol: The Physical Metaphor</p>
                    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-orange-500 before:to-slate-800">
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">1</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The Abstraction Problem</h3>
                                <p class="text-slate-400">Explaining a complex abstract concept is difficult when you are a hands-on learner. You need to make the abstract tangible.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">2</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">Gather Props</h3>
                                <p class="text-slate-400">When executing the Feynman technique, use physical props. Grab items from your desk to represent different parts of the system you are explaining.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">3</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-emerald-900/50 shadow-lg border-l-4 border-l-emerald-500">
                                <h3 class="font-bold text-emerald-400 text-lg mb-2">Physical Demonstration</h3>
                                <p class="text-slate-400">"This coffee cup is the nucleus, and these paperclips are the electrons." By physically moving objects as you explain, you ground the knowledge in reality.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Unplugged Version</p>
                    <div class="bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 font-serif text-lg md:text-xl text-slate-300 relative overflow-hidden shadow-2xl">
                        <div class="absolute -right-10 -top-10 opacity-5 text-9xl pointer-events-none">𝄞</div>
                        <div class="absolute -left-10 bottom-10 opacity-5 text-9xl pointer-events-none">♫</div>
                        <div class="space-y-10 relative z-10 text-center">
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ A single acoustic guitar plays slowly ]</p>
                                <p class="italic text-slate-400 text-sm mb-4">A great song doesn't need heavy production, synthesizers, and auto-tune. If the songwriting is genuinely good, it will sound amazing played on a single acoustic guitar.</p>
                                <p class="font-bold text-white mb-2">♪ Strip away the static, the jargon, and the noise ♪</p>
                                <p class="font-bold text-white mb-6">♪ Let the core idea sing out in a simple voice ♪</p>
                            </div>
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ A pure, clear vocal rings out ]</p>
                                <p class="italic text-slate-400 text-sm">Jargon and complex vocabulary are the heavy production. The Feynman technique is the acoustic, unplugged version of the concept. Does the rhythm of the logic hold up when played simply?</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">Thread: The Empathy Test</p>
                    <div class="bg-slate-900/80 rounded-3xl border border-slate-700 p-6 shadow-2xl flex flex-col space-y-4 max-h-[600px] overflow-y-auto">
                        <div class="text-center text-xs text-slate-500 my-2 font-medium">Mentor Chat</div>
                        <div class="flex flex-col space-y-4">
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-3/4">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    I tried the Feynman Technique, but explaining quantum physics to a generic "12-year-old" feels really abstract and hard to do.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    This technique was made for you. Teaching is an inherently interpersonal act. Don't imagine a generic kid.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-4/5 self-end flex-row-reverse mt-1">
                                <div class="w-8 h-8 rounded-full shrink-0 invisible"></div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm font-bold">
                                    Picture a specific person you care about who knows nothing about this subject. Try your little cousin or your grandma.
                                </div>
                            </div>
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-4/5">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    Oh, I see. As I explain it out loud, I use my empathy to gauge their imaginary reactions. When would their eyes glaze over? That tells me where I need to simplify.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">Entry #11: Radical Honesty</p>
                    <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-10 md:p-16 rounded-3xl border border-slate-800 shadow-2xl relative">
                        <div class="absolute top-8 right-8 text-purple-500/20 text-6xl font-serif">"</div>
                        <div class="space-y-12 text-center max-w-xl mx-auto">
                            <div>
                                <p class="text-xl md:text-2xl text-slate-300 font-serif italic leading-relaxed">
                                    The Feynman technique is ultimately a mirror. It forces you to confront the limits of your own understanding.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-lg text-slate-400 leading-relaxed">
                                    Use your strong sense of self-awareness. When you stumble during your explanation, do not brush past it. Lean into the discomfort of not knowing.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-xl text-white font-medium leading-relaxed">
                                    The moment you realize, "Wow, I actually have no idea how that part works," is the moment <span class="text-purple-400">true learning begins</span>.
                                </p>
                                <p class="text-base text-slate-500 mt-6 uppercase tracking-widest font-bold">
                                    Be radically honest with yourself. Let the mirror show you what is missing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-8 border-b border-slate-700 pb-4">Field Notes: Nature's Analogies</p>
                    <div class="bg-[#f8f9fa] text-slate-800 p-8 md:p-12 rounded-xl border-4 border-double border-slate-300 shadow-xl font-serif relative">
                        <div class="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-slate-400"></div>
                        <div class="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-400"></div>
                        <div class="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-400"></div>
                        <div class="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-slate-400"></div>
                        <div class="text-center mb-8 border-b-2 border-slate-300 pb-6">
                            <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Biological Equivalencies</h2>
                            <p class="text-slate-500 italic mt-2">A study in finding the natural metaphor.</p>
                        </div>
                        <div class="space-y-6 text-lg leading-relaxed">
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Observation:</span> 
                                The final step of the Feynman technique is to use analogies to simplify the complex. This is where your intelligence shines.
                            </p>
                            <div class="bg-slate-100 p-6 rounded border border-slate-200 my-6 italic text-slate-700">
                                Virtually every complex human system or abstract concept has a parallel in the natural world.
                            </div>
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Application:</span> 
                                When explaining economics, use the analogy of a water cycle. When explaining computer networks, use the analogy of a mycelium fungal network. Translating sterile concepts into living, biological metaphors will cement them forever.
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        'day-12-review': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">The Written Synthesis</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            For a Word Smart learner, retrieval practice shouldn't just be mental—it should be written. 
                        </p>
                        <p>
                            When your calendar alerts you that it is time for a Day 2 or Day 7 review, do not just look at your notes. Open a blank document. Write out everything you can remember about the topic in paragraph form. Compare your written summary against your original notes to identify the gaps. The act of writing forces the neural pathways to strengthen.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">The Algorithm of Memory</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p>
                            Memory is not a mystery; it is a mathematical decay function. Spaced repetition is the algorithmic solution to that decay.
                        </p>
                        <div class="my-8 w-full max-w-sm mx-auto">
                            <div class="flex flex-col border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden font-mono text-sm">
                                <div class="bg-slate-800/80 px-4 py-2 border-b border-slate-700 grid grid-cols-2 text-teal-400 font-bold">
                                    <span>Review</span>
                                    <span>Retention Rate</span>
                                </div>
                                <div class="px-4 py-3 border-b border-slate-800/50 grid grid-cols-2 text-slate-300">
                                    <span>Day 1</span>
                                    <span class="text-rose-400">Drops to 30%</span>
                                </div>
                                <div class="px-4 py-3 border-b border-slate-800/50 grid grid-cols-2 text-slate-300">
                                    <span>Day 3 (Review 1)</span>
                                    <span class="text-amber-400">Drops to 60%</span>
                                </div>
                                <div class="px-4 py-3 border-b border-slate-800/50 grid grid-cols-2 text-slate-300">
                                    <span>Day 7 (Review 2)</span>
                                    <span class="text-emerald-400">Stays at 90%</span>
                                </div>
                            </div>
                        </div>
                        <p>
                            Do not review randomly. Build a system based on this logarithmic scale. By reviewing the material precisely when the algorithm predicts you are about to forget it, you manually reset the decay function and permanently flatten the curve.
                        </p>
                    </div>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">The Forgetting Curve</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p class="leading-relaxed">
                            To master review, you must visualize the enemy: The Forgetting Curve.
                        </p>
                        <div class="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                            <img src="/images/visual_day12_forgetting_curve.png" alt="A glowing data graph showing a line decaying downwards over time, jumping back to 100% at spaced intervals" class="w-full h-auto" />
                        </div>
                        <p class="leading-relaxed mt-4">
                            Memory is a leaky bucket. When you learn something, the graph hits 100%, but immediately begins to curve downwards. Spaced repetition is the act of spiking the graph back to 100% just before it crashes. By doing this at spaced intervals, you physically flatten the curve, changing the shape of your memory from a steep drop to a permanent plateau.
                        </p>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-400 mb-8 border-b border-slate-700 pb-4">Review in Motion</p>
                    <div class="text-slate-300 text-lg leading-relaxed">
                        <p class="mb-6">
                            Sitting at a desk doing a flashcard review is mental torture for a kinesthetic learner. You must pair the cognitive retrieval with physical movement.
                        </p>
                        <p class="mb-6">
                            Do your scheduled reviews while walking, pacing, or doing light exercise. Read the prompt on your phone, put the phone in your pocket, and force yourself to explain the answer out loud while you walk. The physical rhythm will actually help unlock the memory.
                        </p>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Rhythmic Review</p>
                    <div class="text-slate-300 text-lg leading-relaxed">
                        <p class="mb-6">
                            Memory is deeply tied to rhythm and sound.
                        </p>
                        <p>
                            When you are struggling to remember a sequence or a complex concept during your scheduled reviews, turn it into a rhythmic chant or a simple song. Our brains can memorize thousands of song lyrics effortlessly. By applying rhythm and melody to academic facts during your review sessions, you bypass the standard forgetting curve almost entirely.
                        </p>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">The Teaching Schedule</p>
                    <div class="text-slate-300 text-lg leading-relaxed">
                        <p class="mb-6">
                            A scheduled review is easily ignored when you only have to answer to yourself.
                        </p>
                        <p>
                            To force compliance with the spaced repetition schedule, make it interpersonal. Schedule a 15-minute call with a study partner on Day 2, Day 7, and Day 21. Your "review" is simply you teaching the material to them, and them teaching it to you. You won't skip the review if someone else is relying on you.
                        </p>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">The Reflective Journal</p>
                    <div class="text-slate-300 text-lg leading-relaxed">
                        <p class="mb-6">
                            Mechanical flashcard reviews might feel soulless to you. You need to connect the review to your internal landscape.
                        </p>
                        <p>
                            During your scheduled reviews, don't just ask "What are the facts?" Ask "How has my understanding of this changed since the last review?" Write your retrieval practice as a journal entry. Reflecting on the *process* of your own learning makes the information deeply sticky.
                        </p>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-400 mb-8 border-b border-slate-700 pb-4">Seasonal Knowledge</p>
                    <div class="text-slate-300 text-lg leading-relaxed">
                        <p class="mb-6">
                            Just as a farmer knows there are seasons for planting, tending, and harvesting, you must recognize that learning has seasons.
                        </p>
                        <p>
                            Your initial reading is the planting. Your Day 2 and Day 7 reviews are the tending—watering the seeds and pulling the weeds (correcting mistakes). Your Day 21 review is the harvest. Respect the natural cycle of the memory ecosystem. If you don't tend the crop, it will wither.
                        </p>
                    </div>
                </div>
            `
        },
        'day-13-parkinsons': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">The Word Count Constraint</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            <span class="float-left text-6xl text-white font-bold mr-4 mt-2 leading-none">W</span>
                            riters are intimately familiar with Parkinson's Law. If you have three months to write an article, it will take three months. If you have three hours, it will take three hours.
                        </p>
                        <blockquote class="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/50 p-6 rounded-r-2xl italic text-slate-200">
                            "The artificial deadline is the editor of the mind. It cuts the fluff."
                        </blockquote>
                        <p>
                            When you set a strict timer for your study session, you are forcing your brain to become a ruthless editor. You no longer have the luxury of reading every single word or getting lost in tangents. The constraint forces you to identify the core narrative and ignore the rest.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">The Efficiency Equation</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p>
                            You appreciate optimization. Parkinson's Law is the ultimate enemy of optimization because it guarantees a decrease in efficiency over time.
                        </p>
                        <div class="my-8 p-6 border border-slate-800 rounded-xl bg-slate-900/50">
                            <h4 class="text-teal-400 font-bold mb-4">Velocity Tracking</h4>
                            <p class="text-slate-400">Treat your learning like a sprint in agile software development. Track your velocity. How many pages can you deeply comprehend in 25 minutes? Once you know your baseline metric, constantly try to optimize your process to beat it.</p>
                        </div>
                    </div>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">The Visual Timer</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p class="leading-relaxed">
                            Abstract concepts like "time" are difficult to manage. You need to make time visual.
                        </p>
                        <div class="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                            <img src="/images/visual_day13_timer.png" alt="A sleek analog desk timer with a glowing red disk representing disappearing time" class="w-full h-auto" />
                        </div>
                        <p class="leading-relaxed mt-4">
                            Do not use a digital timer on your phone. Buy a visual analog timer (like a Time Timer) where a red disk physically disappears as time elapses. Placing this visual representation of disappearing time in your peripheral vision creates a powerful, subconscious urgency that annihilates procrastination.
                        </p>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-500 mb-8 border-b border-slate-700 pb-4">Action Protocol: The Sprint</p>
                    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-orange-500 before:to-slate-800">
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">1</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The Lethargy of Time</h3>
                                <p class="text-slate-400">Long, unstructured study blocks feel like a marathon. Your body naturally conserves energy when it knows the finish line is hours away.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">2</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The 25-Minute Sprint</h3>
                                <p class="text-slate-400">Change the physical nature of the task. A 25-minute Pomodoro is not a marathon; it is a sprint. When the timer starts, you are physically "on the clock."</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">3</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-emerald-900/50 shadow-lg border-l-4 border-l-emerald-500">
                                <h3 class="font-bold text-emerald-400 text-lg mb-2">Maximum Output</h3>
                                <p class="text-slate-400">Lean forward, move quickly, and work with high intensity. Let the artificial time constraint trigger a physical state of urgency.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Metronome</p>
                    <div class="bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 font-serif text-lg md:text-xl text-slate-300 relative overflow-hidden shadow-2xl">
                        <div class="absolute -right-10 -top-10 opacity-5 text-9xl pointer-events-none">𝄞</div>
                        <div class="absolute -left-10 bottom-10 opacity-5 text-9xl pointer-events-none">♫</div>
                        <div class="space-y-10 relative z-10 text-center">
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ A metronome ticks steadily: Tick. Tick. Tick. ]</p>
                                <p class="italic text-slate-400 text-sm mb-4">Without a metronome, a musician's tempo naturally drifts. They slow down during difficult passages and speed up during easy ones. Time becomes subjective.</p>
                                <p class="font-bold text-white mb-2">♪ The timer sets the steady pace ♪</p>
                                <p class="font-bold text-white mb-6">♪ We run the track, we run the race ♪</p>
                            </div>
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ Fast, driving percussion ]</p>
                                <p class="italic text-slate-400 text-sm">A study timer is your metronome. It provides an objective, external rhythm that forces your brain to stay on beat. When you know the song ends in 25 minutes, you don't have time to slow down.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">Thread: The Accountability Partner</p>
                    <div class="bg-slate-900/80 rounded-3xl border border-slate-700 p-6 shadow-2xl flex flex-col space-y-4 max-h-[600px] overflow-y-auto">
                        <div class="text-center text-xs text-slate-500 my-2 font-medium">Study Group Convo</div>
                        <div class="flex flex-col space-y-4">
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-3/4">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    I am terrible at self-imposed deadlines. If no one is waiting on my work, I just keep delaying it.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    That's because you are highly interpersonal. You are motivated by social obligation, not abstract rules.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-4/5 self-end flex-row-reverse mt-1">
                                <div class="w-8 h-8 rounded-full shrink-0 invisible"></div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm font-bold">
                                    You need external accountability. Tell a friend, "I am going to finish reading this chapter in 30 minutes, and I will text you a summary when I am done."
                                </div>
                            </div>
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-4/5">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    Oh, wow. Just making a promise to someone instantly changes the pressure. I'd hate to let them down or look lazy. The timer becomes a social contract.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">Entry #13: The Illusion of Perfection</p>
                    <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-10 md:p-16 rounded-3xl border border-slate-800 shadow-2xl relative">
                        <div class="absolute top-8 right-8 text-purple-500/20 text-6xl font-serif">"</div>
                        <div class="space-y-12 text-center max-w-xl mx-auto">
                            <div>
                                <p class="text-xl md:text-2xl text-slate-300 font-serif italic leading-relaxed">
                                    Tasks expand to fill the time allotted primarily because of perfectionism.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-lg text-slate-400 leading-relaxed">
                                    When you give yourself unlimited time, your ego demands that you understand every nuance perfectly before moving on.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-xl text-white font-medium leading-relaxed">
                                    A strict timer forces you to abandon the <span class="text-purple-400">anxiety of perfection</span>.
                                </p>
                                <p class="text-base text-slate-500 mt-6 uppercase tracking-widest font-bold">
                                    It gives you permission to be "good enough" for now, and keep moving.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-8 border-b border-slate-700 pb-4">Field Notes: The Boundaries of Growth</p>
                    <div class="bg-[#f8f9fa] text-slate-800 p-8 md:p-12 rounded-xl border-4 border-double border-slate-300 shadow-xl font-serif relative">
                        <div class="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-slate-400"></div>
                        <div class="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-400"></div>
                        <div class="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-400"></div>
                        <div class="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-slate-400"></div>
                        <div class="text-center mb-8 border-b-2 border-slate-300 pb-6">
                            <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Environmental Limits</h2>
                            <p class="text-slate-500 italic mt-2">A study in constrained environments.</p>
                        </div>
                        <div class="space-y-6 text-lg leading-relaxed">
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Observation:</span> 
                                A goldfish kept in a small bowl will remain small. A goldfish moved to a large pond will grow significantly larger. Organisms expand to fill the boundaries of their environment.
                            </p>
                            <div class="bg-slate-100 p-6 rounded border border-slate-200 my-6 italic text-slate-700">
                                Time is the environment in which your tasks live.
                            </div>
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Application:</span> 
                                If you give a task the "ocean" of an entire Saturday, it will become an ocean-sized monster. By imposing strict time constraints, you are building a small bowl. The task has no choice but to remain small and manageable.
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        'day-14-community': {
            'linguistic': `
                <div class="max-w-3xl mx-auto space-y-6">
                    <p class="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-8 border-b border-slate-700 pb-4">The Power of Debate</p>
                    <div class="font-serif text-slate-300 text-lg md:text-xl leading-loose">
                        <p class="mb-6">
                            For you, learning is often cemented through verbal articulation. Your roommate or peer isn't just a presence; they are an audience.
                        </p>
                        <p>
                            To maximize the protégé effect, don't just "explain" the material. Invite debate. Seek out peers who will challenge your assertions and force you to defend your logic using precise language. The crucible of a high-level conversation will forge your understanding far stronger than reading in silence ever could.
                        </p>
                    </div>
                </div>
            `,
            'logical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-teal-400 mb-8 border-b border-slate-700 pb-4">Systematic Feedback</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p>
                            You thrive on accurate data and closed-loop feedback systems. Your community provides this loop.
                        </p>
                        <div class="my-8 p-6 border border-slate-800 rounded-xl bg-slate-900/50">
                            <h4 class="text-teal-400 font-bold mb-4">The Error-Correction Protocol</h4>
                            <p class="text-slate-400">When you teach the material to someone else, pay strict attention to their questions. If they ask a question you cannot answer logically, that is a system error. The value of the community is finding the bugs in your own mental code.</p>
                        </div>
                    </div>
                </div>
            `,
            'visual': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-amber-400 mb-8 border-b border-slate-700 pb-4">The Shared Canvas</p>
                    <div class="space-y-6 text-slate-300 text-lg">
                        <p class="leading-relaxed">
                            Your most powerful collaborations will involve a whiteboard.
                        </p>
                        <div class="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                            <img src="/images/visual_day14_sharedcanvas.png" alt="Two hands holding markers and actively collaborating on a glass whiteboard" class="w-full h-auto" />
                        </div>
                        <p class="leading-relaxed mt-4">
                            When you reach out to share your knowledge, do it visually. "Let me show you how this works." Draw the concept for them. As they ask questions, modify the drawing together. A shared visual representation ensures that your internal model actually matches reality.
                        </p>
                    </div>
                </div>
            `,
            'kinesthetic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-orange-500 mb-8 border-b border-slate-700 pb-4">Action Protocol: The Team Sport</p>
                    <div class="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-orange-500 before:to-slate-800">
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">1</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The Solo Grind</h3>
                                <p class="text-slate-400">Learning in isolation is like hitting a punching bag. It's a good workout, but the bag never hits back. It's static.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">2</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">Sparring Partners</h3>
                                <p class="text-slate-400">Learning with a community is like stepping into the ring to spar. The environment is dynamic, unpredictable, and forces you to react.</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">3</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-emerald-900/50 shadow-lg border-l-4 border-l-emerald-500">
                                <h3 class="font-bold text-emerald-400 text-lg mb-2">Reflex Training</h3>
                                <p class="text-slate-400">Find people to "spar" with intellectually. Debate concepts, build projects together, and let the physical friction of teamwork sharpen your reflexes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'musical': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-pink-400 mb-8 border-b border-slate-700 pb-4">The Orchestra</p>
                    <div class="bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 font-serif text-lg md:text-xl text-slate-300 relative overflow-hidden shadow-2xl">
                        <div class="absolute -right-10 -top-10 opacity-5 text-9xl pointer-events-none">𝄞</div>
                        <div class="absolute -left-10 bottom-10 opacity-5 text-9xl pointer-events-none">♫</div>
                        <div class="space-y-10 relative z-10 text-center">
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ A solo violin plays a beautiful, but lonely melody ]</p>
                                <p class="italic text-slate-400 text-sm mb-4">Playing a solo instrument is beautiful, but it lacks the depth of an orchestra. You can only play one note at a time.</p>
                                <p class="font-bold text-white mb-2">♪ One voice alone can sing the tune ♪</p>
                                <p class="font-bold text-white mb-6">♪ But a choir brings down the moon ♪</p>
                            </div>
                            <div>
                                <p class="text-pink-500 text-xs font-bold tracking-widest uppercase mb-4">[ A full symphony orchestra swells, creating massive harmonies ]</p>
                                <p class="italic text-slate-400 text-sm">Community is your orchestra. When you combine your understanding with others, you create harmonies of insight that you could never achieve alone. You hear the counter-melodies and the basslines that were invisible to you in isolation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'interpersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-blue-400 mb-8 border-b border-slate-700 pb-4">Thread: The Network Effect</p>
                    <div class="bg-slate-900/80 rounded-3xl border border-slate-700 p-6 shadow-2xl flex flex-col space-y-4 max-h-[600px] overflow-y-auto">
                        <div class="text-center text-xs text-slate-500 my-2 font-medium">Bootcamp Alumni</div>
                        <div class="flex flex-col space-y-4">
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    This is where you shine. The entire learning process up until now has been preparation for this moment.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-4/5 self-end flex-row-reverse mt-1">
                                <div class="w-8 h-8 rounded-full shrink-0 invisible"></div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm font-bold">
                                    Knowledge isn't a commodity you hoard; it's a currency you trade.
                                </div>
                            </div>
                            <!-- Student -->
                            <div class="flex items-end gap-2 w-4/5">
                                <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">🎓</div>
                                <div class="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                    Exactly! I learn so much faster when I am teaching someone else, or when I am bouncing ideas off a group. The material only feels "real" when it's shared.
                                </div>
                            </div>
                            <!-- Mentor -->
                            <div class="flex items-end gap-2 w-3/4 self-end flex-row-reverse">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0">🦉</div>
                                <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                                    Your community is your ultimate cognitive multiplier. Lean into it. Lead study groups, answer questions, and engage.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'intrapersonal': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-purple-400 mb-8 border-b border-slate-700 pb-4">Entry #14: The Mirror of Others</p>
                    <div class="bg-gradient-to-b from-slate-900 to-slate-950 p-10 md:p-16 rounded-3xl border border-slate-800 shadow-2xl relative">
                        <div class="absolute top-8 right-8 text-purple-500/20 text-6xl font-serif">"</div>
                        <div class="space-y-12 text-center max-w-xl mx-auto">
                            <div>
                                <p class="text-xl md:text-2xl text-slate-300 font-serif italic leading-relaxed">
                                    It is easy to believe you understand a concept perfectly when you only ever explain it to yourself.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-lg text-slate-400 leading-relaxed">
                                    The echo chamber of the solo mind is comfortable, but it hides your blind spots. Other people are the mirrors that reveal those blind spots.
                                </p>
                            </div>
                            <div class="w-12 h-px bg-purple-500/50 mx-auto"></div>
                            <div>
                                <p class="text-xl text-white font-medium leading-relaxed">
                                    You don't need a massive social group. You just need <span class="text-purple-400">one person</span> to test your understanding against.
                                </p>
                                <p class="text-base text-slate-500 mt-6 uppercase tracking-widest font-bold">
                                    Use the community as a diagnostic tool for your own internal mastery.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'naturalistic': `
                <div class="max-w-3xl mx-auto">
                    <p class="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-8 border-b border-slate-700 pb-4">Field Notes: The Ecosystem</p>
                    <div class="bg-[#f8f9fa] text-slate-800 p-8 md:p-12 rounded-xl border-4 border-double border-slate-300 shadow-xl font-serif relative">
                        <div class="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-slate-400"></div>
                        <div class="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-400"></div>
                        <div class="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-400"></div>
                        <div class="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-slate-400"></div>
                        <div class="text-center mb-8 border-b-2 border-slate-300 pb-6">
                            <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Symbiosis</h2>
                            <p class="text-slate-500 italic mt-2">A study in interconnected growth.</p>
                        </div>
                        <div class="space-y-6 text-lg leading-relaxed">
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Observation:</span> 
                                A single tree growing alone in a field is vulnerable to wind and disease. A forest of trees is resilient. They share nutrients through their root systems and protect each other from the elements.
                            </p>
                            <div class="bg-slate-100 p-6 rounded border border-slate-200 my-6 italic text-slate-700">
                                True learning happens in an ecosystem.
                            </div>
                            <p>
                                <span class="font-bold uppercase tracking-wider text-sm text-emerald-800">Application:</span> 
                                When you join a community of learners, you tap into a shared root system of knowledge. You are no longer relying solely on your own cognitive resources. You draw strength, motivation, and insight from the ecosystem around you.
                            </p>
                        </div>
                    </div>
                </div>
            `
        }
    };

    return variants[variantKey]?.[style] || "";
}

export const getArticleExample = getArticleVariant;
