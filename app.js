// init express
const app = require('express')();

// set view shit
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// init mongoose
const mongoose = require('mongoose');
// connect to database
// if it doesn't exist, it will create it
mongoose.connect('mongodb://localhost/cinema');

// Create Model 'Celebrity'
const Celebrity = mongoose.model('Celebrity', { 
  name: String,
  occupation: String,
  catchPhrase: String
});

// Add Celeb
var newCelebs = [
  { name: 'Rudin', occupation: 'Actor', catchPhrase: 'ho ho ho!' },
  { name: 'John', occupation: 'Singer', catchPhrase: 'salamander' },
  { name: 'Bob', occupation: 'Dancer', catchPhrase: 'aye aye aye' }
]

function createNewCelebsFromArray(celebArray){
  celebArray.forEach(newCeleb => {
    celebtoAdd = new Celebrity(newCeleb);
    celebtoAdd.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`celeb SAVED.`);
      }
  });
  })
}
//createNewCelebsFromArray(newCelebs);

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

showCelebs();

app.listen(3000);