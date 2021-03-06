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
    },

    insertCategory: (req, res) => {
        const data = req.body
        if (!data.category_name) {
            Failed(res, [], 'Cannot empty!')
        } else {
            model.insertCategory(data)
                .then((result) => {
                    Success(res, result, 'Success insert category')
                })
                .catch((err) => {
                    Failed(res, [], err.message)
                })
        }
    },

    updateCategory: (req, res) => {
        const id = req.params.id
        const data = req.body
        if (!data.category_name) {
            Failed(res, [], 'Cannot empty')
        } else {
            model.updateCategory(id, data)
                .then((result) => {
                    Success(res, result, 'Success update category')
                })
                .catch((err) => {
                    Failed(res, [], err.message)
                })
        }
    },

    deleteCategory: (req, res) => {
        const id = req.params.id
        model.deleteCategory(id)
            .then((result) => {
                Success(res, result, 'Success delete category')
            })
            .catch((err) => {
                Failed(res, [], err.message)
            })
    }
}

module.exports = controller