const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  
    numberOfParts:{
tyepe:Number,
require:true
    },
condition:{
    type: String,
    maxlength: 200
},
    kg: {
        type: Number,
        required: true,
        min: 1,
        max: 1000,
        validate: {
            validator: function (value) {
                return Number.isFinite(value) && !Number.isInteger(value);
            },
            message: props => `${props.value} is not a valid value for donation! Donation must be a float number between 1 and 1000.`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor'
    },
    entity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entity'
    }
});


const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
