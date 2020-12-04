const model = require('../models/product')
const { Success, NOT, Failed } = require('../helpers/response')
const image = require('../helpers/upload')
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

        image.single('image')(req, res, (err) => {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    Failed(res, [], 'File too large')
                } else {
                    console.log(err)
                }
            } else {
                const body = req.body
                if (!body.product_name || !body.product_category || !body.stock || !body.price) {
                    Failed(res, [], 'cannot empty')
                } else {
                    body.image = !req.file?'default.png':req.file.filename
                    console.log(body)
                }
            }
        })

        // image.single('image')(req, res, (err) => {
        //     const body = req.body
        //     body.image = !req.file ? 'default.png' : req.file.filename
        //     console.log(body)
        // })

        // if (!body.product_name || !body.product_category || !body.stock || !body.price) {
        //     Failed(res, [], 'cannot empty')
        // } else {
        //     model.insert(body)
        //     .then((result) => {
        //         Success(res, result, 'Success Insert Data')
        //     })
        //     .catch((err) => {
        //         Failed(res, [], err.message)
        //     })
        // }
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