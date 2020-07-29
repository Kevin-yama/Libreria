const mysql = require('mysql');
var express = require('express');
const bodyParser = require('body-parser');
const dir_routers = require('./routers/data');
const path = require('path');
const mysqlCon = require('express-myconnection');
var app = express();


//entiende los datos del formulario 
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));


app.use(mysqlCon(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'libreria'
}));

app.use('/',dir_routers);

app.listen(4000, () => {
    console.log('Running on port 4000');    
  });

  
  



