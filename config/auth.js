const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = (req, res, next) => {
    let token = req.get('Authorization') || req.query.token || req.body.token
    if (token) {
        token = token.replace('Bearer ', '')
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                next(err)
            } else {
                req.user = decoded.user
                next()
            }
        })
    } else {
        next()
    }
}