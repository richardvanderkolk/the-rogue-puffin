import re

with open('/Users/richard/.gemini/antigravity/scratch/the-rogue-puffin/src/lib/course-content.ts', 'r') as f:
    content = f.read()

std_seq = """
export const STANDARD_FLASH_SEQUENCE: DrillStep[] = [
    {
        title: "Flash Pages: Baseline",
        subtitle: "1 page per second.",
        mode: "flash",
        wpm: 600,
        customInterval: 1000,
        duration: 90,
        chunkSize: 150,
        highlightMode: false
    },
    {
        title: "Flash Pages: Push Speed",
        subtitle: "1 page per half-second (2 pages/sec).",
        mode: "flash",
        wpm: 1200,
        customInterval: 500,
        duration: 90,
        chunkSize: 150,
        highlightMode: false
    },
    {
        title: "Flash Pages: Overdrive",
        subtitle: "3 pages per second. Do not try to read, just look.",
        mode: "flash",
        wpm: 1800,
        customInterval: 333,
        duration: 90,
        chunkSize: 150,
        highlightMode: false
    },
    {
        title: "Flash Pages: Inverted",
        subtitle: "Upside down at 3 pages per second. Let go of comprehending.",
        mode: "inverted",
        wpm: 1800,
        customInterval: 333,
        duration: 90,
        chunkSize: 150,
        highlightMode: false
    },
    {
        title: "Reading Practice",
        subtitle: "Scroll down and read normally. Try absorbing 1/3 or 1/2 of a line at a time.",
        mode: "read",
        wpm: 0,
        duration: 120,
        chunkSize: 99999,
        highlightMode: false
    },
    {
        title: "Flash Pages: Cool Down",
        subtitle: "Back to 1 page per half-second. It should feel slower now.",
        mode: "flash",
        wpm: 1200,
        customInterval: 500,
        duration: 60,
        chunkSize: 150,
        highlightMode: false
    }
];
"""

content = content.replace("export const COURSE_CONTENT:", std_seq + "\nexport const COURSE_CONTENT:")

pattern = re.compile(r'sequence:\s*\[\s*({\s*title:\s*"Warmup:.*?\n\s*}\s*),\s*{\s*title:\s*"Flash Pages: The Foundation".*?}\s*\]', re.DOTALL)

def repl(match):
    warmup = match.group(1)
    
    if 'mode: "peripheral"' in warmup:
        warmup = re.sub(r'highlightMode:\s*true', 'highlightMode: false', warmup)
        warmup = re.sub(r'chunkSize:\s*\d+', 'chunkSize: 4', warmup)
        warmup = re.sub(r'subtitle:\s*".*?"', 'subtitle: "Lock your eyes on the red dot. Let your peripheral vision expand outward to catch the words."', warmup)
        warmup = re.sub(r'title:\s*".*?"', 'title: "Warmup: Center-Fixation Expansion"', warmup)

    return f"sequence: [\n            {warmup},\n            ...STANDARD_FLASH_SEQUENCE\n        ]"

content = pattern.sub(repl, content)

with open('/Users/richard/.gemini/antigravity/scratch/the-rogue-puffin/src/lib/course-content.ts', 'w') as f:
    f.write(content)

print("Updated course-content.ts successfully!")
