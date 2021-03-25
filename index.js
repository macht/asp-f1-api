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
    .get('/circuits/hot', db.getCircuitsHot)
    .get('/circuits/season/:year', db.getCircuitsBySeason)
    .get('/circuits/:id', db.getCircuitById)
    .get('/circuits/:id/fastest', db.getCircuitFastest)
    .get('/circuits/:cid/fastest/drivers/:did', db.getCircuitFastestByDriver)
    .get('/seasons', db.getSeasons)
    .get('/seasons/hot', db.getSeasonsHot)    
    .get('/seasons/:year', db.getSeasonByYear)
    .get('/seasons/:year/winner', db.getSeasonWinner)
    .get('/constructors', db.getConstructors)
    .get('/constructors/hot', db.getConstructorsHot)
    .get('/constructors/season/:year', db.getConstructorsBySeason)
    .get('/constructors/:id', db.getConstructorById)
    .get('/constructors/:id/points', db.getConstructorPoints)
    .get('/constructors/search/:name', db.getConstructorByName)
    .get('/drivers', db.getDrivers)
    .get('/drivers/hot', db.getDriversHot)
    .get('/drivers/season/:year', db.getDriversBySeason)
    .get('/drivers/:id', db.getDriverById)
    .get('/drivers/search/:name', db.getDriverByName)
    .get('/races', db.getRaces)
    .get('/races/circuit/:id', db.getRacesByCircuit)
    .get('/races/season/:year', db.getRacesBySeason)
    .listen(PORT, () => console.log(`Listening on port ${ PORT }`))
