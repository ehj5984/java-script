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


  app.get('/test', function(req, res) {
    res.sendfile("test.html");
  });



    app.get('/radio', function(req, res) {
      res.sendfile("radio.html");
    });


    app.get('/radio2', function(req, res) {
      res.sendfile("radio2.html");
    });
