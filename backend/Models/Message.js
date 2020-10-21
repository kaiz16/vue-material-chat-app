const mongoose = require('mongoose')
// Constructing the model of message schema.
const messages = mongoose.model('Message', 
    new mongoose.Schema(
        {
            userName: { type: String, required: true },
            text: { type: String, required: true }
        }, 
        {
            timestamps: true
        })
    )
// Exporting the message model.
module.exports = messages