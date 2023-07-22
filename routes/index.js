const express = require('express');
const router = express.Router();


router.use('/', require('./swagger'));
router.use('/singers', require('./singers'))
router.use('/albums', require('./albums'))

module.exports = router;









