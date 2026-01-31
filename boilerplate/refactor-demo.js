const fs = require('fs/promises');
const path = require('path');

const TARGET_DIR = path.join(__dirname, 'app');

async function refactorNames(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const oldPath = path.join(dir, entry.name);
        
        // 1. Recursive call for directories FIRST (bottom-up)
        if (entry.isDirectory()) {
            await refactorNames(oldPath);
        }

        // 2. Handle renaming after children are processed
        if (entry.name.startsWith('Demo')) {
            const newName = entry.name.replace(/^Demo/, '');
            const newPath = path.join(dir, newName);
            
            try {
                console.log(`Renaming: ${entry.name} -> ${newName}`);
                await fs.rename(oldPath, newPath);
            } catch (err) {
                if (err.code === 'EPERM') {
                    console.error(`EPERM Error: Path locked? Skipping ${entry.name}`);
                } else {
                    throw err;
                }
            }
        }
    }
}

console.log('--- Starting Brand Identity Refactor (Retry) ---');
refactorNames(TARGET_DIR)
    .then(() => console.log('--- Filename Refactor Complete ---'))
    .catch(err => console.error('Error:', err));