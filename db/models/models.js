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
        allowNULL: false,
        validate: {isEmail: true}
    },
    campusId: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = {
    Campus,
    Student
}