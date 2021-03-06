const Debaters = require ('../models/debater');

module.exports = {
  index,
  addDebate,
  create,
  delDebate,
  createComment
};

function index(req, res, next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  Debaters.find(modelQuery).sort(sortKey).exec(function(err, debaters) {
    if (err) return next(err);
    res.render('debaters/browse', {
      debaters,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}

function addDebate(req,res) {
  res.render('debaters/addDebate', {
    user: req.user,
    name: req.query.name,
  });
}

function create(req, res) {
  var newDebateObj = {
    name: req.user.name,
    email: req.user.email,
    addDebate: [req.body],
    comment: [],
    googleId: req.user.googleId
  }
  var newDebate = new Debaters(newDebateObj)
  newDebate.save(function(err) {
    if (err) return res.redirect('/debaters/browse');
    res.redirect(`/debaters/browse`);
  });
}

function delDebate(req, res, next) {
  console.log('delete route');
    Debaters.findByIdAndDelete(req.params.id, function(err, deletedDebater) {
      res.redirect('/debaters/browse')
  });
}

function createComment(req, res) {
  Debaters.findById(req.params.id, function(err, debater) {
    debater.comment.push(req.body);
    debater.save(function(err) {
      res.redirect('/debaters/browse');
    });
  });
}