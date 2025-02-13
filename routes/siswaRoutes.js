const express = require('express');
const controller = require('../controllers/siswaController');
const router = express.Router();

router.post('/register', siswaController.registerSiswa);
router.post('/login', siswaController.loginSiswa);

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
