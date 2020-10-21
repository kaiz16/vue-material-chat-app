const router = require('express').Router()
const Schema = require('../Models')

// Getting all the users
router.get('/', (req, res) => {
    Schema.users.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err))
})
// Get a user by user userName when login
router.get('/:userName', (req, res) => {
    Schema.users.findOne({ userName: req.params.userName })
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))
})
// Creating a user
router.post('/create', async (req, res) => {
    // Checks if the user exist
    const isExist = await Schema.users.findOne({ userName: req.body.userName })
    // If yes then we throw an error.
    if (isExist) return res.status(400).json('User Already Exist!!')
    // If not exist then we create a new user
    const newUser = new Schema.users({
        userName: req.body.userName,
    })
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))
})
// Deleting a user 
router.delete('/delete/:id', (req, res) => {
    Schema.users.findByIdAndDelete(req.params.id)
        .then(({ userName }) => res.json(`${userName} is Deleted`))
        .catch(err => res.status(400).json(err))
})

// Delete all users
router.delete('/', (req, res) => {
    Schema.users.deleteMany().then(() => {
        res.send(200)
    }).catch( () => {
        res.send(404)
    })
})
module.exports = router
