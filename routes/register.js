var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {
  console.log(req.headers["content-type"]);
  console.log(req.body);
  if(req.body.name == 'rohit' && req.body.pass =='1234')
  res.send('in register user');
  else
  res.send('incorrect data');
});

module.exports = router;

