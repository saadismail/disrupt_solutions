const express = require('express');
const router = express.Router();

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
