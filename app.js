const express = require('express');

const hbs = require('hbs');
const { dirname } = require('path');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/partials")

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
// --------------------------------------HOME---------------------------------------------
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/imgBeer', (req, res) => {
  res.sendFile(__dirname + '/public/images/beer.png');
});

// --------------------------------------BEERS--------------------------------------------

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(function (beersFromApi) {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beersFromApi })
      req.params.ids
      console.log('hello req')
    })
    .catch(error => console.log(error));
})

// --------------------------------------RANDOM-BEER---------------------------------------------

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(function (randomBeer) {
      res.render('random-beer', { randomBeer })
    })
    .catch(error => console.log(error))
});
// ------------------------------------CSS-------------------------------------------------------------
app.get('/layoutCSS', (req, res, next) =>
  res.sendFile(__dirname + '/public/stylesheets/layout.css')
)


app.listen(3000, () => console.log('🏃‍ on port 3000'));
