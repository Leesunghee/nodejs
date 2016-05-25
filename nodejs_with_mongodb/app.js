var express = require("express");
var bodyParser = require("body-parser");
var homeRouter = require("./routes/home");
var usersRouter = require("./routes/users");

var monk = require("monk");
var db = monk("mongodb://localhost:27017/nodecamp"); //db ... db, table ... collection, row ... document

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(request, response, next) {
    request.db = db; // 다른 Router 에서 request객체를 통해서 db에 접근할 수 있게 한다.
    next();
})


app.use("/", homeRouter);
app.use("/users", usersRouter);


app.listen(3000, function() {
    console.log("Server is listening on localhost:3000");
});