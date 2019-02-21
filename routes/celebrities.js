const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity.js')




Celebrity.find({}, (err, celebs) => {
  router.get('/', (req, res) => {
    if (req.query.id){
      Celebrity.findById(req.query.id, function (err, celebById) {
        res.render('celebrities/show', {celebById});
      });
    }
    else{
      res.render('celebrities/index', {celebs})
    }  
  });
});

router.get('/new', (req, res) => {
  res.render('celebrities/new')
});


router.post('/', (req,res) => {
  Celebrity.create(req.body, function (err) {
    if (err) {
      console.log(err);
    } else {
      Celebrity.find({}, (err, celebs) => {
        res.render('celebrities/index', {celebs})
      })
      console.log(`celeb SAVED.`);
    }
  })
})


module.exports = router;