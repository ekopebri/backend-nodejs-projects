const { convertCsv } = require('./csv.parse');
const { open, read } = require('fs');

open('./data/pulitzer-circulation-data.csv', function (err, fd) {
    let buffer = Buffer.alloc(200);
    read(fd, buffer, 0, buffer.length, 0, function (err, count, buffer) {
       console.table(convertCsv(buffer.toString()));
    });
});