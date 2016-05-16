/**
 * Created by sungheelee on 2016. 5. 11..
 */

var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();

router.use(function trackRequestTimeAndUrl (request, response, next) {
    console.log("User request to " + request.url + " on " + Date.now());
    next();
});

router.get("/", function (request, response) {
    //response.send('Hello world');

    var animals = ["dog", "cat", "bird", "mouse"];
    response.render("home", {"animals": animals});
});

router.get("/users", function (request, response) {

    var users = [];

    fs.readFile(path.join(__dirname, "users.csv"), function (error, data) {

        //console.log(String(data));

        var lines = String(data).split('\n');

        for (var lineNumber in lines) {
            var line = lines[lineNumber];
            var user = {};

            user.username = line.split(',')[0];
            user.address = line.split(',')[1];
            //다른 방법
            // var user = {
            //    "username": line.split(',')[0],
            //    "address": line.split(',')[1],
            // }
            users.push(user);


        }

        response.send({"users": users});

    });
    // var users = [
    //     {
    //         "username": "이성희",
    //         "address": "관악구 행운동 우성아파트"
    //     },
    //     {
    //         "username": "최경희",
    //         "address": "충주시 칠금동"
    //     }
    // ];

    //response.send({"users": users});
});


router.get("/:roomId", function (request, response) {
    var roomId = request.params.roomId;
    response.send("This is " + roomId + " room detail.");
});

module.exports = router;