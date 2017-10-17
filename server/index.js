const router = require('express').Router();

router.use('/api', require('./api'));


router.use(function (req, res) {
    res.status(404).end();
  });

module.exports = router;