const express = require('express')
const route = express.Router()
const controller = require('../controllers/product')

route
.get('/books/getAll', controller.getAll)

module.exports = route