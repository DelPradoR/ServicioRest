const { Estudiante, Curso, Profesor } = require('../models');

const estudiantesController = {
    // Obtener todos los estudiantes
    getAllEstudiantes: async (req, res) => {
        try {
            const allEstudiantes = await Estudiante.findAll(); // Usando Sequelize para obtener todos los estudiantes
            res.status(200).json(allEstudiantes);
        } catch (error) {
            console.error('Error al obtener estudiantes:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener un estudiante por ID
    getEstudiante: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const estudiante = await Estudiante.findByPk(id); // Usando Sequelize para buscar el estudiante por ID
            if (estudiante) {
                res.status(200).json(estudiante);
            } else {
                res.status(404).json({ error: 'Estudiante no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener estudiante:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Crear un estudiante
    createEstudiante: async (req, res) => {
        try {
            const { nombre, matricula, semestreIngreso, creditosCursados } = req.body;

            // Validar que todos los campos requeridos estén presentes
            if (!nombre || !matricula || !semestreIngreso || !creditosCursados) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }

            const nuevoEstudiante = await Estudiante.create({
                nombre, matricula, semestreIngreso, creditosCursados
            });

            res.status(201).json(nuevoEstudiante); // Devolver el nuevo estudiante creado
        } catch (error) {
            console.error('Error al agregar estudiante:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Actualizar un estudiante
    updateEstudiante: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const camposActualizados = req.body;
    
            // Validar que al menos un campo esté presente
            if (Object.keys(camposActualizados).length === 0) {
                return res.status(400).json({ error: 'No se han proporcionado campos para actualizar' });
            }
    
            const [updatedRows, estudiantesActualizados] = await Estudiante.update(camposActualizados, { 
                where: { id },
                returning: true 
            });
    
            if (updatedRows > 0) {
                res.status(200).json(estudiantesActualizados[0]); // Retorna el primer estudiante actualizado
            } else {
                res.status(404).json({ error: 'Estudiante no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar estudiante:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Actualizar parcialmente un estudiante
    updateEstudianteParcial: async (req, res) => {
        try {
            const id = parseInt(req.params.id); // Convertir el ID a un número
            const camposActualizados = req.body; // Obtener los campos a actualizar del cuerpo de la solicitud

            const [updatedRows, [updatedEstudiante]] = await Estudiante.update(
                camposActualizados, 
                { where: { id }, returning: true } // Actualizar parcialmente
            );

            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Estudiante no encontrado' });
            }

            res.status(200).json(updatedEstudiante); // Retornar el estudiante actualizado
        } catch (error) {
            console.error('Error al actualizar parcialmente el estudiante:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Eliminar un estudiante
    removeEstudiante: async (req, res) => {
        try {
            const id = parseInt(req.params.id); // Convertir el ID a un número

            const deletedEstudiante = await Estudiante.destroy({ where: { id } }); // Usando Sequelize para eliminar el estudiante

            if (deletedEstudiante === 0) {
                return res.status(404).json({ error: 'Estudiante no encontrado' });
            }

            return res.status(204).send(); // Enviar respuesta sin contenido
        } catch (error) {
            console.error('Error al eliminar estudiante:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener cursos de un estudiante
    getCursosDeEstudiante: async (req, res) => {
        try {
            const estudianteId = parseInt(req.params.estudianteId);
    
            if (!estudianteId) {
                return res.status(400).json({ error: 'Se requiere estudianteId.' });
            }
    
            // Buscamos al estudiante por su ID y le incluimos la relación con los cursos
            const cursosDelEstudiante = await Estudiante.findByPk(estudianteId, {
                include: {
                    model: Curso,
                    as: 'cursos', // Alias definido en el modelo
                    attributes: ['id', 'materia'], // Atributos del curso a incluir
                },
                attributes: ['id', 'nombre'], // Atributos del estudiante a incluir
            });
    
            if (!cursosDelEstudiante) {
                return res.status(404).json({ error: 'Estudiante no encontrado.' });
            }
    
            // Verificar si tiene cursos asignados
            if (!cursosDelEstudiante.cursos || cursosDelEstudiante.cursos.length === 0) {
                return res.status(404).json({ error: 'No se encontraron cursos para este estudiante.' });
            }
    
            // Respuesta con datos del estudiante y sus cursos
            return res.status(200).json({
                estudiante: {
                    id: cursosDelEstudiante.id,
                    nombre: cursosDelEstudiante.nombre,
                },
                cursos: cursosDelEstudiante.cursos.map((curso) => ({
                    id: curso.id,
                    nombre: curso.materia,
                })),
            });
        } catch (error) {
            console.error('Error al obtener cursos del estudiante:', error);
            res.status(500).json({ error: 'Error interno del servidor.' });
        }
    },


    // Agregar un curso a un estudiante
    addCursoToEstudiante: async (req, res) => {
        try {
            const estudianteId = parseInt(req.params.estudianteId);
            const cursoId = parseInt(req.body.cursoId);  // Curso a agregar

            if (!estudianteId || !cursoId) {
                return res.status(400).json({ error: 'Se requieren el ID del estudiante y del curso.' });
            }

            // Buscar al estudiante y agregarle el curso
            const estudiante = await Estudiante.findByPk(estudianteId);
            if (!estudiante) {
                return res.status(404).json({ error: 'Estudiante no encontrado.' });
            }

            const curso = await Curso.findByPk(cursoId);
            if (!curso) {
                return res.status(404).json({ error: 'Curso no encontrado.' });
            }

            // Asociar el curso con el estudiante
            await estudiante.addCurso(curso);  // 'addCurso' es el método generado por Sequelize

            res.status(200).json({ message: 'Curso agregado correctamente al estudiante.' });
        } catch (error) {
            console.error('Error al agregar curso:', error);
            res.status(500).json({ error: 'Error interno del servidor.' });
        }
    },
    consultarProfesoresEstudiante: async (req, res) => {
        try {
          const { id } = req.params;
          const estudiante = await Estudiante.findByPk(id, {
            include: [{
              model: Curso,
              as: 'cursos',
              include: [{
                model: Profesor,
                as: 'Profesors', // Asegúrate de usar el alias correcto
                through: { attributes: [] }
              }]
            }]
          });
      
          if (!estudiante) {
            return res.status(404).json({
              ok: false,
              status: 404,
              error: 'Estudiante no encontrado'
            });
          }
      
          const profesores = estudiante.cursos.flatMap(curso => curso.profesores || []);
          const profesoresUnicos = [...new Set(profesores.map(p => p.id))].map(id => 
            profesores.find(p => p.id === id)
          );
      
          res.status(200).json({
            ok: true,
            status: 200,
            body: profesoresUnicos
          });
        } catch (error) {
          console.error('Error al consultar profesores del estudiante:', error);
          res.status(500).json({
            ok: false,
            status: 500,
            error: 'Error al consultar profesores del estudiante'
          });
        }
      }
};

module.exports = estudiantesController;
