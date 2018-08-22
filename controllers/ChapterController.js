var models = require('../models');
var Sequelize = require('sequelize');

exports.createChapter = function (req, res) {
    let postData = req.body;
    models.chapters.findOne({
        where: { name: postData.name }
    }).then(chapter => {
        let result = {};
        if (chapter) {
            result.success = false;
            result.message = 'Chapter already existed.';
            res.json(result);
        }
        else {
            models.chapters.create(postData).then(chapter => {
                if (chapter) {
                    result.success = true;
                    result.message = 'Chapter Successfully created';
                }
                else {
                    result.success = true;
                    result.message = 'Chapter Not Successfully created'
                }
                res.json(result);
            });
        }
    });
}

exports.updateChapter = function (req, res) {
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

exports.getChapters = function (req, res) {
    models.chapters.belongsTo(models.courses,{foreignKey:'courseId'})
    models.chapters.findAll({
        include:[
            {
                model:models.courses,
                where:{ 'id' : req.params.id}
            }
        ]
    }).then(chapters => {
        let result = {};
        if (chapters) {
            result.success = true;
            result.chapters = chapters;
        } else {
            result.success = false;
            result.message = 'No chapters Found';
        }
        res.json(result);
    });
}
exports.deleteChapter = function (req, res) {

    let result = {};
    if (req.params.id != undefined) {
        models.chapters.destroy({ where: { id: req.params.id } }).then((rowDeleted) => {
            result.success = true;
            result.message = (rowDeleted === 1) ? 'Chapter deleted successfully' : 'Unable to delete Chapter';
            res.json(result);
        }, (err) => {
            result.success = false;
            result.message = ' this Chapter is already used by another user';
            res.json(result);
        })
    }
    else {
        result.success = false;
        result.message = 'Not selected any Chapter';
        res.json(result);
    }
};

exports.getChapterById = function (req, res) {
    models.chapters.findOne({
        where: { id: req.params.id }
    }).then(chapter => {
        let result = {};
        if (chapter) {
            result.success = true;
            result.chapter = chapter;
        } else {
            result.success = false;
            result.message = 'No chapter available'
        }
        res.json(result);
    });
}

