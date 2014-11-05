
var http       = require('http');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'superuser',
  password : 'bestpass',
  database : 'login'
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.query('SELECT * FROM member', function(err, rows, fields) {
  if (err) throw err;
  http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var i;
    for(i=0;i<rows.length;i++){
      res.write(rows[i].name+'\n');
    }
    res.end('');
  }).listen(1337, '127.0.0.1'); 
});

connection.end();
