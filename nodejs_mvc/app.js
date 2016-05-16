var connect = require('connect'),
    http = require('http');
var config = require('./config')();

var app = connect()
    .use(function (req, res, next) {
        console.log("That's my first middleware");
        next();
    })
    .use(function (req, res, next) {
        console.log("That's my second middleware");
        next();
    })
    .use(function (req, res, next) {
        console.log("end");
        res.end("hello world");
    });

// app.get('/hello.txt', function (req, res) {
//     var body = 'Hello World';
//     res.setHeader('Content-Type', 'text/plain');
//     res.setHeader('Content-Length', body.length);
//     res.end(body);
// });

http.createServer(app).listen(process.env.PORT, function() {
    console.log('Express server listening on port ' + config.port);
});