const cursosModule = require('./cursoModel');
const profesoresModule = require('./profesorModel');
const estudiantes = [
    {
        id: 1,
        nombre: 'raul vargasc',
        matricula: 123456,
        semestreIngreso: '2016-2',
        creditosCursados: 200
    },
    {
        id: 2,
        nombre: 'Lupita López',
        matricula: 654321,
        semestreIngreso: '2017-2',
        creditosCursados: 100
    }
];

const findById = function (id) {
    return estudiantes.find((e) => e.id === id);
};

const findByMatricula = function (matricula) {
    return estudiantes.find((e) => e.matricula === matricula);
};

const findAll = function() {
    return estudiantes;
};

const addEstudiante = function(estudiante) {
    const existingEstudiante = findById(estudiante.id); // Usa el método correcto
    if (existingEstudiante) {
        return null; // Retorna null si ya existe
    }
    estudiantes.push(estudiante); // Agregar el nuevo estudiante al array
    return estudiante; // Retornar el estudiante agregado
};

const removeEstudiante = function(id) {
    const index = estudiantes.findIndex(e => e.id === id);
    if (index !== -1) {
        estudiantes.splice(index, 1);
        return true; // Indica que se eliminó correctamente
    }
    return false; // Indica que no se encontró el estudiante
};
// Método para actualizar un estudiante por ID (PUT)
const updateEstudiante = (id, nuevosDatos) => {
    const index = estudiantes.findIndex(estudiante => estudiante.id === id);
    
    if (index !== -1) {
        estudiantes[index] = { ...estudiantes[index], ...nuevosDatos }; // Actualizar los datos del estudiante
        return estudiantes[index]; // Retornar el estudiante actualizado
    }
    
    return null; // Si no se encontró el estudiante
};

// Método para actualizar parcialmente un estudiante por ID (PATCH)
const updateEstudianteParcial = (id, camposActualizados) => {
    const index = estudiantes.findIndex(estudiante => estudiante.id === id);
    
    if (index !== -1) {
        estudiantes[index] = { ...estudiantes[index], ...camposActualizados }; // Actualizar solo los campos proporcionados
        return estudiantes[index]; // Retornar el estudiante actualizado
    }
    
    return null; // Si no se encontró el estudiante
};

// Función para obtener todos los cursos de un estudiante
const obtenerCursosDeEstudiante = function(estudianteId) {
    return cursosModule.findAll().filter(curso => curso.estudiantes && curso.estudiantes.includes(estudianteId));
};

const obtenerProfesoresDeEstudiante = function(estudianteId) {
    const cursosDelEstudiante = cursosModule.findAll().filter(curso => curso.estudiantes && curso.estudiantes.includes(estudianteId));
    
    // Obtener IDs únicos de profesores
    const profesorIds = [...new Set(cursosDelEstudiante.map(curso => curso.profesorId))].filter(id => id !== null);
    
    // Obtener detalles de los profesores
    return profesoresModule.findAll().filter(profesor => profesorIds.includes(profesor.id));
};


// Exportar funciones
exports.findById = findById;
exports.findByMatricula = findByMatricula;
exports.findAll = findAll;
exports.addEstudiante=addEstudiante;
exports.removeEstudiante=removeEstudiante;
exports.updateEstudiante=updateEstudiante;
exports.updateEstudianteParcial=updateEstudianteParcial;
// Exportar la nueva función
exports.obtenerCursosDeEstudiante = obtenerCursosDeEstudiante;
exports.obtenerProfesoresDeEstudiante = obtenerProfesoresDeEstudiante;