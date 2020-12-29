const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
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
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const Page = mongoose.model('Page', pageSchema)

module.exports = Page