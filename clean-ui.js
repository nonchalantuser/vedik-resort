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

  // Remove scrollTopBtn
  const scrollTopRegex = /<button class="scroll-top-btn" id="scrollTopBtn"[\s\S]*?<\/button>\s*/g;
  content = content.replace(scrollTopRegex, '');

  // Remove offers-ribbon section entirely
  const offersRegex = /<section class="offers-ribbon[^>]*>[\s\S]*?<\/section>\s*/g;
  content = content.replace(offersRegex, '');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned ${filePath}`);
  }
});
