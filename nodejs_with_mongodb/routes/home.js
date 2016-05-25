var express = require("express");

var router = express.Router();


router.get("/", function (request, response) {
    //GET Parameter를 그대로 json 형태로 response에 담아서 보내는 기능
    return response.json(request.query);
});

router.post("/", function (request, response) {
    //POST data를 그대로 json 형태로 response에 담아서 보내는 기능
    return response.json(request.body);
});


module.exports = router;