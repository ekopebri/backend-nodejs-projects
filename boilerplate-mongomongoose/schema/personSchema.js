let mongoose = require('mongoose')
let validator = require('validator')

let personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    favoriteFoods: {
        type: Array
    }
})

module.exports = mongoose.model('Person', personSchema);