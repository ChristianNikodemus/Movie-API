const express = require('express'),
  morgan = require('morgan'),
  uuid = require('uuid'),
  bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

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

// JSON object containing genres
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

// JSON object containing user accounts
let userAccounts = [
    {
        name: 'Christian Nikodemus',
        username: 'ChrisNiko',
        email: 'christian.nikodemus@gmail.com',
        password: 'careerfoundryrules',
        favouriteMovies: [
            {
            title: 'Pulp Fiction'
        }]
    }
];

// JSON object containing directors
let directors = [
    {
        name: 'Quentin Tarantino',
        bio: 'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old. In January of 1992, first-time writer-director Tarantino\'s Reservoir Dogs (1992) appeared at the Sundance Film Festival. The film garnered critical acclaim and the director became a legend immediately. Two years later, he followed up Dogs success with Pulp Fiction (1994) which premiered at the Cannes film festival, winning the coveted Palme D\'Or Award. At the 1995 Academy Awards, it was nominated for the best picture, best director and best original screenplay. Tarantino and writing partner Roger Avary came away with the award only for best original screenplay. In 1995, Tarantino directed one fourth of the anthology Four Rooms (1995) with friends and fellow auteurs Alexandre Rockwell, Robert Rodriguez and Allison Anders. The film opened December 25 in the United States to very weak reviews. Tarantino\'s next film was From Dusk Till Dawn (1996), a vampire/crime story which he wrote and co-starred with George Clooney. The film did fairly well theatrically. Since then, Tarantino has helmed several critically and financially successful films, including Jackie Brown (1997), Kill Bill: Vol. 1 (2003), Kill Bill: Vol. 2 (2004), Inglourious Basterds (2009), Django Unchained (2012) and The Hateful Eight (2015).',
        birthyear: '1963',
        deathyear: '- present',
    },
    {
        name: 'Peter Jackson',
        bio: 'Peter Jackson was born as an only child in a small coast-side town in New Zealand in 1961. When a friend of his parents bought him a super 8 movie camera (because she saw how much he enjoyed taking photos), the then eight-year-old Peter instantly grabbed the thing to start recording his own movies, which he made with his friends. They were usually short, but they already had the trademark that would make Jackson famous: impressive special effects, made at a very low cost. For example, for his film "World War Two" which he made as a teenager, he used to simulate a firing gun by punching little holes into the celluloid, so that, once projected, the gun gave the impression of displaying a small fire. Jackson\'s first step towards more serious film-making came with an entry in a local contest to stimulate amateur and children\'s films. For this film, he used stop-motion animation to create a monster that ruins a city in the style of Ray Harryhausen. Unfortunately, he didn\'t win. At twenty-two, he embarked on a movie-making adventure that would change his life. This film, Bad Taste (1987), was begun as any other Jackson film, in an amateur style, at a low budget and using friends and local people to star in his film. Jackson himself did nearly everything in the movie; he directed, produced, filmed and starred in it, in a number of roles, amongst them that of the hero, "Derek". And everything was filmed on a second-hand, $250 camera. It took Jackson and his friends four years to complete the movie. What had started as a joke in a group of friends, then became a cult classic. A friend of Jackson who was working in the movie industry convinced him the film had commercial prospects and arranged for it to be shown at the Cannes film festival, where it won a lot of acclaim, as well as a number of prizes. The movie soon became a hit because of its bizarre humor and overdose of special effects, some realistic, some comedically amateur. After the success of Bad Taste (1987), Jackson became recognized as a director and the door to fame and fortune was opened. He gave up his job at a local photographer\'s shop and became a well-known director of horror-movies, after the success of his first professionally made movie, Dead Alive (1992).',
        birthyear: '1961',
        deathyear: '- present',
    },
    {
        name: 'Robert Zemeckis',
        bio: 'A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert\'s earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)). His later films have become more serious, with the hugely successful Tom Hanks vehicle Forrest Gump (1994) and the Jodie Foster film Contact (1997), both critically acclaimed movies. Again, these films incorporate stunning effects. Robert has proved he can work a serious story around great effects.',
        birthyear: '1951',
        deathyear: '- present',
    },
    {
        name: 'Roger Allers',
        bio: 'Roger Allers was born on June 29, 1949 in Rye, New York, USA as Roger Charles Allers. He is known for his work on The Lion King (1994), Aladdin (1992) and Beauty and the Beast (1991). He has been married to Leslee Allers since 1965. They have two children.',
        birthyear: '1949',
        deathyear: '- present',
    },
    {
        name: 'Rob Minkoff',
        bio: 'Rob Minkoff was born on August 11, 1962 in Palo Alto, California, USA as Robert Ralph Minkoff. He is a producer and director, known for The Lion King (1994), Stuart Little 2 (2002) and The Forbidden Kingdom (2008). He has been married to Crystal Kung Minkoff since September 29, 2007.',
        birthyear: '1962',
        deathyear: '- present',
    },
    {
        name: 'Alfred Hitchcock',
        bio: 'Alfred Joseph Hitchcock was born in Leytonstone, Essex, England. He was the son of Emma Jane (Whelan; 1863 - 1942) and East End greengrocer William Hitchcock (1862 - 1914). His parents were both of half English and half Irish ancestry. He had two older siblings, William Hitchcock (born 1890) and Eileen Hitchcock (born 1892). Raised as a strict Catholic and attending Saint Ignatius College, a school run by Jesuits, Hitch had very much of a regular upbringing. His first job outside of the family business was in 1915 as an estimator for the Henley Telegraph and Cable Company. His interest in movies began at around this time, frequently visiting the cinema and reading US trade journals. It was around 1920 when Hitchcock joined the film industry. He started off drawing the sets (he was a very skilled artist). It was there that he met Alma Reville, though they never really spoke to each other. It was only after the director for Always Tell Your Wife (1923) fell ill and Hitchcock was named director to complete the film that he and Reville began to collaborate. Hitchcock had his first real crack at directing a film, start to finish, in 1923 when he was hired to direct the film Number 13 (1922), though the production wasn\'t completed due to the studio\'s closure (he later remade it as a sound film). Hitchcock didn\'t give up then. He directed The Pleasure Garden (1925), a British/German production, which was very popular. Hitchcock made his first trademark film in 1927, The Lodger: A Story of the London Fog (1927) . In the same year, on the 2nd of December, Hitchcock married Alma Reville. They had one child, Patricia Hitchcock who was born on July 7th, 1928. His success followed when he made a number of films in Britain such as The Lady Vanishes (1938) and Jamaica Inn (1939), some of which also gained him fame in the USA. In 1940, the Hitchcock family moved to Hollywood, where the producer David O. Selznick had hired him to direct an adaptation of \'Daphne du Maurier\'s Rebecca (1940). After Saboteur (1942), as his fame as a director grew, film companies began to refer to his films as \'Alfred Hitchcock\'s, for example Alfred Hitcock\'s Psycho (1960), Alfred Hitchcock\'s Family Plot (1976), Alfred Hitchcock\'s Frenzy (1972). Hitchcock was a master of pure cinema who almost never failed to reconcile aesthetics with the demands of the box-office. During the making of Frenzy (1972), Hitchcock\'s wife Alma suffered a paralyzing stroke which made her unable to walk very well. On March 7, 1979, Hitchcock was awarded the AFI Life Achievement Award, where he said: "I beg permission to mention by name only four people who have given me the most affection, appreciation, and encouragement, and constant collaboration. The first of the four is a film editor, the second is a scriptwriter, the third is the mother of my daughter Pat, and the fourth is as fine a cook as ever performed miracles in a domestic kitchen and their names are Alma Reville." By this time, he was ill with angina and his kidneys had already started to fail. He had started to write a screenplay with Ernest Lehman called The Short Night but he fired Lehman and hired young writer David Freeman to rewrite the script. Due to Hitchcock\'s failing health the film was never made, but Freeman published the script after Hitchcock\'s death. In late 1979, Hitchcock was knighted, making him Sir Alfred Hitchcock. On the 29th April 1980, 9:17AM, he died peacefully in his sleep due to renal failure. His funeral was held in the Church of Good Shepherd in Beverly Hills. Father Thomas Sullivan led the service with over 600 people attended the service, among them were Mel Brooks (director of High Anxiety (1977), a comedy tribute to Hitchcock and his films), Louis Jourdan, Karl Malden, Tippi Hedren, Janet Leigh and François Truffaut.',
        birthyear: '1899',
        deathyear: '1980',
    },
    {
        name: 'Stanley Kubrick',
        bio: 'Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school. Hoping that a change of scenery would produce better academic performance, Kubrick\'s father sent him in 1940 to Pasadena, California, to stay with his uncle, Martin Perveler. Returning to the Bronx in 1941 for his last year of grammar school, there seemed to be little change in his attitude or his results. Hoping to find something to interest his son, Jack introduced Stanley to chess, with the desired result. Kubrick took to the game passionately, and quickly became a skilled player. Chess would become an important device for Kubrick in later years, often as a tool for dealing with recalcitrant actors, but also as an artistic motif in his films. Jack Kubrick\'s decision to give his son a camera for his thirteenth birthday would be an even wiser move: Kubrick became an avid photographer, and would often make trips around New York taking photographs which he would develop in a friend\'s darkroom. After selling an unsolicited photograph to Look Magazine, Kubrick began to associate with their staff photographers, and at the age of seventeen was offered a job as an apprentice photographer. In the next few years, Kubrick had regular assignments for "Look", and would become a voracious movie-goer. Together with friend Alexander Singer, Kubrick planned a move into film, and in 1950 sank his savings into making the documentary Day of the Fight (1951). This was followed by several short commissioned documentaries (Flying Padre (1951), and (The Seafarers (1953), but by attracting investors and hustling chess games in Central Park, Kubrick was able to make Fear and Desire (1953) in California. Filming this movie was not a happy experience; Kubrick\'s marriage to high school sweetheart Toba Metz did not survive the shooting. Despite mixed reviews for the film itself, Kubrick received good notices for his obvious directorial talents. Kubrick\'s next two films Killer\'s Kiss (1955) and The Killing (1956) brought him to the attention of Hollywood, and in 1957 he directed Kirk Douglas in Paths of Glory (1957). Douglas later called upon Kubrick to take over the production of Spartacus (1960), by some accounts hoping that Kubrick would be daunted by the scale of the project and would thus be accommodating. This was not the case, however: Kubrick took charge of the project, imposing his ideas and standards on the film. Many crew members were upset by his style: cinematographer Russell Metty complained to producers that Kubrick was taking over his job. Kubrick\'s response was to tell him to sit there and do nothing. Metty complied, and ironically was awarded the Academy Award for his cinematography. Kubrick\'s next project was to direct Marlon Brando in One-Eyed Jacks (1961), but negotiations broke down and Brando himself ended up directing the film himself. Disenchanted with Hollywood and after another failed marriage, Kubrick moved permanently to England, from where he would make all of his subsequent films. Despite having obtained a pilot\'s license, Kubrick was rumored to be afraid of flying. Kubrick\'s first UK film was Lolita (1962), which was carefully constructed and guided so as to not offend the censorship boards which at the time had the power to severely damage the commercial success of a film. Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb (1964) was a big risk for Kubrick; before this, "nuclear" was not considered a subject for comedy. Originally written as a drama, Kubrick decided that too many of the ideas he had written were just too funny to be taken seriously. The film\'s critical and commercial success allowed Kubrick the financial and artistic freedom to work on any project he desired. Around this time, Kubrick\'s focus diversified and he would always have several projects in various stages of development: "Blue Moon" (a story about Hollywood\'s first pornographic feature film), "Napoleon" (an epic historical biography, abandoned after studio losses on similar projects), "Wartime Lies" (based on the novel by Louis Begley), and "Rhapsody" (a psycho-sexual thriller). The next film he completed was a collaboration with sci-fi author Arthur C. Clarke. 2001: A Space Odyssey (1968) is hailed by many as the best ever made; an instant cult favorite, it has set the standard and tone for many science fiction films that followed. Kubrick followed this with A Clockwork Orange (1971), which rivaled Lolita (1962) for the controversy it generated - this time not only for its portrayal of sex, but also of violence. Barry Lyndon (1975) would prove a turning point in both his professional and private lives. His unrelenting demands of commitment and perfection of cast and crew had by now become legendary. Actors would be required to perform dozens of takes with no breaks. Filming a story in Ireland involving military, Kubrick received reports that the IRA had declared him a possible target. Production was promptly moved out of the country, and Kubrick\'s desire for privacy and security resulted in him being considered a recluse ever since. Having turned down directing a sequel to The Exorcist (1973), Kubrick made his own horror film: The Shining (1980). Again, rumors circulated of demands made upon actors and crew. Stephen King (whose novel the film was based upon) reportedly didn\'t like Kubrick\'s adaptation (indeed, he would later write his own screenplay which was filmed as The Shining (1997). Kubrick\'s subsequent work has been well spaced: it was seven years before Full Metal Jacket (1987) was released. By this time, Kubrick was married with children and had extensively remodeled his house. Seen by one critic as the dark side to the humanist story of Platoon (1986), Full Metal Jacket (1987) continued Kubrick\'s legacy of solid critical acclaim, and profit at the box office. In the 1990s, Kubrick began an on-again/off-again collaboration with Brian Aldiss on a new science fiction film called "Artificial Intelligence (AI)", but progress was very slow, and was backgrounded until special effects technology was up to the standard the Kubrick wanted. Kubrick returned to his in-development projects, but encountered a number of problems: "Napoleon" was completely dead, and "Wartime Lies" (now called "The Aryan Papers") was abandoned when Steven Spielberg announced he would direct Schindler\'s List (1993), which covered much of the same material. While pre-production work on "AI" crawled along, Kubrick combined "Rhapsody" and "Blue Movie" and officially announced his next project as Eyes Wide Shut (1999), starring the then-married Tom Cruise and Nicole Kidman. After two years of production under unprecedented security and privacy, the film was released to a typically polarized critical and public reception; Kubrick claimed it was his best film to date. Special effects technology had matured rapidly in the meantime, and Kubrick immediately began active work on A.I. Artificial Intelligence (2001), but tragically suffered a fatal heart attack in his sleep on March 7th, 1999. After Kubrick\'s death, Spielberg revealed that the two of them were friends that frequently communicated discreetly about the art of filmmaking; both had a large degree of mutual respect for each other\'s work. "AI" was frequently discussed; Kubrick even suggested that Spielberg should direct it as it was more his type of project. Based on this relationship, Spielberg took over as the film\'s director and completed the last Kubrick project. How much of Kubrick\'s vision remains in the finished project -- and what he would think of the film as eventually released -- will be the final great unanswerable mysteries in the life of this talented and private filmmaker.',
        birthyear: '1928',
        deathyear: '1999',
    },
    {
        name: 'Andrew Stanton',
        bio: 'Andrew Stanton has been a major creative force at Pixar Animation Studios since 1990, when he became the second animator and ninth employee to join the company\'s elite group of computer animation pioneers. As Vice President, Creative he currently oversees all shorts and feature projects at the studio. Stanton wrote and directed the Academy Award®-winning Disney and Pixar feature film "WALL.E," for which he also received a Best Original Screenplay Oscar®-nomination. In 2016 Stanton directed Disney and Pixar\'s "Finding Dory," which, upon release, became the highest-grossing domestic animated feature of all time and in 2019 Stanton served as screenwriter and executive producer of "Toy Story 4." Stanton made his directorial debut with the record-shattering "Finding Nemo," an original story of his that he also co-wrote. The film garnered Stanton two Academy Award® nominations (Best Original Screenplay and Best Animated Film), and "Finding Nemo" was awarded an Oscar® for Best Animated Feature Film of 2003, the first such honor Pixar Animation Studios received for a full-length feature film. One of the four screenwriters to receive an Oscar® nomination in 1996 for his contribution to "Toy Story," Stanton went on to receive credit as a screenwriter on every subsequent Pixar film - "A Bug\'s Life," "Toy Story 2," "Monsters, Inc." and "Finding Nemo." Additionally, he served as co-director on "A Bug\'s Life," and was the executive producer of "Monsters, Inc.," and "Monsters University," and Academy Award®-winning films "Ratatouille" and "Brave." In addition to his multi-award winning animation work, Stanton made his live-action writing and directorial debut with Disney\'s "John Carter," released in March 2012. A native of Rockport, Massachusetts, Stanton earned a Bachelor of Fine Arts in Character Animation from California Institute of the Arts (Cal Arts), where he completed two student films. In the 1980s, he launched his professional career in Los Angeles animating for Bill Kroyer\'s Kroyer Films studio, and writing for Ralph Bakshi\'s production of "Mighty Mouse, The New Adventures" (1987).',
        birthyear: '1965',
        deathyear: '- present',
    },
    {
        name: 'Ethan Coen',
        bio: 'The younger brother of Joel, Ethan Coen is an Academy Award and Golden Globe winning writer, producer and director coming from small independent films to big profile Hollywood films. He was born on September 21, 1957 in Minneapolis, Minnesota. In some films of the brothers- Ethan & Joel wrote, Joel directed and Ethan produced - with both editing under the name of Roderick Jaynes; but in 2004 they started to share the three main duties plus editing. Each film bring its own quality, creativity, art and with one project more daring the other.',
        birthyear: '1957',
        deathyear: '- present',
    },
    {
        name: 'Joel Coen',
        bio: 'Joel Coen was born on November 29, 1954 in Minneapolis, Minnesota, USA as Joel Daniel Coen. He is a producer and writer, known for The Ballad of Buster Scruggs (2018), Fargo (1996) and Inside Llewyn Davis (2013). He has been married to Frances McDormand since April 1, 1984. They have one child.',
        birthyear: '1954',
        deathyear: '- present'
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
/*
// Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)
app.post('users/:username/favourites', (req, res) => {
    let index = userAccounts.findIndex((user) => {
        return user.username === req.params.username
    });
    if (index >= 0) {
        userAccounts[index].favouriteMovies.push(req.params.title)
        res.status(200).json(userAccounts[index]);
    } else {
        res.status(404).send('Sorry, the user has not been found.');
    }
  });

app.delete('users/:username/favourites/:title', (req, res) => {
    let index = userAccounts.findIndex((user) => {
        return user.username === req.params.username
    });
    if (index >= 0) {
        userAccounts[index].favouriteMovies = userAccounts[index].favouriteMovies
        .filter((title) => title !== req.params.title)
        res.status(201).json(userAccounts[index]);
    } else {
        res.status(404).send('Sorry, the user has not been found.')
    }
});
*/

// Allow existing users to deregister (showing only a text that a user email has been removed—more on this later)
app.delete('/users/:name', (req, res) => {
    let user = userAccounts.find((user) => { return user.id === req.params.id });
  
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