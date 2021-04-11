const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { v1: uuid } = require('uuid');


const ownerSchema = new Schema({
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
        maxlength: 50,
        trim: true,
        unique: true

    },
    hashed_password: {
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
    rip: {
        type: Number,
        required: true,
        length: 10
    },
    salt: {
        type: String
    },

    role: {
        type: String,
        enum: ['User', 'Owner'],
        default: 'Owner',
    },
}, { timestamps: true });


// ownerSchema.virtual('password')
//     .set(function(password) {
//         this._password = password;
//         this.salt = uuid();
//         this.hashed_password = this.cryptPassword(password)
//     })
//     .get(function() {
//         return this._password;
//     })

// ownerSchema.methods = {
//     authenticate: function(plainText) {
//         return this.cryptPassword(plainText) === this.hashed_password;
//     },
//     cryptPassword: function(password) {
//         if (!password) return '';

//         try {

//             return crypto
//                 .createHmac('sha1', this.salt)
//                 .update(password)
//                 .digest('hex');

//         } catch (error) {
//             return ''
//         }
//     }
// }

module.exports = mongoose.model('Owner', ownerSchema);