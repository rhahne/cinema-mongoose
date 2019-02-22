const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity.js')

router.get('/celebrities/', (req, res) => {
  Celebrity.find({}, (err, celebs) => {
    res.render('celebrities/index', {celebs});
  });
})

router.get('/celebrity/:id', (req, res) => {
  if (req.params.id){
    Celebrity.findById(req.params.id, function (err, celebById) {
      res.render('celebrities/show', {celebById});
    });
  }else{
    console.log('no id defined');
  }
})

router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new')
});

router.post('/celebrities/', (req,res) => {
  Celebrity.create(req.body, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/celebrities')
      console.log(`celeb SAVED.`);
    }
  })
})

router.post('/celebrities/:id/delete', (req,res) => {
  Celebrity.findOneAndDelete(req.params.id, function(err){
    if (err) console.log(err);
    else {
      res.redirect('/celebrities')
    }
  })
})

router.get('/celebrities/:id/edit', (req,res) => {
  var celebId = req.params.id;
  Celebrity.findById(celebId, function(err, celebToEdit){
    if (err) console.log(err)
    else{
      res.render('celebrities/edit', {celebToEdit, celebId})
    }
  })
})

router.post('/celebrities/:id/edit', (req, res) => {
  Celebrity.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, function(err){
    if (err) console.log(err)
    else {
      console.log("succesfully saved");
      res.redirect('/celebrities')
    }
});

})


module.exports = router;