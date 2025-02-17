const express = require("express"),
  morgan = require("morgan"),
  //uuid = require('uuid'),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

const { check, validationResult } = require("express-validator");

const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//mongoose.connect("mongodb://localhost:27017/myFilmsDB", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(morgan("common"));

// Cross-Origin Resource Sharing (CORS)
//const cors = require("cors");
//app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

app.use(express.static("public"));

// Authorization
require("./auth")(app);

const passport = require("passport");
require("./passport");

/**
 * @method GET
 * @returns {string}
 * @description Welcome message
 */
app.get("/", (req, res) => {
  res.send("Welcome to my movie API Database!");
});

/**
 * @method GET
 * @param {string} endpoint "/movies"
 * @requires authentication JWT
 * @description Returns a list of ALL movies to the user
 */
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .populate("Genre")
      .populate("Director")
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @method GET
 * @param {string} endpoint "/movies/:id"
 * @requires authentication JWT
 * @description Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
 */
app.get(
  "/movies/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findById(req.params.id)
      .populate("Genre")
      .populate("Director")
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @method GET
 * @param {string} endpoint "/genres/:id"
 * @requires authentication JWT
 * @description Return data about a genre (description) by name/title (e.g., “Thriller”)
 */
app.get(
  "/genres/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Genres.findById(req.params.id)
      .then((genre) => {
        res.json(genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @method GET
 * @param {string} endpoint "/directors/:id"
 * @requires authentication JWT
 * @description Return data about a director (bio, birth year, death year) by name
 */
app.get(
  "/directors/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Directors.findById(req.params.id)
      .then((director) => {
        res.json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @method POST
 * @param {string} endpoint "/users"
 * @param {string} Name
 * @param {string} Username
 * @param {string} Email
 * @param {string} Password
 * @param {string} Birthday
 * @returns {object} users data
 * @description Allow new users to register
 */
app.post(
  "/users",
  [
    check(
      "Username",
      "Username needs to be at least 5 characters long."
    ).isLength({ min: 5 }),
    check(
      "Username",
      "Username cannot contain non alphanumeric characters."
    ).isAlphanumeric(),
    check("Password", "Password is required.").not().isEmpty(),
    check("Email", "Email does not appear to be valid.").isEmail(),
  ],
  (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Name: req.body.Name,
            Username: req.body.Username,
            Email: req.body.Email,
            Password: hashedPassword,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * @method GET
 * @param {string} endpoint "/users/:username"
 * @requires authentication JWT
 * @description Allow existing users to retrieve profile information
 */
app.get(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.username + " was not found");
        } else {
          res.json(user);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @method PUT
 * @param {string} endpoint "users/:username"
 * @param {string} Name
 * @param {string} Username
 * @param {string} Email
 * @param {string} Password
 * @param {string} Birthday
 * @returns updatedUser object or error message depending if the changes are valid
 * @requires authentication JWT
 * @description Allow users to update their user info (username, password, email, date of birth)
 */
app.put(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username needs to be at least 5 characters long.")
      .isLength({ min: 5 })
      .optional({ checkFalsy: true }),
    check("Username", "Username cannot contain non alphanumeric characters.")
      .isAlphanumeric()
      .optional({ checkFalsy: true }),
    check("Password", "Password is required.")
      .not()
      .isEmpty()
      .optional({ checkFalsy: true }),
    check("Email", "Email does not appear to be valid.")
      .isEmail()
      .optional({ checkFalsy: true }),
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Users.findOneAndUpdate(
      { Username: req.params.username },
      {
        $set: {
          Name: req.body.Name,
          Username: req.body.Username,
          Email: req.body.Email,
          Password: req.body.Password
            ? Users.hashPassword(req.body.Password)
            : undefined,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * @method DELETE
 * @param {string} endpoint "/users/:username"
 * @param {string} Username
 * @returns {string} either success or error message
 * @requires authentication JWT
 * @description Allow existing users to delete their account
 */
app.delete(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.username + " was not found");
        } else {
          res.status(200).send(req.params.username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * @method POST
 * @param {string} endpoint "/users/:username/movies/:id"
 * @param {string} Username
 * @param {string} Movie_.id
 * @return {string} either success or error message
 * @requires authentication JWT
 * @description Allow users to add a movie to their list of favorites
 */
app.post(
  "/users/:username/movies/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      {
        Username: req.params.username,
        FavouriteMovies: { $ne: req.params.id },
      },
      {
        $push: { FavouriteMovies: req.params.id },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          if (!updatedUser) {
            res.status(400).send("The movie is already favourited.");
          } else {
            res.json(updatedUser);
          }
        }
      }
    );
  }
);

/**
 * @method DELETE
 * @param {string} endpoint "/users/:username/movies/:id"
 * @param {string} Username
 * @param {string} Movie_.id
 * @returns {string} either success or error message
 * @requires authentication JWT
 * @description Allow users to remove a movie from their list of favorites
 */
app.delete(
  "/users/:username/movies/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.username },
      {
        $pull: { FavouriteMovies: req.params.id },
      },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.id + " was not found");
        } else {
          res.json(user);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Error response
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Uh oh, something broke!");
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
