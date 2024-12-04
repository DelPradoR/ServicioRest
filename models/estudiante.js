'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Estudiante extends Model {
        static associate(models) {
             // Relación de muchos a muchos entre Estudiante y Curso
             Estudiante.belongsToMany(models.Curso, {
                through: 'EstudiantesCursos', // Nombre de la tabla intermedia
                foreignKey: 'estudianteId',
                otherKey: 'cursoId',
                as: 'cursos', // Alias definido aquí
            });

            // Relación de muchos a muchos entre Estudiante y Profesor
            Estudiante.belongsToMany(models.Profesor, {
                through: 'EstudiantesProfesores', // Nombre de la tabla intermedia
                foreignKey: 'estudianteId',
                otherKey: 'profesorId',
            });

            
        }
    }

    Estudiante.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        matricula: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        semestreIngreso: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        creditosCursados: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
    }, 
    {
        sequelize,
        modelName: 'Estudiante',
    });

    return Estudiante;
};
