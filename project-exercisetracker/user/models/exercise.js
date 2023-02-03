const {getRandomId} = require("../util");

function Exercise(user, description, duration, date) {
    this._id = getRandomId();
    this._user = user;
    this._description = description;
    this._duration = parseInt(duration);
    this._date = date ? new Date(date).toDateString() : new Date().toDateString();
}

module.exports = Exercise;