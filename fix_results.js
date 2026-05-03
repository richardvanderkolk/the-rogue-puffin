const fs = require('fs');
let content = fs.readFileSync('src/app/rogue-session/start/page.tsx', 'utf8');

// Replace the Link href logic
content = content.replace(
    /<Link href=\{isV2 \? "\/v2\/bootcamp" : "\/train\/sales"\} className="inline-block">/g,
    `<Link href="/v2/bootcamp" className="inline-block">`
);

// Replace the button text
content = content.replace(
    /\{isV2 \? "Continue to Day 2" : "Unlock The Full Protocol"\}/g,
    `"Continue to Day 2"`
);

fs.writeFileSync('src/app/rogue-session/start/page.tsx', content);
console.log("ResultsOverview fixed!");
