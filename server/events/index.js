const fs = require('fs');
const path = require('path');

const eventsPath = path.resolve(__dirname);

fs.readdir(eventsPath, (err, files) => {
    if (err) {
        process.exit(1);
    }
    
    files.map((fileName) => {
        if (fileName !== 'index.js') {
            const name = fileName.replace('.js', '');
            module.exports[name] = require(path.resolve(__dirname, fileName));
        }
    })
})