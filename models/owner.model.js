const mongoose = require('mongoose');
const { Schema } = mongoose;



const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,


    },
    password: {
        type: String,
        required: true,
        minlenght: 6,
        maxlenght: 1024,

    },
    cin: {
        type: String,
        lenght: 8
    },
    phone: {
        type: Number,
        trim: true
    },
    rib: {
        type: Number,
        required: true,
        length: 8
    },
    date: {
        type: Date,
        default: Date.now,
    },

    role: {
        type: String,
        enum: ['User', 'Owner'],
        default: 'Owner',
    },
});


module.exports = mongoose.model('Owner', userSchema);