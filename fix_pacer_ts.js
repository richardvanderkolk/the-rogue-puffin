const fs = require('fs');
const FILE_PATH = 'src/components/PacerEngine.tsx';

let content = fs.readFileSync(FILE_PATH, 'utf-8');

// Find the interface definition for PacerEngineProps
const targetType = 'mode: "normal" | "inverted" | "peripheral" | "backward" | "flash" | "read" | "message";';
const replaceType = 'mode: "normal" | "inverted" | "peripheral" | "backward" | "flash" | "read" | "message" | "recall";';

if (content.includes(targetType)) {
    content = content.replace(targetType, replaceType);
    fs.writeFileSync(FILE_PATH, content);
    console.log("Successfully updated PacerEngine.tsx with 'recall' mode type!");
} else {
    console.error("Could not find the mode type definition in PacerEngine.tsx.");
}
