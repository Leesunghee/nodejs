var http = require("http");
var router = require("./router");

var app = http.createServer(function(request, response) {
    console.log(request.url);

    router.home(request, response);
    router.room(request, response);

});

app.listen(process.env.PORT);


