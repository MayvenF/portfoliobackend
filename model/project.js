const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
    dateStarted: {
        required: true,
        type: Date
    },
    dateCompleted: {
        required: false,
        type: Date
    },
    desc: {
        required: true,
        type: String
    },
    github: {
        required: false,
        type: String
    }
})


module.exports = mongoose.model('projects', projectSchema)