const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
  res.render('index');
})


router.get('/signup', (req, res) => {
  res.render('signup');
})

router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    newUser = {
      username: req.body.username,
      password: hash
    }
    Users.findOne({
      username: req.body.username
    })
    .then( (user) => {
      if (user){
        res.render("signup", {errorMessage: "The username already exists!"})
      } else {
        Users.create(newUser, (err) => {
          if (err) console.log(err)
          else {
            res.render('index', {
              registered: true
            })
          }
        })
      }
    })
  });
})

router.get('/login', function (req, res, next) {
  res.render('login', {
    login: false
  });
});   

router.post('/login', function (req, res) {
  Users.findOne({
    username: req.body.username
  }).then(function (user) {
    if (!user) {
      res.render('index', {errorMessage: "The username does not exist!"})
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          req.session.currentUser = user.username;
          res.redirect('cinema')
        } else {
          res.render('index', {errorMessage: "The password is incorrect!"})
        }
      });
    }
  })
});

router.get('/cinema', (req, res) => {
  if(req.session.currentUser){
    res.render('cinema/index');
  }
  else{
    res.send("you are not permitted to view this page")
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})


module.exports = router;