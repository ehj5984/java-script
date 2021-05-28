let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);
// let mysql = require('mysql')

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'test1',
//
// });
// connection.connect();

app.get('/news0401', function(req, res) {
  res.sendfile("news2.html");
});



// app.post('/news2', function(req, res) {
//   connection.query(`INSERT INTO news
//     (Title, Content)
//     VALUES
//     ('${req.body.Title}','${req.body.Content}')`,
//     function(error, results, fields) {
//       if (error) throw error
//       res.send(results);
//
//     });
// });
