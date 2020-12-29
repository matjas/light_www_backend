const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const pageRouter = require('./routers/page')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(pageRouter)

module.exports = app