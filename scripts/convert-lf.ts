import fs from 'fs';
import path from 'path';

function convertToLF(filePath: string) {
  const absolutePath = path.resolve(filePath);
  if (fs.existsSync(absolutePath)) {
    const content = fs.readFileSync(absolutePath, 'utf8');
    const lfContent = content.replace(/\r\n/g, '\n');
    fs.writeFileSync(absolutePath, lfContent, 'utf8');
    console.log(`Converted ${filePath} to LF line endings successfully.`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
}

convertToLF('src/App.tsx');
convertToLF('src/components/MasterTaskTable.tsx');
