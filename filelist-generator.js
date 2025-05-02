const fs = require('fs');
const path = require('path');

const rootFolder = path.join(__dirname, 'test/');
const outputFile = path.join(__dirname, 'file-list.json');

function getAllFiles(dirPath, fileList = [], basePath = dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (let entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const relativePath = path.relative(basePath, fullPath);

        if (entry.isDirectory()) {
            getAllFiles(fullPath, fileList, basePath);
        } else {
            fileList.push(relativePath.replace(/\\/g, '/')); // Normalize Windows paths
        }
    }

    return fileList;
}

// Get all files recursively and write to JSON
const files = getAllFiles(rootFolder);
fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
