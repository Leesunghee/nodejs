//Post
// - title(String, unique)
// - content(String)
// - createdAt(Date)
// - updatedAt(Date)

var mongoose = require("mongoose");
var Schema = mongoose.Schema; //개요 구조 틀

var mongooseAutoIncrement = require("mongoose-auto-increment");

// 플러그인 초기화
mongooseAutoIncrement.initialize(mongoose.connection);



var commentSchema = new Schema({
    content: {type: String},
    createdAt: {type: Date}
});

commentSchema.pre("save", function(next) {
    var currentDate = new Date();
    if (!this.createdAt) this.createdAt = currentDate;

    next();
})

//1.postSchema를 생성하기
var postSchema = new Schema({
    title: {type: String, unique: true},
    content: {type: String},
    createdAt: {type: Date},
    updatedAt: {type: Date},
    comments: [commentSchema]
});

postSchema.pre("save", function(next) {
    //일단 createAt 비어있으면 채우기
    //updatedAt 무조건 새로 채우기
    var currentDate = new Date();
    if (!this.createdAt) this.createdAt = currentDate; //this post 하나하나를 의미?
    this.updatedAt = currentDate;

    next();
});

//플러그인 적용
postSchema.plugin(
    mongooseAutoIncrement.plugin,
    {model: "Post", startAt: 1}
);

//2.Post Model을 생성하기
var Post = mongoose.model("Post", postSchema);


module.exports = Post;