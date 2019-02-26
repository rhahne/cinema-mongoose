const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity.js')

// check if logged in
router.get('/*', (req, res, next) => {
  if(req.session.currentUser){
    next()
  }
  else{
    res.send("you are not permitted to view this page")
  }
})

// celebrities index site
router.get('/', (req, res) => {
  Celebrity.find({}, (err, celebs) => {
    res.render('celebrities/index', {
      celebs
    });
  });
})

// celebrity detail site
router.get('/detail', (req, res) => {
  if (req.query.id) {
    Celebrity.findById(req.query.id, function (err, celebById) {
      res.render('celebrities/show', {
        celebById
      });
    });
  } else {
    console.log('no id defined');
  }
})

// create new celebrity site
router.get('/new', (req, res) => {
  res.render('celebrities/new')
});

// receive data from new celebrity site
router.post('/', (req, res) => {
  Celebrity.create(req.body, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/celebrities')
      console.log(`celeb SAVED.`);
    }
  })
})

// receive data from delete button pressed celeb
router.post('/:id/delete', (req, res) => {
  Celebrity.findOneAndDelete(req.params.id, function (err) {
    if (err) console.log(err);
    else {
      res.redirect('/celebrities')
    }
  })
})

// edit page for each celebrity
router.get('/:id/edit', (req, res) => {
  var celebId = req.params.id;
  Celebrity.findById(celebId, function (err, celebToEdit) {
    if (err) console.log(err)
    else {
      res.render('celebrities/edit', {
        celebToEdit,
        celebId
      })
    }
  })
})
// receive edit changes from edit page
router.post('/:id/edit', (req, res) => {
  Celebrity.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  }, function (err) {
    if (err) console.log(err)
    else {
      console.log("succesfully saved");
      res.redirect('/celebrities')
    }
  });
})

// Search for Celebs
router.post('/search', (req, res) => {
  Celebrity.find(
    { "name": { "$regex": req.body.search, "$options": "i" } },
    (err,docs) => { 
      if (err) console.log(err)
      else res.render('celebrities/search', {docs})
  }
);
})

module.exports = router;