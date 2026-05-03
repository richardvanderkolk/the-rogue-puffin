const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

// Replace the links
content = content.replace(
    /const commonLinks = \[\s*\{ name: "Abridged Course", href: "\/abridged" \},\s*\{ name: "Masterclass Bundle", href: "\/masterclass" \},\s*\{ name: "Articles", href: "\/blog" \},\s*\];/g,
    `const commonLinks: { name: string, href: string }[] = [];`
);

content = content.replace(
    /const authenticatedLinks = \[\s*\.\.\.commonLinks,\s*\{ name: "Training Dashboard", href: "\/dashboard" \},\s*\];/g,
    `const authenticatedLinks = [\n        { name: "Training Dashboard", href: "/dashboard" },\n    ];`
);

// Change "Start Masterclass" to "Start Free Training" and point it to /rogue-session/start?v2=true
content = content.replace(
    /href="\/masterclass" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-base lg:text-lg font-medium rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-500\/25">[\s\S]*?Start Masterclass/g,
    `href="/rogue-session/start" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-base lg:text-lg font-medium rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-500/25">\n                            Start Free Training`
);

content = content.replace(
    /href="\/masterclass" \s*onClick=\{\(\) => setIsMobileMenuOpen\(false\)\}\s*className="w-full text-center px-6 py-4 bg-indigo-500 hover:bg-indigo-400 text-white text-xl font-medium rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-500\/25"\s*>\s*Start Masterclass/g,
    `href="/rogue-session/start"\n                                onClick={() => setIsMobileMenuOpen(false)}\n                                className="w-full text-center px-6 py-4 bg-indigo-500 hover:bg-indigo-400 text-white text-xl font-medium rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-500/25"\n                            >\n                                Start Free Training`
);

fs.writeFileSync('src/components/layout/Header.tsx', content);
console.log("Header fixed!");
