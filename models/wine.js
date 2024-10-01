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

const Wine = mongoose.model('Wine', wineSchema)

module.exports = Wine