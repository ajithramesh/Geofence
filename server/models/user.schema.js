const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: {
        type: String,
        required: false
    },
    userType: {
        type: String,
        enum: ["Admin", "Walker", "Owner"],
        default: "User"
    }
}, {collection: 'users'})