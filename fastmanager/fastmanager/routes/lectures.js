var express = require('express');
var router = express.Router();

var Lecture = require('../models/lecture');


router.get('/', function(request, response) {
    Lecture.getLectures(function(error, lectures) {
        if (error) throw error;
        console.log("gotcha!");
        return response.render("lectures/index", {lectures: lectures});
    });

    //return response.send("hello world");
});


router.get('/:lectureId/', function(request, response) {
    var lectureId = request.params.lectureId;

    Lecture.getLectureById(lectureId, function(error, lecture) {
        if (error) throw error;
        return response.render("lectures/detail", {lecture: lecture});
    });
    
});


module.exports = router;
