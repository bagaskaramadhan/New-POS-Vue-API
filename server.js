const express = require('express')
const server = express()
const { PORT } = require('./src/helpers/env')
const router = require('./src/routes/route')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')


server.set('views', path.join(__dirname, 'src/verifyEmail'));
server.set('view engine', 'ejs');
server.use(cors())
server.use(express.static('./src/uploads'))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use('/', router)

server.listen(PORT, () => {
    console.log(`RUNNING ON PORT ${PORT}`)
})