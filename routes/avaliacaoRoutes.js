const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');
const auth = require('../middlewares/auth');

// Adicionar uma avaliação a uma trilha
router.post('/', auth, avaliacaoController.addAvaliacao);

// Obter todas as avaliações para uma trilha
router.get('/trilha/:id', avaliacaoController.getAvaliacoesByTrilha);

// Obter uma avaliação específica
router.get('/:id', avaliacaoController.getAvaliacaoById);

// Atualizar uma avaliação
router.put('/:id', auth, avaliacaoController.updateAvaliacao);

// Excluir uma avaliação
router.delete('/:id', auth, avaliacaoController.deleteAvaliacao);

module.exports = router;
