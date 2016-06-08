var express = require('express');
var path = require('path');
var pug = require('pug');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var messages = require('express-messages');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalStrategy = passportLocal.Strategy;

var passportKakao = require('passport-kakao');
var passportKakaoStrategy = passportKakao.Strategy;


//Load Routers
var homeRoute = require('./routes/home');
var authRoute = require('./routes/auth');

mongoose.connect("mongodb://localhost/passport");


//Load Models
var User = require("./models/user");

var app = express();


// Home => header, content, footer
// pug(jade)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Use Middelware
app.use(cookieParser("Nodecamp is awesome."));
app.use(session({
    secret: "Nodecamp is awesome.",
    resave: true,
    saveUninitialized: true
}));


//Flash messages settings
app.use(flash());
app.use(function(request, response, next) {
    
    //Flash Message를 전부다 읽어서, HTML 내에서 불러올 수 있도록 하는 역할. 위부터 순서를 잘 지켜야 함
    response.locals.messages = messages(request, response);
    next();
});


//Passport settings
app.use(passport.initialize());
app.use(passport.session());

//Passport Local settings
passport.use(new passportLocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.use(new passportKakaoStrategy({
        clientID: "8323a996a7dede518aef15d49bfe14e2",
        callbackURL: "http://localhost:3000/auth/kakao/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({kakaoId: profile.id}, function(error, user) {
            if (error) return done(error);
            if (!user) {
                user = new User({
                    username: profile.id,
                    kakaoId: profile.id
                });

                user.save(function(error) {
                    if (error) return done(error);
                });
            }

            return done(error, user);
        });
    }
));

app.use(function (request, response, next) {
    response.locals.user = request.user;
    next();
})

app.use("/static", express.static(path.join(__dirname, "public")));


//Use Routers
app.use("/", homeRoute);
app.use("/", authRoute);


app.listen(3000, function() {
    console.log("Server is running at localhost:3000");
});