var router = require('express').Router();
var commentsCtrl = require('../controllers/debaters')

router.get('/debaters/addComment', commentsCtrl.addComment);
router.post('/debaters/:id/comments', commentsCtrl.createComment);

module.exports = router;