const router = require('express').Router()
const Schema = require('../Models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verifyToken')
// Getting all the users
router.get('/', verifyToken, (req, res) => {
    Schema.users.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err))
})
// Get a user by user userName when login
router.post('/login', (req, res) => {
    Schema.users.findOne({ userName: req.body.userName })
        .then(user => {
            console.log(user)
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({ userName: user.userName }, process.env.secretKey, { expiresIn: '1h' }, (error, token) => {
                        if (error) return res.status(400).json('Token generation failed !!')
                        res.json({ userName: user.userName, token })
                    })
                }
                else return res.status(400).json('Invalid Credential')
            })
        })
        .catch(err => res.status(400).json(err))
})
// Creating a user
router.post('/create', async (req, res) => {
    // Checks if the user exist
    const isExist = await Schema.users.findOne({ userName: req.body.userName })
    // If yes then we throw an error.
    if (isExist) return res.status(400).json('User Already Exist!!')
    // If not exist then we create a new user
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            const newUser = new Schema.users({
                userName: req.body.userName,
                password: hash,
            })
            newUser.save()
                .then(user => {
                    jwt.sign({ userName: user.userName }, process.env.secretKey, { expiresIn: '1h' }, (error, token) => {
                        if (error) return res.status(400).json('Token generation failed !!')
                        res.json({ userName: user.userName, token })
                    })
                })
                .catch(err => res.status(400).json(err))
        })
    })



})
// Deleting a user 
router.delete('/delete/:id', verifyToken, (req, res) => {
    Schema.users.findByIdAndDelete(req.params.id)
        .then(({ userName }) => res.json(`${userName} is Deleted`))
        .catch(err => res.status(400).json(err))
})

// Delete all users
router.delete('/', (req, res) => {
    Schema.users.deleteMany().then(() => {
        res.send(200)
    }).catch(() => {
        res.send(404)
    })
})
module.exports = router
