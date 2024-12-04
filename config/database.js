const { Sequelize } = require('sequelize');
const config = require('./config.json'); // Asegúrate de que la ruta sea correcta

// Obtén el entorno actual (por defecto será 'development')
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Crea una nueva instancia de Sequelize utilizando la configuración del entorno
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

module.exports = sequelize;