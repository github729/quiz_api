'use strict';
module.exports = (sequelize, DataTypes) => {
  var chapter = sequelize.define('chapters', {
    courseId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    total_qns: DataTypes.INTEGER,
    duration: DataTypes.TIME,
    status: DataTypes.STRING
  }, {});
  chapter.associate = function(models) {
    // associations can be defined here
  };
  return chapter;
};