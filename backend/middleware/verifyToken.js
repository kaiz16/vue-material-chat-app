const jwt = require('jsonwebtoken')
// Defining the middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['auth-token']
    try {
        let decoded = jwt.verify(token, process.env.secretKey)
        req.token = decoded
        next()
    } catch (err) {
        res.status(401).json(err)
    }
}
module.exports = verifyToken
