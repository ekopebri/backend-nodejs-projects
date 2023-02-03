let crypto = require('crypto');

function getRandomId() {
    return crypto.randomUUID().replaceAll('-', '');
}

module.exports = {
    getRandomId
};