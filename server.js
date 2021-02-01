const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

const fs =require('fs');
const mysql=require('mysql');

const data = fs.readFileSync('./database.json');
const configDB = JSON.parse(data);
const upload = multer({dest: './upload'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//console.log(configDB);

const connection = mysql.createConnection({
  host:configDB.host,
  user:configDB.user,
  password:configDB.password,
  port: configDB.port,
  database: configDB.database
});

connection.connect(err=>{  
  if(err)  
    console.log("Error connecting database ... \n\n");             
  else {
    console.log("Database is connected ... \n\n");    
    let count =0;

    app.get('/api/customers',(req,res)=>{
      console.log(`query start ....${count++} \n\n`);    
      connection.query(
        "SELECT * FROM customer",
        (err,rows,fields) => {          
          if(!err)
            res.send(rows);          
        }
      );

    });
  }  
      
});


app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER(id,image,name,birthday,gender,job) VALUES (null,?,?,?,?,?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthDay = req.body.birthDay;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image,name,birthDay,gender,job];
  connection.query(sql, params, 
    (err, rows, fields) => {
      if(!err) {
        res.send(rows);
      }
      else {
        console.log(err);
        console.log(fields) ;
      }
    }
  );
});


app.listen(port, ()=> console.log(`Listening on port ${port}`));


