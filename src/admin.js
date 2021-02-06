const express = require('express')
const path = require('path')
const hbs = require('hbs')
const adminRouter = require('./routers/admin')

//Paths for express config
const adminDirectoryPath = path.join(__dirname, '../admin')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const admin = express()

//Setup handlebars engine and views location
// admin.set('view engine', 'hbs')
// admin.set('views', viewsPath)
// hbs.registerPartials(partialsPath)
// hbs.registerHelper('whichPartial', (options) => options.data.root.partial)

//Setup static directory to serve
admin.use(express.static(adminDirectoryPath))

admin.on('mount', function (parent) {
    console.log('Admin Mounted')
    //console.log(parent) // refers to the parent app
})

admin.use(adminRouter);

module.exports = admin

