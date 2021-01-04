const db = require('../configs/db')

const model = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (fullname, username, email, password)
            VALUES ('${data.fullname}', '${data.username}', '${data.email}', '${data.password}')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    userCheck: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * from users where email = '${email}'`, (err, result) => {
                err ? reject(new Error(err)) : resolve(result)
            })
        })
    }
}

module.exports = model