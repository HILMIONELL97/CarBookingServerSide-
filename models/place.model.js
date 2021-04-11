const mongoose = require('mongoose');

const { Schema } = mongoose;

const placeSchema = Schema({
    place_number: {
        type: Number,
        required: true,
    },
    is_free: {
        type: Boolean,
        required: true,
        default: true,
    },
});

module.exports = mongoose.model('Place', placeSchema);