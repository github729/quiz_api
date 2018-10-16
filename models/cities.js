'use strict';
module.exports = (sequelize, DataTypes) => {
  var cities = sequelize.define('cities', {
    state_id : DataTypes.INTEGER, 
    city_name : DataTypes.STRING, 
    status : DataTypes.STRING
  }, {});
  cities.associate = function(models) {
    // associations can be defined here
  };
  return cities;
};