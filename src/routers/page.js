const express = require('express')
const Page = require('../models/page')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/pages', auth, async (req, res) => {
    const page = new Page({...req.body})

    try {
        await page.save()
        res.status(201).send(page)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/pages', async (req, res)=>{
    try {
        const pages = await Page.find()
        res.send(pages)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/pages/:id', async (req, res)=>{
    const _id = req.params.id

    try {
        const page = await Page.findOne({_id})

        if (!page) {
            return res.status(404).send()
        }
        res.send(page)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/pages/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'code', 'description']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const page = await Page.findOne({_id: req.params.id})

        if (!page) {
            return res.status(404).send()
        }

        updates.forEach((update) => page[update] = req.body[update])

        await page.save()

        res.send(page)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/pages/:id', auth, async (req, res)=>{
    try {
        const page = await Page.findOneAndDelete({_id: req.params.id})

        if (!page) {
            return res.status(404).send()
        }

        res.send(page)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router