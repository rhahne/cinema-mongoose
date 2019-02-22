const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinema', {useNewUrlParser: true}, (err)=>{
  if(err) console.log(err)
  else console.log("connected");
});

const Schema = mongoose.Schema

// Create Model 'Celebrity'
const Celebrity = mongoose.model('Celebrity', new Schema({
  name: String,
  occupation: String,
  catchPhrase: String
}));

module.exports = Celebrity