const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

// Rota para registrar um usuário
router.post('/register', usuarioController.register);

// Rota para login
router.post('/login', usuarioController.login);

// Rota para criar um administrador (protegida, somente admin pode acessar)
router.post('/admins', auth, authAdmin, usuarioController.createAdmin);

module.exports = router;
    