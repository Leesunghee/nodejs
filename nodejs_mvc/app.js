var connect = require('connect'),
    http = require('http');
var config = require('./config')();
var MongoClient = require('mongodb').MongoClient;

app.set('view', __dirname + '/template');

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

MongoClient.connect('mongodb://127.0.0.1:27017/fastdelivery', function (err, db) {
    if(err) {
        console.log('Sorry, there is no mongo db server running.');
    } else {
        var attachDB = function (req, res, next) {
            req.db = db;
            next();
        };

        http.createServer(app).listen(config.port, function() {
            console.log('Express server listening on port ' + config.port);
        });
    }
})


