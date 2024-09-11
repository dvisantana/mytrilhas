const bcrypt = require('bcrypt');
const { Usuario } = require('../models');
const { generateToken } = require('../utils/jwt');

// Função para realizar o login
exports.login = async (req, res) => {
    try {
      const { username, senha } = req.body;
  
      // Verifica se o usuário existe no banco de dados
      const usuario = await Usuario.findOne({ where: { username } });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
  
      // Verifica se a senha está correta
      const isMatch = await bcrypt.compare(senha, usuario.senha);
      if (!isMatch) {
        return res.status(400).json({ error: 'Senha incorreta.' });
      }
  
      // Gera o token JWT para o usuário
      const token = generateToken(usuario.id);
  
      res.status(200).json({ token, usuarioId: usuario.id });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao realizar login', details: err.message });
    }
  };

// Criar um novo usuário normal
exports.createUsuario = async (req, res) => {
  try {
    const { nome, username, senha } = req.body;

    // Verifica se o usuario já existe
    const existingUser = await Usuario.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ error: 'Usuário já registrado.' });

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria um usuário normal (tipo: 'usuario')
    const usuario = await Usuario.create({
      nome,
      username,
      senha: hashedPassword,
      tipo: 'usuario'  // Definindo o papel como "usuario"
    });

    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar usuário', details: err.message });
  }
};

// Criar um novo administrador (apenas admins podem criar)
exports.createAdmin = async (req, res) => {
  try {
    const { nome, username, senha } = req.body;

    // Verifica se o usuario já existe
    const existingUser = await Usuario.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ error: 'Usuário já registrado.' });

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria um administrador (tipo: 'admin')
    const admin = await Usuario.create({
      nome,
      username,
      senha: hashedPassword,
      tipo: 'admin'  // Definindo o papel como "admin"
    });

    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar administrador', details: err.message });
  }
};

// Obter todos os usuários
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: err.message });
  }
};

// Obter um usuário por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: err.message });
  }
};

// Atualizar um usuário
exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, username, senha, tipo } = req.body;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    //if (id != req.usuario.id && req.usuario.tipo !== 'admin') return res.status(403).json({ message: 'Permissão negada.' });

    await usuario.update({ nome, username, senha, tipo });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar usuário', details: err.message });
  }
};

// Excluir um usuário
exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    if (id != req.usuario.id && req.usuario.tipo !== 'admin') return res.status(403).json({ message: 'Permissão negada.' });

    await usuario.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário', details: err.message });
  }
};
