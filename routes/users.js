const express = require('express');
const database = require('../config/database')
const mysql = require('mysql');
const router = express.Router();
const AuthService = require('../services/authService')

var mySQLPool = mysql.createPool({
  connectionLimit : 1,
  host            : database.host,
  user            : database.username,
  password        : database.password,
  database        : database.database
});

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

const authService = new AuthService(db);

router.post('/register', (req, res) => {
  let user = {
    "f_name": req.body.f_name,
    "l_name": req.body.l_name,
    "email": req.body.email,
    "password": req.body.password,
    "access_level": req.body.access_level
  }

  authService.registerUser(db, user, (err) => {
    if (err) {
      res.json({success: false, msg: err})
    } else {
      res.json({success: true, msg: 'Registered successfully.'})
    }
  });
});

router.get('/authenticate', (req, res) => {
  res.send('AUTHENTICATE');
});

module.exports = router;
