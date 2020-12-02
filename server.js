const express = require('express')
const server = express()
const { PORT } = require('./src/helpers/env')
const router = require('./src/routes/route')
server.use('/', router)

server.listen(PORT, () => {
    console.log(`RUNNING ON PORT ${PORT}`)
})