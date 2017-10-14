const db = require('../index.js')

const Campus = db.define('campus', {
    name: {
        type: db.Sequelize.STRING,
        allowNULL: false
    },
    imageUrl: {
        type: db.Sequelize.STRING,
        allowNULL: false
    }
})

const Student = db.define('student', {
    name: {
        type: db.Sequelize.STRING,
        allowNULL: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNULL: false
    }
})

module.exports = {
    Campus,
    Student
}