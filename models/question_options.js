'use strict';
module.exports = (sequelize, DataTypes) => {
  var question_options = sequelize.define('question_options', {
    qnsId: DataTypes.INTEGER,
    optId:DataTypes.INTEGER,
    option_text: DataTypes.STRING
  }, {});
  question_options.associate = function(models) {
    // associations can be defined here
  };
  return question_options;
};