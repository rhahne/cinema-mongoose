// init mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinema', { useNewUrlParser: true }, (err)=>{
  if(err) console.log(err)
  else console.log("connected");
});

// init express
const app = require('express')();
const Celebrity = require('./models/celebrity')

// set view shit
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('index');
});

// Show the Celebs
Celebrity.find({}, (err, celebs) => {
  app.get('/celebrities', (req, res) => {
    res.render('celebrities/index', {celebs});
  });
});

app.listen(3000);