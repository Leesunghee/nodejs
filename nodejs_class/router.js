/**
 * Created by sungheelee on 2016. 5. 11..
 */

var express = require('express');
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

router.get("/:roomId", function (request, response) {
    var roomId = request.params.roomId;
    response.send("This is " + roomId + " room detail.");
});


module.exports = router;