var models = require('../models');
var Sequelize = require('sequelize');

exports.createQuestion = function (req, res) {
    let postData = req.body;
    let result = {};
    models.questions.create(postData).then(question => {
        if (question) {
            if (postData.options != undefined) {
                let options = [];
                let i = 0;
                for (let option in postData.options) {
                    if (option != 'answer') {
                        i++;
                        options.push({ 'qnsId': question.id, 'optId': i, 'option_text': postData.options[option] });
                    }
                }
                models.question_options.bulkCreate(options).then(function (option) {
                    if (option) {
                        option.forEach(val => {
                            if (val.optId == postData.options.answer && val.qnsId == question.id) {
                                answer = { 'qnsId': question.id, 'optionId': val.id, 'answer': val.option_text }
                            }
                        });
                        models.question_answers.create(answer).then(answer => {
                            if (answer) {
                                result.success = true;
                                result.message = 'Question Successfully created';
                            }
                            else {
                                result.success = true;
                                result.message = 'Question Not Successfully created'
                            }
                            res.json(result);
                        }).catch(function (err) {
                            result.success = false;
                            result.message = err.message;
                            return res.json(result);
                        });
                    }
                }).catch(function (err) {
                    result.success = false;
                    result.message = err.message;
                    return res.json(result);
                });
            }
        }
    }).catch(function (err) {
        result.success = false;
        result.message = err.message;
        return res.json(result);
    });

}

exports.updateQuestion = function (req, res) {
    let postData = req.body;
    models.chapters.findOne({
        where: { id: postData.id }, required: false
    }).then(chapters => {
        let result = {};
        if (chapters) {
            chapters.updateAttributes(postData).then((updateChapter) => {
                if (updateChapter) {
                    result.success = true;
                    result.message = 'Chapter Updated successfully ';
                }
                else {
                    result.success = true;
                    result.message = 'Chapter Not Updated successfully ';
                }
                res.json(result);
            }).catch(Sequelize.ValidationError, function (err) {
                // respond with validation errors                
                return res.status(200).json({
                    success: false,
                    message: err.message
                });
            }).catch(function (err) {
                // every other error                
                return res.status(400).json({
                    success: false,
                    message: err
                });
            });
        }
        else {
            result.success = false;
            result.message = 'Chapter not existed.';
            res.json(result);
        }
    });
};

exports.getQuestions = function (req, res) {
    models.questions.belongsTo(models.chapters, { foreignKey: 'chapterId' });
    models.questions.findAll({
        include: [
            {
                model: models.chapters,
                where: { 'id': req.params.id }
            }
        ]
    }).then(questions => {
        let result = {};
        if (questions) {
            result.success = true;
            result.questions = questions;
        } else {
            result.success = false;
            result.message = 'No Questions Found';
        }
        res.json(result);
    });
}
exports.deleteQuestion = function (req, res) {

    let result = {};
    if (req.params.id != undefined) {
        models.questions.destroy({ where: { id: req.params.id } }).then((rowDeleted) => {
            result.success = true;
            result.message = (rowDeleted === 1) ? 'Question deleted successfully' : 'Unable to delete Question';
            res.json(result);
        }, (err) => {
            result.success = false;
            result.message = ' this Question is already used by another user';
            res.json(result);
        })
    }
    else {
        result.success = false;
        result.message = 'Not selected any Chapter';
        res.json(result);
    }
};

exports.getQuestionById = function (req, res) {
    models.questions.hasMany(models.question_options, { foreignKey: 'qnsId' });
    models.questions.hasOne(models.question_answers, { foreignKey: 'qnsId' });
    models.questions.findAll({
        where: { id: req.params.id },
        include: [
            {
                model: models.question_options,
                where: { 'qnsId': req.params.id },
            },
            {
                model: models.question_answers,
                where: { 'qnsId': req.params.id }
            }
        ],

    }).then(question => {
        let result = {};
        if (question) {
            result.success = true;
            result.question = question;
        } else {
            result.success = false;
            result.message = 'No chapter available'
        }
        res.json(result);
    });
}

