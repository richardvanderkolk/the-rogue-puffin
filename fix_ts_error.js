const fs = require('fs');
const FILE_PATH = 'src/app/train/app/page.tsx';

let content = fs.readFileSync(FILE_PATH, 'utf-8');

// Find the useState definition for mode
// const [mode, setMode] = useState<"normal" | "inverted" | "peripheral" | "backward" | "flash" | "read" | "message">("flash");
const targetType = '<"normal" | "inverted" | "peripheral" | "backward" | "flash" | "read" | "message"';
const replaceType = '<"normal" | "inverted" | "peripheral" | "backward" | "flash" | "read" | "message" | "recall"';

if (content.includes(targetType)) {
    content = content.replace(targetType, replaceType);
    fs.writeFileSync(FILE_PATH, content);
    console.log("Successfully updated app/page.tsx with 'recall' mode type!");
} else {
    console.error("Could not find the useState mode type definition in app/page.tsx.");
}
