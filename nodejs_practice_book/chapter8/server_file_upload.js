/**
 * Created by sunghee on 2016. 5. 10..
 */
var fs = require('fs');
var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(cookieParser());
//app.use(express.limit('10mb'));
app.use(bodyParser({uploadDir: __dirname + '/multipart'}));

app.get('/', function (request, response) {
    fs.readFile('HTMLPage.html', function(error, data) {
        response.send(data.toString());
    });
});

app.post('/', function (request, response) {

    var comment = request.param('comment');
    var imageFile = request.files.image;

    if (imageFile) {
        var name = imageFile.name;
        var path = imageFile.path;
        var type = imageFile.type;

        if (type.indexOf('image') != -1) {
            //이미지 파일의 경우: 파일 이름을 변경합니다
            var outputPath = __dirname + '/multipart/' + Date.now() + '_' + name;

            fs.rename(path, outputPath, function (error) {
                response.redirect('/');
            });
        } else {

            // 이미지 파일이 아닌 경우 : 파일 이름을 제거합니다
            fs.unlink(path, function (error) {
                response.send(400);
            });
        }
    } else {
        //파일이 없을 경우
        response.send(404);
    }

    console.log(request.body);
    console.log(request.files);

    response.redirect('/');
});

http.createServer(app).listen(5000, function() {
    console.log('Server running at http://localhost:5000');
});