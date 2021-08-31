const express = require('express'),
  morgan = require('morgan'),
  uuid = require('uuid');

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
        image: '/img/pulpfiction.png'
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

let genreTypes = [
    {
        title: 'Crime',
        description: 'Crime fiction, detective story, murder mystery, mystery novel, and police novel are terms used to describe narratives that centre on criminal acts and especially on the investigation, either by an amateur or a professional detective, of a serious crime, generally a murder.'
    },
    {
        title: 'Drama',
        description: 'In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera (operatic drama), police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy).'
    },
    {
        title: 'Action',
        description: 'Action fiction is the literary genre that includes spy novels, adventure stories, tales of terror and intrigue ("cloak and dagger") and mysteries. This kind of story utilizes suspense, the tension that is built up when the reader wishes to know how the conflict between the protagonist and antagonist is going to be resolved or what the solution to the puzzle of a thriller is.'
    },
    {
        title: 'Adventure',
        description: 'Adventure fiction is a genre of fiction that usually presents danger, or gives the reader a sense of excitement.'
    },
    {
        title: 'Romance',
        description: 'A genre of film of which the central plot focuses on the romantic relationships of the protagonists.'
    },
    {
        title: 'Comedy',
        description: 'Comedy may be divided into multiple genres based on the source of humor, the method of delivery, and the context in which it is delivered. These classifications overlap, and most comedians can fit into multiple genres. For example, deadpan comics often fall into observational comedy, or into black comedy or blue comedy to contrast the morbidity, or offensiveness of the joke with a lack of emotion.'
    },
    {
        title: 'Sci-Fi',
        description: 'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and often explores the potential consequences of scientific, social, and technological innovations.'
    },
    {
        title: 'Animation',
        description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.'
    },
    {
        title: 'Horror',
        description: 'Horror is a genre of speculative fiction which is intended to frighten, scare, or disgust.'
    },
    {
        title: 'Mystery',
        description: 'Mystery is a fiction genre where the nature of an event, usually a murder or other crime, remains mysterious until the end of the story.'
    },
    {
        title: 'Thriller',
        description: 'Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.'
    },
    {
        title: 'Western',
        description: 'Western is a genre of fiction set primarily in the latter half of the 19th and early 20th century in the Western United States, which is styled the "Old West".'
    }
];

let userAccounts = [
    {
        firstname: 'Christian',
        lastname: 'Nikodemus',
        username: 'ChrisNiko',
        email: 'christian.nikodemus@gmail.com',
        password: 'careerfoundryrules'
    }
];

let directors = [
    {

    },
    {

    },
    {

    }
];

// Welcome message
app.get('/', (req, res) => {
    res.send('Welcome to my movie club!');
  });

// Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
    res.json(topMovies)
  });

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((movie) => {
      return movie.title === req.params.title
    }))
  });

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/genres/:title', (req, res) => {
    res.json(genreTypes.find((genre) => {
        return genre.title === req.params.title
    }))
  });

// Return data about a director (bio, birth year, death year) by name
app.get('/director/:name', (req, res) => {
    res.json(directors.find((dir) => {
        return dir.name === req.params.name
    }))
  });

// Allow new users to register
app.post('/register', (req, res) => {
    const user = req.body;
    user.id = uuid.v4();
    userAccounts.push(user);
    res.status(201).json(user);
  });

// Allow users to update their user info (username)
app.put('/register/:email', (req, res) => {
    const user = req.body;
    const index = userAccounts.findIndex((u) => u.email === req.params.email);
    userAccounts[index] = user;
    res.status(200).json(user);
  });

// Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)

// Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later)

// Allow existing users to deregister (showing only a text that a user email has been removed—more on this later)

// Error response
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh oh, something broke!');
  });
  
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });