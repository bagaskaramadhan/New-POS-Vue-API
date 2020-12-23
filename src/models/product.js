const db = require('../configs/db')

const model = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT 
            product.product_id, product.product_name, category.category_name, product.stock, product.price, product.image
            FROM product INNER JOIN category
            ON category.category_id = product.product_category`, (err, result) => {
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
            db.query(`SELECT 
            product.product_id, product.product_name, category.category_name, product.stock, product.price, product.image
            FROM product INNER JOIN category
            ON category.category_id = product.product_category
            WHERE product_id = ?`, id, (err, result) => {
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
            db.query(`INSERT INTO product (product_name, product_category, stock, price, image)
            VALUES ('${data.product_name}','${data.product_category}','${data.stock}','${data.price}', '${data.image}')`, (err, result) => {
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