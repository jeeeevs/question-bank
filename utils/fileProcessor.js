const fs = require('fs');

function getDataFromFile(fileName) {
    return JSON.parse(fs.readFileSync(fileName, 'utf8'));
}

module.exports = {
    getDataFromFile,
};
