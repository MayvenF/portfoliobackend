const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    _id: {
        required: true,
        type: Number
    },
    title: {
        required: true,
        type: String
    },
    image: {
        required: false,
        type: String
    },
    dateCreated: {
        required: true,
        type: Date
    },
    blog: {
        required: false,
        type: String
    }
},
{
    collection: 'blogs'
})


module.exports = mongoose.model('Blog', blogSchema)