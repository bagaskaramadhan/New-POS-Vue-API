const { json } = require('body-parser')
const model = require('../models/category')
const { Success, Failed } = require('../helpers/response')
const controller = {
    getAllCategory: (req, res) => {
        model.getAllCategory()
            .then((result) => {
                Success(res, result, 'Success get all Category')
            })
            .catch((err) => {
                Failed(res, [], err.message)
            })
    }
}

module.exports = controller