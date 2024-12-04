const { Curso, Profesor, Estudiante } = require('../models');

const cursosController = {
    // Obtener todos los cursos
    getAllCursos: async (req, res) => {
        try {
            const results = await Curso.findAll(); // Obtén todos los cursos
            res.status(200).json({
                ok: true,
                status: 200,
                body: results
            });
        } catch (error) {
            console.error('Error al obtener cursos:', error);
            res.status(500).json({
                ok: false,
                status: 500,
                error: 'Error al obtener cursos'
            });
        }
    },
    getCurso: async (req, res) => {
        try {
            const { id } = req.params; // Obtén el ID del curso desde los parámetros de la solicitud

            // Busca el curso por ID (clave primaria)
            const curso = await Curso.findByPk(id); // findByPk busca por la clave primaria (id)

            if (!curso) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    error: 'Curso no encontrado',
                });
            }

            // Devuelve el curso encontrado
            res.status(200).json({
                ok: true,
                status: 200,
                body: curso, // Devuelve el curso encontrado
            });
        } catch (error) {
            console.error('Error al obtener el curso:', error);
            res.status(500).json({
                ok: false,
                status: 500,
                error: 'Error al obtener el curso',
            });
        }
    },

    // Crear un nuevo curso
    createCurso: async (req, res) => {
        try {
            const { materia, claveDMateria, grupo, creditos } = req.body; // Extrae los datos del cuerpo de la solicitud
            
            // Crea un nuevo curso usando el modelo Curso
            const newCurso = await Curso.create({
                materia,
                claveDMateria,
                grupo,
                creditos
            });

            // Responde con el nuevo curso creado
            res.status(201).json({
                ok: true,
                status: 201,
                body: newCurso // Devuelve el curso recién creado
            });
        } catch (error) {
            console.error('Error al crear curso:', error);
            res.status(500).json({
                ok: false,
                status: 500,
                error: 'Error al crear el curso'
            });
        }
    },

    removeCurso: async (req, res) => {
        try {
            const { id } = req.params; // Obtén el ID del curso desde los parámetros de la solicitud

            // Busca el curso en la base de datos
            const curso = await Curso.findByPk(id); // findByPk busca por la clave primaria (id)

            if (!curso) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    error: 'Curso no encontrado',
                });
            }

            // Elimina el curso de la base de datos
            await curso.destroy();

            // Responde con un mensaje de éxito
            res.status(204).json({
                ok: true,
                status: 204,
                message: 'Curso eliminado exitosamente',
            });
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
            res.status(500).json({
                ok: false,
                status: 500,
                error: 'Error al eliminar el curso',
            });
        }
    },

    //actualizarCurso
    updateCurso: async (req, res) => {
        try {
            const { id } = req.params; // Obtén el ID del curso desde los parámetros
            const { materia, claveDMateria, grupo, creditos } = req.body; // Extrae los datos del cuerpo de la solicitud

            // Encuentra el curso por ID
            const curso = await Curso.findByPk(id);

            // Si no se encuentra el curso
            if (!curso) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    error: 'Curso no encontrado',
                });
            }

            // Actualiza los campos del curso con los datos proporcionados
            curso.materia = materia || curso.materia;
            curso.claveDMateria = claveDMateria || curso.claveDMateria;
            curso.grupo = grupo || curso.grupo;
            curso.creditos = creditos || curso.creditos;

            // Guarda los cambios
            await curso.save();

            // Responde con el curso actualizado
            res.status(200).json({
                ok: true,
                status: 200,
                body: curso, // Devuelve el curso actualizado
            });
        } catch (error) {
            console.error('Error al actualizar el curso:', error);
            res.status(500).json({
                ok: false,
                status: 500,
                error: 'Error al actualizar el curso',
            });
        }
    },
    updateCursoParcial: async (req, res) => {
        try {
            const { id } = req.params; // Obtén el ID del curso desde los parámetros
            const { materia, claveDMateria, grupo, creditos } = req.body; // Extrae los datos del cuerpo de la solicitud

            // Encuentra el curso por ID
            const curso = await Curso.findByPk(id);

            // Si no se encuentra el curso
            if (!curso) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    error: 'Curso no encontrado',
                });
            }

            // Actualiza solo los campos que están presentes en el cuerpo de la solicitud
            if (materia) curso.materia = materia;
            if (claveDMateria) curso.claveDMateria = claveDMateria;
            if (grupo) curso.grupo = grupo;
            if (creditos) curso.creditos = creditos;

            // Guarda los cambios
            await curso.save();

            // Responde con el curso actualizado
            res.status(200).json({
                ok: true,
                status: 200,
                body: curso, // Devuelve el curso actualizado
            });
        } catch (error) {
            console.error('Error al actualizar parcialmente el curso:', error);
            res.status(500).json({
                ok: false,
                status: 500,
                error: 'Error al actualizar el curso',
            });
        }
    },

    inscribirProfesor: async (req, res) => {
        try {
            const { cursoId, profesorId } = req.body;
            const curso = await Curso.findByPk(cursoId);
            const profesor = await Profesor.findByPk(profesorId);
    
            if (!curso || !profesor) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    error: 'Curso o profesor no encontrado',
                });
            }
    
            // Cambie esta línea
            await curso.addProfesor(profesor);
    
            res.status(200).json({
                ok: true,
                status: 200,
                message: 'Profesor inscrito al curso exitosamente',
            });
        } catch (error) {
            console.error('Error al inscribir profesor al curso:', error);
            res.status(500).json({
                ok: false,
                status: 500,
                error: 'Error al inscribir profesor al curso',
            });
        }
    },

  inscribirAlumno: async (req, res) => {
    try {
      const { cursoId, estudianteId } = req.body;
      const curso = await Curso.findByPk(cursoId);
      const estudiante = await Estudiante.findByPk(estudianteId);

      if (!curso || !estudiante) {
        return res.status(404).json({
          ok: false,
          status: 404,
          error: 'Curso o estudiante no encontrado',
        });
      }

      await curso.addEstudiante(estudiante);

      res.status(200).json({
        ok: true,
        status: 200,
        message: 'Estudiante inscrito al curso exitosamente',
      });
    } catch (error) {
      console.error('Error al inscribir estudiante al curso:', error);
      res.status(500).json({
        ok: false,
        status: 500,
        error: 'Error al inscribir estudiante al curso',
      });
    }
  },

  consultarEstudiantesInscritos: async (req, res) => {
    try {
      const { id } = req.params;
      const curso = await Curso.findByPk(id, {
        include: [{ model: Estudiante, through: { attributes: [] } }],
      });

      if (!curso) {
        return res.status(404).json({
          ok: false,
          status: 404,
          error: 'Curso no encontrado',
        });
      }

      res.status(200).json({
        ok: true,
        status: 200,
        body: curso.Estudiantes,
      });
    } catch (error) {
      console.error('Error al consultar estudiantes inscritos:', error);
      res.status(500).json({
        ok: false,
        status: 500,
        error: 'Error al consultar estudiantes inscritos',
      });
    }
  },

  consultarProfesorAsignado: async (req, res) => {
    try {
      const { id } = req.params;
      const curso = await Curso.findByPk(id, {
        include: [{ model: Profesor, through: { attributes: [] } }],
      });
  
      if (!curso) {
        return res.status(404).json({
          ok: false,
          status: 404,
          error: 'Curso no encontrado',
        });
      }
  
      if (!curso.Profesores || curso.Profesores.length === 0) {
        return res.status(200).json({
          ok: true,
          status: 200,
          body: null,
          message: 'No hay profesor asignado a este curso',
        });
      }
  
      res.status(200).json({
        ok: true,
        status: 200,
        body: curso.Profesores[0],
      });
    } catch (error) {
      console.error('Error al consultar profesor asignado:', error);
      res.status(500).json({
        ok: false,
        status: 500,
        error: 'Error al consultar profesor asignado',
      });
    }
  }
};


module.exports = cursosController;
