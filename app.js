const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mysql = require('mysql');


const database = require('./config/database')
const db = mysql.createConnection ({
  host            : database.host,
  user            : database.username,
  password        : database.password,
  database        : database.database
});

// connect to database
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;


const app = express();

const usersRoutes = require('./routes/users');

const port = 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRoutes);

// indexRoute
app.get('/', (req,res) => {
  res.send("Invalid Endpoint");
})

app.listen(port, () => {
  console.log("server started @ port: "+port);
})
