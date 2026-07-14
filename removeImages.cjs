const fs = require('fs');
const path = require('path');
const pagesDir = path.join(process.cwd(), 'src/pages');
const dirs = fs.readdirSync(pagesDir);
dirs.forEach(d => {
  const p = path.join(pagesDir, d, d + '.tsx');
  if(fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    // Remove the 2. Image section
    content = content.replace(/\{\/\* 2\. Image \*\/\}\s*<Section title=".*?">\s*<ImageCard.*?\/>\s*<\/Section>/g, '');
    // Remove image import
    content = content.replace(/import \w+Img from '\.\.\/\.\.\/assets\/images\/.*?\.webp';\n/g, '');
    // Remove ImageCard import
    content = content.replace(/import ImageCard from '\.\.\/\.\.\/components\/ImageCard\/ImageCard';\n/g, '');
    fs.writeFileSync(p, content);
  }
});
