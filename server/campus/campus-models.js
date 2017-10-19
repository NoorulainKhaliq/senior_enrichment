const db = require('../../db')

module.exports = db.define('campus', {
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
