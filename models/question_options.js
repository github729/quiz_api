'use strict';
module.exports = (sequelize, DataTypes) => {
  var question_options = sequelize.define('question_options', {
    question_id: DataTypes.INTEGER,
    options: DataTypes.STRING,
    is_correct: DataTypes.BOOLEAN
  }, {});
  question_options.associate = function(models) {
    // associations can be defined here
  };
  return question_options;
};