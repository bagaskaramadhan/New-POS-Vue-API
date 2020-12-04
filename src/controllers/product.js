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
    },
    getByid: (req, res) => {
        const id = req.params.id
        model.getByid(id)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    insert: (req, res) => {
        const body = req.body
        model.insert(body)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    update: (req, res) => {
        const id = req.params.id
        const body = req.body
        model.update(id, body)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    delet: (req, res) => {
        const id = req.params.id
        model.delet(id)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = controller