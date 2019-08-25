var router = require('express').Router();
var debatersCtrl = require('../controllers/debaters')

router.get('/debaters', debatersCtrl.index);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
