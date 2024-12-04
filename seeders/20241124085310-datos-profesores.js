'use strict';
module.exports = {
 async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Profesors', [
       {
         nombreProfesor: 'María González',
         numEmpleado: 987654,
         asignatura: 'Matemáticas',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         nombreProfesor: 'Carlos Pérez',
         numEmpleado: 456789,
         asignatura: 'Historia',
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});
 },
 async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Profesors', null, {});
 }
};
