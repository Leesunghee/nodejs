var async = require("async");

// User 가 생성되고 나서
// 바로 Student가 동시에 생성되어야 한다

var user = function () {
    console.log("User!!!");
}

var student = function () {
    console.log("Student!!!");
}

async.parallel([user, student]);