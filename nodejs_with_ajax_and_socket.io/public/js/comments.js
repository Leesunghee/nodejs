$(document).ready(function() {
    var form = $("section#comments-ajax-create-section form");
    var postId = $(form).data("post-id");
    var url = "/api/posts/" + postId + "/comments/";
    //alert(url);

    var commentsListElement = $("#comments-list-section ul");
    var commentsCountElement = $("#comments-count");

    //댓글을 로딩한다
    $.ajax({
        url: url,
        type: "GET",
        success: function(result) {
            var commentsCount = result.length;
            $(commentsCountElement).html(commentsCount);
            result.forEach(function(comment) {
                (commentsListElement).append($("<li>").text(comment.content));
            });
        }
    });
;
    form.submit(function() {
        var inputElement = $(form).find("input[name='content']");
        var content = $(inputElement).val();
        var data = {
            content: content
        };
        //alert(content);

        //ajax Request
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function(result) {
                //alert(result.message);


                //데이터 list에다가 추가하기
                $(commentsListElement).append($("<li>").text(content));

                //댓글 카운트 올리기
                var commentsCount = $(commentsCountElement).html();
                $(commentsCountElement).html(Number(commentsCount) + 1);

                //기존의 input을 깔끔하게 비워준다
                $(inputElement).val("");
            },
            error: function(result) {
                alert("error");
            }
        });

        return false; // submit 버튼 이후에 기존에 form 이 동작하지 않도록 한다
    })
});
