const { Transaksi, DetailTransaksi, Menu, Diskon } = require('../models');
const { Op } = require('sequelize');
exports.getAll = async (req, res) => {
    try {
        const data = await Transaksi.findAll();
        res.json({ 
            message: 'Data retrieved successfully', 
            data 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { id_siswa, id_stan, items, tanggal } = req.body;

        // Validasi input
        if (!id_siswa || !id_stan || !items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Data tidak lengkap' });
        }

        // Buat transaksi baru
        const transaksi = await Transaksi.create({ tanggal, id_siswa, id_stan, status: 'belum dikonfirmasi' });

        let totalHarga = 0;
        for (let item of items) {
            const menu = await Menu.findByPk(item.id_menu);
            if (!menu) {
                return res.status(404).json({ error: `Menu dengan ID ${item.id_menu} tidak ditemukan` });
            }

            let hargaBeli = menu.harga;
            
            // Cek diskon yang berlaku
            const diskon = await Diskon.findOne({
                where: {
                  id_stan,
                  tanggal_awal: { [Op.lte]: tanggal},
                  tanggal_akhir: { [Op.gte]: tanggal}
                }
              });
            
            if (diskon) {
                hargaBeli -= (hargaBeli * diskon.persentase_diskon) / 100;
            }
            
            totalHarga += hargaBeli * item.qty;
            
            // Simpan detail transaksi
            await DetailTransaksi.create({
                id_transaksi: transaksi.id,
                id_menu: item.id_menu,
                qty: item.qty,
                harga_beli: totalHarga, 
            });
        }
        

        res.status(201).json({
            message: 'Transaksi berhasil dibuat',
            transaksi,
            totalHarga
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        let data = req.body;
        const updated = await Transaksi.update(data, { where: { id: req.params.id } });
        res.json({ 
            message: 'Data updated successfully', 
            updated 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Transaksi.destroy({ where: { id: req.params.id } });
        res.json({ 
            message: 'Data deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBySiswa = async (req, res) => {
    try {
        const { id_siswa } = req.params;

        const transaksi = await Transaksi.findAll({
            where: { id_siswa },
            include: [
                {
                    model: DetailTransaksi,
                    as: 'detail_transaksis',
                    include: [
                        {
                            model: Menu,
                            as: 'menu'
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json({
            message: 'Data transaksi siswa berhasil diambil',
            transaksi
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHistoriByBulan = async (req, res) => {
    try {
      const { id_siswa } = req.params;
      const { bulan, tahun } = req.query;
  
      if (!bulan || !tahun) {
        return res.status(400).json({ error: 'Bulan dan tahun harus diisi' });
      }
  
      // Buat range tanggal awal dan akhir untuk bulan & tahun yang diminta
      const tanggalAwal = new Date(tahun, bulan - 1, 1); // bulan dikurangi 1 karena index 0
      const tanggalAkhir = new Date(tahun, bulan, 0, 23, 59, 59); // hari terakhir bulan
  
      const histori = await Transaksi.findAll({
        where: {
          id_siswa,
          tanggal: {
            [require('sequelize').Op.between]: [tanggalAwal, tanggalAkhir]
          }
        },
        include: [
          {
            model: DetailTransaksi,
            as: 'detail_transaksis',
            include: [
              {
                model: Menu,
                as: 'menu'
              }
            ]
          }
        ],
        order: [['tanggal', 'DESC']]
      });
  
      res.json({
        message: 'Histori transaksi berhasil diambil',
        histori
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const allowedStatus = ['belum dikonfirmasi', 'dimasak', 'diantar', 'sampai'];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ error: 'Status tidak valid' });
      }
  
      await Transaksi.update({ status }, { where: { id } });
  
      res.json({ message: 'Status pesanan berhasil diperbarui' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getPesananByBulan = async (req, res) => {
    try {
      const { id_stan } = req.params;
      const { bulan, tahun } = req.query;
  
      if (!bulan || !tahun) {
        return res.status(400).json({ error: 'Bulan dan tahun harus diisi' });
      }
  
      const tanggalAwal = new Date(tahun, bulan - 1, 1);
      const tanggalAkhir = new Date(tahun, bulan, 0, 23, 59, 59);
  
      const pesanan = await Transaksi.findAll({
        where: {
          id_stan,
          tanggal: {
            [require('sequelize').Op.between]: [tanggalAwal, tanggalAkhir]
          }
        },
        include: [
          {
            model: DetailTransaksi,
            as: 'detail_transaksis',
            include: [{ model: Menu, as: 'menu' }]
          }
        ]
      });
  
      res.json({ message: 'Data pesanan berhasil diambil', pesanan });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getPemasukanBulanan = async (req, res) => {
    try {
      const { id_stan } = req.params;
      const { bulan, tahun } = req.query;
  
      const tanggalAwal = new Date(tahun, bulan - 1, 1);
      const tanggalAkhir = new Date(tahun, bulan, 0, 23, 59, 59);
  
      const transaksi = await Transaksi.findAll({
        where: {
          id_stan,
          tanggal: {
            [require('sequelize').Op.between]: [tanggalAwal, tanggalAkhir]
          }
        },
        include: [
          {
            model: DetailTransaksi,
            as: 'detail_transaksis'
          }
        ]
      });
  
      let total = 0;
      transaksi.forEach(t => {
        t.detail_transaksis.forEach(d => {
          total += d.harga_beli * d.qty;
        });
      });
  
      res.json({ message: 'Rekap pemasukan berhasil', total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  