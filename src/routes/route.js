const express = require('express')
const route = express.Router()
const { getAll, getByid, insert, update, delet } = require('../controllers/product')
const { getAllCategory, insertCategory } = require('../controllers/category')

route
    // PRODUCT
    .get('/product/getAll', getAll)
    .get('/product/getByid/:id', getByid)
    .post('/product/insert', insert)
    .patch('/product/update/:id', update)
    .delete('/product/delete/:id', delet)
    // CATEGORY
    .get('/category/getAll', getAllCategory)
    .post('/category/insert', insertCategory)

module.exports = route