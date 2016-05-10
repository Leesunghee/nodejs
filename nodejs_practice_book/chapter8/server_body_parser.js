var fs = require('fs');
var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(cookieParser());
app.use(bodyParser());

app.get('/', function(request, response) {
    if (request.cookies.auth) {
        response.send('<h1>Login Success</h1>');
    } else {
        response.redirect('/login');
    }
});

app.get('/login', function(request, response) {
    fs.readFile('login.html', function(error, data) {
        response.send(data.toString());
    });
});

app.post('/login', function(request, response) {

    var login = request.param('login');
    var password = request.param('password');

    console.log(login, password);
    console.log(request.body);

    if (login == 'rint' && password == '1234') {
        response.cookie('auth', true);
        response.redirect('/');
    } else {
        response.redirect('/login');
    }
});

http.createServer(app).listen(3000, function() {
    console.log('Server running at http://localhost:3000');
});