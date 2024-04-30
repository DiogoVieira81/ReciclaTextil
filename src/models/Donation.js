const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  
    numberOfParts:{
type:Number,
required:true,
min: 1,
max: 1000,
validate: {
    validator: function (value) {
        return Number.isFinite(value) && value >= 1 && value <= 1000;
    },
    message: props => `${props.value} is not a valid value for number of parts! Donation must be afnumber between 1 and 1000.`
}

    },
condition:{
    type: String,
    enum: ['desgastada', 'semi-nova', 'nova'],
    maxlength: 200,
    lowercase: true,
    required: true
},
    kg: {
        type: Number,
        required: true,
        min: 1,
        max: 1000,
        validate: {
            validator: function (value) {
                return Number.isFinite(value) && value >= 1 && value <= 1000;
            },
            message: props => `${props.value} is not a valid value for donation! Donation must be a number between 1 and 1000.`
        }
    },
    points: {
        type: Number,
        required: true
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
