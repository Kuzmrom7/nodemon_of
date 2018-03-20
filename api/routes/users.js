const express = require('express');
const router = express.Router();
const logger = require('../../logger/logger');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const config = require('../../config/main');
require('../../config/passport')(passport);


// Register new users
router.post('/register', function(req, res) {
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save((err) => {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }

      User.findOne({
        email: req.body.email
      }, (err, user) => {
        if (err) throw err;
        if (!user) {
          res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
          // Check if password matches
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
              // Create token if the password matched and no error was thrown
              const token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: 604800 // 1 week
              });
              res.json({ success: true, token: token });
            } else {
              res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
            }
          });
        }
      });

     // res.json({ success: true, message: 'Successfully created new user.' });
    })

  }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800 // 1 week
          });
          res.json({ success: true, token: token });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});

module.exports = router;