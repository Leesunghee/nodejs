var express = require("express");
var router = express.Router();

var Post = require("../models/post");

router.get("/", function(request, response) {
    //request.db.get("posts").find~~~ monk사용시
    Post.find({}, function(error, posts) {
        if (error) repsonse.send(error);
        return response.render("posts/list", {"posts": posts});
    });
});

router.post("/", function(request, response) {
    var title = request.body.title;
    var content = request.body.content;

    var post = Post({
        title: title,
        content: content
    });

    post.save(function(error) {
        if (error) response.send(error);
        return response.redirect("/posts/" + post._id);
    });

    //return response.send(title);
});


router.get("/new", function(request, response) {
    return response.render("posts/new");
});

router.get("/:postId/edit", function(request, response) {
    var postId = request.params.postId;

    Post.findById(postId, function(error, post) {
        if (error) response.send(error);
        return response.render("posts/edit", {"post": post});
    });
});

router.get("/:postId/delete", function(request, response) {
    var postId = request.params.postId;

    Post.findById(postId, function(error, post) {
        if (error) response.send(error);
        post.remove();
        return response.redirect("/posts/");
    });
});


router.get("/:postId", function(request, response) {
    var postId = request.params.postId;

    //Post.find({_id: postId}, .. )
    Post.findById(postId, function(error, post) {
        if (error) response.send(error);
        return response.render("posts/detail", {"post": post});
    });
});

router.post("/:postId/edit", function(request, response) {
    var postId = request.params.postId;

    var title = request.body.title;
    var content = request.body.content;

    Post.findById(postId, function(error, post) {
        if (error) response.send(error);
        post.title = title;
        post.content = content;

        post.save(function(error) {
            if (error) response.send(error);
            return response.redirect("/posts/" + post._id);
        });
    });


});


router.post("/:postId/comments", function (request, response) {
    var postId = request.params.postId;

    var content = request.body.content;

    Post.findById(postId, function (error, post) {
        if (error) response.send(error);

        var comment = {
            content: content
        };
        post.comments.push(comment);

        post.save(function (error) {
            if (error) response.send(error);
            return response.redirect("/posts/" + post._id + "/");
        })
    })
});

router.get("/:postId/comments/:commentId/delete", function (request, response) {
    var postId = request.params.postId;
    var commentId = request.params.commentId;

    Post.findById(postId, function (error, post) {
        if (error) response.send(error);
        post.comments.id(commentId).remove();
        post.save(function(error) {
            if (error) response.send(error);
            return response.redirect("/posts/" + post._id + "/");
        })
    });
})

module.exports = router;