var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Student = require('../models/student');
var Teacher = require('../models/teacher');

var async = require('async');


router.get('/signup', function(request, response) {
    return response.render("users/signup");
});


router.post('/signup', function(request, response) {
    var username = request.body.username;
    var email = request.body.email;
    var name = request.body.name;
    var password = request.body.password;
    var password2 = request.body.password2;

    var type = request.body.type; //student or teacher

    request.checkBody("email", "이메일이 입력되지 않았습니다.").notEmpty();
    request.checkBody("email", "이메일 형식이 올바르지 않습니다.").isEmail();
    request.checkBody("username", "아이디가 입력되지 않았습니다.").notEmpty();
    request.checkBody("name", "이름이 입력되지 않았습니다.").notEmpty();

    request.checkBody("password2", "입력한 비밀번호가 일치하지 않습니다.").equals(password);

    errors = request.validationErrors();

    if (errors) {
        return response.render("users/signup", {errors: errors});
    }

    var newUser = User({
        username: username,
        name: name,
        password: password,
        email: email,
        type: type
    });

    if (type == 'student') {
        var newStudent = Student({
           username: username
        });

        //async.parallel([newUser.save, newStudent.save], function (error, user) {
        //});

        User.saveStudent(newUser, newStudent, function(error, user){});
    } else {
        var newTeacher = Teacher({
            username: username
        });
        //async.parallel([newUser.save, newTeacher.save], function (error, user) {

        //});
        User.saveTeacher(newUser, newTeacher, function(error, user){});
    }

    return response.redirect("/login/");
});


passport.serializeUser(function(user, done) {
  done(null, user._id);
});


passport.deserializeUser(function(id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
      //1.실제 유저가 있는지 체크
      //username ==> 이 실제 데이터베이스에 있는가?
      //User.getUserByUsername(username, function(error, user) {
      //    if (!user) {
      //        ...
      //    2. password => 암호화 해보고 (hash) => 데이터베이스에 저장된 hashed password와 같은지 체크
      // })
      User.getUserByUsername(username, function(error, user){
          if (error) throw error;
          if(!user){
              return done(null, false, { message: username + " 에 해당하는 유저 정보를 찾을 수 없습니다." });
          }

          User.comparePassword(password, user.password, function(error, isMatch) {
              if (error) return done(error);
              if(isMatch) {
                  return done(null, user);
              } else {
                  return done(null, false, { message: '비밀번호가 올바르지 않습니다.' });
              }
          });
      });
  }
));


router.get("/login/", function(request, response) {
    return response.render("users/login");
});


router.post("/login/", passport.authenticate('local', {failureRedirect:'/login/', failureFlash: true}), function(request, response) {
    request.flash('success','성공적으로 로그인 되었습니다.');
    var userType = request.user.type;

    // FIXME: should return valid lectures view
    // return response.redirect('/'+userYype+'s/classes');
    return response.redirect("/");
});


router.get('/logout/', function(request, response) {
  request.logout();
  request.flash('success', "성공적으로 로그아웃 되었습니다.");
    return response.redirect('/');
});


module.exports = router;
