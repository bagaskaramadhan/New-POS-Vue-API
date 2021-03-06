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
    },

    updateCategory: (id, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE category SET ? WHERE category_id = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },

    deleteCategory: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM category WHERE category_id = ?`, id, (err, result) => {
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