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
        enum: ['None', 'Red', 'White', 'Rose', 'Sparkling'],
    },
    varietal: { 
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
    wines: [wineSchema],
})
const User = mongoose.model('User', userSchema)

module.exports = User