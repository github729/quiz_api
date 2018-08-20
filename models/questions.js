'use strict';
module.exports = (sequelize, DataTypes) => {
  var questions = sequelize.define('questions', {
    chapterId: DataTypes.INTEGER,
    question: DataTypes.STRING
  }, {});
  questions.associate = function(models) {
    // associations can be defined here
  };
  return questions;
};