const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()

// router.get('/', function (req, res) {
//     try{
//         res.render('index', {
//             title: 'Login',
//             form_name: 'Sign in'
//         })
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

// router.get('/dashboard', auth, function (req, res) {
//     try{
//         res.render('dashboard', {
//             title: 'Dashboard',
//             username: req.user.name,
//             partial: 'main'
//         })
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
//
// router.get('/dashboard/users', auth, function (req, res) {
//     try{
//         res.render('dashboard', {
//             title: 'Dashboard',
//             username: req.user.name,
//             partial: 'users'
//         })
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
//
// router.get('/dashboard/pages', auth, function (req, res) {
//     try{
//         res.render('dashboard', {
//             title: 'Dashboard',
//             username: req.user.name,
//             partial: 'pages'
//         })
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
//
// router.get('/dashboard/articles', auth, function (req, res) {
//     try{
//         res.render('dashboard', {
//             title: 'Dashboard',
//             username: req.user.name,
//             partial: 'articles'
//         })
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
//
// router.get('/dashboard/profile', auth, function (req, res) {
//     try{
//         res.render('dashboard', {
//             title: 'Dashboard',
//             username: req.user.name,
//             partial: 'profile'
//         })
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
//
// router.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         errorMessage: 'Page not found.'
//     })
// })

module.exports = router