var express = require("express");
var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response) {
   response.render('home');
});

app.get("/users", function(request, response) {

    fs.readFile(path.join(__dirname, 'db.csv'), function(error, data) {
        var users = [];
        var lines = String(data).split('\n');
        for (lineIndex in lines) {
            var userInfo = {
                userId: Number(lineIndex) + 1,
                name: lines[lineIndex].split(',')[0],
                email: lines[lineIndex].split(',')[1],
            }
            if (userInfo.name)
                users.push(userInfo);
        }

        return response.render('users/list', {users : users});
    });

});

app.get("/users/new", function(request, response) {
    return response.render('users/new');
});

app.post("/users/new", function(request, response) {

    var name = request.body.name;
    var email = request.body.email;
    //console.log(name, email);
    //return response.send("hello world post");
    var data = name + "," + email + "\n";
    fs.appendFile("db.csv", data);
    return response.redirect("/users");
});

app.get("/users/:userId", function(request, response) {
    var userId = request.params.userId;
    fs.readFile('db.csv', function(error, data) {

        var lines = String(data).split('\n');
        var line = lines[userId - 1];

        var userInfo = {
            name: line.split(',')[0],
            email: line.split(',')[1],
        }
        return response.render('users/detail', {user : userInfo});

    });
});

app.listen(3000, function() {
    console.log("Server is running at localhost:3000");
});