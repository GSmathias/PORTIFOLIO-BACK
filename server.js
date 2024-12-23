const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors()); // Permite todas as origens


// Configuração do Body-Parser
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'portfolio',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

// Rota para lidar com o envio do formulário
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send({ error: 'Todos os campos são obrigatórios!' });
    }

    const query = 'INSERT INTO contatos (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Erro ao salvar no banco de dados.' });
        }
        res.status(200).send({ success: 'Mensagem enviada com sucesso!' });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});