const express = require('express');
const router = express.Router();
const installController = require('../controllers/installController');

/**
 * @swagger
 * tags:
 *   name: Instalação
 *   description: Rota para instalação do banco de dados
 */

/**
 * @swagger
 * /install:
 *   get:
 *     summary: Instalar e popular o banco de dados
 *     tags: [Instalação]
 *     responses:
 *       200:
 *         description: Banco de dados instalado e populado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banco de dados instalado e populado com sucesso! =D
 *       500:
 *         description: Erro ao instalar o banco de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao instalar o banco de dados
 *                 details:
 *                   type: string
 *                   example: Detalhes do erro
 */
// Rota para instalar o banco de dados
router.get('/', installController.installDatabase);

module.exports = router;