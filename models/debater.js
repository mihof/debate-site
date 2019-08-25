var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
  text: String
});

var debaterSchema = new Schema ({
  name: String,
  email: String,
  post: [postSchema],
  googleId: String
});

module.exports = mongoose.model('Debater', debaterSchema);