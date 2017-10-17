const express = require('express')
const router = express.Router();
const { Student, Campus } = require('../db/models');
const Sequelize = require('Sequelize')

router.get('/', function(req, res, next) {
    
    Student.findAll({
        include: [{
                model: Campus //brings in too much data
            }]
    })
    .then(foundStudents => res.json(foundStudents))
    .catch(next)
})

//this is in the student routes because the reference is students
// router.get('/campus/:campusId', (req, res, next) => {
//     Student.findAll({
//         include: [{
//             model: Campus //brings in too much data -- want only campus name
//         }],
//         where: {
//             campusId: req.params.campusId
//         }
//     })
//     .then(foundStudents => res.json(foundStudents))
//     .catch(next)
// })

router.get('/:id', function(req, res, next) {
    let studentId = req.params.id
    Student.findById(studentId,{
		include: [{
			model : Campus
		}]
    })
    .then(student => res.json(student))
})

router.post('/newstudent', function(req, res, next) {
    Student.create({
        name: req.body.name,
        email: req.body.email
    })
    .then(createdStudent => res.json(createdStudent))
    .catch(next)
})

router.put('/:id', function(req, res, next) {
    let studentId = req.params.id
    Student.findById({
        where: {
            id: studentId
        }
    })
    .then(Student.update({
        name: studentToUpdate.name,
        email: studentToUpdate.email,

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