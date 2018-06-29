var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
  password: "mysql",
  database: 'nodedb'
});

router.post('/all', function(req, res) {
    var sql = "select * from randominfo";
    con.query(sql, (err, result) => {
      if (err) {
        res.send('server issue');
        throw err;
      }
      else {
        res.send(result);
      }
    });
});


router.post('/:contentPerPage/:pageNumber', function(req, res) {
  var contentPerPage =  req.params.contentPerPage;
  var pageNumber =  req.params.pageNumber;
  var response = {data: '', total: ''};
  console.log(contentPerPage,pageNumber);
  if (pageNumber == undefined || pageNumber == 0 || pageNumber == 1) {
    var sql = "select * from randominfo limit " + contentPerPage+"";
    console.log(sql);
    con.query(sql, (err, result) => {
      if (err) {
        res.send('server issue');
        throw err;
      }
      else {
        response.data = result;
        console.log("fist respsne..",response);
      }
    });
    sql = "select count(*) as total from randominfo";
    con.query(sql, (err, result) => {
      if (err) {
        res.send('server issue');
        throw err;
      }
      else {
        response.total = result;
        console.log("2nd repsonse...",response);
        
      }
      
      res.send(response);
    });
    
  } else {
    var limit = contentPerPage * (pageNumber - 1);
    var sql = "select * from randominfo limit " +limit+","+contentPerPage+"";
    console.log(sql);
    con.query(sql, (err, result) => {
      if (err) {
        res.send('server issue');
        throw err;
      }
      else {
        console.log("respsne..",result);
        res.send(result);
      }
    });
  }
});

module.exports = router;

