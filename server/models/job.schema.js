const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    owner: String,
    startTime: String,
    endTime: String,
    walker: {
        type: String,
        required: false
    },
    status: String
}, {collection: 'jobs'})