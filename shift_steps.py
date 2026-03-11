import re
import os

filepath = "src/app/rogue-memory-session/start/page.tsx"

with open(filepath, "r") as f:
    content = f.read()

def repl(m):
    step_num = int(m.group(1))
    if step_num >= 26:
        step_num += 2
    elif step_num >= 2:
        step_num += 1
    return f"step === {step_num}"

new_content = re.sub(r'step === (\d+)', repl, content)

def repl_comment(m):
    step_num = int(m.group(1))
    if step_num >= 26:
        step_num += 2
    elif step_num >= 2:
        step_num += 1
    return f"STEP {step_num}:"

new_content = re.sub(r'STEP (\d+):', repl_comment, new_content)

new_content = new_content.replace('TOTAL_STEPS = 29', 'TOTAL_STEPS = 31')

with open(filepath, "w") as f:
    f.write(new_content)

print("Steps shifted.")
