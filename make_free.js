const fs = require('fs');
let content = fs.readFileSync('src/app/rogue-session/start/page.tsx', 'utf8');

// First, remove the PaywallSlide block:
/*
                    {/* --- PAYWALL SECTION --- *\/}
                    {step === 19 && (
                        <PaywallSlide onUnlock={handleUnlock} />
                    )}
*/
content = content.replace(/\{\/\* --- PAYWALL SECTION --- \*\/\}[\s\S]*?\{step === 19 && \([\s\S]*?\}\)/, '');

// Now decrement all `step === X` where X > 19
for (let i = 20; i <= 26; i++) {
    content = content.replace(new RegExp(`\\{step === ${i} &&`, 'g'), `{step === ${i - 1} &&`);
}

// Decrease totalSteps
content = content.replace(/const totalSteps = 26;/, 'const totalSteps = 25;');

// Since we no longer use `PaywallSlide` or `handleUnlock`, we can leave them or remove them.
// Removing `handleUnlock`
content = content.replace(/const handleUnlock = \(\) => \{[\s\S]*?nextStep\(\);\n\s*\}/, '');

fs.writeFileSync('src/app/rogue-session/start/page.tsx', content);
console.log("Made Day 1 free!");
