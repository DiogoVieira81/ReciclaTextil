const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');



const adminShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Email validation regex pattern
                const emailRegex = /^[^\s@]+@recicla\.com$/;
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('admin', adminShema);