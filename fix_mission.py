import glob
import re

for f in glob.glob('src/app/rogue-day-*/start/page.tsx'):
    with open(f, 'r') as file:
        content = file.read()
    
    # We want to find the <Slide key="mission"... block and replace its inner layout.
    # The current layout is:
    # <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
    #     <div className="md:col-span-2 flex justify-center">
    #         <img src="..." alt="..." className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
    #     </div>
    #     <div className="md:col-span-3 p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
    
    # regex to replace
    pattern = r'<div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">\s*<div className="md:col-span-2 flex justify-center">\s*<img src="[^"]+" alt="[^"]+" className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />\s*</div>\s*<div className="md:col-span-3 p-8 bg-indigo-500/10'
    replacement = r'<div className="space-y-6 max-w-2xl mx-auto text-center">\n                                <div className="p-8 bg-indigo-500/10'
    
    content = re.sub(pattern, replacement, content)
    
    with open(f, 'w') as file:
        file.write(content)
