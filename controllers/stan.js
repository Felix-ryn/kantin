const stanModel = require("../models/index").stan;
const userModel = require("../models/index").users;
const pelangganModel = require("../models/index").siswa;
const menuModel = require("../models/index").menu;
const diskonModel = require("../models/index").diskon;
const transaksiModel = require("../models/index").transaksi;
const detailTransaksiModel = require("../models/index").detail_transaksi;
const menuDiskonModel = require("../models/index").menu_diskon;
const Op = require("sequelize").Op;


exports.registerStan = async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
      role: "admin_stan",
    };
    const user = await userModel.create(userData);

    const stanData = {
      nama_stan: req.body.nama_stan,
      nama_pemilik: req.body.nama_pemilik,
      telp: req.body.telp,
      id_user: user.id,
    };
    const stan = await stanModel.create(stanData);

    res.json({ message: "Stan berhasil didaftarkan", data: stan });
  } catch (error) {
    res.json({ message: error.message });
  }
};


exports.loginStan = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ where: { username, password, role: "admin_stan" } });

  if (user) {
    res.json({ success: true, message: "Login berhasil", data: user });
  } else {
    res.json({ success: false, message: "Username atau password salah" });
  }
};

exports.updateStan = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    await stanModel.update(updatedData, { where: { id } });
    res.json({ success: true, message: "Profil stan berhasil diupdate" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getAllPelanggan = async (req, res) => {
  pelangganModel.findAll()
    .then(result => res.json({ data: result }))
    .catch(error => res.json({ message: error.message }));
};

exports.addPelanggan = async (req, res) => {
  try {
    const data = req.body;
    const pelanggan = await pelangganModel.create(data);
    res.json({ message: "Pelanggan berhasil ditambahkan", data: pelanggan });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.updatePelanggan = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    await pelangganModel.update(updatedData, { where: { id } });
    res.json({ message: "Data pelanggan berhasil diperbarui" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.deletePelanggan = async (req, res) => {
  try {
    const id = req.params.id;
    await pelangganModel.destroy({ where: { id } });
    res.json({ message: "Data pelanggan berhasil dihapus" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getAllMenu = async (req, res) => {
  menuModel.findAll()
    .then(result => res.json({ data: result }))
    .catch(error => res.json({ message: error.message }));
};

exports.addMenu = async (req, res) => {
  try {
    const data = req.body;
    const menu = await menuModel.create(data);
    res.json({ message: "Menu berhasil ditambahkan", data: menu });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    await menuModel.update(updatedData, { where: { id } });
    res.json({ message: "Menu berhasil diperbarui" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    await menuModel.destroy({ where: { id } });
    res.json({ message: "Menu berhasil dihapus" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.addDiskon = async (req, res) => {
  try {
    const diskonData = req.body;
    const diskon = await diskonModel.create(diskonData);

    if (req.body.id_menu) {
      await menuDiskonModel.create({ id_menu: req.body.id_menu, id_diskon: diskon.id });
    }

    res.json({ message: "Diskon berhasil ditambahkan", data: diskon });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.updateStatusPesanan = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    await transaksiModel.update({ status }, { where: { id } });
    res.json({ message: "Status pesanan berhasil diperbarui" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getPemesananByBulan = async (req, res) => {
  try {
    const { bulan, tahun } = req.body;

    const pemesanan = await transaksiModel.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tanggal')), bulan),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('tanggal')), tahun)
        ]
      }
    });

    res.json({ data: pemesanan });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getRekapPemasukan = async (req, res) => {
  try {
    const { bulan, tahun } = req.body;

    const pemasukan = await transaksiModel.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total_pemasukan']
      ],
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tanggal')), bulan),
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('tanggal')), tahun)
        ]
      }
    });

    res.json({ data: pemasukan });
  } catch (error) {
    res.json({ message: error.message });
  }
};
