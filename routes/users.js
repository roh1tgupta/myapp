var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  console.log('id  = ', req.params.id);
  res.send('respond with a resource');
});

router.get('/', function(req, res, next) {
  console.log('id  = null');
  res.send('respond with a resource');
});

module.exports = router;
