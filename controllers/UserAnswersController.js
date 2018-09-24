var models = require('../models');
var Sequelize = require('sequelize');

exports.createUserAnswers = function (req, res) {
    let postData = req.body;
    models.user_answers.bulkCreate(postData).then(userAnswers => {
        let result = {};
        if (userAnswers) {
            result.success = true;
            result.message = 'Exam Submitted Successfully';
        }
        else {
            result.success = true;
            result.message = 'Exam Not Submitted Successfully! Please try Again '
        }
        res.json(result);
    });
}
exports.GetExamsResults = function (req, res) {
    models.user_answers.belongsTo(models.questions, { foreignKey: 'question_id' });
    models.questions.hasMany(models.question_options, { foreignKey: 'question_id' });
    let postData = req.body;
    models.user_answers.findAll({
        where: {
            $and: [
                { 'user_id': postData.userId },
                { 'test_id': postData.testId }
            ]
        },
        include: [
            {
                model: models.questions,
                include: [
                    {
                        model: models.question_options
                    }
                ]
            }
        ]
    }).then(data => {
        let result = {};
        if (data) {
            result.success = true;
            result.data = data;
        }
        else {
            result.success = true;
            result.message = 'Exam Not Submitted Successfully! Please try Again '
        }
        res.json(result);
    })
}