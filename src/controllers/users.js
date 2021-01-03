const model = require('../models/users')
const { Failed, Success } = require('../helpers/response')

const controller = {
    register: (req, res) => {
        const data = req.body
        data.fullname = data.username
        if (!data.username || !data.email || !data.password) {
            Failed(res, [], 'cannot empty!')
        } else {
            model.userCheck(data.email)
                .then((result) => {
                    if (result.length === 0) {
                        Failed(res, [], 'username/email has been taken')
                        console.log(result)
                    } else {
                        Success(res, result, 'OK')
                    }
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