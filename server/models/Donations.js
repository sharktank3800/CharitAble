const {Schema, model} =  require('mongoose')
const Category = require('./Category')


const donationSchema =  new Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    name:{
        type: String,
        required: true
    },

    Amount:{
        type: Number,
        required: true,
        price: {
            min: 0.99
        }
    },
    category:[{
        type: Schema.Types.Mixed,
        Category
    }],

    Date: {
        type: Date,
        default: Date.now
    },

    Description: {
        type: String
    },

    image: {
        type: String
    }
})

const Donations = model('Donations', donationSchema)
module.exports = Donations;

