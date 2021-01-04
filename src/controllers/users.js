const model = require('../models/users')
const { Failed, Success } = require('../helpers/response')
const bcrypt = require('bcrypt')

const controller = {
    register: (req, res) => {
        const body = req.body
        if (!body.fullname || !body.username || !body.email || !body.password) {
            Failed(res, [], 'Name, email or password is required!')
        } else {
            const salt = bcrypt.genSaltSync(10)
            const data = {
                fullname: body.fullname,
                email: body.email.toLowerCase(),
                username: body.username.toLowerCase(),
                password: bcrypt.hashSync(body.password, salt)
            }
            //   jwt.sign({ data: data.email }, JWTREGISTER, (err, response) => {
            // if (err) {
            //   Failed(res, [], err.message)
            //   console.log(err.message)
            // } else {
            model.userCheck(data.email, data.username)
                .then((result) => {
                    if (result.length === 0) {
                        const sendData = {
                            fullname: data.fullname,
                            email: data.email,
                            username: data.username,
                            password: data.password,
                            //   token: response
                        }
                        if (sendData.username.length > 20) {
                            Failed(res, [], 'Username must be 5-20 characters')
                        } else {
                            model.register(sendData)
                                .then((results) => {
                                    // sendMail(sendData.email, sendData.token)
                                    Success(res, results, 'Register success!')
                                })
                                .catch((err) => {
                                    Failed(res, [], err.message)
                                })
                        }

                    } else {
                        Failed(res, [], 'Email or username has been taken')
                    }
                })
                .catch((err) => {
                    Failed(res, [], err.message)
                })
        }
        //   });
        // }
    },

    getUsers: (req, res) => {
        model.getUsers()
            .then((result) => {
                Success(res, result, 'All user')
            })
            .catch((err) => {
                Failed(res, [], err.message)
            })
    }
}

module.exports = controller