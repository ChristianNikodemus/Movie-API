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
        genre: 'Crime/ Drama',
        //image: img.src = '/public/img/pulpfiction.png'
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        director: 'Peter Jackson',
        year: '2003',
        description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
        genre: 'Action/ Adventure/ Drama'
    },
    {
        title: 'Forest Gump',
        director: 'Robert Zemeckis',
        year: '1994',
        description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
        genre: 'Drama/ Romance'
    },
    {
        title: 'Back to the Future',
        director: 'Robert Zemeckis',
        year: '1985',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.',
        genre: 'Adventure/ Comedy/ Sci-Fi'
    },
    {
        title: 'The Lion King',
        director: 'Roger Allers & Rob Minkoff',
        year: '1960',
        description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
        genre: 'Animation/ Adventure/ Drama'
    },
    {
        title: 'Psycho',
        director: 'Alfred Hitchcock',
        year: '1960',
        description: 'A Phoenix secretary embezzles $40,000 from her employer\'s client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.',
        genre: 'Horror/ Mystery/ Thriller'
    },
    {
        title: 'Django Unchained',
        director: 'Quentin Tarantino',
        year: '2012',
        description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.',
        genre: 'Drama/ Western'
    },
    {
        title: '2001: A Space Odyssey',
        director: 'Stanley Kubrick',
        year: '1968',
        description: 'After discovering a mysterious artifact buried beneath the Lunar surface, mankind sets off on a quest to find its origins with help from intelligent supercomputer H.A.L. 9000.',
        genre: 'Adventure/ Sci-Fi'
    },
    {
        title: 'Finding Nemo',
        director: 'Andrew Stanton',
        year: '2003',
        description: 'After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.',
        genre: 'Animation/ Adventure/ Comedy'
    },
    {
        title: 'No Country for Old Men',
        director: 'Ethan Coen & Joel Coen',
        year: '2007',
        description: 'Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.',
        genre: 'Crime/ Drama/ Thriller'
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