const express = require('express');
const router = express.Router();

const singersController = require('../controllers/singers');

router.get('/', singersController.getAllSingers);
router.get('/:id', singersController.getSingleSinger);
router.post('/', singersController.addSinger);
router.put('/:id', singersController.updateSinger);
router.delete('/:id', singersController.deleteSinger);

module.exports = router;