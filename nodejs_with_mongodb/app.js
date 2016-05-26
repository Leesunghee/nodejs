var express = require("express");
var bodyParser = require("body-parser");
var homeRouter = require("./routes/home");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var path = require("path");


var monk = require("monk");
var db = monk("mongodb://localhost:27017/nodecamp"); //db ... db, table ... collection, row ... document

var app = express();

app.set("vies", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(request, response, next) {
    request.db = db; // 다른 Router 에서 request객체를 통해서 db에 접근할 수 있게 한다.
    next();
});


app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(3000, function() {
    console.log("Server is listening on localhost:3000");
});