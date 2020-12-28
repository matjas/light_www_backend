const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send({user})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.name, req.body.password)

        res.send({user})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', async (req, res)=> {

})

router.delete('/users/me', async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.body._id)

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router