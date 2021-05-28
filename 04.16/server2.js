let express = require('express');
let http = require('http');
let app = express();

//80번 포트에서 서버 리퀘스트
let server = http.createServer(app).listen(80);
let mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test1',
});

connection.connect();


//메인 주소로 리퀘스트를 받아서 서버로 보내주겠


app.get('/test', function(req, res) {
  res.send([10, 20, 30]);
});


app.get('/practice00', function(req, res) {
  res.sendfile("practice00.html");
});

app.get('/testdb', function(req, res) {

  connection.query(`SELECT NO, studentNo, NAME, age
    FROM student`,
    function(error, results, fields) {
      if (error) throw error;
      console.log(results);
      setTimeout(function() {
        res.send("10");
      }, 2000) // settimeout 서버 응답시간을 2초로
    });
});



app.get('/form', function(req, res) {
  res.sendfile("form.html");
});
//ctrl alt b 뷰티 단축0
