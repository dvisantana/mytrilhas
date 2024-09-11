const express = require('express');
const router = express.Router();
const trilhaController = require('../controllers/trilhaController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Trilhas
 *   description: Gerenciamento de trilhas
 */


/**
 * @swagger
 * /trilhas:
 *   post:
 *     summary: Criar uma nova trilha
 *     tags: [Trilhas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - local
 *               - tipo
 *               - dificuldade
 *             properties:
 *               nome:
 *                 type: string
 *               local:
 *                 type: string
 *               tipo:
 *                 type: string
 *               dificuldade:
 *                 type: string
 *     responses:
 *       201:
 *         description: Trilha criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trilha'
 *       400:
 *         description: Erro na criação da trilha
 */
// Criar uma nova trilha
router.post('/', auth, trilhaController.createTrilha);

/**
 * @swagger
 * /trilhas:
 *   get:
 *     summary: Listar todas as trilhas
 *     tags: [Trilhas]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           enum: [5, 10, 30]
 *           default: 10
 *         description: Número de trilhas por página
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *     responses:
 *       200:
 *         description: Lista de trilhas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trilhas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Trilha'
 *                 total:
 *                   type: integer
 *       500:
 *         description: Erro ao buscar trilhas
 */
// Listar todas as trilhas
router.get('/', trilhaController.getTrilhas);

/**
 * @swagger
 * /trilhas/{id}:
 *   get:
 *     summary: Obter detalhes de uma trilha específica
 *     tags: [Trilhas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da trilha
 *     responses:
 *       200:
 *         description: Trilha encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trilha'
 *       404:
 *         description: Trilha não encontrada
 *       500:
 *         description: Erro ao buscar trilha
 */
// Obter detalhes de uma trilha específica
router.get('/:id', trilhaController.getTrilhaById);


/**
 * @swagger
 * /trilhas/{id}:
 *   put:
 *     summary: Atualizar uma trilha
 *     tags: [Trilhas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da trilha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               local:
 *                 type: string
 *               dificuldade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trilha atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trilha'
 *       404:
 *         description: Trilha não encontrada
 *       400:
 *         description: Erro na atualização da trilha
 */
// Atualizar uma trilha
router.put('/:id', auth, trilhaController.updateTrilha);

/**
 * @swagger
 * /trilhas/{id}:
 *   delete:
 *     summary: Excluir uma trilha
 *     tags: [Trilhas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da trilha
 *     responses:
 *       204:
 *         description: Trilha excluída com sucesso
 *       404:
 *         description: Trilha não encontrada
 *       500:
 *         description: Erro ao excluir trilha
 */
// Excluir uma trilha
router.delete('/:id', auth, trilhaController.deleteTrilha);

/**
 * @swagger
 * /trilhas/{id}/avaliacoes:
 *   get:
 *     summary: Obter todas as avaliações de uma trilha
 *     tags: [Trilhas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da trilha
 *     responses:
 *       200:
 *         description: Avaliações da trilha retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avaliacoes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Trilha não encontrada
 *       500:
 *         description: Erro ao buscar avaliações
 */
// Buscar por todas avaliacoes da uma trilha especifica
router.get('/:id/avaliacoes', trilhaController.getTrilhaWithAvaliacoes);

module.exports = router;