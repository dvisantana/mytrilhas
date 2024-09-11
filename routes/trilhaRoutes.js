const express = require('express');
const router = express.Router();
const trilhaController = require('../controllers/trilhaController');
const auth = require('../middlewares/auth');


// Criar uma nova trilha
router.post('/', auth, trilhaController.createTrilha);

// Listar todas as trilhas
router.get('/', trilhaController.getTrilhas);

// Obter detalhes de uma trilha específica
router.get('/:id', trilhaController.getTrilhaById);

// Atualizar uma trilha
router.put('/:id', auth, trilhaController.updateTrilha);

// Excluir uma trilha
router.delete('/:id', auth, trilhaController.deleteTrilha);


router.get('/trilhas/:id', async (req, res) => {
  try {
    const trilha = await trilhaController.getTrilhaWithAvaliacoes(req.params.id);
    res.json(trilha);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
