'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jtiltle: {
        type: Sequelize.STRING
      },
      jpostdate: {
        type: Sequelize.DATE
      },
      jcname: {
        type: Sequelize.STRING
      },
      jlocation: {
        type: Sequelize.STRING
      },
      jrole: {
        type: Sequelize.STRING
      },
      jeligibility: {
        type: Sequelize.STRING
      },
      jlastdate: {
        type: Sequelize.STRING
      },
      cwebsite: {
        type: Sequelize.STRING
      },
      jexp: {
        type: Sequelize.STRING
      },
      jcprofile: {
        type: Sequelize.STRING
      },
      jdescription: {
        type: Sequelize.STRING
      },
      candidateprofile: {
        type: Sequelize.STRING
      },
      requiredskills: {
        type: Sequelize.STRING
      },
      jurl: {
        type: Sequelize.STRING
      },
      jclogo: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('jobs');
  }
};