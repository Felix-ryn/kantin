const { DetailTransaksi } = require('../models');

const detailTransaksiData = [
  {
    transaksi_id: 1,
    menu_id: 1, // Nasi Goreng
    jumlah: 2,
    harga_satuan: 15000,
  },
  {
    transaksi_id: 2,
    menu_id: 2, // Mie Goreng
    jumlah: 1,
    harga_satuan: 12000,
  },
];

module.exports = {
  async up() {
    await DetailTransaksi.bulkCreate(detailTransaksiData);
  },

  async down() {
    await DetailTransaksi.destroy({ where: {}, truncate: true });
  },
};
