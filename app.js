const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const userRoutes = require('./routes/user-routes')

app.use(bodyParser.json())

app.use('/api/user', userRoutes)

app.listen(5000)