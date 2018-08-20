var express = require('express');
var CourseController = require('./controllers/CourseController');
var ChapterController = require('./controllers/ChapterController');
var QuestionsController = require('./controllers/QuestionsController');
module.exports = function (app) {
    app.get('/', (req, res) => {
        res.send('The Quiz Api watch at 1332')
    });
    var apiRoutes = express.Router();

    apiRoutes.get('/', (req, res) => {
        res.send('Welcome to Quiz Api')
    });

    app.use('/v1',apiRoutes);
    
}