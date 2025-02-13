const express = require('express');
const controller = require('../controllers/siswaController');
const router = express.Router();

router.post('/register', controller.registerSiswa);
router.post('/login', controller.loginSiswa);

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
