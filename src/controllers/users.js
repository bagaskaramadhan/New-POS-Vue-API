const model = require('../models/users')
const { Failed, Success } = require('../helpers/response')

const controller = {
    register: (req, res) => {
        const data = req.body
        // if (!data.fullname || !data.username || !data.email || !data.password) {
        //     Failed(res, [], 'cannot empty!')
        // } else {
            model.register(data)
                .then((result) => {
                    Success(res, result, 'Success register')
                })
                .catch((err) => {
                    Failed(res, [], err.message)
                })
        // }
    }
}

module.exports = controller