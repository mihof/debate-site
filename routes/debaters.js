var router = require('express').Router();
var debatersCtrl = require('../controllers/debaters')

router.get('/debaters/browse', debatersCtrl.index);
router.get('/debaters/addDebate', isLoggedIn, debatersCtrl.addDebate);
router.post('/debaters', debatersCtrl.create)
router.delete('/debaters/browse/:id', debatersCtrl.delDebate)



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
