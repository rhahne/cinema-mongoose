const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinema', {useNewUrlParser: true}, (err)=>{
  if(err) console.log(err)
  else console.log("connected");
});

const Schema = mongoose.Schema

// Create Model 'Movie'
const Movie = mongoose.model('Movie', new Schema({
  title: String,
  genre: String,
  plot: String
}));

module.exports = Movie