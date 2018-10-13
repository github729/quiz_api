var models = require('../models');
var Sequelize = require('sequelize');

exports.createJob = function (req, res) {
    let postData = req.body;
    models.jobs.findOne({
        where: { jtiltle: postData.jtiltle }
    }).then(job => {
        let result = {};
        if (job) {
            result.success = false;
            result.message = 'Job already existed.';
            res.json(result);
        }
        else {
            models.jobs.create(postData).then(course => {
                if (course) {
                    result.success = true;
                    result.message = 'Job Successfully created';
                }
                else {
                    result.success = true;
                    result.message = 'Job Not Successfully created'
                }
                res.json(result);
            });
        }
    });
}

exports.updateJob = function (req, res) {
    let postData = req.body;
    models.jobs.findOne({
        where: { id: postData.id }, required: false
    }).then(jobs => {
        let result = {};
        if (jobs) {
            jobs.updateAttributes(postData).then((updateJob) => {
                if (updateJob) {
                    result.success = true;
                    result.message = 'Job Updated successfully ';
                }
                else {
                    result.success = true;
                    result.message = 'Job Not Updated successfully ';
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
            result.message = 'Job not existed.';
            res.json(result);
        }
    });
};

exports.getJobs = function (req, res) {
    models.jobs.findAll({}).then(jobs => {
        let result = {};
        if (jobs) {
            result.success = true;
            result.jobs = jobs;
        } else {
            result.success = false;
            result.message = 'No jobs Found';
        }
        res.json(result);
    });
}
exports.deleteJob = function (req, res) {

    let result = {};
    if (req.params.id != undefined) {
        models.jobs.destroy({ where: { id: req.params.id } }).then((rowDeleted) => {
            result.success = true;
            result.message = (rowDeleted === 1) ? 'job deleted successfully' : 'Unable to delete job';
            res.json(result);
        }, (err) => {
            result.success = false;
            result.message = ' this job is already used by another user';
            res.json(result);
        })
    }
    else {
        result.success = false;
        result.message = 'Not selected any job';
        res.json(result);
    }
};

exports.getJobById = function (req, res) {
    models.jobs.findOne({
        where: { id: req.params.id }
    }).then(job => {
        let result = {};
        if (job) {
            result.success = true;
            result.job = job;
        } else {
            result.success = false;
            result.message = 'No job available'
        }
        res.json(result);
    });
}

