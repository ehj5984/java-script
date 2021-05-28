let express = require('express');
let http = require('http');
let app = express();

//80번 포트에서 서버 리퀘스트
let server = http.createServer(app).listen(80);
let mysql = require('mysql')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test1',

});


connection.connect();

app.get('/newshtml', function(req, res) {
  res.sendfile("news.html");
});

//
// app.get('/testdb', function(req, res) {
//   connection.query(`SELECT NO, studentNo, NAME
//     FROM student where no=${req.query.no}`,
//     function(error, results, fields) {
//       res.send(results);
//       //
//       // success: function(res){
//       //     console.log(res);
//       //
//       // },
//     });
//
// });
//
//
// app.post('/student', function(req, res) {
//   connection.query(`INSERT INTO student
//     (studentNo, NAME, age)
//     VALUES
//     ('${req.body.studentNo}','${req.body.NAME}','${req.body.age}')`,
//     function(error, results, fields) {
//       res.send(results);
//
//     });
// });


app.post('/news', function(req, res) {
  connection.query(`INSERT INTO news
    (Title, Content)
    VALUES
    ('${req.body.Title}','${req.body.Content}')`,
    function(error, results, fields) {
      if (error) throw error
      res.send(results);

    });
});
