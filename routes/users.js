const express = require('express');
const database = require('../config/database')
const mysql = require('mysql');

const router = express.Router();
var connection = mysql.createConnection({
  host     : database.host,
  user     : database.username,
  password : database.password,
  database : database.database
});

connection.connect((err) => {
  if (err) {
    console.error('Error Connecting MySQL: ' + err);
    return;
  }
 
  console.log('MySQL connected successfully.');
});

router.get('/register', (req, res) => {
  res.send('REGISTER');
});

router.get('/authenticate', (req, res) => {
  res.send('AUTHENTICATE');
});

router.get('/profile', (req, res) => {
  res.send('PROFILE');
});

router.get('/validate', (req, res) => {
  res.send('VALIDATE');
});



module.exports = router;
