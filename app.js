// init express
const app = require('express')();

// set view shit
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// init mongoose
const mongoose = require('mongoose');
// connect to database
// if it doesn't exist, it will create it
mongoose.connect('mongodb://localhost/cinema', (err)=> {
  if(err) console.log(err)
  else {
    require("./bin/seeds.js")
  }
});

/*
function showCelebs() {
  console.log('All the CELEBS!');
  Celebrity.find({}, (err, celebs) => {
    app.get('/', (req, res) => {
      res.render('index', {celebs});
    });
    celebs.forEach((celeb)=> {
      console.log(' --> celeb: ', celeb.name);
    })
  });
}
*/
//showCelebs();



app.listen(3000);