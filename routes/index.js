const express = require('express');
const router = express.Router();
const controller = require("../controllers")

router.get("/", controller.router)
router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'))

module.exports = router;










