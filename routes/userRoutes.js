const express = require('express');
const { register, login,getAll } = require('../controllers/userController');
const router = express.Router();


router.get('/', getAll);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
