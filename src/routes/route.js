const express = require('express')
const route = express.Router()
const { getAll, getByid, insert, update, delet } = require('../controllers/product')
const { getAllCategory, insertCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { register, getUsers, login } = require('../controllers/users')
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
    .patch('/category/update/:id', updateCategory)
    .delete('/category/delete/:id', deleteCategory)
    // USERS
    .post('/users/register', register)
    .get('/users/getall', getUsers)
    .post('/users/login', login)

module.exports = route