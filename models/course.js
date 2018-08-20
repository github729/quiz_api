'use strict';
module.exports = (sequelize, DataTypes) => {
  var course = sequelize.define('course', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  course.associate = function(models) {
    // associations can be defined here
  };
  return course;
};