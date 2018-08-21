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

    //courses urls
    apiRoutes.post('/course',CourseController.createCourse);
    apiRoutes.get('/course/:id',CourseController.getCourseById);
    apiRoutes.put('/course/:id',CourseController.updateCourse);
    apiRoutes.get('/courses',CourseController.getCourses);
    apiRoutes.delete('/course/:id',CourseController.deleteCourse);
    
    //chapters urls
    apiRoutes.post('/chapter',ChapterController.createChapter);
    apiRoutes.get('/chapter/:id',ChapterController.getChapterById);
    apiRoutes.put('/chapter/:id',ChapterController.updateChapter);
    apiRoutes.get('/chapters',ChapterController.getChapters);
    apiRoutes.delete('/chapter/:id',ChapterController.deleteChapter);
    app.use('/v1',apiRoutes);
    
}