const { Profesor, Curso, Estudiante } = require('../models'); // Asegúrate de importar todos los modelos necesarios

const profesoresController = {
    // Obtener todos los profesores
    getAllProfesores: async (req, res) => {
        try {
            const allProfesores = await Profesor.findAll(); // Usar Sequelize para obtener todos los profesores
            res.status(200).json(allProfesores);
        } catch (error) {
            console.error('Error al obtener profesores:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener un profesor por ID
    getProfesor: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const profesor = await Profesor.findByPk(id); // Usar Sequelize para buscar por ID
            if (profesor) {
                res.status(200).json(profesor);
            } else {
                res.status(404).json({ error: 'Profesor no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener profesor:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Crear un profesor
    createProfesor: async (req, res) => {
        try {
            const { nombreProfesor, numEmpleado, asignatura } = req.body;
    
            // Validar que todos los campos requeridos estén presentes
            if (!nombreProfesor || !numEmpleado || !asignatura) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }
    
            const nuevoProfesor = await Profesor.create({
                nombreProfesor, numEmpleado, asignatura
            });
    
            res.status(201).json(nuevoProfesor);
        } catch (error) {
            console.error('Error al agregar profesor:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    updateProfesor: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { nombreProfesor, numEmpleado, asignatura } = req.body;
    
            // Validar que todos los campos requeridos estén presentes
            if (!nombreProfesor || !numEmpleado || !asignatura) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }
    
            // Verificar si el profesor existe
            const profesorOriginal = await Profesor.findByPk(id);
            if (!profesorOriginal) {
                return res.status(404).json({ error: 'Profesor no encontrado' });
            }
    
            // Verificar si el nuevo numEmpleado ya está en uso
            if (profesorOriginal.numEmpleado !== numEmpleado) {
                const existeOtroProfesor = await Profesor.findOne({ where: { numEmpleado } });
                if (existeOtroProfesor) {
                    return res.status(400).json({ error: 'El numEmpleado ya está en uso por otro profesor' });
                }
            }
    
            const [updatedRows] = await Profesor.update(
                { nombreProfesor, numEmpleado, asignatura },
                { where: { id }, returning: true }
            );
    
            if (updatedRows > 0) {
                const profesorActualizado = await Profesor.findByPk(id);
                res.status(200).json(profesorActualizado);
            } else {
                res.status(404).json({ error: 'Profesor no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar profesor:', error);
            
            // Manejo de errores específicos
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Violación de restricción única' });
            }
    
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    updateProfesorParcial: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const camposActualizados = req.body;
    
            // Validar que al menos un campo esté presente
            if (Object.keys(camposActualizados).length === 0) {
                return res.status(400).json({ error: 'No se han proporcionado campos para actualizar' });
            }
    
            // Verificar si el profesor existe
            const profesorOriginal = await Profesor.findByPk(id);
            if (!profesorOriginal) {
                return res.status(404).json({ error: 'Profesor no encontrado' });
            }
    
            // Actualizar el profesor
            const [updatedRows] = await Profesor.update(camposActualizados, { 
                where: { id },
                returning: true 
            });
    
            if (updatedRows > 0) {
                const profesorActualizado = await Profesor.findByPk(id);
                res.status(200).json(profesorActualizado);
            } else {
                res.status(404).json({ error: 'Profesor no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar parcialmente el profesor:', error);
            
            // Manejo de errores específicos
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Violación de restricción única' });
            }
    
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    // Eliminar un profesor
    removeProfesor: async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const deletedRows = await Profesor.destroy({ where: { id } });

            if (deletedRows > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Profesor no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar profesor:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getCursosDeProfesor: async (req, res) => {
        try {
            const profesorId = parseInt(req.params.profesorId);
    
            if (!profesorId) {
                return res.status(400).json({ error: 'Se requiere profesorId.' });
            }
    
            const profesor = await Profesor.findByPk(profesorId, {
                include: {
                    model: Curso,
                    as: 'Cursos', // Change 'cursos' to 'Cursos'
                    attributes: ['id', 'materia', 'grupo']
                }
            });
    
            if (!profesor) {
                return res.status(404).json({ error: 'Profesor no encontrado.' });
            }
    
            res.status(200).json(profesor.Cursos || []); // Change 'cursos' to 'Cursos'
        } catch (error) {
            console.error('Error al obtener cursos del profesor:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

};

module.exports = profesoresController;
