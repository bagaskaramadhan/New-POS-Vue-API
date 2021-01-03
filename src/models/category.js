const db = require('../configs/db')

const model = {
    getAllCategory: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM category`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    insertCategory: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO category (category_name) VALUES ('${data.category_name}')`
                , (err, result) => {
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