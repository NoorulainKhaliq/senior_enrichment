const express = require('express')
const router = express.Router();
const { Campus, Student } = require('../db/models');

router.get('/', function(req, res, next) {
    Campus.findAll()
    .then(allCampus => res.json(allCampus))
    .catch(next)
})

router.get('/:id', function(req, res, next) {
    var ID = req.params.id;
    ID = Number(ID)
    console.log('in Route get Id', ID)
    Campus.findById(ID, {include: 
        [Student]
    })
    .then(found => {
        if (!found) {
            throw new Error('this campus is not found');
        }
        return found;
    })
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
    const id = Number(req.params.id)
    console.log('put request hit')
    Campus.findById(id)
    .then((foundCampus) => foundCampus.update({
        name: req.body.name,
        imageUrl: req.body.imageUrl
    }))
    .then(createdCampus => res.json(createdCampus))
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
    const id = req.params.id;
    return Campus.destroy({ where: { id } })
    .then(deletedCampus => res.json({id}))
      .catch(next);
  });


module.exports = router;