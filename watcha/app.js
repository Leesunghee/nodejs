/**
 * Created by sungheelee on 2016. 5. 18..
 */

var express = require("express");
var path = require("path");
var https = require("https");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

//bodyParser - middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response) {

    var search = request.query.search;

    https.get('https://watcha.net/home/news.json?page=1&per=50', function(apiResponse) {

        var apiData = "";
        apiResponse.on("data", function(chunk) {
            apiData += chunk;
        });

        apiResponse.on("end", function() {
            var apiJsonData = JSON.parse(apiData);
            var news  = apiJsonData.news;
            //console.log(apiJsonData);
            var matchedNews = [];

            if (search) {
                news.forEach(function(newsInformation) {
                    if (newsInformation.title.indexOf(search) > -1) {
                        matchedNews.push(newsInformation);
                    }
                })
            } else {
                matchedNews = news;
            }
            return response.render("home", {news: matchedNews, search: search});
        });
    })
    // var moives = ["곡성", "시빌워"];
    //return response.render("home", {movies: moives});

});




app.listen(3000, function() {
    console.log("Server is running at localhost:3000");
});



