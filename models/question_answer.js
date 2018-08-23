'use strict';
module.exports = (sequelize, DataTypes) => {
  var question_answers = sequelize.define('question_answers', {
    qnsId: DataTypes.INTEGER,
    optionId: DataTypes.INTEGER,
    answer: DataTypes.STRING
  }, {});
  question_answers.associate = function(models) {
    // associations can be defined here
  };
  return question_answers;
};