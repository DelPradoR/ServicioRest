'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     // Relación de muchos a muchos entre Profesor y Estudiante
     Profesor.belongsToMany(models.Estudiante, {
      through: 'EstudiantesProfesores',
      foreignKey: 'profesorId',
      otherKey: 'estudianteId',
  });

  // Relación de muchos a muchos entre Profesor y Curso
  Profesor.belongsToMany(models.Curso, {
      through: 'CursosProfesores',
      foreignKey: 'profesorId',
      otherKey: 'cursoId',
  });
  
}
}
  Profesor.init({
    nombreProfesor: {
      type: DataTypes.STRING,
      allowNull: false // Este atributo es obligatorio según la migración
    },
    numEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: false, // Este atributo también es obligatorio y debe ser único
      unique: true
    },
    asignatura: {
      type: DataTypes.STRING,
      allowNull: false // Este atributo es obligatorio según la migración
    },
 
  }, 
  {
    sequelize,
    modelName: 'Profesor',
  });

  return Profesor;
};