const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
let db = {};  // Inicializa el objeto db

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        console.log(`Processing file: ${file}`);
        const modelExport = require(path.join(__dirname, file));
        console.log(`Type of export from ${file}: ${typeof modelExport}`);
        
        if (typeof modelExport === 'function') {
            const model = modelExport(sequelize, Sequelize.DataTypes);
            db[model.name] = model; // Asignar el modelo al objeto db
        } else {
            console.error(`Error: ${file} does not export a function`);
        }
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; // Exporta correctamente el objeto db
