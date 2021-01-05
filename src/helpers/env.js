require('dotenv').config()

module.exports = {
    PORT: process.env.PORTO,
    USER: process.env.DBUSER,
    HOST: process.env.DBHOST,
    PASS: process.env.DBPASS,
    NAME: process.env.DBNAME,
    USEREMAIL: process.env.USEREMAIL,
    USERPASS: process.env.USERPASS,
    HOSTURL: process.env.HOSTURL,
    SCRT: process.env.SECRET
}