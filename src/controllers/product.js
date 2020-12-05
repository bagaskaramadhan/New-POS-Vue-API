const model = require('../models/product')
const { Success, NOT, Failed } = require('../helpers/response')
const image = require('../helpers/upload')
const fs = require('fs')
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
                    body.image = !req.file ? 'default.png' : req.file.filename
                    model.insert(body)
                        .then((result) => {
                            Success(res, result, 'Success insert product')
                        })
                        .catch((err) => {
                            Failed(res, err, 'Internal server error')
                        })
                }
            }
        })
    },
    update: (req, res) => {
        image.single('image')(req, res, (err) => {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    Failed(res, [], 'File too large')
                } else {
                    console.log(err)
                }
            } else {
                const id = req.params.id
                const body = req.body
                model.getByid(id) //check to model where id already exist
                    .then((check) => {
                        const Oldimage = check[0].image
                        body.image = !req.file ? Oldimage : req.file.filename //jika tidak ada request file maka Oldimage
                        if (body.image !== Oldimage) { // jika ganti image maka masuk ke kondisi bawah
                            if (Oldimage !== 'default.png') { // jika imagenya lama bukan default
                                fs.unlink(`src/uploads/${Oldimage}`, (err) => {
                                    if (err) {
                                        Failed(res, err,)
                                    } else {
                                        model.update(id, body)
                                            .then((result) => { //gambar lama akan diganti dengan gambar baru tanpa menambah file
                                                Success(res, result, 'Success update data')
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    }
                                })
                            } else {
                                model.update(id, body)
                                    .then((result) => {
                                        Success(res, result, 'Success update data') // new Image
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                        } else {
                            model.update(id, body)
                                .then((result) => {
                                    Success(res, result, 'Success update data') //old Image
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    })
            }
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