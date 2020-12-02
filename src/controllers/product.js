const model = require('../models/product')

const controller = {
    getAll: (req, res) => {
        model.getAll()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = controller