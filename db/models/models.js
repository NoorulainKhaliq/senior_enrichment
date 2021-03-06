const db = require('../index.js')

const Campus = db.define('campus', {
    name: {
        type: db.Sequelize.STRING,
        allowNULL: false,
        isUnique: true,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: db.Sequelize.TEXT,
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