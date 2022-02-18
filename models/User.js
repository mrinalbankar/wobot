const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter first name'],
        },

        lastName: {
            type: String,
            required: [true, 'Please enter last name'],
        },

        username: {
            type: String,
            required: [true, 'Please enter username'],
            unique: true,
        },

        password: {
            type: String,
            required: [true, 'Please enter user password'],
        },

        isAdmin: {
            type: Boolean,
            default: false
        }
    }
)

module.exports = mongoose.model('User', UserSchema)