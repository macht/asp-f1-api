const server = require('../index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('ASP-F1-API Tests', () => {

    describe('Test route /', () => {
        it('It should return 200 response', (done) => {
            chai.request(server)
                .get('/')
                .end((err, response) => {
                    response.should.have.status(200)
                done()
                })
        })
    })

    describe('Test route /circuits', () => {
        it('It should return all circuits', (done) => {
            chai.request(server)
                .get('/circuits')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('circuitid')
                    response.body[0].should.have.property('circuitref')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('location')
                    response.body[0].should.have.property('country')
                    response.body[0].should.have.property('lat')
                    response.body[0].should.have.property('lng')
                    response.body[0].should.have.property('alt')
                    response.body[0].should.have.property('url')
                    response.body.length.should.not.be.eq(0)
                done()
                })
        })
    })

    describe('Test route /circuits/hot', () => {
        it('It should return top three circuits', (done) => {
            chai.request(server)
                .get('/circuits/hot')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('circuitid')
                    response.body[0].should.have.property('circuitref')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('location')
                    response.body[0].should.have.property('country')
                    response.body[0].should.have.property('lat')
                    response.body[0].should.have.property('lng')
                    response.body[0].should.have.property('alt')
                    response.body[0].should.have.property('url')
                    response.body.length.should.not.be.eq(0)
                done()
                })
        })
    })

    describe('Test route /circuits/season/:year', () => {
        it('It should return the 21 circuits used in 2016 season', (done) => {
            chai.request(server)
                .get('/circuits/season/2016')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('circuitid')
                    response.body[0].should.have.property('circuitref')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('location')
                    response.body[0].should.have.property('country')
                    response.body[0].should.have.property('lat')
                    response.body[0].should.have.property('lng')
                    response.body[0].should.have.property('alt')
                    response.body[0].should.have.property('url')
                    response.body.length.should.eq(21)
                done()
                })
        })
    })

    describe('Test route /circuits/:id', () => {
        it('It should return Albert Park Grand Prix Circuit', (done) => {
            chai.request(server)
                .get('/circuits/1')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('circuitid')
                    response.body[0].should.have.property('circuitref')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('location')
                    response.body[0].should.have.property('country')
                    response.body[0].should.have.property('lat')
                    response.body[0].should.have.property('lng')
                    response.body[0].should.have.property('alt')
                    response.body[0].should.have.property('url')
                    response.body.length.should.eq(1)
                    response.body[0].circuitref.should.eq('albert_park')
                done()
                })
        })
    })

    describe('Test route /circuits/:id/fastest', () => {
        it('It should return the fastest times for Albert Park', (done) => {
            chai.request(server)
                .get('/circuits/1/fastest')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('year')
                    response.body[0].should.have.property('fastest')
                    response.body.length.should.not.be.eq(0)
                done()
                })
        })
    })

    describe('Test route /circuits/:cid/fastest/drivers/:did', () => {
        it('It should return Hamiltons fastest times for Albert Park', (done) => {
            chai.request(server)
                .get('/circuits/1/fastest/drivers/1')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('year')
                    response.body[0].should.have.property('fastest')
                    response.body.length.should.not.be.eq(0)
                done()
                })
        })
    })

    describe('Test route /seasons', () => {
        it('It should return all seasons', (done) => {
            chai.request(server)
                .get('/seasons')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('year')
                    response.body[0].should.have.property('url')
                    response.body.length.should.not.be.eq(0)
                done()
                })
        })
    })

    describe('Test route /seasons/hot', () => {
        it('It should return latest three seasons', (done) => {
            chai.request(server)
                .get('/seasons/hot')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('year')
                    response.body[0].should.have.property('url')
                    response.body.length.should.eq(3)
                    response.body[0].year.should.eq(2017)
                done()
                })
        })
    })

    describe('Test route /seasons/:year', () => {
        it('It should return one season', (done) => {
            chai.request(server)
                .get('/seasons/2017')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('year')
                    response.body[0].should.have.property('url')
                    response.body.length.should.eq(1)
                    response.body[0].year.should.eq(2017)
                done()
                })
        })
    })

    describe('Test route /seasons/:year/winner', () => {
        it('It should return the winner of 2017 season (hamilton)', (done) => {
            chai.request(server)
                .get('/seasons/2017/winner')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('winningdriver')
                    response.body[0].should.have.property('winningconstructor')
                    response.body.length.should.eq(1)
                    response.body[0].winningdriver.should.eq('Lewis Hamilton')
                    response.body[0].winningconstructor.should.eq('Mercedes')
                done()
                })
        })
    })

    describe('Test route /constructors', () => {
        it('It should return all constructors', (done) => {
            chai.request(server)
                .get('/constructors')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('constructorid')
                    response.body[0].should.have.property('constructorref')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('nationality')
                    response.body[0].should.have.property('url')
                    response.body.length.should.not.be.eq(0)
                done()
                })
        })
    })

    describe('Test route /constructors/hot', () => {
        it('It should return top five constructors', (done) => {
            chai.request(server)
                .get('/constructors/hot')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('constructorid')
                    response.body[0].should.have.property('constructorref')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('nationality')
                    response.body[0].should.have.property('url')
                    response.body[0].should.have.property('sum')
                    response.body.length.should.eq(5)
                done()
                })
        })
    })

    describe('Test route /constructors/season/:year', () => {
        it('It should return all constructors participating in 2017 season', (done) => {
            chai.request(server)
                .get('/constructors/season/2017')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('constructorid')
                    response.body[0].should.have.property('constructorref')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('nationality')
                    response.body[0].should.have.property('url')
                    response.body.length.should.eq(10)
                done()
                })
        })
    })

    describe('Test route /constructors/:id', () => {
        it('It should return constructor McLaren', (done) => {
            chai.request(server)
                .get('/constructors/1')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('constructorid')
                    response.body[0].should.have.property('constructorref')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('nationality')
                    response.body[0].should.have.property('url')
                    response.body.length.should.eq(1)
                    response.body[0].constructorref.should.eq('mclaren')
                done()
                })
        })
    })

    describe('Test route /constructors/:id/points', () => {
        it('It should return points for each season for constructor McLaren', (done) => {
            chai.request(server)
                .get('/constructors/1/points')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('year')
                    response.body[0].should.have.property('sum')
                    response.body.length.should.not.be.eq(0)
                done()
                })
        })
    })
    
    describe('Test route /constructors/search/:name', () => {
        it('It should return three constructors with ferrari in their name', (done) => {
            chai.request(server)
                .get('/constructors/search/ferrari')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('constructorid')
                    response.body[0].should.have.property('constructorref')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('nationality')
                    response.body[0].should.have.property('url')
                    response.body.length.should.eq(3)
                done()
                })
        })
    })

    describe('Test route /drivers', () => {
        it('It should return all drivers', (done) => {
            chai.request(server)
                .get('/drivers')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('driverid')
                    response.body[0].should.have.property('driverref')
                    response.body[0].should.have.property('number')
                    response.body[0].should.have.property('code')
                    response.body[0].should.have.property('forename')
                    response.body[0].should.have.property('surname')
                    response.body[0].should.have.property('dob')
                    response.body[0].should.have.property('nationality')
                    response.body[0].should.have.property('url')
                    response.body.length.should.not.be.eq(0)
                done()
                })
        })
    })

    describe('Test route /drivers/hot', () => {
        it('It should top five scoring drivers', (done) => {
            chai.request(server)
                .get('/drivers/hot')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('driverid')
                    response.body[0].should.have.property('driverref')
                    response.body[0].should.have.property('number')
                    response.body[0].should.have.property('code')
                    response.body[0].should.have.property('forename')
                    response.body[0].should.have.property('surname')
                    response.body[0].should.have.property('dob')
                    response.body[0].should.have.property('nationality')
                    response.body[0].should.have.property('url')
                    response.body[0].should.have.property('sum')
                    response.body.length.should.eq(5)
                done()
                })
        })
    })

    describe('Test route /drivers/season/:year', () => {
        it('It should return drivers participating in season 2017', (done) => {
            chai.request(server)
                .get('/drivers/season/2017')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('driverid')
                    response.body[0].should.have.property('driverref')
                    response.body[0].should.have.property('number')
                    response.body[0].should.have.property('code')
                    response.body[0].should.have.property('forename')
                    response.body[0].should.have.property('surname')
                    response.body[0].should.have.property('dob')
                    response.body[0].should.have.property('nationality')
                    response.body[0].should.have.property('url')
                    response.body.length.should.eq(25)
                done()
                })
        })
    })

    describe('Test route /drivers/:id', () => {
        it('It should return the driver hamilton', (done) => {
            chai.request(server)
                .get('/drivers/1')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('driverid')
                    response.body[0].should.have.property('driverref')
                    response.body[0].should.have.property('number')
                    response.body[0].should.have.property('code')
                    response.body[0].should.have.property('forename')
                    response.body[0].should.have.property('surname')
                    response.body[0].should.have.property('dob')
                    response.body[0].should.have.property('nationality')
                    response.body[0].should.have.property('url')
                    response.body.length.should.eq(1)
                    response.body[0].driverref.should.eq('hamilton')
                done()
                })
        })
    })

    describe('Test route /drivers/search/:name', () => {
        it('It should return all drivers with john in their name', (done) => {
            chai.request(server)
                .get('/drivers/search/john')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('driverid')
                    response.body[0].should.have.property('driverref')
                    response.body[0].should.have.property('number')
                    response.body[0].should.have.property('code')
                    response.body[0].should.have.property('forename')
                    response.body[0].should.have.property('surname')
                    response.body[0].should.have.property('dob')
                    response.body[0].should.have.property('nationality')
                    response.body[0].should.have.property('url')
                    response.body.length.should.eq(3)
                done()
                })
        })
    })

    describe('Test route /races', () => {
        it('It should return all races', (done) => {
            chai.request(server)
                .get('/races')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('raceid')
                    response.body[0].should.have.property('year')
                    response.body[0].should.have.property('round')
                    response.body[0].should.have.property('circuitid')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('date')
                    response.body[0].should.have.property('time')
                    response.body[0].should.have.property('url')
                    response.body.length.should.not.be.eq(0)
                done()
                })
        })
    })

    describe('Test route /races/circuit/:id', () => {
        it('It should return all races that took place at Albert Park', (done) => {
            chai.request(server)
                .get('/races/circuit/1')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('raceid')
                    response.body[0].should.have.property('year')
                    response.body[0].should.have.property('circuitid')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('date')
                    response.body[0].should.have.property('time')
                    response.body[0].should.have.property('winner')
                    response.body[0].should.have.property('constructor')
                    response.body.length.should.eq(22)
                done()
                })
        })
    })

    describe('Test route /races/season/:year', () => {
        it('It should return all races that took place in 2017', (done) => {
            chai.request(server)
                .get('/races/season/2017')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body[0].should.have.property('raceid')
                    response.body[0].should.have.property('year')
                    response.body[0].should.have.property('circuitid')
                    response.body[0].should.have.property('name')
                    response.body[0].should.have.property('date')
                    response.body[0].should.have.property('time')
                    response.body[0].should.have.property('winner')
                    response.body[0].should.have.property('constructor')
                    response.body.length.should.eq(20)
                done()
                })
        })
    })

})
