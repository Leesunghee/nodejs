var express = require("express");

var router = express.Router();



//users list (R)
router.get("/", function(request, response) {

    request.db.get('users').find({}, function(error, document) {
        if (error) response.send(error);
        return response.json(document);
    });
});

//users create (C)
//HTTP Method->POST->Create
router.post("/", function(request, response) {
    var username = request.body.username;
    var email = request.body.email;
    var content = {
        'username': username,
        'email': email
    }
    //return response.json(content);

    request.db.get('users').insert(content, function(error, document) {
        if (error) response.send(error);
        return response.send("created");
    });
});

//users detail (R)
router.get("/:username/", function(request, response) {
    var username = request.params.username;

    //response.send(username);

    request.db.get('users').find({'username': username}, function(error, document) {
        if (error) response.send(error);
        return response.json(document);
    });
});

//users update
router.patch("/:username/", function(request, response) {
    var username = request.params.username;
    var email = request.body.email; //POST

    //1.find 2.replace, 3.callback
    request.db.get('users').update({'username': username}, {'username': username, 'email': email}, function(error, document) {
        if (error) response.send(error);
        return response.send("updated");
    });
});

//users delete
router.delete("/:username/", function(request, response) {
    var username = request.params.username;

    //1.find 2.replace, 3.callback
    request.db.get('users').remove({'username': username}, function(error, document) {
        if (error) response.send(error);
        return response.send("deleted");
    });
});


module.exports = router;