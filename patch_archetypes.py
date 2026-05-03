import os
import re

files_to_patch = [
    "src/app/rogue-day-4/start/page.tsx",
    "src/app/rogue-day-5/start/page.tsx",
    "src/app/rogue-day-6/start/page.tsx",
    "src/app/rogue-day-7/start/page.tsx",
    "src/app/rogue-day-8/start/page.tsx",
    "src/app/rogue-day-9/start/page.tsx",
    "src/app/rogue-day-10/start/page.tsx",
    "src/app/rogue-day-11/start/page.tsx",
    "src/app/rogue-day-12/start/page.tsx",
    "src/app/rogue-day-13/start/page.tsx",
    "src/app/rogue-day-14/start/page.tsx",
]

for file_path in files_to_patch:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue

    with open(file_path, 'r') as f:
        content = f.read()

    # 1. State modification
    content = re.sub(
        r"const \[archetype, setArchetype\] = useState<string \| undefined>\(undefined\);",
        r"const [archetypes, setArchetypes] = useState<string[]>([]);\n    const [activeArchetype, setActiveArchetype] = useState<string | undefined>(undefined);",
        content
    )

    # 2. Local storage fetch modification
    content = re.sub(
        r"setArchetype\(parsed\[0\]\);",
        r"setArchetypes(parsed);\n                        setActiveArchetype(parsed[0]);",
        content
    )

    # 3. Supabase fetch modification
    content = re.sub(
        r"setArchetype\(data\.learning_archetype\);",
        r"setArchetypes([data.learning_archetype]);\n                    setActiveArchetype(data.learning_archetype);",
        content
    )

    # 4. nextStep logic
    content = re.sub(
        r"&& archetype && !showVariant",
        r"&& archetypes.length > 0 && !showVariant",
        content
    )

    # 5. prevStep logic
    content = re.sub(
        r"&& archetype\)",
        r"&& archetypes.length > 0)",
        content
    )

    # 6. Button customButtonText modification
    content = re.sub(
        r"customButtonText=\{archetype \? `See the \$\{INTELLIGENCE_INFO\[archetype\]\?\.title \|\| 'Superpower'\} Translation` : 'Next'\}",
        r"customButtonText={archetypes.length > 0 ? `See the ${INTELLIGENCE_INFO[archetypes[0]]?.title || 'Superpower'} Translation` : 'Next'}",
        content
    )

    # 7. Variant slide logic and rendering
    content = re.sub(
        r"showVariant && archetype && \(",
        r"showVariant && activeArchetype && (",
        content
    )

    # Modify the slide title
    content = re.sub(
        r"title=\{`Your \$\{INTELLIGENCE_INFO\[archetype\]\?\.title\} Translation`\}",
        r"title={`Your ${INTELLIGENCE_INFO[activeArchetype]?.title} Translation`}",
        content
    )

    # Modify the slide icon
    content = re.sub(
        r"icon=\{<span className=\"text-4xl\">\{INTELLIGENCE_INFO\[archetype\]\?\.icon\}</span>\}",
        r"icon={<span className=\"text-4xl\">{INTELLIGENCE_INFO[activeArchetype]?.icon}</span>}",
        content
    )

    # Modify getArticleVariant
    content = re.sub(
        r"getArticleVariant\('([^']+)', archetype\)",
        r"getArticleVariant('\1', activeArchetype)",
        content
    )

    # Add the UI buttons
    # We find the end of the div containing the innerHTML.
    # It looks like:
    #                                     />
    #                                 </div>
    #                             </div>
    #                         </Slide>

    # The replacement will append the button logic after the inner div
    button_html = """                                />
                                </div>
                                {archetypes.length > 1 && (
                                    <div className="mt-12 pt-8 border-t border-slate-800">
                                        <p className="text-sm text-slate-500 font-medium mb-4 text-center uppercase tracking-widest">Also highly compatible with your secondary superpowers:</p>
                                        <div className="flex justify-center gap-4 flex-wrap">
                                            {archetypes.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setActiveArchetype(type)}
                                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                                                        activeArchetype === type
                                                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                                                            : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-300'
                                                    }`}
                                                >
                                                    <span>{INTELLIGENCE_INFO[type]?.icon}</span>
                                                    {INTELLIGENCE_INFO[type]?.title.split(' (')[0]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}"""
    
    content = re.sub(
        r"                                \/>\n                                <\/div>",
        button_html,
        content
    )

    with open(file_path, 'w') as f:
        f.write(content)

    print(f"Patched {file_path}")

