const Celebrity = require('../models/celebrity')

var celebArray = [
  { name: 'Rudin', occupation: 'Actor', catchPhrase: 'ho ho ho!' },
  { name: 'John', occupation: 'Singer', catchPhrase: 'salamander' },
  { name: 'Bob', occupation: 'Dancer', catchPhrase: 'aye aye aye' }
]

celebArray.forEach(newCeleb => {
  Celebrity.create(newCeleb, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`celeb SAVED.`);
    }
});
})