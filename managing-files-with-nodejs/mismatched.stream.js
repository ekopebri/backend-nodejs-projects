const { createWriteStream, createReadStream } = require('fs');

const stream = createReadStream('./data/stream.log',
    {
        encoding: 'utf8'
    });

const writer = createWriteStream('./data/stream.output.log');


stream.pipe(writer);
// let iteration = 0;
//
// stream.on('data', data => {
//     console.log(++iteration);
//
//     writeData(data);
// });
//
// const writeData = (data) => {
//
//     setTimeout(() => {
//         writer.write(data);
//     }, 60000);
// }