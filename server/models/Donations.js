const {Schema, model} =  require('mongoose')



const donationSchema =  new Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    name:{
        type: String,
        required: true
    },

    amount:{
        type: Number,
        required: true,
        price: {
            min: 0.99
        }
    },
    categories:[{
        type: String
        
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

