const { closeSync, openSync, readdirSync, watch, writeSync } = require('fs');
const {camelCase} = require('camel-case');

watch('./read', () => {
    const indexFd = openSync('./index.js', 'w');

    const files = readdirSync('./read');

    files.map(f => {
        const name = f.replace('.js', '');
        console.log(`Adding a file: ${name}`);
        writeSync(indexFd,

            `module.exports.${camelCase(name)} = require('./read/${name}').read;\n`);
    })

    closeSync(indexFd);
});