const express = require('express')
const { signup, login, logout } = require('../controllers/user.controller')
const user = express.Router()

user.post('/user/signup', signup)

user.post('/user/login', login)

user.post('/user/logout', logout)

module.exports = user