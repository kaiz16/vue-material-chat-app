const mongoose = require('mongoose')
require('dotenv').config()
async function connectToMongoDB(){
    // Connecting to Mongo DB
    await mongoose.connect(process.env.MongoDB,
        // using new features from mongodb
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, },
        (err, db) => {
            if (err) return err
        }
    )
    await mongoose.connection.on('open', () => {
        console.log('Connected to MongoDB')
    })
}

module.exports = connectToMongoDB