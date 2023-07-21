const express = require('express');
const router = express.Router();


router.use('/', require('./swagger'));
router.use('/singers', require('./singers'))

module.exports = router;










