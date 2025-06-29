'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      venueId: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Venues',
          key:'id',
          as:'venueId'
        },
        allowNull:false
      },
      startingTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      endingTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      clubId: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Clubs',
          key:'id',
          as:'clubId'
        },
        allowNull:false
      },
      collegeId: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Colleges',
          key:'id',
          as:'collegeId'
        },
        allowNull:false
      },
      total_seats: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:100
      },
      registration_count: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
      },
      permission: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};