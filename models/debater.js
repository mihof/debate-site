var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
  text: {
  type: String,
  min: 5,
  max:300
  }
});

var postSchema = new mongoose.Schema({
  text: {
  type: String,
  min: 10,
  max: 50
  }
});

var debaterSchema = new Schema ({
  name: String,
  email: String,
  post: [postSchema],
  comment: [commentSchema],
  googleId: String
});

module.exports = mongoose.model('Debater', debaterSchema);