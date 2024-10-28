const cursosModule = require('./cursoModel'); // Importar el módulo de cursos
const estudiantesModule = require('./estudiantesModel'); // Importar el módulo de estudiantes
const profesores = [
    {
        id: 1,
        nombreProfesor: 'María González',
        numEmpleado: 987654,
        asignatura: 'Matemáticas',
        
    },
    {
        id: 2,
        nombreProfesor: 'Carlos Pérez',
        numEmpleado: 456789,
        asignatura: 'Historia',
       
    }
];

const findById = function (id) {
    return profesores.find((p) => p.id === id);
};

const findBynumEmpleado = function (numEmpleado) {
    return profesores.find((p) => p.numEmpleado === numEmpleado);
};

const findAll = function() {
    return profesores;
};

const addProfesor = function(profesor) {
    const existingProfesor = findById(profesor.id); // Usa el método correcto
    if (existingProfesor) {
        return null; // Retorna null si ya existe
    }
    profesores.push(profesor); // Agregar el nuevo profesor al array
    return profesor; // Retornar el profesor agregado
};

const removeProfesor = function(id) {
    const index = profesores.findIndex(p => p.id === id);
    if (index !== -1) {
        profesores.splice(index, 1);
        return true; // Indica que se eliminó correctamente
    }
    return false; // Indica que no se encontró el profesor
};

// Método para actualizar un profesor por ID (PUT)
const updateProfesor = (id, nuevosDatos) => {
    const index = profesores.findIndex(profesor => profesor.id === id);
    
    if (index !== -1) {
        profesores[index] = { ...profesores[index], ...nuevosDatos }; // Actualizar los datos del profesor
        return profesores[index]; // Retornar el profesor actualizado
    }
    
    return null; // Si no se encontró el profesor
};

// Método para actualizar parcialmente un profesor por ID (PATCH)
const updateProfesorParcial = (id, camposActualizados) => {
    const index = profesores.findIndex(profesor => profesor.id === id);
    
    if (index !== -1) {
        profesores[index] = { ...profesores[index], ...camposActualizados }; // Actualizar solo los campos proporcionados
        return profesores[index]; // Retornar el profesor actualizado
    }
    
    return null; // Si no se encontró el profesor
};

// Función para obtener todos los cursos de un profesor
const obtenerCursosDeProfesor = function(profesorId) {
    return cursosModule.findAll().filter(curso => curso.profesorId === profesorId);
};

const obtenerEstudiantesDeProfesor = function(profesorId) {
    // Obtener todos los cursos del profesor
    const cursosDelProfesor = cursosModule.findAll().filter(curso => curso.profesorId === profesorId);
    
    // Obtener IDs únicos de estudiantes inscritos en esos cursos
    const estudianteIds = [...new Set(cursosDelProfesor.flatMap(curso => curso.estudiantes))];

    // Obtener detalles completos de los estudiantes usando sus IDs
    const estudiantes = estudianteIds.map(id => estudiantesModule.findById(id)).filter(estudiante => estudiante !== undefined);

    return estudiantes; // Retornar objetos completos de estudiantes
};

// Exportar funciones
exports.findById = findById;
exports.findBynumEmpleado = findBynumEmpleado;
exports.findAll = findAll;
exports.addProfesor = addProfesor;
exports.removeProfesor = removeProfesor;
exports.updateProfesor = updateProfesor;
exports.updateProfesorParcial = updateProfesorParcial;
// Exportar la nueva función
exports.obtenerCursosDeProfesor = obtenerCursosDeProfesor;
exports.obtenerEstudiantesDeProfesor = obtenerEstudiantesDeProfesor;


