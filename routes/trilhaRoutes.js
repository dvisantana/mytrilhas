const express = require('express');
const router = express.Router();
const trilhaController = require('../controllers/trilhaController');
const auth = require('../middlewares/auth');

// Criar uma nova trilha
router.post('/', auth, trilhaController.createTrilha);

// Listar todas as trilhas
router.get('/', auth, trilhaController.getTrilhas);

// Obter detalhes de uma trilha específica
router.get('/:id', auth, trilhaController.getTrilhaById);

// Atualizar uma trilha
router.put('/:id', auth, trilhaController.updateTrilha);

// Excluir uma trilha
router.delete('/:id', auth, trilhaController.deleteTrilha);

module.exports = router;
