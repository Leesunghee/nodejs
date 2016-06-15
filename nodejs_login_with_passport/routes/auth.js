var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");

router.get("/signup", function (request, response) {
    return response.render("auth/signup");
});

router.post("/signup", function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;

    // console.log(username);
    // console.log(password);
    // console.log(email);

    //local mongoose function
    User.register(
        new User({username: username, email: email}),
        password,
        function(error, user) {
            if (error) return response.json(error);
            passport.authenticate('local')(request, response, function() {
                // Add Flash Message
                request.flash("success", "성공적으로 회원가입 되었습니다.");
                return response.redirect("/login/");
            });
        }
    );
});

router.get("/login", function (request, response) {
    return response.render("auth/login");
});

router.post("/login", passport.authenticate("local"), function(request, response) {
    request.flash("success", "성공적으로 로그인 되었습니다.");
    return response.redirect("/");
});

router.get("/logout", function(request, response) {
    request.logout();
    request.flash("success", "성공적으로 로그아웃 되었습니다.");
    return response.redirect("/");
});

router.get("/auth/kakao", passport.authenticate("kakao"));


router.get('/auth/kakao/callback', passport.authenticate('kakao', { failureRedirect: '/login' }), function(request, response) {
    request.flash("success", "성공적으로 카카오톡 로그인 되었습니다.");
    return response.redirect('/');
});

router.get("/auth/facebook", passport.authenticate("facebook"));


router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(request, response) {
    request.flash("success", "성공적으로 페이스북 로그인 되었습니다.");
    return response.redirect('/');
});

module.exports = router;