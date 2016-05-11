var express = require('express');
var path = require("path");
var router = require('./router');
var logger = require('morgan');

var app = express();

//현재 실행중인 파일의 디렉토리에 있는 views 폴더
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "pug");

// app.get("/", function (request, response) {
//     //response.send('Hello world');
//
//     var animals = ["dog", "cat", "bird", "mouse"];
//     response.render("home", {"animals": animals});
// });
//
// app.get("/:roomId", function (request, response) {
//     var roomId = request.params.roomId;
//     response.send("This is " + roomId + " room detail.");
// });

app.use(logger());

// "/"으로 요청했을때 router 에 있는 기능을 사용하겠다
app.use("/", router); // '/' => Home, '/:roomId/ => RoomDetail



app.listen(3000, function() {
    console.log('Server running at http://localhost:3000');
});