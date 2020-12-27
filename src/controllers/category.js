const { json } = require('body-parser')
const model = require('../models/category')

const controller = {
    getAllCategory: (req, res) => {
        model.getAllCategory()
            .then((result) => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = controller