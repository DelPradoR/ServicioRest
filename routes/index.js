const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');
const profesoresController = require('../controllers/profesorControl');
const cursosController = require('../controllers/cursoControl');

router.get('/estudiantes', estudiantesController.getAllEstudiantes);
router.get('/estudiantes/:id', estudiantesController.getEstudiante);
router.post('/estudiantes', estudiantesController.createEstudiante);
router.put('/estudiantes/:id', estudiantesController.updateEstudiante);
router.patch('/estudiantes/:id', estudiantesController.updateEstudiante);
router.delete('/estudiantes/:id', estudiantesController.removeEstudiante);

// Rutas para profesores
router.get('/profesores', profesoresController.getAllProfesores); // Asegúrate de que esta función exista en profesorControl
router.get('/profesores/:id', profesoresController.getProfesor); // Asegúrate de que esta función exista en profesorControl
router.post('/profesores', profesoresController.createProfesor); // Asegúrate de que esta función exista en profesorControl
router.put('/profesores/:id', profesoresController.updateProfesor); // Asegúrate de que esta función exista en profesorControl
router.patch('/profesores/:id', profesoresController.updateProfesorParcial); // Asegúrate de que esta función exista en profesorControl
router.delete('/profesores/:id', profesoresController.removeProfesor); // Asegúrate de que esta función exista en profesorControl

// Rutas para cursos
router.get('/cursos', cursosController.getAllCursos); 
router.get('/cursos/:id', cursosController.getCurso); 
router.post('/cursos', cursosController.createCurso); 
router.put('/cursos/:id', cursosController.updateCurso); 
router.patch('/cursos/:id', cursosController.updateCursoParcial); 
router.delete('/cursos/:id', cursosController.removeCurso);

// Ruta para inscribir un estudiante en un curso
router.post('/cursos/inscribir', cursosController.inscribirEstudianteEnCurso);
// Ruta para eliminar un estudiante de un curso
router.post('/cursos/eliminar', cursosController.eliminarEstudianteEnCurso);
// Ruta para asociar un profesor a un curso
router.post('/cursos/asociar-profesor', cursosController.asociarProfesorEnCurso);
// Ruta para eliminar un profesor de un curso
router.post('/cursos/eliminar-profesor', cursosController.eliminarProfesorEnCurso);

router.get('/estudiantes/:estudianteId/cursos', estudiantesController.getCursosDeEstudiante);
router.get('/estudiantes/:estudianteId/profesores', estudiantesController.getProfesoresDeEstudiante);
router.get('/profesores/:profesorId/cursos', profesoresController.getCursosDeProfesor);
router.get('/profesores/:profesorId/estudiantes', profesoresController.getEstudiantesDeProfesor);
module.exports = router;