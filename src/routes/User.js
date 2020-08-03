const express = require('express')
const User = require('../model/User');
const generateAuthToken = require('../Auth/tokenGenerate');
const checkUser = require('../model/checkUser');

const router = express.Router()

router.post('/users/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const check = await checkUser(user.email);
        
        if(check) res.status(201).send({ "message": "Account already exists" });
        if(await user.save()) res.status(201).send({ "message": "Account created successfully" })
    } catch (error) {
        res.status(400).send({error})
    }
})

router.post('/users/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password);

        if (Object.keys(user).length <= 1) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await generateAuthToken(user._id);
        res.send({ user , token })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router