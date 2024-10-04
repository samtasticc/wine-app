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
        enum: ['Make a selection', 'Red', 'White', 'Rosé', 'Sparkling'],
        // required: true
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