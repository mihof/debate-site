const Debaters = require ('../models/debater');

module.exports = {
  index,
  browse,
  addDebate
};

function index(req, res, next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  Debaters.find(modelQuery).sort(sortKey).exec(function(err, debaters) {
    if (err) return next(err);
    res.render('homepage', {
      debaters,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}

function browse(req, res) {
res.render('debaters/browse', {
    user: req.user,
    name: req.query.name,
  });
}

function addDebate(req,res) {
  res.render('debaters/addDebate', {
    user: req.user,
    name: req.query.name,
  });
}