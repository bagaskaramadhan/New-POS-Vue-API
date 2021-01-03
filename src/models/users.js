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
    }
}

module.exports = model