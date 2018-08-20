'use strict';
module.exports = (sequelize, DataTypes) => {
  var courses = sequelize.define('courses', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  courses.associate = function(models) {
    // associations can be defined here
  };
  return courses;
};