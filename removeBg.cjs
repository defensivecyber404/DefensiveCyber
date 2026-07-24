const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace URL background images
    let newContent = content.replace(/backgroundImage:\s*(['"`])url\([^)]+\)\1,?/g, 'backgroundImage: "none",');
    
    // Replace template literal background images (e.g. `url(${bg})`)
    newContent = newContent.replace(/backgroundImage:\s*`url\(\$\{[^}]+\}\)`,?/g, 'backgroundImage: "none",');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
