const Debaters = require ('../models/debater');

module.exports = {
  index,
  addDebate,
  create,
  delDebate
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
  req.user.addDebate.push(req.body)
  req.user.save(function(err) {
    if (err) return res.redirect('/debaters/browse');
    res.redirect(`/debaters/browse`);
  });
}

function delDebate(req, res, next) {
    Debaters.findOne({'addDebate._id': req.params.id}, function(err, debater) {
    debater.addDebate.id(req.params.id).remove();
    debater.save(function(err) {
      res.redirect('/debaters/browse');
    });
  });
}