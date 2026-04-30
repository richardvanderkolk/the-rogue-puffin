const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/rogue-day-*/start/page.tsx');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replaceAll(
        '<div className="space-y-6 max-w-2xl mx-auto text-left">\n                                <div className="flex justify-center mb-6">',
        '<div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">\n                                <div className="md:col-span-2 flex justify-center">'
    );
    
    content = content.replaceAll(
        '<div className="space-y-6 max-w-2xl mx-auto text-center">\n                                <div className="flex justify-center mb-6">',
        '<div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">\n                                <div className="md:col-span-2 flex justify-center">'
    );
    
    content = content.replaceAll(
        '</div>\n                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">',
        '</div>\n                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">'
    );
    
    content = content.replaceAll(
        '</div>\n                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">',
        '</div>\n                                <div className="md:col-span-3 p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">'
    );
    
    // Also make images slightly smaller by changing max-w-md to max-w-sm
    content = content.replaceAll('className="w-full max-w-md rounded-2xl', 'className="w-full max-w-sm rounded-2xl');
    
    fs.writeFileSync(file, content);
});
