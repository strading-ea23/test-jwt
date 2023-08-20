const express = require("express"),
    router = express.Router();

    const data = require('./data')
    const auth = require('./auth')

    router.get('/', async (req, res) => {
        
        res.send(data.products)
    })



module.exports = router;