const mongoose = require('mongoose')
// Constructing the model of user schema.
const users = mongoose.model('User', 
    new mongoose.Schema({
        userName: { type: String, required: true, unique: true }
    })
)
// Exporting the user model.
module.exports = users