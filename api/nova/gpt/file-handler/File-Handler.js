const fs = require('fs');

function overwriteFile(originalFilePath, outputPath) {
    return new Promise(async (resolve, reject) => {
    fs.rename(originalFilePath, outputPath, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            reject(err);
        } else {
            console.log('File written successfully!');
            resolve();
        }
    });
});
}

function deleteFile(filePath) {
    return new Promise(async (resolve, reject) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            reject(err);
        } else {
            console.log('File deleted successfully!');
            resolve();
        }
    });
});
}

module.exports = { overwriteFile, deleteFile };