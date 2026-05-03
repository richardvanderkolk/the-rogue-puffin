const fs = require('fs');
let content = fs.readFileSync('src/app/rogue-session/start/page.tsx', 'utf8');

// 1. Remove the step 19 block completely
content = content.replace(/\{\s*\/\* --- PAYWALL SECTION --- \*\/\s*\n\s*\{step === 19 && \([\s\S]*?\}\)/, '');

// 2. Decrement steps 20-24
for (let i = 20; i <= 24; i++) {
    content = content.replace(new RegExp(`\\{step === ${i} &&`, 'g'), `{step === ${i - 1} &&`);
}

// 3. Decrement totalSteps
content = content.replace(/const totalSteps = 26;/, 'const totalSteps = 25;');

// 4. Update ResultsOverview to point to /bootcamp
content = content.replace(
    /<Link href=\{isV2 \? "\/v2\/bootcamp" : "\/train\/sales"\} className="inline-block">/,
    `<Link href="/bootcamp" className="inline-block">`
);

content = content.replace(
    /\{isV2 \? "Continue to Day 2" : "Unlock The Full Protocol"\}/,
    `"Continue to Day 2"`
);

// Note: I will intentionally LEAVE PaywallSlide component declaration intact so I don't break JSX at the end of the file. It's just unused code now.

fs.writeFileSync('src/app/rogue-session/start/page.tsx', content);
console.log("Fixed rogue-session cleanly!");
