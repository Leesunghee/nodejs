var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var studentSchema = Schema({
  username: {
    type: String
  },
  lectures:[{
    lecture_id:{type: [mongoose.Schema.Types.ObjectId]},
    lecture_title: {type:String}
  }]
});


var Student = module.exports = mongoose.model('Student', studentSchema);
