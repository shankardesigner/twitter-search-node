const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.send('IF YOU ARE SEEING THIS THEN IT WORKS!!')
    } catch (error) {
        res.status(400).send({error})
    }
})

module.exports = router