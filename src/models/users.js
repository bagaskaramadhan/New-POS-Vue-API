const db = require('../configs/db')

const model = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (fullname, username, email, password, token)
            VALUES ('${data.fullname}', '${data.username}', '${data.email}', '${data.password}', '${data.token}')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    userCheck: (email, username) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email = '${email}' OR username = '${username}'`, (err, result) => {
                err ? reject(new Error(err)) : resolve(result)
            })
        })
    },

    getUsers: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = model