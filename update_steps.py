import re

file_path = '/Users/richard/.gemini/antigravity/scratch/the-rogue-puffin/src/app/rogue-memory-session/start/page.tsx'

with open(file_path, 'r') as f:
    content = f.read()

content = re.sub(r'const TOTAL_STEPS = 30;', 'const TOTAL_STEPS = 29;', content)

def decrement_step(match):
    prefix = match.group(1)
    num = int(match.group(2))
    if 15 <= num <= 29:
        num -= 1
    return f"{prefix}{num}"

content = re.sub(r'(\{\s*step\s*===\s*)(\d+)', decrement_step, content)

def decrement_comment(match):
    prefix = match.group(1)
    num = int(match.group(2))
    suffix = match.group(3)
    if 15 <= num <= 29:
        num -= 1
    return f"{prefix}{num}{suffix}"

content = re.sub(r'(STEP )(\d+)(:)', decrement_comment, content)

with open(file_path, 'w') as f:
    f.write(content)
