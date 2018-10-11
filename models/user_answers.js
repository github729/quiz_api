'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_answers = sequelize.define('user_answers', {
    question_id: DataTypes.INTEGER,         
    answer_id: DataTypes.INTEGER,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    test_id: DataTypes.INTEGER
  }, {});
  user_answers.associate = function(models) {
    // associations can be defined here
  };
  return user_answers;
};