const fs = require('fs');
let content = fs.readFileSync('src/app/v2/page.tsx', 'utf8');

// The Playbook (Free Theory Hub) starts at "{/* 3. The Playbook (The Free Theory Hub) */}"
// and ends right before "{/* 4. The 14-Day Bootcamp (The Paid Execution Plan) */}"
const startStr = "{/* 3. The Playbook (The Free Theory Hub) */}";
const endStr = "{/* 4. The 14-Day Bootcamp (The Paid Execution Plan) */}";

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + content.substring(endIndex);
    fs.writeFileSync('src/app/v2/page.tsx', content);
    console.log("Removed the Playbook section from v2/page.tsx");
} else {
    console.log("Could not find the Playbook section boundaries.");
}
