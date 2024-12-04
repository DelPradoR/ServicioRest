'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Curso extends Model {
        static associate(models) {
              // Relación de muchos a muchos entre Curso y Estudiante
              Curso.belongsToMany(models.Estudiante, {
                through: 'EstudiantesCursos',
                foreignKey: 'cursoId',
                otherKey: 'estudianteId',
            });

            // Relación de muchos a muchos entre Curso y Profesor
            Curso.belongsToMany(models.Profesor, {
                through: 'CursosProfesores',
                foreignKey: 'cursoId',
                otherKey: 'profesorId',
              });

        }
    }
    Curso.init({
        materia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        claveDMateria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        grupo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creditos: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
    }, {
        sequelize,
        modelName: 'Curso',
    });

    return Curso;
};
