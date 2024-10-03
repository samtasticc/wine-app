const mongoose = require('mongoose')

const wineSchema = new mongoose.Schema({
    country: {
        type: String,
    },
    brand: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Red', 'White'],
        required: true
    },
    subType: {
        type: String,
        required: true
    },
    abv: {
        type: Number,
    },
    review: {
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