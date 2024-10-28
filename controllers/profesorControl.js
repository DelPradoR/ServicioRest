// controllers/profesorControl.js
const profesoresModule = require('../models/profesorModel');

const getAllProfesores = (req, res) => {
    const allProfesores = profesoresModule.findAll(); // Usa el método del módulo
    res.status(200).json(allProfesores);
};

// Obtener un profesor por ID
const getProfesor = (req, res) => {
    const id = parseInt(req.params.id);
    const profesor = profesoresModule.findById(id); // Usa el método del módulo
    if (profesor) {
        res.status(200).json(profesor);
    } else {
        res.status(404).json({ error: 'Profesor no encontrado' });
    }
};

const createProfesor = (req, res) => {
    try {
        const { id, nombre, numEmpleado,asignatura} = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!nombre || !id || !numEmpleado|| !asignatura) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Usar el método addEstudiante para agregar el nuevo estudiante
        const nuevoProfesor = { id, nombre, numEmpleado,asignatura };
        const resultado = profesoresModule.addProfesor(nuevoProfesor);

        if (!resultado) {
            return res.status(409).json({ error: 'Ya existe un profesor con ese ID' });
        }

        res.status(201).json(resultado); // Devolver el nuevo profesor creado
    } catch (error) {
        console.error('Error al agregar profesor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateProfesor = (req, res) => {
    const id = parseInt(req.params.id); // Convertir el ID a un número
    const datosActualizados = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

    // Llamar al método para actualizar el estudiante
    const registroActualizado = profesoresModule.updateProfesor(id, datosActualizados);

    if (registroActualizado) {
        res.status(200).json(registroActualizado); // Retornar el p´rofesor actualizado
    } else {
        res.status(404).json({ error: 'Profesor no encontrado' }); // Manejo de error si no se encuentra
    }
};


// Función para actualizar parcialmente un estudiante por ID
const updateProfesorParcial = (req, res) => {
    const id = parseInt(req.params.id); // Convertir el ID a un número
    const camposActualizados = req.body; // Obtener los campos a actualizar del cuerpo de la solicitud

    // Llamar al método para actualizar parcialmente el estudiante
    const resultado = profesoresModule.updateProfesorParcial(id, camposActualizados);

    if (resultado) {
        res.status(200).json(resultado); // Retornar el estudiante actualizado
    } else {
        res.status(404).json({ error: 'Profesor no encontrado' }); // Manejo de error si no se encuentra
    }
};
const removeProfesor = (req, res) => {
    const id = parseInt(req.params.id); // Convertir el ID a un número

    // Llamar al método para eliminar el estudiante
    const eliminado = profesoresModule.removeProfesor(id);

    if (eliminado) {
        return res.status(204).send(); // Enviar respuesta sin contenido
    } else {
        return res.status(404).json({ error: 'Profesor no encontrado' }); // Manejo de error si no se encuentra
    }
};

const getCursosDeProfesor = (req, res) => {
    const profesorId = parseInt(req.params.profesorId); // Obtener el ID del profesor desde los parámetros de la solicitud

    if (!profesorId) {
        return res.status(400).json({ error: 'Se requiere profesorId.' });
    }

    // Llamar a la función del modelo para obtener los cursos
    const cursosDelProfesor = profesoresModule.obtenerCursosDeProfesor(profesorId);
    
    if (cursosDelProfesor.length > 0) {
        return res.status(200).json(cursosDelProfesor); // Retornar los cursos encontrados
    } else {
        return res.status(404).json({ error: 'No se encontraron cursos para este profesor.' });
    }
};
const getEstudiantesDeProfesor = (req, res) => {
    const profesorId = parseInt(req.params.profesorId); // Obtener el ID del profesor desde los parámetros de la solicitud

    if (!profesorId) {
        return res.status(400).json({ error: 'Se requiere profesorId.' });
    }

    // Llamar a la función del modelo para obtener los estudiantes
    const estudianteIds = profesoresModule.obtenerEstudiantesDeProfesor(profesorId);
    
    if (estudianteIds.length > 0) {
        return res.status(200).json(estudianteIds); // Retornar los IDs encontrados
    } else {
        return res.status(404).json({ error: 'No se encontraron estudiantes para este profesor.' });
    }
};

// Exportar funciones para su uso en las rutas
exports.createProfesor = createProfesor;
exports.updateProfesor = updateProfesor;
exports.removeProfesor = removeProfesor;
exports.updateProfesorParcial = updateProfesorParcial;
exports.getAllProfesores = getAllProfesores;
exports.getProfesor = getProfesor;
// Exportar la nueva función
exports.getCursosDeProfesor = getCursosDeProfesor;
exports.getEstudiantesDeProfesor = getEstudiantesDeProfesor;