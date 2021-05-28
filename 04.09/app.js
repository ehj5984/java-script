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

connection.query(`select * from news`,
  function(error, results, fields) {
    if (error) console.log(error);
    console.log(results);
  });

app.get('/', function(req, res) {
  res.send("hello world");
});


app.get('/form', function(req, res) {
  res.sendfile("test.html");
});

app.get('/getTest', function(req, res) {
  connection.query(`select * from news`,
    function(error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
});

app.post('/postTest', function(req, res) {
  console.log(req.body.title, req.body.content);
  let title = req.body.title;
  let content = req.body.content;

  connection.query(`insert into news (title, content) values('${title}','${content}')`,
    function(error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
});
