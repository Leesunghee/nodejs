var http = require ('http');
var express = require('express');

var app = express();

app.get('/page/:id', function (request, response) {

    var name = request.param('id');

    response.send('<h1>Hello ' + name + ' Page</h1>');

});

app.all('*', function(request, response) {
    response.send(404, '<h1>ERROR - page Not Found</h1>');
});

http.createServer(app).listen(3000, function() {
    console.log("server running at http://localhost:3000");
});
