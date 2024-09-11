const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

// Rota para registrar um usuário
router.post('/register', usuarioController.createUsuario);

// Rota para login
router.post('/login', usuarioController.login);

// Rota para criar um administrador (protegida, somente admin pode acessar)
router.post('/admins', auth, authAdmin, usuarioController.createAdmin);

// Rota para atualizar um usuario (protegida, somente admin pode acessar)
router.put('/:id', auth, authAdmin, usuarioController.updateUsuario);

// Rota para deletar um usuario (protegida, somente admin pode acessar)
router.delete('/:id', auth, authAdmin, usuarioController.deleteUsuario);

module.exports = router;
