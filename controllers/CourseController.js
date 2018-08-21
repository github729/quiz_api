var models = require('../models');
var Sequelize = require('sequelize');

exports.createCourse = function (req, res) {
    let postData = req.body;
    models.courses.findOne({
        where: { name: postData.name }
    }).then(course => {
        let result = {};
        if (course) {
            result.success = false;
            result.message = 'Course already existed.';
            res.json(result);
        }
        else {
            models.courses.create(postData).then(course => {
                if (course) {
                    result.success = true;
                    result.message = 'Course Successfully created';
                }
                else {
                    result.success = true;
                    result.message = 'Course Not Successfully created'
                }
                res.json(result);
            });
        }
    });
}

exports.updateCourse = function (req, res) {
    let postData = req.body;
    models.courses.findOne({
        where: { id: postData.id }, required: false
    }).then(courses => {
        let result = {};
        if (courses) {
            courses.updateAttributes(postData).then((updateCourse) => {
                if (updateCourse) {
                    result.success = true;
                    result.message = 'Course Updated successfully ';
                }
                else {
                    result.success = true;
                    result.message = 'Course Not Updated successfully ';
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
            result.message = 'Course not existed.';
            res.json(result);
        }
    });
};

exports.getCourses = function (req, res) {
    models.courses.findAll({}).then(courses => {
        let result = {};
        if (courses) {
            result.success = true;
            result.courses = courses;
        } else {
            result.success = false;
            result.message = 'No courses Found';
        }
        res.json(result);
    });
}
exports.deleteCourse = function (req, res) {

    let result = {};
    if (req.params.id != undefined) {
        models.courses.destroy({ where: { id: req.params.id } }).then((rowDeleted) => {
            result.success = true;
            result.message = (rowDeleted === 1) ? 'Course deleted successfully' : 'Unable to delete Course';
            res.json(result);
        }, (err) => {
            result.success = false;
            result.message = ' this Course is already used by another user';
            res.json(result);
        })
    }
    else {
        result.success = false;
        result.message = 'Not selected any Course';
        res.json(result);
    }
};

exports.getCourseById = function (req, res) {
    models.courses.findOne({
        where: { id: req.params.id }
    }).then(course => {
        let result = {};
        if (course) {
            result.success = true;
            result.course = course;
        } else {
            result.success = false;
            result.message = 'No Course available'
        }
        res.json(result);
    });
}

