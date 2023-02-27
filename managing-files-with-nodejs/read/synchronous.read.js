const { convertCsv } = require('../csv.parse');
const { readFileSync } = require('fs');

module.exports.read = () => {

    try {
        const data = readFileSync('./data/pulitzer-circulation-data.csv', 'utf8');

        const vals = convertCsv(data);

        console.table(vals);
    } catch (err) {
        console.log(`There was a problem with the file ${err}`);
    }
}