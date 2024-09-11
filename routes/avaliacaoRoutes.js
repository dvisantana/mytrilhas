const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Avaliações
 *   description: Rotas de gerenciamento de avaliações
 */

/**
 * @swagger
 * /avaliacoes:
 *   post:
 *     summary: Adicionar uma avaliação a uma trilha
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: number
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: "Excelente trilha!"
 *               trilhaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Trilha não encontrada
 *       500:
 *         description: Erro ao criar a avaliação
 */

// Adicionar uma avaliação a uma trilha
router.post('/', auth, avaliacaoController.addAvaliacao);

/**
 * @swagger
 * /avaliacoes/trilha/{id}:
 *   get:
 *     summary: Obter todas as avaliações para uma trilha específica
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da trilha
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Trilha não encontrada
 *       500:
 *         description: Erro ao buscar avaliações
 */
// Obter todas as avaliações para uma trilha
router.get('/trilha/:id', avaliacaoController.getAvaliacoesByTrilha);

/**
 * @swagger
 * /avaliacoes/{id}:
 *   get:
 *     summary: Obter uma avaliação específica
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro ao buscar avaliação
 */
// Obter uma avaliação específica
router.get('/:id', avaliacaoController.getAvaliacaoById);


/**
 * @swagger
 * /avaliacoes/{id}:
 *   put:
 *     summary: Atualizar uma avaliação
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: number
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: "Gostei, mas poderia melhorar."
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Avaliação não encontrada ou permissão negada
 *       500:
 *         description: Erro ao atualizar avaliação
 */
// Atualizar uma avaliação
router.put('/:id', auth, avaliacaoController.updateAvaliacao);


/**
 * @swagger
 * /avaliacoes/{id}:
 *   delete:
 *     summary: Excluir uma avaliação
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da avaliação
 *     responses:
 *       204:
 *         description: Avaliação excluída com sucesso
 *       404:
 *         description: Avaliação não encontrada ou permissão negada
 *       500:
 *         description: Erro ao excluir avaliação
 */

// Excluir uma avaliação
router.delete('/:id', auth, avaliacaoController.deleteAvaliacao);

module.exports = router;