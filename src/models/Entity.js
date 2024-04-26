const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const entitySchema = new mongoose.Schema({
   numCliente:{
    type:Number,
    unique: true 
   },
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
   
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});
entitySchema.pre('save', async function(next) {
    if (!this.isNew) return next();

    try {
        const count = await this.constructor.countDocuments();
        this.numCliente = count + 1;
        next();
    } catch (error) {
        next(error);
    }
});
const Entity = mongoose.model('Entity', entitySchema);
module.exports = Entity;