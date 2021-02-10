const Pool = require('pg').Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

const getCircuits = (req, res) => {
    pool.query('SELECT * FROM circuits ORDER BY circuitid ASC', (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getCircuitById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM circuits WHERE circuitid = $1', [id], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getSeasons = (req, res) => {
    pool.query('SELECT * FROM seasons ORDER BY year DESC', (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getSeasonByYear = (req, res) => {
    const year = parseInt(req.params.year)

    pool.query('SELECT * FROM seasons WHERE year = $1', [year], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getConstructors = (req, res) => {
    pool.query('SELECT * FROM constructors ORDER BY constructorid ASC', (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getConstructorById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM constructors WHERE constructorid = $1', [id], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getConstructorByName = (req, res) => {
    pool.query('SELECT * FROM constructors WHERE name ILIKE $1', ['%' + req.params.name + '%'], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getDrivers = (req, res) => {
    pool.query('SELECT * FROM drivers ORDER BY driverid ASC', (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getDriverById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM drivers WHERE driverid = $1', [id], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getDriverByName = (req, res) => {
    pool.query('SELECT * FROM drivers WHERE forename LIKE $1 OR surname ILIKE $1', ['%' + req.params.name + '%'], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

module.exports = {
    getCircuits,
    getCircuitById,
    getSeasons,
    getSeasonByYear,
    getConstructors,
    getConstructorById,
    getConstructorByName,
    getDrivers,
    getDriverById,
    getDriverByName
}
