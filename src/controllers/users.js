const model = require('../models/users')
const { Failed, Success } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SCRT } = require('../helpers/env')
const sendMail = require('../helpers/mail')


const controller = {
    register: (req, res) => {
        const body = req.body
        if (!body.fullname || !body.username || !body.email || !body.password) {
            Failed(res, [], 'cannot empty')
        } else {
            const salt = bcrypt.genSaltSync(10)
            const data = {
                fullname: body.fullname,
                email: body.email.toLowerCase(),
                username: body.username.toLowerCase(),
                password: bcrypt.hashSync(body.password, salt)
            }
            jwt.sign({ email: data.email, username: data.username }, SCRT, (err, response) => {
                if (err) {
                    Failed(res, [], err.message)
                } else {
                    model.userCheck(data.email, data.username)
                        .then((result) => {
                            if (result.length === 0) {
                                const sendData = {
                                    fullname: data.fullname,
                                    email: data.email,
                                    username: data.username,
                                    password: data.password,
                                    token: response
                                }
                                if (sendData.username.length > 20 || sendData.username.length < 5) {
                                    Failed(res, [], 'Username must be 5-20 characters')
                                } else {
                                    model.register(sendData)
                                        .then((results) => {
                                            sendMail(sendData.email, sendData.token)
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
            })
        }
    },

    login: (req, res) => {
        const data = req.body
        const user = {
            username: data.username.toLowerCase(),
            password: data.password
        }
        model.login(user)
            .then((result) => {
                const results = result[0]
                if (!results) {
                    Failed(res, [], 'username not registered')
                } else {
                    const password = results.password
                    const isMatch = bcrypt.compareSync(data.password, password)
                    if (!isMatch) {
                        Failed(res, [], 'wrong password')
                    } else if (results.is_active === 0) {
                        Failed(res, [], 'activation first')
                    } else {
                        Success(res, results, 'Login success')
                    }
                }
            })
    },

    verify: (req, res) => {
        const token = req.params.token
        jwt.verify(token, SCRT, (err, decode) => {
            if (err) {
                Failed(res, [], 'Failed Auth!')
            } else {
                const data = jwt.decode(token)
                const email = data.email
                model.activation(email)
                    .then(() => {
                        res.render('index', { email })
                    }).catch(err => {
                        Failed(res, [], err.message)
                    })
            }
        })
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