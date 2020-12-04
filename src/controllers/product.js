const model = require('../models/product')
const { Success, NOT, Failed } = require('../helpers/response')

const controller = {
    getAll: (req, res) => {
        model.getAll()
            .then((result) => {
                Success(res, result, 'Success Get All')
            })
            .catch((err) => {
                Failed(res, [], err.message)
            })
    },
    getByid: (req, res) => {
        const id = req.params.id
        model.getByid(id)
            .then((result) => {
                const checkID = result[0]
                if (checkID) {
                    Success(res, result, 'Success Get Data By ID')
                } else {
                    NOT(res, [], 'Data Not Found')
                }
            })
            .catch((err) => {
                Failed(res, [], err.message)
            })
    },
    insert: (req, res) => {
        const body = req.body
        model.insert(body)
            .then((result) => {
                Success(res, result, 'Success Insert Data')
            })
            .catch((err) => {
                Failed(res, [], err.message)
            })
    },
    update: (req, res) => {
        const id = req.params.id
        const body = req.body
        model.update(id, body)
            .then((result) => {
                Success(res, result, 'Success Update Data')
            })
            .catch((err) => {
                Failed(res, [], err.message)
            })
    },
    delet: (req, res) => {
        const id = req.params.id
        model.delet(id)
            .then((result) => {
                Success(res, result, 'Success Delete Data')
            })
            .catch((err) => {
                Failed(res, [], err.message)
            })
    }
}

module.exports = controller