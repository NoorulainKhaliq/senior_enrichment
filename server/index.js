const router = require('express').Router();

router.use('/campus', require('./campus'));
router.use('/student', require('./student'));


router.use(function (req, res) {
    res.status(404).end();
  });

module.exports = router;