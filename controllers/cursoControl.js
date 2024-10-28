
const cursosModule = require('../models/cursoModel');

const getAllCursos = (req, res) => {
    const allCursos = cursosModule.findAll(); // Usa el método del módulo
    res.status(200).json(allCursos);
};

// Obtener un curso por ID
const getCurso = (req, res) => {
    const id = parseInt(req.params.id);
    const curso = cursosModule.findById(id); // Usa el método del módulo
    if (curso) {
        res.status(200).json(curso);
    } else {
        res.status(404).json({ error: 'Curso no encontrado' });
    }
};

const createCurso = (req, res) => {
    try {
        const { id, materia, claveDMateria,grupo} = req.body;
        // Validar que todos los campos requeridos estén presentes
        if ( !id || !claveDMateria|| !materia|| !grupo) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Usar el método addEstudiante para agregar el nuevo estudiante
        const nuevoCurso = { id, materia, claveDMateria,grupo };
        const resultado = cursosModule.addCurso(nuevoCurso);

        if (!resultado) {
            return res.status(409).json({ error: 'Ya existe un curso con ese ID' });
        }

        res.status(201).json(resultado); 
    } catch (error) {
        console.error('Error al agregar curso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateCurso = (req, res) => {
    const id = parseInt(req.params.id); // Convertir el ID a un número
    const datosActualizados = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

    // Llamar al método para actualizar el estudiante
    const registroActualizado = cursosModule.updateCurso(id, datosActualizados);

    if (registroActualizado) {
        res.status(200).json(registroActualizado); // Retornar el  curso actualizado
    } else {
        res.status(404).json({ error: 'Curso no encontrado' }); // Manejo de error si no se encuentra
    }
};


// Función para actualizar parcialmente un curso por ID
const updateCursoParcial = (req, res) => {
    const id = parseInt(req.params.id); // Convertir el ID a un número
    const camposActualizados = req.body; // Obtener los campos a actualizar del cuerpo de la solicitud

    // Llamar al método para actualizar parcialmente el curso
    const resultado = cursosModule.updateCursoParcial(id, camposActualizados);

    if (resultado) {
        res.status(200).json(resultado); // Retornar el curso
    } else {
        res.status(404).json({ error: 'Curso no encontrado' }); // Manejo de error si no se encuentra
    }
};
const removeCurso = (req, res) => {
    const id = parseInt(req.params.id); // Convertir el ID a un número

    // Llamar al método para eliminar el curso
    const eliminado = cursosModule.removeCurso(id);

    if (eliminado) {
        return res.status(204).send(); // Enviar respuesta sin contenido
    } else {
        return res.status(404).json({ error: 'Curso no encontrado' }); // Manejo de error si no se encuentra
    }
};

const inscribirEstudianteEnCurso = (req, res) => {
    const { cursoId, estudianteId } = req.body; // Obtener los IDs del cuerpo de la solicitud

    if (!cursoId || !estudianteId) {
        return res.status(400).json({ error: 'Se requieren cursoId y estudianteId.' });
    }

    // Llamar a la función del modelo para inscribir al estudiante
    if (cursosModule.inscribirEstudiante(cursoId, estudianteId)) {
        return res.status(200).json({ message: `Estudiante ${estudianteId} inscrito en el curso ${cursoId}.` });
    } else {
        return res.status(404).json({ error: 'Curso no encontrado o estudiante ya inscrito.' });
    }
};

const eliminarEstudianteEnCurso = (req, res) => {
    const { cursoId, estudianteId } = req.body; // Obtener los IDs del cuerpo de la solicitud

    if (!cursoId || !estudianteId) {
        return res.status(400).json({ error: 'Se requieren cursoId y estudianteId.' });
    }

    // Llamar a la función del modelo para eliminar al estudiante
    if (cursosModule.eliminarEstudianteDeCurso(cursoId, estudianteId)) {
        return res.status(200).json({ message: `Estudiante ${estudianteId} eliminado del curso ${cursoId}.` });
    } else {
        return res.status(404).json({ error: 'Curso no encontrado o estudiante no inscrito.' });
    }
};
const asociarProfesorEnCurso = (req, res) => {
    const { cursoId, profesorId } = req.body; // Obtener los IDs del cuerpo de la solicitud

    if (!cursoId || !profesorId) {
        return res.status(400).json({ error: 'Se requieren cursoId y profesorId.' });
    }

    // Llamar a la función del modelo para asociar al profesor
    if (cursosModule.asociarProfesorACurso(cursoId, profesorId)) {
        return res.status(200).json({ message: `Profesor ${profesorId} asociado al curso ${cursoId}.` });
    } else {
        return res.status(404).json({ error: 'Curso no encontrado.' });
    }
};
const eliminarProfesorEnCurso = (req, res) => {
    const { cursoId } = req.body; // Obtener el ID del cuerpo de la solicitud

    if (!cursoId) {
        return res.status(400).json({ error: 'Se requiere cursoId.' });
    }

    // Llamar a la función del modelo para eliminar al profesor
    if (cursosModule.eliminarProfesorDeCurso(cursoId)) {
        return res.status(200).json({ message: `Profesor eliminado del curso ${cursoId}.` });
    } else {
        return res.status(404).json({ error: 'Curso no encontrado.' });
    }
};

// Exportar funciones para su uso en las rutas
exports.createCurso = createCurso;
exports.updateCurso = updateCurso;
exports.removeCurso = removeCurso;
exports.updateCursoParcial = updateCursoParcial;
exports.getAllCursos = getAllCursos;
exports.getCurso = getCurso;

// Exportar las nuevas funciónes
exports.inscribirEstudianteEnCurso = inscribirEstudianteEnCurso;
exports.eliminarEstudianteEnCurso = eliminarEstudianteEnCurso;
exports.asociarProfesorEnCurso = asociarProfesorEnCurso;
exports.eliminarProfesorEnCurso = eliminarProfesorEnCurso;