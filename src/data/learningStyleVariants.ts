export function getArticleVariant(slug: string, style: string): string {
    const variants: Record<string, Record<string, string>> = {
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
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                                1
                            </div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">The Muscle Memory Rule</h3>
                                <p class="text-slate-400">If you want to get better at hitting a baseball, you don't sit in a chair and read a textbook. You pick up a bat, step up to the plate, and physically practice the motion.</p>
                            </div>
                        </div>

                        <!-- Step 2 -->
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                                2
                            </div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                                <h3 class="font-bold text-white text-lg mb-2">Mental Fast-Twitch Fibers</h3>
                                <p class="text-slate-400">Your brain works exactly the same way. You have different "mental muscles." Discovering your learning style is simply figuring out which mental muscles have the most fast-twitch fibers.</p>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                                3
                            </div>
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
        }
    };

    return variants[slug]?.[style] || "<p>Variant not found for this learning style.</p>";
}

export const getArticleExample = getArticleVariant;
