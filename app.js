const express = require('express');
const app = express();
const port = 4000;

const router = require('../EscuelaAPI/routes/index'); // Importar las rutas


app.use(express.json()); // Middleware para parsear solicitudes JSON

// Usar el router definido
app.use(router);

// Iniciar el servidor
app.listen(port, () => {
    console.log('Servidor escuchando por el puerto:', port);
}).on('error', err => {
    console.log('Error al iniciar el servidor:', err);
});