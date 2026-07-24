// Fix syntax error: remove extra ] before ]; at end of file
const fs = require('fs');
const path = require('path');

const mapsDir = path.join(__dirname, '..', 'js', 'data', 'maps');
let fixed = 0;

function walkDir(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.endsWith('.js') && dir.includes('agents')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      // Check if file ends with \n]\n];\n (the bug pattern)
      if (content.endsWith('\n]\n];\n') || content.endsWith('\n]\n];')) {
        // Replace the pattern: remove the extra ] line
        const fixedContent = content.replace(/\n\]\n\];/, '\n];');
        fs.writeFileSync(fullPath, fixedContent, 'utf8');
        fixed++;
      }
    }
  }
}

walkDir(mapsDir);
console.log(`Fixed ${fixed} files.`);
