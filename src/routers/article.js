const express = require('express')
const Article = require('../models/article')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/articles', auth, async (req, res) => {
    const article = new Article({...req.body})

    try {
        await article.save()
        res.status(201).send(article)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/articles', async (req, res)=>{
    try {
        const articles = await Article.find()
        res.send(articles)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/articles/:id', async (req, res)=>{
    const _id = req.params.id

    try {
        const article = await Article.findOne({_id})

        if (!article) {
            return res.status(404).send()
        }
        res.send(article)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/articles/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'code', 'title', 'description']
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const article = await Article.findOne({_id: req.params.id})

        if (!article) {
            return res.status(404).send()
        }

        updates.forEach((update) => article[update] = req.body[update])

        await article.save()

        res.send(article)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/articles/:id', auth, async (req, res)=>{
    try {
        const article = await Article.findOneAndDelete({_id: req.params.id})

        if (!article) {
            return res.status(404).send()
        }

        res.send(article)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router