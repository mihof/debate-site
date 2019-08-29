var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
  text: {
  type: String,
  min: 5,
  max:300
  }
});

var addDebateSchema = new mongoose.Schema({
  topic: String,
  description: String,
});

var debaterSchema = new Schema ({
  name: String,
  email: String,
  addDebate: [addDebateSchema],
  comment: [commentSchema],
  googleId: String
});

module.exports = mongoose.model('Debater', debaterSchema);