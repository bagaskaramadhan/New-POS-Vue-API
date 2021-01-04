const model = require('../models/users')
const { Failed, Success } = require('../helpers/response')
const bcrypt = require('bcrypt')

const controller = {
    register: (req, res) => {
        const body = req.body
        if (!body.fullname || !body.username || !body.email || !body.password) {
            Failed(res, [], 'Name, email or password is required!')
        } else {
            const fullname = body.fullname
            const nameSplit = fullname.split(' ')
            const data = {
                fullname: body.fullname,
                email: body.email.toLowerCase(),
                username: nameSplit.join(' '),
                password: bcrypt.hashSync(body.password, 10)
            }
            //   jwt.sign({ data: data.email }, JWTREGISTER, (err, response) => {
            // if (err) {
            //   Failed(res, [], err.message)
            //   console.log(err.message)
            // } else {
            model.userCheck(data.email)
                .then((result) => {
                    if (result.length === 0) {
                        const sendData = {
                            fullname: data.fullname,
                            email: data.email,
                            username: data.username,
                            password: data.password,
                            //   token: response
                        }
                        model.register(sendData)
                            .then((results) => {
                                // sendMail(sendData.email, sendData.token)
                                success(res, results, 'Register success!')
                            })
                            .catch((err) => {
                                Failed(res, [], err.message)
                            })
                    } else {
                        Failed(res, [], 'Email is already registered!')
                    }
                })
                .catch((err) => {
                    Failed(res, [], err.message)
                })
        }
        //   });
        // }
    }
}

module.exports = controller