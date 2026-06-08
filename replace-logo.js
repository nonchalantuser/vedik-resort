const fs = require('fs');
const path = require('path');

const dir = './';

function walkDir(currentPath, callback) {
  const files = fs.readdirSync(currentPath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(currentPath, files[i]);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && (filePath.endsWith('.html') || filePath.endsWith('generate-rooms.js'))) {
      callback(filePath);
    } else if (stat.isDirectory() && !filePath.includes('.git') && !filePath.includes('node_modules')) {
      walkDir(filePath, callback);
    }
  }
}

walkDir(dir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace SVG + logo-text with img tag
  // We match from <svg class="logo-tree" to </div> just before </a>
  const logoRegex = /<svg class="logo-tree"[\s\S]*?<\/div>/g;
  content = content.replace(logoRegex, '<img src="logo.png" alt="Vedik Resort" class="logo-img" />');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated logo in ${filePath}`);
  }
});
