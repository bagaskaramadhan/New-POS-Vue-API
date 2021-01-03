const db = require('../configs/db')

const model = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users SET ?`, data, (err, result) => {
                err ? reject(new Error(err)) : resolve(result)
            })
        })
    }
}

module.exports = model