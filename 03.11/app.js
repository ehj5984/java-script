let express = require('express');
let http = require('http');
let app = express();
// 서버를 띄우기 위한 것



var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test1'
});
connection.connect();
// 검색 후 복사해서 쓰면 됨 노드를 이용해 쿼리를 날리지 위해 적어놓


app.get('/testdb', function(req, res) {
  connection.query(`SELECT NO, studentNo, NAME, age
	FROM student`, function(error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send(results);

  })
});


let server = http.createServer(app).listen(80); //포트정보


app.get('/', function(req, res) {
  res.send([10, 20, 30]);
});


// 메인주소로 리퀘스트 받아서 helloworld라는 텍스트를 응답으로

app.get('/test2', function(req, res) {
  res.send("hello world2");
});

app.get('/3.11practice', function(req, res) {
  res.sendfile("3.11practice.html");
});


app.get('/practice', function(req, res) {
  res.sendfile("practice.html");
});

app.get('/practic', function(req, res) {
  res.send("hello world2");
});


app.get('/test', function(req, res) {
  res.sendfile("test.html");
});



app.get('/practice2', function(req, res) {
  res.sendfile("practice2.html");
});



app.get('/table', function(req, res) {
  res.sendfile("table.html");
});


app.get('/css', function(req, res) {
  res.sendfile("css.html");
});



app.get('/', function(req, res) {
  res.send([10, 20, 30]);
});
