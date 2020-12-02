require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    USER: process.env.DBUSER,
    HOST: process.env.DBHOST,
    PASS: process.env.DBPASS,
    NAME: process.env.DBNAME
}