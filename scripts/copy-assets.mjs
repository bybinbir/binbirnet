
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'public', 'img');
const destDir = path.join(projectRoot, '.output', 'public', 'img');

console.log(`Copying assets from ${srcDir} to ${destDir}...`);

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        if (!fs.existsSync(path.dirname(dest))) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
        }
        fs.copyFileSync(src, dest);
    }
}

try {
    if (fs.existsSync(srcDir)) {
        copyRecursiveSync(srcDir, destDir);
        console.log('Assets copied successfully.');
    } else {
        console.error('Source directory does not exist:', srcDir);
        process.exit(1);
    }
} catch (err) {
    console.error('Error copying assets:', err);
    process.exit(1);
}
