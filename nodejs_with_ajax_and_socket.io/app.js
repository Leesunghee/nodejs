var path = require("path");
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


var app = express();


mongoose.connect("mongodb://localhost/nodecamp");


var homeRouter = require("./routes/home");
var postsRouter = require("./routes/posts");
var chatRouter = require("./routes/chat");
var ApiRouter = require("./routes/api");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use("/static", express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", homeRouter);
app.use("/posts", postsRouter);
app.use("/chat", chatRouter);
app.use("/api", ApiRouter);


var httpServer = http.Server(app);
var io = socketio(httpServer);

io.on("connection", function(socket) {
    console.log("Socket Connected");

    // socket.on("signup", function(userData) {
    //   console.log(userData.username);
    //   console.log(userData.email);
    //
    //   socket.emit("notice", userData.username + "이/가 회원가입 하였습니다.");
    // });

    socket.on("chat", function(data) {
      io.emit("chat", data);
    });

    socket.on("joined", function(username) {
      socket.broadcast.emit("joined", username);
    });

    socket.on("disconnect", function() {
      console.log("Socket Disconnected");
    });
});

httpServer.listen(3000, function() {
  console.log("Server is listening on localhost:3000");
});
