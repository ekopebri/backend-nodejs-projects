const EventEmitter = require('events');

class DataMonitor extends EventEmitter {
    logLevel = 'DEV';
}

let dataMonitor = new DataMonitor();

dataMonitor.on('data', () => {
    console.log("eko");
})

module.exports = dataMonitor;