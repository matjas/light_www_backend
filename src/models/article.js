const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        transform: v => v.toLowerCase()
    },
    code: {
        type: String,
        required: true,
        trim: true,
        transform: v => v.toLowerCase()
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article