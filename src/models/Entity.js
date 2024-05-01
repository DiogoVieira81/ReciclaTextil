const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
     
    },
    taxpayerNumber:{
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Email validation regex pattern
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
          },
    city:{
        type: String,
        required: true,
    },
    district:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: 200
    },
    kg: {
        type: Number,
        default: 0,
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: props => `${props.value} is not a valid value for points! Points cannot be negative.`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

const Entity = mongoose.model('Entity', entitySchema);
module.exports = Entity;