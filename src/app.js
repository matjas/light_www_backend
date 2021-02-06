const express = require('express')
require('./db/mongoose')
const admin = require('./admin')
const articleRouter = require('./routers/article')
const userRouter = require('./routers/user')
const pageRouter = require('./routers/page')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(pageRouter)
app.use(articleRouter)

app.use('/admin', admin)


module.exports = app