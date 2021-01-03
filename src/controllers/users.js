const model = require('../models/users')
const { Failed, Success } = require('../helpers/response')
const bcrypt = require('bcrypt')

const controller = {
    register: (req, res) => {
        const dataBody = req.body
        if (!dataBody.username || !dataBody.fullname || !dataBody.email || !dataBody.password) {
            Failed(res, [], 'cannot empty!')
        } else {
            const data = {
                fullname: dataBody.fullname,
                email: dataBody.email.toLowerCase(),
                username: dataBody.username.toLowerCase(),
                password: bcrypt.hashSync(dataBody.password, 10)
            }
            model.register(data)
                .then((result) => {
                    Success(res, result, 'Register success')
                })
                .catch((err) => {
                    Failed(res, [], err.message)
                })
        }
    },
    userCheck: (req, res) => {
        const data = req.body
        model.userCheck(data)
            .then((result) => {
                Success(res, result, 'Success get data')
            })
            .catch((err) => {
                Failed(res, [], err.message)
            })
    }
}

module.exports = controller