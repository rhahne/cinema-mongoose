const Celebrity = require('../models/celebrity')
// connect to database
// if it doesn't exist, it will create it

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

var newCelebs = [
  { name: 'Rudin', occupation: 'Actor', catchPhrase: 'ho ho ho!' },
  { name: 'John', occupation: 'Singer', catchPhrase: 'salamander' },
  { name: 'Bob', occupation: 'Dancer', catchPhrase: 'aye aye aye' }
]

//createNewCelebsFromArray(newCelebs)