const express = require('express')
const router = express.Router();
const Movie = require('../models/movie.js')

// check if logged in
router.get('/*', (req, res, next) => {
  if(req.session.currentUser){
    next()
  }
  else{
    res.send("you are not permitted to view this page")
  }
})

// movies index site
router.get('/', (req, res) => {
  Movie.find({}, (err, movies) => {
    if (err) console.log(err)
    else res.render('movies/index', {movies})
  })
})

// celebrity detail site
router.get('/detail', (req, res) => {
  if (req.query.id) {
    Movie.findById(req.query.id, function (err, movieById) {
      res.render('movies/show', {movieById});
    });
  } else {
    console.log('no id defined');
  }
})

// create new movie site
router.get('/new', (req, res) => {
  res.render('movies/new')
});

// receive data from new celebrity site
router.post('/', (req, res) => {
  Movie.create(req.body, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/movies')
      console.log(`movie SAVED.`);
    }
  })
})

// receive data from delete button pressed celeb
router.post('/:id/delete', (req, res) => {
  Movie.findOneAndDelete(req.params.id, function (err) {
    if (err) console.log(err);
    else {
      res.redirect('/movies')
    }
  })
})

// edit page for each celebrity
router.get('/:id/edit', (req, res) => {
  var movieId = req.params.id;
  Movie.findById(movieId, function (err, movieToEdit) {
    if (err) console.log(err)
    else {
      res.render('movies/edit', {
        movieToEdit,
        movieId
      })
    }
  })
})
// receive edit changes from edit page
router.post('/:id/edit', (req, res) => {
  Movie.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  }, function (err) {
    if (err) console.log(err)
    else {
      console.log("succesfully saved");
      res.redirect('/movies')
    }
  });
})

// Search for Movies
router.post('/search', (req, res) => {
  Movie.find(
    { "title": { "$regex": req.body.search, "$options": "i" } },
    (err,docs) => { 
      if (err) console.log(err)
      else res.render('movies/search', {docs})
  }
);
})

module.exports = router;