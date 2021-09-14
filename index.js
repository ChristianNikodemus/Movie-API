const express = require('express'),
  morgan = require('morgan'),
  uuid = require('uuid'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');
  
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/myFilmsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.use(morgan('common'));


// Welcome message
app.get('/', (req, res) => {
    res.send('Welcome to my movie API Database!');
  });

// Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/genres/:title', (req, res) => {
  Genres.findOne({ Title: req.params.title })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a director (bio, birth year, death year) by name
app.get('/directors/:name', (req, res) => {
    res.json(directors.find((dir) => {
        return dir.name === req.params.name
    }))
  });

// Get list of all users
app.get('/users/:username', (req, res) => {
    const user = userAccounts.find((user) => {
        return user.username === req.params.username
    })
    if (user) {
        res.json(user)
    } else {
        res.status(404).send('Sorry, user not found.');
    }
  });

// Allow new users to register
app.post('/users', (req, res) => {
    let newUser = req.body;
  
    if (!newUser.name) {
      const message = 'Missing name in request body';
      res.status(400).send(message);
    } else {
      newUser.id = uuid.v4();
      userAccounts.push(newUser);
      res.status(201).json(newUser);
    }
  });

// Allow users to update their user info (username)
  app.put('/users/:username', (req, res) => {
    let index = userAccounts.findIndex((user) => { return user.username === req.params.username });

    if (index >= 0) {
        userAccounts[index] = Object.assign({}, userAccounts[index], req.body);
      res.status(200).json(userAccounts[index]);
    } else {
      res.status(404).send('Sorry, could not change username, your username is currently: '+ req.params.username + ', please try again!');
    }
  });

// Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)
app.post('/users/:username/favourites/:id', (req, res) => {
    let index = userAccounts.findIndex((user) => {
        return user.username === req.params.username
    });
    if (index >= 0) {
        userAccounts[index].favouriteMovies.push(req.params.id)
        res.status(200).json(userAccounts[index]);
    } else {
        res.status(404).send('Sorry, the user has not been found.');
    }
  });

app.delete('/users/:username/favourites/:id', (req, res) => {
    let index = userAccounts.findIndex((user) => {
        return user.username === req.params.username
    });
    if (index >= 0) {
        userAccounts[index].favouriteMovies = userAccounts[index].favouriteMovies
        .filter((id) => id !== req.params.id)
        res.status(201).json(userAccounts[index]);
    } else {
        res.status(404).send('Sorry, the user has not been found.')
    }
});


// Allow existing users to deregister (showing only a text that a user email has been removed—more on this later)
app.delete('/users/:id', (req, res) => {
    let user = userAccounts.find((user) => { return user._id === req.params.id });
  
    if (user) {
      userAccounts = userAccounts.filter((obj) => { return obj.id !== req.params.id });
      res.status(201).send('The account belonging to: ' + req.params.name + ' was deleted.');
    }
  });

// Error response
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh oh, something broke!');
  });
  
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });