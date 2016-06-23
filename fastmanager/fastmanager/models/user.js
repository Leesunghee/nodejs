var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var async = require('async');
var bcrypt = require('bcrypt');

var userSchema = Schema({
  username: {
    type: String
  },
  name: {
    type: String
  },
  password:{
    type:String,
    bcrypt: true
  },
  email: {
    type: String
  },
  type:{
    type:String
  }
});


var User = module.exports = mongoose.model('User', userSchema);

// module.exports.getUserbyUsername = function (username, callback) {
//     query = {username: username};
//     User.findOne(query, callback);
// };
//
// module.exports.getUserById = function (userId, callback) {
//     User.findById(userId, callback);
// };
//
//
// //유저를 생성하면서, student를 동시에 생성하는 함수
// module.exports.saveStudent = function (newUser, newStudent, callback) {
//     //var newUser = User({username: ______, password: ______});
//     //newUser.save(function(error, ...)
//
//     //1.암호를 해쉬화해서 새롭게 만든 후에 저장한다 ("leesunghee" -> "asdfasdfkaskdfj"
//     bcrypt.hash(newUser.password, 10, function (error, hash) {
//         newUser.password = hash;
//
//         //2. User를 생성함과 동시에 , Student를 생성하는 것
//         async.parallel([newUser.save, newStudent.save], callback);
//     });
//
// };

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}


module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(error, isMatch){
        if (error) throw error;

        callback(null, isMatch);
    });
}


module.exports.saveStudent = function(newUser, newStudent, callback){
    bcrypt.hash(newUser.password, 10, function(error, hash){
        if (error) throw error;

        newUser.password = hash;
        async.parallel([newUser.save, newStudent.save], callback);
    });
}


module.exports.saveTeacher = function(newUser, newTeacher, callback){
    bcrypt.hash(newUser.password, 10, function(error, hash){
        if (error) throw error;

        newUser.password = hash;
        async.parallel([newUser.save, newTeacher.save], callback);
    });
}
