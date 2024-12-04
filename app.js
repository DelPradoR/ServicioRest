const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

// Rutas de los certificados
const keyPath = path.resolve(__dirname, '../EscuelaAPI_SQ/key.pem');
const certPath = path.resolve(__dirname, '../EscuelaAPI_SQ/cert.pem');

// Verificar la existencia de los archivos de clave y certificado
if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    console.error('Los archivos de clave o certificado no se encuentran.');
    process.exit(1);
}

// Configuración de opciones para HTTPS
const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
};

// Crear el servidor HTTPS
const server = https.createServer(options, app);

// Habilitar CORS
app.use(cors());

// Importar las rutas y modelos
const router = require('../EscuelaAPI_SQ//routes'); // Ajusta según tu estructura
const database = require('./models'); // Importa solo una vez

// Middleware para parsear solicitudes JSON
app.use(express.json());

// Usar el router definido
app.use(router);

// Conectar y sincronizar la base de datos
database.sequelize
    .authenticate()
    .then(() => console.log('Conexión establecida correctamente con la base de datos.'))
    .catch(err => console.error('Error al conectar con la base de datos:', err));

database.sequelize
    .sync({ force: false }) // Usa 'force: true' solo en desarrollo si necesitas recrear las tablas.
    .then(() => console.log('Tablas sincronizadas.'))
    .catch(err => console.error('Error al sincronizar tablas:', err));

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
