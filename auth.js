const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

async function createToken(data) {
    return jwt.sign(data, SECRET, { expiresIn: "1h" })
}

async function verifyToken(token) {
    return jwt.verify(token, SECRET)
}

async function refreshToken() {

}

async function authFunc(req, res, next) {
    try {
        let token = req.headers.authorization.split("Bearer ")[1]
        let data = await verifyToken(token)

        req.user = data

        next()
    }
    catch {
        res.status(401).send("You are not authorized")
    }
}

async function authAdmin(req, res, next) {

    try {
        if (!req.user || req.user.role != "admin") throw {}
        next()
    }
    catch {
        res.status(401).send("You are not authorized")
    }
}

module.exports = {authFunc,authAdmin, createToken, verifyToken }