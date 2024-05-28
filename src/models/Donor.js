const mongoose = require('mongoose');
const path=require('path')
const coverImageBasePath = 'uploads/companyLogos';


const donorSchema = new mongoose.Schema({
    name: {
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
    password:{
        type: String
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
    points: {
        type: Number,
        default: 0,
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: props => `${props.value} is not a valid value for points! Points cannot be negative.`
        }
    },
    totalDonations:{
    type: Number,
    default: 0,
},
ImageName:{
    type:String
},
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

donorSchema.virtual('coverImagePath').get(function () {
    if (this.ImageName != null) {
        return path.join('/', coverImageBasePath, this.ImageName);
    }
});

const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor;
module.exports.coverImageBasePath = coverImageBasePath