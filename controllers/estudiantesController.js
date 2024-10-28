// controllers/estudiantesController.js
const estudiantesModule = require('../models/estudiantesModel');




// Obtener todos los estudiantes
const getAllEstudiantes = (req, res) => {
    const allEstudiantes = estudiantesModule.findAll(); // Usa el método del módulo
    res.status(200).json(allEstudiantes);
};

// Obtener un estudiante por ID
const getEstudiante = (req, res) => {
    const id = parseInt(req.params.id);
    const estudiante = estudiantesModule.findById(id); // Usa el método del módulo
    if (estudiante) {
        res.status(200).json(estudiante);
    } else {
        res.status(404).json({ error: 'Estudiante no encontrado' });
    }
};

const createEstudiante = (req, res) => {
    try {
        const { id, nombre, matricula, semestreIngreso, creditosCursados } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!nombre || !id || !matricula || !semestreIngreso || !creditosCursados) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Usar el método addEstudiante para agregar el nuevo estudiante
        const nuevoEstudiante = { id, nombre, matricula, semestreIngreso, creditosCursados };
        const resultado = estudiantesModule.addEstudiante(nuevoEstudiante);

        if (!resultado) {
            return res.status(409).json({ error: 'Ya existe un estudiante con ese ID' });
        }

        res.status(201).json(resultado); // Devolver el nuevo estudiante creado
    } catch (error) {
        console.error('Error al agregar estudiante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateEstudiante = (req, res) => {
    const id = parseInt(req.params.id); // Convertir el ID a un número
    const datosActualizados = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

    // Llamar al método para actualizar el estudiante
    const registroActualizado = estudiantesModule.updateEstudiante(id, datosActualizados);

    if (registroActualizado) {
        res.status(200).json(registroActualizado); // Retornar el estudiante actualizado
    } else {
        res.status(404).json({ error: 'Estudiante no encontrado' }); // Manejo de error si no se encuentra
    }
};


// Función para actualizar parcialmente un estudiante por ID
const updateEstudianteParcial = (req, res) => {
    const id = parseInt(req.params.id); // Convertir el ID a un número
    const camposActualizados = req.body; // Obtener los campos a actualizar del cuerpo de la solicitud

    // Llamar al método para actualizar parcialmente el estudiante
    const resultado = estudiantesModule.updateEstudianteParcial(id, camposActualizados);

    if (resultado) {
        res.status(200).json(resultado); // Retornar el estudiante actualizado
    } else {
        res.status(404).json({ error: 'Estudiante no encontrado' }); // Manejo de error si no se encuentra
    }
};
const removeEstudiante = (req, res) => {
    const id = parseInt(req.params.id); // Convertir el ID a un número

    // Llamar al método para eliminar el estudiante
    const eliminado = estudiantesModule.removeEstudiante(id);

    if (eliminado) {
        return res.status(204).send(); // Enviar respuesta sin contenido
    } else {
        return res.status(404).json({ error: 'Estudiante no encontrado' }); // Manejo de error si no se encuentra
    }
};
const getCursosDeEstudiante = (req, res) => {
    const estudianteId = parseInt(req.params.estudianteId); // Obtener el ID del estudiante desde los parámetros de la solicitud

    if (!estudianteId) {
        return res.status(400).json({ error: 'Se requiere estudianteId.' });
    }

    // Llamar a la función del modelo para obtener los cursos
    const cursosDelEstudiante = estudiantesModule.obtenerCursosDeEstudiante(estudianteId);
    
    if (cursosDelEstudiante.length > 0) {
        return res.status(200).json(cursosDelEstudiante); // Retornar los cursos encontrados
    } else {
        return res.status(404).json({ error: 'No se encontraron cursos para este estudiante.' });
    }
};

const getProfesoresDeEstudiante = (req, res) => {
    const estudianteId = parseInt(req.params.estudianteId); // Obtener el ID del estudiante desde los parámetros de la solicitud

    if (!estudianteId) {
        return res.status(400).json({ error: 'Se requiere estudianteId.' });
    }

    // Llamar a la función del modelo para obtener los profesores
    const profesoresDelEstudiante = estudiantesModule.obtenerProfesoresDeEstudiante(estudianteId);
    
    if (profesoresDelEstudiante.length > 0) {
        return res.status(200).json(profesoresDelEstudiante); // Retornar los profesores encontrados
    } else {
        return res.status(404).json({ error: 'No se encontraron profesores para este estudiante.' });
    }
};


// Exportar funciones para su uso en las rutas
exports.createEstudiante = createEstudiante;
exports.updateEstudiante = updateEstudiante;
exports.removeEstudiante = removeEstudiante;
exports.updateEstudianteParcial = updateEstudianteParcial;
exports.getAllEstudiantes = getAllEstudiantes;
exports.getEstudiante = getEstudiante;
// Exportarar las nuevas funciónes
exports.getProfesoresDeEstudiante = getProfesoresDeEstudiante;
exports.getCursosDeEstudiante = getCursosDeEstudiante;