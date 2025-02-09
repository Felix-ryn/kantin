const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
const siswaRoutes = require('./routes/siswaRoutes');
const stanRoutes = require('./routes/stanRoutes');
const menuRoutes = require('./routes/menuRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');
const detailTransaksiRoutes = require('./routes/detail_transaksiRoutes');
const diskonRoutes = require('./routes/diskonRoutes');

app.use('/users', userRoutes);
app.use('/siswa', siswaRoutes);
app.use('/stan', stanRoutes);
app.use('/menu', menuRoutes);
app.use('/transaksi', transaksiRoutes);
app.use('/detail_transaksi', detailTransaksiRoutes);
app.use('/diskon', diskonRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
