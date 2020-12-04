const db = require('../configs/db')

const model = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getByid: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE product_id = ?`, id, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO product (product_name, product_category, stock, price)
            VALUES ('${data.product_name}','${data.product_category}','${data.stock}','${data.price}')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    update: (id, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE product SET ? WHERE product_id = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    delet: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM product WHERE product_id = ?`, id, (err, result) => {
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