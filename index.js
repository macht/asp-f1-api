const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 5000
const db = require('./queries')

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/', (req, res) => res.json({ info: 'ASP-F1-API' }))
    .get('/circuits', db.getCircuits)
    .get('/circuits/:id', db.getCircuitById)
    .listen(PORT, () => console.log(`Listening on port ${ PORT }`))
