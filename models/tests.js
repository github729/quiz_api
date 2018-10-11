'use strict';
module.exports = (sequelize, DataTypes) => {
  var tests = sequelize.define('tests', {
    user_id: DataTypes.INTEGER
  }, {});
  tests.associate = function(models) {
    // associations can be defined here
  };
  return tests;
};