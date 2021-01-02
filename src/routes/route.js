const express = require('express')
const route = express.Router()
const { getAll, getByid, insert, update, delet } = require('../controllers/product')
const { getAllCategory } = require('../controllers/category')

route
    // PRODUCT
    .get('/books/getAll', getAll)
    .get('/books/getByid/:id', getByid)
    .post('/books/insert', insert)
    .put('/books/update/:id', update)
    .delete('/books/delete/:id', delet)
    // CATEGORY
    .get('/category/getAll', getAllCategory)

module.exports = route