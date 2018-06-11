var express = require('express');
var info = require('../files/firstfile');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 //res.send([{'name':'rohit','age':'23'}, {'name':'rahul','age':'25'} ]);
 res.send( JSON.stringify(info.info));

});

module.exports = router;
