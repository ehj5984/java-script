let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


let mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test1',
});
connection.connect();


app.post('/insertStudent', function(req, res) {
  connection.query(`INSERT INTO student
    ( studentdNo, studentName)
    VALUES
    ('${req.body.studentNo}','${req.body.studentName}')`,
    function(error, results, fields) {
      res.send(results);

    });
});



  app.get('/work1', function(req, res) {
    res.sendfile("work1.html");
  });

  app.get('/work2', function(req, res) {
    res.sendfile("work2.html");
  });

  app.get('/work3', function(req, res) {
    res.sendfile("work3.html");
  });

  app.get('/work4', function(req, res) {
    res.sendfile("work4.html");
  });
