const express = require('express');
const app = express();

// JSON object containing my top 10 movies
let topMovies = [
    {
        id: '1',
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        year: '1994'
    },
    {
        id: '2',
        title: 'The Lord of the Rings: The Return of the King',
        director: 'Peter Jackson',
        year: '2003'
    },
    {
        id: '3',
        title: 'Forest Gump',
        director: 'Robert Zemeckis',
        year: '1994'
    },
    {
        id: '4',
        title: 'Back to the Future',
        director: 'Robert Zemeckis',
        year: '1985'
    },
    {
        id: '5',
        title: 'The Lion King',
        director: 'Roger Allers & Rob Minkoff',
        year: '1960'
    },
    {
        id: '6',
        title: 'Psycho',
        director: 'Alfred Hitchcock',
        year: '1960'
    },
    {
        id: '7',
        title: 'Django Unchained',
        director: 'Quentin Tarantino',
        year: '2012'
    },
    {
        id: '8',
        title: '2001: A Space Odyssey',
        director: 'Stanley Kubrick',
        year: '1968'
    },
    {
        id: '9',
        title: 'Finding Nemo',
        director: 'Andrew Stanton',
        year: '2003'
    },
    {
        id: '10',
        title: 'No Country for Old Men',
        director: 'Ethan Coen & Joel Coen',
        year: '2007'
    }
];

app.get('/movies', (req, res) => {
    res.json(topTenMovies);
  });