let express = require('express');
let http = require('http');
let app = express();
let server = http.createServer(app).listen(80);

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});

connection.connect();

app.get('/practice', function(req, res) {
  res.sendfile("test.html")
});

var bodayParser = require('body-parser');
app.use(bodayParser.urlencoded({
  extended: false
}))
app.use(bodayParser.json());

app.post('/buyProduct', function(req, res) {
  let pricePrice = req.body.inputPrice;
  let buyProductName = "구매 불가능"

  connection.query(`SELECT *
   FROM item`,
    function(error, results, fields){

      for(let i = 0; i<results.length; i++) {
        if(pricePrice >=results[i].itemPrice) {
          buyProductName = results[i].itemName
        }
      }
      res.send(buyProductName);
    });
});

//
//
// app.get('/form', function(req, res) {
//   res.sendfile("form.html")
// });
//
// app.get('/getItem', function (req, res) {
//   connection.query(`select * from item`,
//     function(error, results, fields) {
//
//     let priceTable = results;
//
//     let itemName = "구매불가";
//     let price = req.query.price;
//
//     for(let i=0;i<priceTable.length;i++){
//       if(priceTable[i].itemPrice <= price){
//     	   itemName = priceTable[i].itemName;
//       }
//     }
//   	res.send(itemName);
//     });
// });
