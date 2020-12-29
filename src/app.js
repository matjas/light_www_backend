const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const pageRouter = require('./routers/page')
const articleRouter = require('./routers/article')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(pageRouter)
app.use(articleRouter)

module.exports = app