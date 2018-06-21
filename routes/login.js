var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/*
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
  password: "mysql",
  database: 'nodedb'
});
*/
//Adding pool option Having a pool of connections for a server which has to do many queries
var con = mysql.createPool({
  connectionLimit: 10,
	host: "localhost",
	user: "root",
  password: "mysql",
  database: 'nodedb'
});


router.post('/', function(req, res) {
  var id ;
  console.log(req.headers["content-type"]);
  console.log(req.body);
  var obj = req.body;
  var sql = "select * from usercred where userid = ? AND password = ?";
  console.log('sql...',sql);
 
    console.log('connected to database');
    con.query(sql, [obj.userid, obj.password], (err, result) => {
      if (err) {
        res.send('server issue');
        throw err;
      }
      console.log('result object', result);
      res.send(result);
    });
  
  
});

module.exports = router;

