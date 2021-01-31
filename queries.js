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

module.exports = {
    getCircuits,
    getCircuitById
}
