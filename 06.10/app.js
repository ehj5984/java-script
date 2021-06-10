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


var bodayParser = require('body-parser');
app.use(bodayParser.urlencoded({
  extended: false
}))
app.use(bodayParser.json());


app.get('/practice', function(req, res) {
  res.sendfile("main.html")
});

app.get('/insertPage', function(req, res) {
  res.sendfile("insertPage.html")
});

app.get('/listPage', function(req, res) {
  res.sendfile("listPage.html")
});

app.get('/updatePage', function(req, res) {
  res.sendfile("updatePage.html")
});

app.get('/listNo', function(req, res) {
  connection.query(`SELECT * FROM test4`,
    function(error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
});

app.get('/oneStudentUpdate', function(req, res) {
  connection.query(`SELECT * FROM test4 where no = ${req.query.num}`,
    function(error, results, fields) {
      if (error) console.log(error);
      console.log(results)
      res.send(results);
    });
});

app.delete('/delete', function(req, res) {
  connection.query(`delete from test4 where no = ${req.body.inputNum} `,
    function(error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
});


// app.post('/student', function(req, res) {
//   let pricePrice = Number(req.body.inputPrice);
//   console.log(pricePrice);
//   let buyProductName = "구매 불가능"
//
//   connection.query(`SELECT *
//    FROM test4 order by price asc`,
//     function(error, results, fields) {
//
//       for (let i = 0; i < results.length; i++) {
//         if (pricePrice >= results[i].price) {
//           buyProductName = results[i].item
//         }
//       }
//       res.send(buyProductName);
//     });
// });

app.put('/updateDB', function(req, res) {
      let inputNo = req.body.inputNo
      let inputName = req.body.inputName
      let inputJavascript = req.body.inputJavascript
      let inputPython = req.body.inputPython
      let inputJava = req.body.inputJava

      console.log(req.body.num, inputNo, inputName);

      connection.query(`SELECT * FROM test4 WHERE  studentName="${inputName}" OR javascript=${inputJavascript} OR python=${inputPython} OR java=${inputJava} `,
        function(error, results, fields) {
          if (error) throw error
          let len = results.length
          console.log(len);
          if (len == 0) {
            connection.query(`UPDATE test4 SET studentName="${inputName}", javascript=${inputJavascript}, python=${inputPython}, java=${inputJava} where no = ${req.body.num};`)
            res.send("입력성공")

          }

        });
      });

  

  app.post('/inputDB', function(req, res) {

        let inputNo = req.body.inputNo
        let inputName = req.body.inputName
        let inputJavascript = req.body.inputJavascript
        let inputPython = req.body.inputPython
        let inputJava = req.body.inputJava
        let message = ""

        connection.query(`SELECT * FROM test4 WHERE studentNo ="${inputNo}" OR studentName="${inputName}" OR javascript =${inputJavascript} OR python =${inputPython} OR java =${inputJava} `,
          function(error, results, fields) {
            if (error) throw error
            console.log(results);
            let len = results.length
            console.log(len);

            if (len == 0) {
              connection.query(`INSERT INTO test4 (studentNo,studentName,javascript,python,java )  VALUES ('${inputNo}','${inputName}','${inputJavascript}','${inputPython}','${inputJava}')`)
              message = "입력되었습니다"
              res.send("입력되었습니다")
            }

            else if (len == 1 && results[0].studentNo == inputNo) {
                res.send("동일한 학번을 가진 학생이 존재합니다")
            }

        });
    });
