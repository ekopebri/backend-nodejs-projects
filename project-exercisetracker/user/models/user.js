const {getRandomId} = require("../util");

function User(username) {
    this._username = username;
    this._id = getRandomId();
}

module.exports = User;