const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conexión a la base de datos exitosa');
});

app.use(express.json());

app.use('/api', require('./routes/students'));
app.use('/api', require('./routes/periods'));
app.use('/api', require('./routes/courses'));
app.use('/api', require('./routes/dashboard'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
