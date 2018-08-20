'use strict';
module.exports = (sequelize, DataTypes) => {
  var question_answer = sequelize.define('question_answer', {
    qnsId: DataTypes.INTEGER,
    optionId: DataTypes.INTEGER,
    answer: DataTypes.STRING
  }, {});
  question_answer.associate = function(models) {
    // associations can be defined here
  };
  return question_answer;
};