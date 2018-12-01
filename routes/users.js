const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const AuthService = require('../services/authService')
const general_config = require('../config/general_config');

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
            res.json({
                success: false,
                msg: err
            })
        } else {
            res.json({
                success: true,
                msg: 'Registered successfully.'
            })
        }
    });
});

router.post('/authenticate', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    authService.getUserByEmail(email, (err, user) => {
        if (err || !user) {
            return res.json({
                success: 0,
                msg: 'Failed authentication'
            });
        }
        
        authService.comparePassword(password, user.password, (err, isMatched) => {

            if (err || !isMatched) {
                return res.json({success: 0, msg: 'Wrong password'});
            }

            const token = jwt.sign(user, general_config.secret, {
                expiresIn: 604800 // 1 week
            });

            return res.json({
                success: 1,
                msg: "Logged in successfully",
                token: 'JWT ' + token,
                user: {
                    id: user.id,
                    f_name: user.f_name,
                    l_name: user.l_name,
                    email: user.email
                }
            });
        })

    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.send({user: req.user})
});

module.exports = router;