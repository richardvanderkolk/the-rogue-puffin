const fs = require('fs');
const FILE_PATH = 'src/data/articles.ts';
let content = fs.readFileSync(FILE_PATH, 'utf-8');
const start = content.indexOf('slug: "know-your-learning-superpower"');
const end = content.indexOf('<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-10"', start);
console.log(content.substring(start, end));
