var models = require('../models');
var Sequelize = require('sequelize');

exports.createQuestion = function (req, res) {
    let postData = req.body;
    let result = {};
    models.questions.create(postData).then(question => {
        if (question) {
            if (postData.options != undefined) {
                let options = [];
                for (let option in postData.options) {
                    if (option == postData.options['is_correct']) {
                        if (option != 'is_correct') {
                            options.push({ 'question_id': question.id, 'options': postData.options[option], 'is_correct': 1 });
                        }
                    } else {
                        if (option != 'is_correct') {
                            options.push({ 'question_id': question.id, 'options': postData.options[option], 'is_correct': 0 });
                        }
                    }
                }
                models.question_options.bulkCreate(options).then(function (option) {
                    if (option) {
                        if (option) {
                            result.success = true;
                            result.message = 'Question Successfully created';
                        }
                        else {
                            result.success = true;
                            result.message = 'Question Not Successfully created'
                        }
                        res.json(result);
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
    models.questions.findOne({
        where: { id: postData.id }, required: false
    }).then(question => {
        let result = {};
        if (question) {
            question.updateAttributes(postData).then((updateQuestion) => {
                if (updateQuestion) {
                    models.question_options.findAll({
                        where: { question_id: postData.id }
                    }).then(options => {
                        if (options) {
                            if (postData.options != undefined) {
                                let updateOptions = [];
                                for (let option in postData.options) {
                                    if (option == postData.options['is_correct']) {
                                        if (option != 'is_correct') {
                                            updateOptions.push({ 'question_id': question.id, 'options': postData.options[option], 'is_correct': 1 });
                                        }
                                    } else {
                                        if (option != 'is_correct') {
                                            updateOptions.push({ 'question_id': question.id, 'options': postData.options[option], 'is_correct': 0 });
                                        }
                                    }
                                }
                                options.forEach((val, index) => {
                                    val.updateAttributes(updateOptions[index]).then((updateOption) => {
                                    }).catch(function (err) {
                                        // every other error                
                                        return res.status(400).json({
                                            success: false,
                                            message: err
                                        });
                                    });
                                })
                                res.json({
                                    success: true,
                                    message: 'Question Updated successfully '
                                });
                            }
                        }
                    })
                }
            }).catch(Sequelize.ValidationError, function (err) {
                // respond with validation errors                
                return res.status(200).json({
                    success: false,
                    message: err.message
                });
            })
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
    models.questions.hasMany(models.question_options, { foreignKey: 'question_id' });
    models.questions.findAll({
        include: [
            {
                model: models.chapters,
                where: { 'id': req.params.id }
            },
            {
                model: models.question_options
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
    models.questions.hasMany(models.question_options, { foreignKey: 'question_id' });
    models.questions.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: models.question_options,
                where: { 'question_id': req.params.id },
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

