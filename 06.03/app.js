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

const ejs = require("ejs");
app.set('view engine','ejs'); // 1
app.use(express.static(__dirname + '/'));

var bodayParser = require('body-parser');
app.use(bodayParser.urlencoded({
  extended: false
}))
app.use(bodayParser.json());

app.get('/practice', function(req, res) {
  res.sendfile("test.html")
});

app.get('/insertForm', function(req, res) {
  res.sendfile("insertForm.html")
});

app.get('/list', function(req, res) {
  res.sendfile("list.html")
});

app.get('/updateForm', function(req, res) {
  res.sendfile("updateForm.html")
});


app.get('/listItem', function(req, res) {
  connection.query(`SELECT * FROM test3`,
    function(error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
});
// get -> query
app.get('/oneItemUpdate', function(req, res) {
  connection.query(`SELECT * FROM test3 where NO = ${req.query.num}`,
    function(error, results, fields) {
      if (error) console.log(error);
      console.log(results)
      res.send(results);

    });
});

app.delete('/delete', function(req, res) {
  connection.query(`delete from test3 where NO = ${req.body.inputNum} `,
    function(error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
});


app.post('/buyProduct', function(req, res) {
  let pricePrice = Number(req.body.inputPrice);
  console.log(pricePrice);
  let buyProductName = "구매 불가능"

  connection.query(`SELECT *
   FROM test3 order by price asc`,
    function(error, results, fields) {

      for (let i = 0; i < results.length; i++) {
        if (pricePrice >= results[i].price) {
          buyProductName = results[i].item
        }
      }
      res.send(buyProductName);
    });
});

app.post('/updateDB', function(req, res) {
      let inputItem = req.body.inputItem
      let inputPrice = req.body.inputPrice
      console.log(req.body.num, inputItem, inputPrice);

      connection.query(`SELECT * FROM test3 WHERE item="${inputItem}" OR price=${inputPrice}`,
        function(error, results, fields) {
          if (error) throw error
          let len = results.length
          console.log(len);
          if (len == 0) {
            connection.query(`UPDATE test3 SET price = ${inputPrice} , item = "${inputItem}" where NO = ${req.body.num};`)
            res.send("입력성공")
          }

          else if (len == 1) {
            if (results[0].item == inputItem && results[0].price == inputPrice) {
              res.send("동일한 이름, 가격을 가진 아이템이 존재합니다")
            } else if (results[0].item == inputItem) {
              res.send("동일한 이름이 존재합니다")
            } else if (results[0].price == inputPrice) {
              res.send("동일한 가격을 가진 아이템이 존재합니다")
            }

          } else if (len >= 2) {
            res.send("동일한 이름, 가격이 각각 존재합니다")
          }
        });
      });





      // `UPDATE test3 SET price = ${itemPrice} , item = "${itemName}"`


  app.post('/inputDB', function(req, res) {
        let itemName = req.body.inputItem
        let itemPrice = req.body.inputPrice
        let message = ""

        connection.query(`SELECT * FROM test3 WHERE item="${itemName}" OR price=${itemPrice}`,
          function(error, results, fields) {
            if (error) throw error
            console.log(results);
            let len = results.length
            console.log(len);



            if (len == 0) {
              connection.query(`INSERT INTO test3 (item, price)  VALUES ('${itemName}','${itemPrice}')`)
              message = "입력성공"
              res.send("입력성공")
            }

            // if (results[0].item == itemName && results[0].price == itemPrice) {
            //   res.send("동일한 이름, 가격을 가진 아이템이 존재합니다")
            // }
            else if (len == 1) {
              if (results[0].item == itemName && results[0].price == itemPrice) {
                res.send("동일한 이름, 가격을 가진 아이템이 존재합니다")
              } else if (results[0].item == itemName) {
                res.send("동일한 이름이 존재합니다")
              } else if (results[0].price == itemPrice) {
                res.send("동일한 가격을 가진 아이템이 존재합니다")
              }

            } else if (len >= 2) {
              res.send("동일한 이름, 가격이 각각 존재합니다")
            }
        });
    });
