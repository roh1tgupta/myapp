var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
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
  var values = [obj.userid, obj.password, obj.age, obj.name, obj.address, obj.occupation];
  var sql = "insert into usercred (userid, password, age, name, address, occupation) values ('"+obj.userid+"', '"+obj.password+"', '"+obj.age+"', '"+obj.name+"', '"+obj.address+"', '"+obj.occupation+"')";
  console.log('sql...',sql);
  con.connect(err => {
    if (err) {
      res.send('server issue');
      throw err;
    }
    console.log('connected to database');
    con.query(sql, (err, result) => {
      if (err) {
        res.send('server issue');
        throw err;
      }
      console.log('result object', result);
      id = result.insertId;
      console.log('number of records inserted', result.affectedRows);
      res.send('insertd with '+id+' ');
    });
  })
  
});

module.exports = router;

