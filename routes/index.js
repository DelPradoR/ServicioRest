const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursoControl');
const estudiantesController = require('../controllers/estudiantesController');
const profesoresController = require('../controllers/profesorControl');

router.get('/cursos', cursosController.getAllCursos); 
router.get('/cursos/:id', cursosController.getCurso); 
router.post('/cursos', cursosController.createCurso); 
router.put('/cursos/:id', cursosController.updateCurso); 
router.patch('/cursos/:id', cursosController.updateCursoParcial); 
router.delete('/cursos/:id', cursosController.removeCurso);

router.post('/cursos/inscribir-profesor', cursosController.inscribirProfesor);
router.post('/cursos/inscribir-alumno', cursosController.inscribirAlumno);
router.get('/cursos/:id/estudiantes', cursosController.consultarEstudiantesInscritos);
router.get('/cursos/:id/profesor', cursosController.consultarProfesorAsignado);



router.get('/estudiantes', estudiantesController.getAllEstudiantes);
router.get('/estudiantes/:id', estudiantesController.getEstudiante);
router.post('/estudiantes', estudiantesController.createEstudiante);
router.put('/estudiantes/:id', estudiantesController.updateEstudiante);
router.patch('/estudiantes/:id', estudiantesController.updateEstudiante);
router.delete('/estudiantes/:id', estudiantesController.removeEstudiante);

// Rutas para manejar cursos de un estudiante
router.get('/estudiantes/:estudianteId/cursos', estudiantesController.getCursosDeEstudiante); // Obtener cursos de un estudiante
router.post('/estudiantes/:estudianteId/cursos', estudiantesController.addCursoToEstudiante); // Agregar un curso a un estudiante
router.get('/estudiantes/:id/profesores', estudiantesController.consultarProfesoresEstudiante);

// Rutas para profesores
router.get('/profesores', profesoresController.getAllProfesores); // Asegúrate de que esta función exista en profesorControl
router.get('/profesores/:id', profesoresController.getProfesor); // Asegúrate de que esta función exista en profesorControl
router.post('/profesores', profesoresController.createProfesor); // Asegúrate de que esta función exista en profesorControl
router.put('/profesores/:id', profesoresController.updateProfesor); // Asegúrate de que esta función exista en profesorControl
router.patch('/profesores/:id', profesoresController.updateProfesorParcial); // Asegúrate de que esta función exista en profesorControl
router.delete('/profesores/:id', profesoresController.removeProfesor); // Asegúrate de que esta función exista en profesorControl

router.get('/profesores/:profesorId/cursos', profesoresController.getCursosDeProfesor);

module.exports = router;