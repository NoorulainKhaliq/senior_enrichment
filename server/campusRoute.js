const express = require('express')
const router = express.Router();
const { Campus, Student } = require('../db/models');


//this is a route to get all campuses
router.get('/', function (req, res, next) {
    Campus.findAll()
        .then(allCampus => res.json(allCampus))
        .catch(next)
})

//route to get campus by id
router.get('/:id', function (req, res, next) {
    var ID = req.params.id;
    ID = Number(ID)
    Campus.findById(ID, {
        include:
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

//route to create campus 
router.post('/', function (req, res, next) {
    let newCampus = req.body.name
    console.log(req.body.imageUrl)
    Campus.create({
        name: newCampus,
        imageUrl: req.body.imageUrl
    })
        .then(createdCampus => res.json(createdCampus))
        .catch(next)
})

//update campus
router.put('/:id', function (req, res, next) {
    const id = Number(req.params.id)
    Campus.findById(id)
        .then((foundCampus) => foundCampus.update({
            name: req.body.name,
            imageUrl: req.body.imageUrl
        }))
        .then(createdCampus => res.json(createdCampus))
        .catch(next)
})

//delete campus -- looks to delete campus by id
router.delete('/:id', function (req, res, next) {
    const id = req.params.id;
    return Campus.destroy({ where: { id } })
        .then(deletedCampus => res.json({ id }))
        .catch(next);
});


module.exports = router;