const express = require('express'),
  morgan = require('morgan');

//const jsdom = require('jsdom');
//const { JSDOM } = jsdom;
//global.document = new JSDOM(html).window.document;
//let img = document.createElement('img');

const app = express();

app.use(express.static('public'));

app.use(morgan('common'));

// JSON object containing my top 10 movies
let topMovies = [
    {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        year: '1994',
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        genre: 'Crime/Drama',
        //image: img.src = '/public/img/pulpfiction.png'
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        director: 'Peter Jackson',
        year: '2003',
        description: '',
        genre: ''
    },
    {
        title: 'Forest Gump',
        director: 'Robert Zemeckis',
        year: '1994',
        description: '',
        genre: ''
    },
    {
        title: 'Back to the Future',
        director: 'Robert Zemeckis',
        year: '1985',
        description: '',
        genre: ''
    },
    {
        title: 'The Lion King',
        director: 'Roger Allers & Rob Minkoff',
        year: '1960',
        description: '',
        genre: ''
    },
    {
        title: 'Psycho',
        director: 'Alfred Hitchcock',
        year: '1960',
        description: '',
        genre: ''
    },
    {
        title: 'Django Unchained',
        director: 'Quentin Tarantino',
        year: '2012',
        description: '',
        genre: ''
    },
    {
        title: '2001: A Space Odyssey',
        director: 'Stanley Kubrick',
        year: '1968',
        description: '',
        genre: ''
    },
    {
        title: 'Finding Nemo',
        director: 'Andrew Stanton',
        year: '2003',
        description: '',
        genre: ''
    },
    {
        title: 'No Country for Old Men',
        director: 'Ethan Coen & Joel Coen',
        year: '2007',
        description: '',
        genre: ''
    }
];

//let src = document.getElementById('x');
//src.appendChild(img);

//Welcome message
app.get('/', (req, res) => {
    res.send('Welcome to my movie club!');
  });

//Gets list of all movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
  });

//Gets list of specific movie by title
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((movie) => {
      return movie.title === req.params.title
    }));
  });

//Error response
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh oh, something broke!');
  });
  
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });