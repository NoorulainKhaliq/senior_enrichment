const express = require('express')
const router = express.Router();
const { Student, Campus } = require('../db/models');
const Sequelize = require('Sequelize')

router.get('/', function (req, res, next) {

    Student.findAll({
        include: [{
            model: Campus
        }]
    })
        .then(foundStudents => res.json(foundStudents))
        .catch(next)
})

router.get('/:id', function (req, res, next) {
    let studentId = req.params.id
    Student.findById(studentId, {
        include: [{
            model: Campus
        }]
    })
        .then(student => res.json(student))
})

router.post('/newstudent', function (req, res, next) {
    console.log('post request hit')
    Student.create({
        name: req.body.name,
        email: req.body.email,
        campusId: req.body.campusId
    })
        .then(createdStudent => res.json(createdStudent))
        .catch(next)
})

router.put('/:id', function (req, res, next) {
    let studentId = req.params.id
    Student.findById(studentId)
        .then((student) => student.update({
            name: req.body.name,
            email: req.body.email,
            campusId: req.body.campusId
        }))
        .catch(next)
})

router.delete('/:id', function (req, res, next) {
    const id = req.params.id;

    Student.destroy({ where: { id } })
        .then(() => res.status(204).end())
        .catch(next);
});

module.exports = router;