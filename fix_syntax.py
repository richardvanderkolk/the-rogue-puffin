import os

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
        continue

    with open(file_path, 'r') as f:
        content = f.read()

    # The issue was caused by r"className=\"text-4xl\"" in python
    # which outputs literal backslashes
    content = content.replace('className=\\"text-4xl\\"', 'className="text-4xl"')

    with open(file_path, 'w') as f:
        f.write(content)

    print(f"Fixed {file_path}")

