const express = require('express')
const router = express.Router();
const campus = require('./campus')

router.get('/', function (req, res, next) {
    campus.getAll()
        .then(allCampus => res.json(allCampus))
        .catch(next)
})

router.get('/:id', function (req, res, next) {
    const campusId = req.params.id;
    campus.getOne(campusId)
        .then(foundCampus => res.json(foundCampus))
        .catch(next)
})

router.post('/', function (req, res, next) {
    let newCampus = {
        name: req.body.name,
        imageUrl: req.body.content
    }
    campus.add(newCampus)
        .then(createdCampus => res.json(createdCampus))
        .catch(next)
})

router.put('/:id', function (req, res, next) {
    let campusToUpdate = {
        id: req.body.id,
        name: req.body.name,
        imageUrl: req.body.content
    }
    campus.update(campusToUpdate)
        .catch(next)
})

router.delete('/:id', function (req, res, next) {
    return campus.remove(req.params.id)
        .then(deleteCount => res.json({
            deleteCount
        }))
        .catch(next);
});


module.exports = router;