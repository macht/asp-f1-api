const Pool = require('pg').Pool
const { parse } = require('pg-connection-string')

const config = parse(process.env.DATABASE_URL)
let pool;

if (process.env.DATABASE_URL.includes("localhost")) {
    pool = new Pool(config)
}
else {
    config.ssl = {
        rejectUnauthorized: false
    }
    pool = new Pool(config)
}

const getCircuits = (req, res) => {
    pool.query('SELECT * FROM circuits ORDER BY circuitid ASC', (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getCircuitById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM circuits WHERE circuitid = $1', [id], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getCircuitsHot = (req, res) => {
    pool.query('SELECT * FROM circuits ORDER BY RANDOM() LIMIT 3', (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getCircuitsBySeason = (req, res) => {
    const year = parseInt(req.params.year)

    pool.query('SELECT DISTINCT c.* FROM circuits c '
    + 'INNER JOIN races rc ON c.circuitid = rc.circuitid AND rc.year = $1', [year], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getCircuitFastest = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT rc.year, MIN(r.milliseconds) AS fastest FROM results r '
    + 'INNER JOIN races rc ON r.raceid = rc.raceid '
    + 'WHERE rc.circuitid = $1 '
    + 'GROUP BY rc.year '
    + 'ORDER BY rc.year', [id], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getCircuitFastestByDriver = (req, res) => {
    const cid = parseInt(req.params.cid)
    const did = parseInt(req.params.did)

    pool.query('SELECT rc.year, MIN(r.milliseconds) AS fastest FROM results r '
    + 'INNER JOIN races rc ON r.raceid = rc.raceid '
    + 'WHERE rc.circuitid = $1 AND r.driverid = $2'
    + 'GROUP BY rc.year '
    + 'ORDER BY rc.year', [cid, did], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getSeasons = (req, res) => {
    pool.query('SELECT * FROM seasons ORDER BY year DESC', (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getSeasonByYear = (req, res) => {
    const year = parseInt(req.params.year)

    pool.query('SELECT * FROM seasons WHERE year = $1', [year], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getSeasonsHot = (req, res) => {
    pool.query('SELECT * FROM seasons ORDER BY year DESC LIMIT 3', (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getSeasonWinner = (req, res) => {
    const year = parseInt(req.params.year)

    pool.query('SELECT d.forename || \' \' || d.surname AS winningdriver, c.name AS winningconstructor FROM results r '
    + 'INNER JOIN races rc ON r.raceid = rc.raceid '
    + 'LEFT OUTER JOIN drivers d ON r.driverid = d.driverid '
    + 'LEFT OUTER JOIN constructors c ON r.constructorid = c.constructorid '
    + 'WHERE rc.year = $1 '
    + 'GROUP BY winningdriver, winningconstructor '
    + 'HAVING SUM(points) > 0 '
    + 'ORDER BY SUM(points) DESC '
    + 'LIMIT 1', [year], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getConstructors = (req, res) => {
    pool.query('SELECT * FROM constructors ORDER BY constructorid ASC', (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getConstructorById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM constructors WHERE constructorid = $1', [id], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getConstructorByName = (req, res) => {
    pool.query('SELECT * FROM constructors WHERE name ILIKE $1', ['%' + req.params.name + '%'], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getConstructorsHot = (req, res) => {
    pool.query('SELECT c.*, SUM(r.points) '
    + 'FROM constructors c LEFT JOIN results r on c.constructorid = r.constructorid '
    + 'LEFT JOIN races rc ON r.raceid = rc.raceid '
    + 'WHERE rc.year IN (SELECT MAX(year) from seasons) '
    + 'GROUP BY c.constructorid LIMIT 5', (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getConstructorsBySeason = (req, res) => {
    const year = parseInt(req.params.year)

    pool.query('WITH seasonconstructors AS (SELECT DISTINCT constructorid FROM results r INNER JOIN races rc ON r.raceid = rc.raceid AND rc.year = $1) '
    + 'SELECT DISTINCT c.* FROM constructors c '
    + 'INNER JOIN seasonconstructors sc ON c.constructorid = sc.constructorid', [year], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getConstructorPoints = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT rc.year, SUM(r.points) FROM results r '
    + 'INNER JOIN races rc ON r.raceid = rc.raceid '
    + 'WHERE r.constructorid = $1 '
    + 'GROUP BY rc.year '
    + 'ORDER BY rc.year', [id], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getDrivers = (req, res) => {
    pool.query('SELECT * FROM drivers ORDER BY driverid ASC', (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getDriverById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM drivers WHERE driverid = $1', [id], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getDriverByName = (req, res) => {
    pool.query('SELECT * FROM drivers WHERE forename LIKE $1 OR surname ILIKE $1', ['%' + req.params.name + '%'], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getDriversHot = (req, res) => {
    pool.query('SELECT d.*, SUM(r.points)'
    + 'FROM drivers d LEFT JOIN results r on d.driverid = r.driverid '
    + 'LEFT JOIN races rc ON r.raceid = rc.raceid '
    + 'WHERE rc.year IN (SELECT MAX(year) from seasons) '
    + 'GROUP BY d.driverid LIMIT 5', (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getDriversBySeason = (req, res) => {
    const year = parseInt(req.params.year)

    pool.query('WITH seasondrivers AS (SELECT DISTINCT driverid FROM results r INNER JOIN races rc ON r.raceid = rc.raceid AND rc.year = $1) '
    + 'SELECT DISTINCT d.* FROM drivers d '
    + 'INNER JOIN seasondrivers sd ON d.driverid = sd.driverid', [year], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getRaces = (req, res) => {
    pool.query('SELECT * FROM races ORDER BY raceid ASC', (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getRacesByCircuit = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT r.raceid, r.year, r.circuitid, r.name, r.date, d.forename || \' \' || d.surname as winner, re.milliseconds as time, c.name as constructor '
    + 'FROM races r LEFT JOIN results re on r.raceid = re.raceid AND re.position = 1 '
    + 'LEFT JOIN drivers d on re.driverid = d.driverid '
    + 'LEFT JOIN constructors c on re.constructorid = c.constructorid '
    + 'WHERE r.circuitid = $1;', [id], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

const getRacesBySeason = (req, res) => {
    const year = parseInt(req.params.year)

    pool.query('SELECT r.raceid, r.year, r.circuitid, r.name, r.date, d.forename || \' \' || d.surname as winner, re.milliseconds as time, c.name as constructor '
    + 'FROM races r LEFT JOIN results re on r.raceid = re.raceid AND re.position = 1 '
    + 'LEFT JOIN drivers d on re.driverid = d.driverid '
    + 'LEFT JOIN constructors c on re.constructorid = c.constructorid '
    + 'WHERE r.year = $1;', [year], (err, result) => {
        if (err) {
            res.status(500).send('500 Internal Server Error')
            return
        }
        res.status(200).json(result.rows)
    })
}

module.exports = {
    getCircuits,
    getCircuitById,
    getCircuitsHot,
    getCircuitsBySeason,
    getCircuitFastest,
    getCircuitFastestByDriver,
    getSeasons,
    getSeasonByYear,
    getSeasonsHot,
    getSeasonWinner,
    getConstructors,
    getConstructorById,
    getConstructorByName,
    getConstructorsHot,
    getConstructorsBySeason,
    getConstructorPoints,
    getDrivers,
    getDriverById,
    getDriverByName,
    getDriversHot,
    getDriversBySeason,
    getRaces,
    getRacesByCircuit,
    getRacesBySeason
}
