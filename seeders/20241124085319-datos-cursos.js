'use strict';
module.exports = {
 async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Cursos', [
       {
         materia: 'Programacion estructurada',
         claveDMateria: '541432',
         grupo: '365-1',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         materia: 'Quimica',
         claveDMateria: '11112',
         grupo: '334-1',
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});
 },
 async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Cursos', null, {});
 }
};
