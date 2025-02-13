const express = require('express');
const controller = require('../controllers/menuDiskonController');
const router = express.Router();

router.post('/', controller.create);

module.exports = router;
