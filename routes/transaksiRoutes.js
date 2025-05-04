const express = require('express');
const controller = require('../controllers/transaksiController');
const router = express.Router();

router.get('/siswa/:id_siswa', transaksiController.getBySiswa);
router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
