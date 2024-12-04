'use strict';
module.exports = {
 async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Estudiantes', [
       {
         nombre: 'raul vargas',
         matricula: 123456,
        semestreIngreso: '2016-2',
         creditosCursados: 200,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         nombre: 'Lupita López',
         matricula: 654321,
         semestreIngreso: '2017-2',
         creditosCursados: 100,
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});
 },
 async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Estudiantes', null, {});
 }
};
