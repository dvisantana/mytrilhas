const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - username
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               username:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro ao criar usuário
 */
// Rota para registrar um usuário
router.post('/register', usuarioController.createUsuario);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       403:
 *         description: Acesso negado (somente administradores)
 *       500:
 *         description: Erro ao buscar usuários
 */
// Rota para obter todos os usuários
router.get('/', auth, authAdmin, usuarioController.getUsuarios);


/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Retorna um usuário por ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *       403:
 *         description: Acesso negado (somente administradores)
 *       500:
 *         description: Erro ao buscar usuário
 */
// Rota para obter um usuário por ID
router.get('/:id', auth, authAdmin, usuarioController.getUsuarioById);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - senha
 *             properties:
 *               username:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 usuarioId:
 *                   type: integer
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Senha incorreta
 *       500:
 *         description: Erro ao realizar login
 */
// Rota para login
router.post('/login', usuarioController.login);

/**
 * @swagger
 * /usuarios/admins:
 *   post:
 *     summary: Criar um administrador
 *     tags: [Usuários]
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
 *               - username
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               username:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Usuário já registrado
 *       500:
 *         description: Erro ao criar administrador
 */
// Rota para criar um administrador (protegida, somente admin pode acessar)
router.post('/admins', auth, authAdmin, usuarioController.createAdmin);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               username:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [usuario, admin]
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Erro ao atualizar usuário
 */
// Rota para atualizar um usuario (protegida, somente admin pode acessar)
router.put('/:id', auth, authAdmin, usuarioController.updateUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Excluir um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       403:
 *         description: Permissão negada
 *       500:
 *         description: Erro ao deletar usuário
 */
// Rota para deletar um usuario (protegida, somente admin pode acessar)
router.delete('/:id', auth, authAdmin, usuarioController.deleteUsuario);

module.exports = router;