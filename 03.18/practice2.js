let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test1'
});
connection.connect();
// 검색 후 복사해서 쓰면 됨 노드를 이용해 쿼리를 날리지 위해 적어놓

app.get('/ajaxPracticeForm', function(req, res) {
  res.sendfile("ajaxPractice.html");
});

app.get('/studentInfoPractice', function(req, res) {
  console.log(req.query.no);
  connection.query(`SELECT NO, studentNo, NAME, age
FROM student
WHERE no=${req.query.no}`,
    function(error, results, fields) {
      res.send(results);
    });
});

//  서버는 어디에서 요청이 온건지 모름
//

//
//
// app.get('/order', function (req,res) {
// });  // 주문을 읽어오는 로직
//
// app.put('/order', function (req,res) {
// });  // 주문을 수정하는 로직
//
// app.post('/order', function (req,res) {
// });  // 주문을 생성하는 로직
//
// app.delete('/order', function (req,res) {
// });  // 주문을 삭제하는 로직
