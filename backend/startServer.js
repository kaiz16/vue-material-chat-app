const express = require('express')
const cors = require('cors')
require('dotenv').config()
function startServer(){
    // Instantiating the app
    const app = express()

    // Express middleware
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    // Import your router in here and use them in your express app.
    app.use('/api/users', require('./routes/routesUser'))
    app.use('/api/messages', require('./routes/routesMessage'))
    
    const port = process.env.PORT || 5000
    // If the port.env exist will use that else use 5000
    const server = app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })


    // // To deploy our app to Heroku
    // if (process.env.NODE_ENV === "production") {
    //     // serving the staic public folder
    //     app.use(express.static(__dirname + '/public'))
    //     // Handling the routes in a sinlgle page application
    //     app.get('/.*/', (req, res) => {
    //         res.sendFile(__dirname + 'public/index.html')
    //     })
    // }
    // Using sokcet.io to acheive real time data trafic. 
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        }
    })
    // on means listen to.
    // so this means on every connection to our server
    io.on('connection', socket => {
        console.log('user connection')
        io.emit('connected'); 
        socket.on('newMessage', (newMessage) => {
            console.log('a message has been sent')
            io.emit('incomingNewMessage', newMessage)
        })
        // socket.on('deleteMessage', (_id) => {
        //     socket.broadcast.emit('messageDeleted', _id)
        // })
        // once connection is made you can listen or emit events
        // To listen to an event from frontend use socket.on()
        // To emit and event use socket.emit()
    })
}

module.exports = startServer