'use strict';
module.exports = (sequelize, DataTypes) => {
  var states = sequelize.define('states', {
    state_name :  DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  states.associate = function(models) {
    // associations can be defined here
  };
  return states;
};