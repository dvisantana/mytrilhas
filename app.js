const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const usuarioRoutes = require('./routes/usuarioRoutes');
const trilhaRoutes = require('./routes/trilhaRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
const installRoutes = require('./routes/installRoutes');

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/trilhas', trilhaRoutes);
app.use('/avaliacoes', avaliacaoRoutes);
app.use('/install', installRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
