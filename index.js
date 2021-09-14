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
    Directors.findOne({ Name: req.params.name })
      .then((director) => {
        res.json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// Allow new users to register
  app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Name: req.body.Name,
              Username: req.body.Username,
              Email: req.body.Email,
              Password: req.body.Password,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

// Allow users to update their user info (username, password, email, date of birth)
  app.put('/users/:username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.username }, { $set:
      {
        Name: req.body.Name,
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

// Allow users to add a movie to their list of favorites
app.post('/users/:username/movies/:id', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.username }, {
     $push: { favouriteMovies: req.params.id }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:username/movies/:id', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.username }, {
     $pull: { favouriteMovies: req.params.id }
   })
   .then((id) => {
    if (!id) {
      res.status(400).send(req.params.id + ' was not found');
    } else {
      res.status(200).send(req.params.id + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Allow existing users to deregister
app.delete('/users/:username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.username + ' was not found');
        } else {
          res.status(200).send(req.params.username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// Error response
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh oh, something broke!');
  });
  
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });