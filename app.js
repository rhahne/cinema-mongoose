// init mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinema', { useNewUrlParser: true }, (err)=>{
  if(err) console.log(err)
  else console.log("connected");
});
mongoose.set('useFindAndModify', false);

// init express
const express = require('express')
const app = express();
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

// init sessions
app.use(session({
  secret: "unicoooorn",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

// body-parser stuff for form data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// set view
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Route Authentication
const auth = require('./routes/auth');
app.use('/', auth);

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