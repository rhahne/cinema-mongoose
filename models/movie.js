const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinema', {useNewUrlParser: true}, (err)=>{
  if(err) console.log(err)
  else console.log("connected");
});

const Schema = mongoose.Schema

// Create Model 'Movie'
const Movie = mongoose.model('Movie', new Schema({
  title: String,
  director: String,
  stars: Array,
  image: String,
  description: String,
  showtimes: Array
}));

module.exports = Movie