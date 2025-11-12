const express = require('express');
const router2 = express.Router();
const usuariController = require('../controllers/usuariController');

router2.post('/registro', usuariController.registrarse);
router2.post('/login', usuariController.login);

module.exports = router2;