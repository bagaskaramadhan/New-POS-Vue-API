const express = require('express')
const route = express.Router()
const controller = require('../controllers/product')

route
    .get('/books/getAll', controller.getAll)
    .get('/books/getByid/:id', controller.getByid)
    .post('/books/insert', controller.insert)
    .patch('/books/update/:id', controller.update)

module.exports = route