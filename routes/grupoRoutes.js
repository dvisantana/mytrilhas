const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

// Criar um novo grupo
router.post('/', auth, authAdmin, grupoController.createGrupo);

// Listar todos os grupos
router.get('/', grupoController.getGrupos);

// Obter detalhes de um grupo específico
router.get('/:id', grupoController.getGrupoById);

// Atualizar um grupo
router.put('/:id', auth, authAdmin, grupoController.updateGrupo);

// Excluir um grupo
router.delete('/:id', auth, authAdmin, grupoController.deleteGrupo);

// Adicionar um usuário ao grupo
router.post('/addUsuario', auth, authAdmin, grupoController.addUsuarioToGrupo);

// Remover um usuário do grupo
router.post('/removeUsuario', auth, authAdmin, grupoController.removeUsuarioFromGrupo);

// Adicionar uma trilha ao grupo
router.post('/addTrilha', auth, authAdmin, grupoController.addTrilhaToGrupo);

// Remover uma trilha do grupo
router.post('/removeTrilha', auth, authAdmin, grupoController.removeTrilhaFromGrupo);

module.exports = router;
