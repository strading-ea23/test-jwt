const express = require("express"),
    router = express.Router();

const data = require('./data')
const { authFunc, authAdmin,createToken } = require('./auth')
const { log } = console

router.get('/', authFunc, authAdmin, async (req, res) => {
    try {
        res.send(data.persons)
    }
    catch (err) {
        res.status(err.code || 400).send(err.message || err)
    }
})


router.get('/:id', authFunc, authAdmin, async (req, res) => {
    try {
        let p = data.persons.find(p => p.id == req.params.id)
        res.send(p)
    }
    catch (err) {
        res.status(err.code || 400).send(err.message || err)
    }
})

const pass = 1212; // temp, from db


router.post('/login', async (req, res) => {
    try {
        let userDetails = req.body;
        log("from postman:", userDetails)
        let user = data.persons.find(p => p.username == userDetails.username)
        if (user && pass == userDetails.password) {
            let token = await createToken({ user: user.username, role: user.role })
            res.send(token)
        }
        else { res.sendStatus(401) }
    }
    catch (err) {
        res.status(400).send(err || err.message)
    }
})

// router.post('/verify', async (req, res) => {
//     try {
//         let token = req.headers.authorization.split("Bearer ")[1]
//         log("from postman:", token)
//         let dataFromToken = await auth.verifyToken(token)
//         res.send(dataFromToken)
//     }
//     catch (err) {
//         res.status(err.code || 400).send(err.message || err)
//     }
// })



module.exports = router;

