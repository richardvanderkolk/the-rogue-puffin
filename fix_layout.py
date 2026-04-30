import glob

for f in glob.glob('src/app/rogue-day-*/start/page.tsx'):
    with open(f, 'r') as file:
        content = file.read()
    
    content = content.replace(
        '<div className="space-y-6 max-w-2xl mx-auto text-left">\n                                <div className="flex justify-center mb-6">',
        '<div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">\n                                <div className="md:col-span-2 flex justify-center">'
    )
    
    content = content.replace(
        '<div className="space-y-6 max-w-2xl mx-auto text-center">\n                                <div className="flex justify-center mb-6">',
        '<div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">\n                                <div className="md:col-span-2 flex justify-center">'
    )
    
    content = content.replace(
        '</div>\n                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">',
        '</div>\n                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">'
    )
    
    content = content.replace(
        '</div>\n                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">',
        '</div>\n                                <div className="md:col-span-3 p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">'
    )
    
    content = content.replace(
        'className="w-full max-w-md rounded-2xl shadow-2xl border border-indigo-500/20" />',
        'className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />'
    )
    
    with open(f, 'w') as file:
        file.write(content)
