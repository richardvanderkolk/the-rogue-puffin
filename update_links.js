const fs = require('fs');

const path = './src/data/articles.ts';
let content = fs.readFileSync(path, 'utf-8');

// Map of slug to { abridgedNext?: { slug, title }, fullNext: { slug, title } }
const map = {
  'know-your-why': {
    fullNext: { slug: 'know-your-learning-superpower', title: 'Know Your Learning Superpower' }
  },
  'know-your-learning-superpower': {
    abridgedNext: { slug: 'preview-the-material', title: 'Preview the Material' },
    fullNext: { slug: 'your-social-circle', title: "Show Me Your Friends..." }
  },
  'your-social-circle': {
    fullNext: { slug: 'create-your-learning-lab', title: 'Create Your Learning Lab' }
  },
  'create-your-learning-lab': {
    fullNext: { slug: 'feel-sharp', title: 'Feel Sharp' }
  },
  'feel-sharp': {
    fullNext: { slug: 'garbage-in-garbage-out', title: 'Choose Your Resources Wisely' }
  },
  'garbage-in-garbage-out': {
    fullNext: { slug: 'psychology-of-time-and-deadlines', title: 'The Psychology of Time & Deadlines' }
  },
  'psychology-of-time-and-deadlines': {
    fullNext: { slug: 'cramming-to-compounding', title: 'From Cramming to Compounding' }
  },
  'cramming-to-compounding': {
    fullNext: { slug: 'slicing-the-elephant', title: 'Slicing the Elephant' }
  },
  'slicing-the-elephant': {
    fullNext: { slug: 'friction-of-starting', title: 'The Friction of Starting' }
  },
  'friction-of-starting': {
    fullNext: { slug: 'initiate-a-learning-mindset', title: 'A Learning Mindset' }
  },
  'initiate-a-learning-mindset': {
    fullNext: { slug: 'preview-the-material', title: 'Preview the Material' }
  },
  'preview-the-material': {
    abridgedNext: { slug: 'genius-comprehension', title: 'Genius Comprehension' },
    fullNext: { slug: 'genius-comprehension', title: 'Genius Comprehension' }
  },
  'genius-comprehension': {
    abridgedNext: { slug: 'the-art-of-review', title: 'Defeating the Forgetting Curve' },
    fullNext: { slug: 'genius-note-taking', title: 'Genius Note-Taking' }
  },
  'genius-note-taking': {
    fullNext: { slug: 'active-recall', title: 'Active Recall' }
  },
  'active-recall': {
    fullNext: { slug: 'feynman-technique', title: 'The Feynman Technique' }
  },
  'feynman-technique': {
    fullNext: { slug: 'the-art-of-review', title: 'Defeating the Forgetting Curve' }
  },
  'the-art-of-review': {
    fullNext: null // End of Masterclass
  }
};

const articleRegex = /slug:\s*"([^"]+)"[\s\S]*?(<h3 class="text-xl font-bold text-white mb-6">Continue Your Journey<\/h3>[\s\S]*?<\/div>\s*`)/g;

let match;
let newContent = content;

// Generate the HTML for the continue section
function generateHTML(slug, links) {
  if (links.fullNext === null) {
      return `<h3 class="text-xl font-bold text-white mb-6">Masterclass Complete</h3>
            <div class="grid grid-cols-1 gap-6">
                <div class="block p-6 rounded-2xl bg-slate-900/40 border border-emerald-500/30 text-center">
                    <p class="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">You Have Finished</p>
                    <h4 class="text-lg font-bold text-white">Congratulations on completing the curriculum!</h4>
                </div>
            </div>
        \``;
  }

  let html = `<h3 class="text-xl font-bold text-white mb-6">Continue Your Journey</h3>\n            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">\n`;

  if (links.abridgedNext) {
      // It's in both, so show two links
      html += `                <a href="/blog/${links.abridgedNext.slug}" class="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">\n`;
      html += `                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Abridged Masterclass</p>\n`;
      html += `                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">${links.abridgedNext.title} <span class="text-indigo-500 ml-1">→</span></h4>\n`;
      html += `                </a>\n`;

      if (links.abridgedNext.slug !== links.fullNext.slug) {
        html += `                <a href="/blog/${links.fullNext.slug}" class="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">\n`;
        html += `                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Complete Masterclass</p>\n`;
        html += `                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">${links.fullNext.title} <span class="text-indigo-500 ml-1">→</span></h4>\n`;
        html += `                </a>\n`;
      } else {
        html += `                <a href="/blog/${links.fullNext.slug}" class="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">\n`;
        html += `                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Complete Masterclass</p>\n`;
        html += `                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">${links.fullNext.title} <span class="text-indigo-500 ml-1">→</span></h4>\n`;
        html += `                </a>\n`;
      }
  } else {
      // Just full masterclass, show next in masterclass + Apply (Rogue session)
      html += `                <a href="/blog/${links.fullNext.slug}" class="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">\n`;
      html += `                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Next in Curriculum</p>\n`;
      html += `                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">${links.fullNext.title} <span class="text-indigo-500 ml-1">→</span></h4>\n`;
      html += `                </a>\n`;
      html += `                <a href="/rogue-session" class="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">\n`;
      html += `                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Apply These Concepts</p>\n`;
      html += `                    <h4 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">The Rogue Session <span class="text-indigo-500 ml-1">→</span></h4>\n`;
      html += `                </a>\n`;
  }
  
  html += `            </div>\n        \``;
  return html;
}

while ((match = articleRegex.exec(content)) !== null) {
  const slug = match[1];
  const oldHTML = match[2];
  if (map[slug]) {
    const newHTML = generateHTML(slug, map[slug]);
    newContent = newContent.replace(oldHTML, newHTML);
  }
}

fs.writeFileSync(path, newContent);
console.log("Updated links successfully.");
