const express = require('express');
const router = express.Router();
const AuthService = require('../services/authService')

const authService = new AuthService();

router.post('/register', (req, res) => {
  let user = {
    "f_name": req.body.f_name,
    "l_name": req.body.l_name,
    "email": req.body.email,
    "password": req.body.password,
    "access_level": req.body.access_level
  }

  authService.registerUser(user, (err) => {
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
