const { Transaksi, DetailTransaksi, Menu, Diskon } = require('../models');

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
        const { id_siswa, id_stan, items } = req.body;

        // Validasi input
        if (!id_siswa || !id_stan || !items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Data tidak lengkap' });
        }

        // Buat transaksi baru
        const transaksi = await Transaksi.create({ id_siswa, id_stan, status: 'belum dikonfirmasi' });

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
                    tanggal_awal: { $lte: new Date() },
                    tanggal_akhir: { $gte: new Date() }
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
                harga_beli: hargaBeli
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
