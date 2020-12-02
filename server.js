const express = require('express')
const server = express()
const { PORT } = require('./src/helpers/env')

server.listen(PORT, () => {
    console.log(`RUNNING ON PORT ${PORT}`)
})