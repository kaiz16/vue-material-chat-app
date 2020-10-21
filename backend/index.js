const connectToMongoDB = require('./dbConnection')
const startServer = require('./startServer')
try {
    connectToMongoDB().then(() => startServer())
} catch (error) {
    console.error('Cannot start server ' + error)
}