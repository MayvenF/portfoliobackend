const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    _id: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    dateContacted: {
        required: true,
        type: Date
    },
    message: {
        required: true,
        type: String
    },
    replied: {
        required: true,
        type: Boolean
    }
},
{
    collection: 'contacts'
})


module.exports = mongoose.model('Contact', contactSchema)