const Debaters = require ('../models/debater');

module.exports = {
  index
};

function index(req, res, next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  Debaters.find(modelQuery).sort(sortKey).exec(function(err, debaters) {
    if (err) return next(err);
    res.render('partials/header', {
      debaters,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}