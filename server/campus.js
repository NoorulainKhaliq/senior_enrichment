const express = require('express')
const router = express.Router();
const { Campus, Student } = require('../db/models');
const campus = require('./campus/campus')

router.get('/', function(req, res, next) {
    campus.getAll()
    .then(allCampus => res.json(allCampus))
    .catch(next)
})

router.get('/:id', function(req, res, next) {
    const ID = req.params.id;
    Campus.findById(ID, {include: [{
        model: Student
    }]})
    .then(foundCampus => res.json(foundCampus))
    .catch(next)
})

router.post('/', function(req, res, next) {
    let newCampus = req.body.name
    Campus.create({
        name: newCampus,
        imageUrl: req.body.content
    })
    .then(createdCampus => res.json(createdCampus))
    .catch(next)
})

router.put('/:id', function(req, res, next) {
    Campus.findById({
        where: {
            id: req.body.id
        }
    })
    .then(Campus.update({
        name: req.body.name,
        imageUrl: req.body.content
    }))
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
    const id = req.params.id;
    return Campus.destroy({ where: { id } })
    .then(deletedCampus => res.json({id}))
      .catch(next);
  });


module.exports = router;