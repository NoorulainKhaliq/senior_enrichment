const CampusData = require('./campus-models')
const StudentData = require('../../db/models').Student

module.exports = Object.freeze({
    getAll,
    getOne,
    add,
    update,
    remove
})

const campusAttributes = ['id', 'name', 'imageUrl']
const studentAttributes = ['id', 'name', 'email']

function getAll() {
    return CampusData.findAll({
        attributes: campusAttributes
    })
}

function getOne(id) {
    return CampusData.findById(id, {
        attributes: campusAttributes,
        include: [{
            model: StudentData,
            attributes: studentAttributes
        }]
    })
}

function update(campus) {
    return CampusData.findById(campus.id)
        .then(campusFound => {
            return CampusData.update(campus)
        })
}

function add(campus) {
    return CampusData.create(campus)
}

function remove(id) {
    return CampusData.destroy({
        where: {
            id
        }
    })
}