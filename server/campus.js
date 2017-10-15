const express = require('express')
const router = express.Router();
const { Campus } = require('../db/models');

router.get('/', function(req, res, next) {
    Campus.findAll()
    .then(allCampus => res.json(allCampus))
    .catch(next)
})

router.get('/:id', function(req, res, next) {
    const ID = req.params.id;
    Campus.findById(ID)
    .then(foundCampus => res.json(foundCampus))
    .catch(next)
})

router.post('/newcampus', function(req, res, next) {
    let newCampus = req.body.name
    Campus.create({
        name: newCampus,
        imageUrl: req.body.content
    })
    .then(createdCampus => res.json(createdCampus))
    .catch(next)
})

router.put('/:id', function(req, res, next) {
    let campusToUpdate = req.body
    Campus.findById({
        where: {
            id: campusToUpdate.id
        }
    })
    .then(Campus.update({
        name: campusInfo.name
    }))
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
    const id = req.params.campusId;
  
    Campus.destroy({ where: { id } })
      .then(() => res.status(204).end())
      .catch(next);
  });


module.exports = router;