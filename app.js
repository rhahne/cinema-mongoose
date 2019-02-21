// init mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinema', { useNewUrlParser: true }, (err)=>{
  if(err) console.log(err)
  else console.log("connected");
});

// init express
const app = require('express')();
const Celebrity = require('./models/celebrity')

// body-parser stuff for form data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

// set view shit
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Route to celeb index
const celebrities = require('./routes/celebrities');
app.use('/celebrities', celebrities);

app.get('/', (req, res) => {
  res.render('index')
});

app.listen(3000);