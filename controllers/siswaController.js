const { Siswa } = require('../models');

const { Siswa } = require('../models');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

exports.registerSiswa = async (req, res) => {
    try {
        let data = {
            nama_siswa: req.body.nama_siswa,
            alamat: req.body.alamat,
            username: req.body.username,
            password: md5(req.body.password)
        };
        const siswa = await Siswa.create(data);
        res.status(201).json({
            message: 'Siswa registered successfully',
            siswa
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginSiswa = async (req, res) => {
    try {
        let data = req.body;
        const siswa = await Siswa.findOne({ where: { username: data.username } });
        if (!siswa || siswa.password !== md5(data.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: siswa.id, role: 'siswa' }, 'secretKey', { expiresIn: '24h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ==================================================================================================================v//

exports.getAll = async (req, res) => {
    try {
        const data = await Siswa.findAll();
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
        let data = req.body;
        const newData = await Siswa.create(data);
        res.status(201).json({ 
            message: 'Data created successfully', 
            newData 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        let data = req.body;
        const updated = await Siswa.update(data, { where: { id: req.params.id } });
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
        await Siswa.destroy({ where: { id: req.params.id } });
        res.json({ 
            message: 'Data deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
