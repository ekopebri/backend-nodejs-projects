const { convertCsv } = require('../csv.parse');
const fs = require('fs');

module.exports.read = () => {
    let totalSize = 0;
    fs.stat('./data/app.log', (err, {size}) => totalSize = size);

    fs.open('./data/app.log', function (err, fd) {
        let buffer = Buffer.alloc(200);

        for (let i = 0; i <= totalSize / buffer.length; i++) {
            fs.read(fd, buffer, 0, buffer.length, i * buffer.length, function (err, count, buff) {
                // console.table(convertCsv(buffer.toString()));
                console.log(buff.toString())
            });
        }
    });
}