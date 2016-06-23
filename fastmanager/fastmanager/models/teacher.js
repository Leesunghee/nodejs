var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var teacherSchema = Schema({
  username: {
    type: String
  },
  lectures:[{
    lecture_id:{type: [mongoose.Schema.Types.ObjectId]},
    lecture_title: {type:String}
  }]
});


var Teacher = module.exports = mongoose.model('Teacher', teacherSchema);
