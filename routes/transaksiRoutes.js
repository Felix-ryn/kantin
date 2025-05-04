const express = require('express');
const controller = require('../controllers/transaksiController');
const router = express.Router();

router.put('/update-status/:id', controller.updateStatus);
router.get('/stan/:id_stan/pesanan', controller.getPesananByBulan);
router.get('/stan/:id_stan/pemasukan', controller.getPemasukanBulanan);
router.get('/siswa/:id_siswa/histori', controller.getHistoriByBulan);
router.get('/siswa/:id_siswa', controller.getBySiswa);
router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
