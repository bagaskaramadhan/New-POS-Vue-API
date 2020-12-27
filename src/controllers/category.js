const { json } = require('body-parser')
const model = require('../models/category')
const { Success, NOT, Failed } = require('../helpers/response')
const controller = {
    getAllCategory: (req, res) => {
        model.getAllCategory()
            .then((result) => {
                Success(res, result, 'Success get All category')
            })
            .catch((err) => {
                Failed(res, [], err.message)
            })
    }
}

module.exports = controller