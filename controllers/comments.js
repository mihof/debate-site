const Comment = require('../models/comment');

module.exports = {
  addComment,
  createComment
}

function addComment(req,res) {
  res.render('debaters/addComment', {
    user: req.user,
    name: req.query.name,
  });
}

function createComment(req, res) {
  Debaters.findById(req.params.id, function(err, debaters) {
    debaters.comment.push(req.body);
    debaters.save(function(err) {
      res.redirect(`/debaters/brows/${debater._id}`);
    });
  });
}