const express = require('express')
const router = express.Router();
const { Student } = require('../db/models');

router.get('/', function(req, res, next) {
    Student.findAll()
    .then(foundStudents => res.json(foundStudents))
    .catch(next)
})

router.get('/:id', function(req, res, next) {
    let studentId = req.params.id
    Student.findById(studentId)
    .then(foundStudent => res.json(foundStudent))
    .catch(next)
})

router.post('/newstudent', function(req, res, next) {
    Student.create({
        name: req.body.name,
        email: req.body.email
    })
    .then(createdStudent => res.json(createdStudent))
    .catch(next)
})

router.put('/updateStudent', function(req, res, next) {
    let studentToUpdate = req.body
    Student.findById({
        where: {
            id: campusToUpdate.id
        }
    })
    .then(Student.update({
        name: studentToUpdate.name,
        email: studentToUpdate.email,

    }))
    .catch(next)
})

router.delete('/:studentId', function (req, res, next) {
    const id = req.params.studentId;
  
    Student.destroy({ where: { id } })
      .then(() => res.status(204).end())
      .catch(next);
  });

  module.exports = router;