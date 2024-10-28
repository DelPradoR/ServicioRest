const cursos = [
    {
        id: 1,
        materia: 'Programacion estructurada',
        claveDMateria: 'D-541432',
        grupo: '365-1',
        estudiantes: [], // Inicializa el array de estudiantes
        profesorId: null
    },
    {
        id: 2,
        materia: 'Quimica',
        claveDMateria: 'HDR11112',
        grupo: '334-1',
        estudiantes: [], // Inicializa el array de estudiantes
        profesorId: null
    }
];


const findById = function (id) {
    return cursos.find((p) => p.id === id);
};

const findAll = function() {
    return cursos;
};

const addCurso = function(curso) {
    const existingCurso = findById(curso.id); // Usa el método correcto
    if (existingCurso) {
        return null; // Retorna null si ya existe
    }
    cursos.push(curso); // Agregar el nuevo curso al array
    return curso; // Retornar el curso  agregado
};

const removeCurso = function(id) {
    const index = cursos.findIndex(p => p.id === id);
    if (index !== -1) {
        cursos.splice(index, 1);
        return true; // Indica que se eliminó correctamente
    }
    return false; // Indica que no se encontró el curso
};

// Método para actualizar un curso por ID (PUT)
const updateCurso = (id, nuevosDatos) => {
    const index = cursos.findIndex(curso => curso.id === id);
    
    if (index !== -1) {
        cursos[index] = { ...cursos[index], ...nuevosDatos }; // Actualizar los datos del curso
        return cursos[index]; // Retornar el curso actualizado
    }
    
    return null; // Si no se encontró el curso
};

// Método para actualizar parcialmente un curso por ID (PATCH)
const updateCursoParcial = (id, camposActualizados) => {
    const index = cursos.findIndex(curso => curso.id === id);
    
    if (index !== -1) {
        cursos[index] = { ...cursos[index], ...camposActualizados }; // Actualizar solo los campos proporcionados
        return cursos[index]; // Retornar el curso actualizado
    }
    
    return null; // Si no se encontró el curso
};

// Función para inscribir un estudiante en un curso
const inscribirEstudiante = function(cursoId, estudianteId) {
    const curso = findById(cursoId);
    if (curso && !curso.estudiantes.includes(estudianteId)) {
        curso.estudiantes.push(estudianteId); // Agregar el ID del estudiante al array
        return true;
    }
    return false; // Curso no encontrado o estudiante ya inscrito
};

// Función para eliminar un estudiante de un curso
const eliminarEstudianteDeCurso = function(cursoId, estudianteId) {
    const curso = findById(cursoId);
    if (curso && curso.estudiantes) {
        const index = curso.estudiantes.indexOf(estudianteId);
        if (index !== -1) {
            curso.estudiantes.splice(index, 1); // Eliminar el estudiante del array
            return true; // Eliminación exitosa
        }
    }
    return false; // Curso no encontrado o estudiante no inscrito
};

const asociarProfesorACurso = function(cursoId, profesorId) {
    const curso = findById(cursoId);
    if (curso) {
        curso.profesorId = profesorId; // Asociar el ID del profesor al curso
        return true; // Asociación exitosa
    }
    return false; // Curso no encontrado
};

// Función para eliminar un profesor de un curso
const eliminarProfesorDeCurso = function(cursoId) {
    const curso = findById(cursoId);
    if (curso) {
        curso.profesorId = null; // Eliminar la asociación del profesor
        return true; // Eliminación exitosa
    }
    return false; // Curso no encontrado
};


// Exportar funciones
exports.findById = findById;
exports.findAll = findAll;
exports.addCurso = addCurso;
exports.removeCurso = removeCurso;
exports.updateCurso = updateCurso;
exports.updateCursoParcial = updateCursoParcial;

exports.inscribirEstudiante = inscribirEstudiante;
exports.eliminarEstudianteDeCurso = eliminarEstudianteDeCurso;
exports.asociarProfesorACurso = asociarProfesorACurso;
exports.eliminarProfesorDeCurso = eliminarProfesorDeCurso;