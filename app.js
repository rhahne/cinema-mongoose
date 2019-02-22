// init mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinema', { useNewUrlParser: true }, (err)=>{
  if(err) console.log(err)
  else console.log("connected");
});

// ??????????
mongoose.set('useFindAndModify', false);

// init express
const app = require('express')();

// body-parser stuff for form data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// set view
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Route to celeb index
const celebrities = require('./routes/celebrities');
app.use('/celebrities/', celebrities);

// Route to movie index
const movies = require('./routes/movies');
app.use('/movies/', movies);

app.get('/', (req, res) => {
  res.render('index')
});

app.listen(3000);