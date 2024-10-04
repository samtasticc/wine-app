const mongoose = require('mongoose')

const wineSchema = new mongoose.Schema({
    country: { // text input
        type: String,
    },
    brand: { // text input
        type: String,
        required: true
    },
    type: { // use a <select> dropdown
        type: String,
        enum: ['Red', 'White', 'Rosé', 'Sparkling'],
        required: true
    },
    subType: { // text input
        type: String,
        required: true
    },
    abv: { // number input, but if doesn't work, switch to text
        type: Number,
    },
    review: { // use <textarea>
        type: String,
    }
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    wines: [wineSchema]
})
const User = mongoose.model('User', userSchema)

module.exports = User