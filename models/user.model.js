const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuid } = require('uuid');

const userSchema = new mongoose.Schema({
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
        trim: true,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    // salt: {
    //     type: String
    // },
    cin: {
        type: String,
        lenght: 8
    },
    phone: {
        type: Number,
        trim: true
    },
    role: {
        type: String,
        enum: ['User', 'Owner'],
        default: 'User',
    },


}, { timestamps: true })


// userSchema.virtual('password')
//     .set(function(password) {
//         this._password = password;
//         this.salt = uuid();
//         this.hashed_password = this.cryptPassword(password)
//     })
//     .get(function() {
//         return this._password;
//     })

// userSchema.methods = {
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

module.exports = mongoose.model('User', userSchema);