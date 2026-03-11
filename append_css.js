const fs = require('fs');
const file = 'src/app/globals.css';
let content = fs.readFileSync(file, 'utf8');

const newCSS = `

/* READING MODE 
   Using a CSS filter to invert the default dark theme preserves the precise layout 
   and color weights while making it readable on a white background.
*/
.light {
    filter: invert(1) hue-rotate(180deg);
}
.light img, .light video {
    filter: invert(1) hue-rotate(180deg);
}
`;

if (!content.includes('/* READING MODE')) {
    fs.writeFileSync(file, content + newCSS, 'utf8');
}
console.log('Appended CSS filters');
