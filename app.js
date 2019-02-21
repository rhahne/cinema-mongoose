const app = require('express')();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('index');
  /*
  axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000")
  .then( (listOfPokemon)=>{
  })
  .catch( (err) => {
    console.log(err)
  })
  */
});

app.listen(3000);