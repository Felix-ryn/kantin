const userModel = require(`../models/index`).user;
const siswaModel = require(`../models/index`).siswa;
const menuModel = require(`../models/index`).menu;
const transaksiModel = require(`../models/index`).transaksi;
const detailTransaksiModel = require(`../models/index`).detail_transaksi;
const diskonModel = require(`../models/index`).diskon;
const menuDiskonModel = require(`../models/index`).menu_diskon;
const Op = require(`sequelize`).Op;
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const SECRET_KEY = "akucintabackend";

exports.register = async (request, response) => {
  try {
    const { nama_siswa, alamat, telp, username, password } = request.body;

    const userExists = await userModel.findOne({ where: { username } });
    if (userExists) {
      return response.status(400).json({ message: "Username sudah terdaftar" });
    }

    const userData = await userModel.create({
      username,
      password: md5(password),
      role: "siswa",
    });

    await siswaModel.create({
      nama_siswa,
      alamat,
      telp,
      id_user: userData.id,
    });

    response.status(201).json({ message: "Registrasi berhasil" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

exports.login = async (request, response) => {
  try {
    const { username, password } = request.body;
    const user = await userModel.findOne({ where: { username, password: md5(password), role: "siswa" } });

    if (!user) {
      return response.status(401).json({ message: "Username atau password salah" });
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, SECRET_KEY);

    response.status(200).json({
      status: "success",
      logged: true,
      token,
      data: user,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

exports.getMenu = async (request, response) => {
  try {
    const menus = await menuModel.findAll();
    response.json({ data: menus });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

exports.placeOrder = async (request, response) => {
  try {
    const { items } = request.body;
    const id_siswa = request.user.id;
    let totalHarga = 0;

    const transaksi = await transaksiModel.create({
      tanggal: new Date(),
      id_siswa,
      status: "belum dikonfirmasi",
    });

    for (const item of items) {
      const menu = await menuModel.findByPk(item.id_menu);
      if (!menu) return response.status(404).json({ message: "Menu tidak ditemukan" });

      let hargaBeli = menu.harga;
      const menuDiskon = await menuDiskonModel.findOne({ where: { id_menu: item.id_menu } });

      if (menuDiskon) {
        const diskon = await diskonModel.findByPk(menuDiskon.id_diskon);
        const today = new Date();
        if (diskon && today >= diskon.tanggal_awal && today <= diskon.tanggal_akhir) {
          hargaBeli = menu.harga - (menu.harga * diskon.persentase_diskon) / 100;
        }
      }

      totalHarga += hargaBeli * item.qty;

      await detailTransaksiModel.create({
        id_transaksi: transaksi.id,
        id_menu: item.id_menu,
        qty: item.qty,
        harga_beli: hargaBeli,
      });
    }

    response.json({ message: "Pesanan berhasil dibuat", transaksi, totalHarga });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

exports.getOrderStatus = async (request, response) => {
  try {
    const id_siswa = request.user.id;
    const orders = await transaksiModel.findAll({ where: { id_siswa }, include: [detailTransaksiModel] });
    response.json({ data: orders });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

exports.getTransactionHistory = async (request, response) => {
  try {
    const { month } = request.params;
    const id_siswa = request.user.id;

    const transactions = await transaksiModel.findAll({
      where: {
        id_siswa,
        tanggal: {
          [Op.between]: [
            new Date(`${new Date().getFullYear()}-${month}-01`),
            new Date(`${new Date().getFullYear()}-${parseInt(month) + 1}-01`),
          ],
        },
      },
      include: [detailTransaksiModel],
    });

    response.json({ data: transactions });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

exports.printReceipt = async (request, response) => {
  try {
    const { id } = request.params;
    const transaksi = await transaksiModel.findByPk(id, { include: [detailTransaksiModel] });

    if (!transaksi) return response.status(404).json({ message: "Transaksi tidak ditemukan" });

    const totalHarga = transaksi.detailTransaksis.reduce((sum, item) => sum + item.harga_beli * item.qty, 0);

    response.json({
      id_transaksi: transaksi.id,
      tanggal: transaksi.tanggal,
      items: transaksi.detailTransaksis,
      totalHarga,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
