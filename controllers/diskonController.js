const { Diskon, Stan, Menu } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const data = await Diskon.findAll();
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
        let { nama_diskon, persentase_diskon, tanggal_awal, tanggal_akhir, id_stan, menu_ids } = req.body;

        // Cek apakah stan dengan id_stan ada
        const stan = await Stan.findByPk(id_stan);
        if (!stan) {
            return res.status(404).json({ error: "Stan tidak ditemukan" });
        }

        // Cek apakah semua menu yang diberikan benar-benar milik stan tersebut
        const menus = await Menu.findAll({ where: { id: menu_ids, id_stan } });
        if (menus.length !== menu_ids.length) {
            return res.status(400).json({ error: "Beberapa menu tidak valid atau tidak dimiliki oleh stan ini" });
        }

        // Buat diskon baru
        const newDiskon = await Diskon.create({
            nama_diskon,
            persentase_diskon,
            tanggal_awal,
            tanggal_akhir,
            id_stan
        });

        // Hubungkan diskon dengan menu yang valid
        await newDiskon.setMenus(menus);

        // Ambil nama menu yang dipilih
        const menuNames = menus.map(menu => menu.nama_makanan).join(', ');

        res.status(201).json({ 
            message: `Diskon berhasil dibuat untuk menu: ${menuNames}`, 
            newDiskon 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.update = async (req, res) => {
    try {
        let data = req.body;
        const updated = await Diskon.update(data, { where: { id: req.params.id } });
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
        await Diskon.destroy({ where: { id: req.params.id } });
        res.json({ 
            message: 'Data deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
