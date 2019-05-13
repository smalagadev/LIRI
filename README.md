# LIRI Bot

## Description
LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

## Dependencies and APIs

  * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

  * [Axios](https://www.npmjs.com/package/axios)

  * [OMDB API](http://www.omdbapi.com)

  * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

  * [Moment](https://www.npmjs.com/package/moment)

  * [DotEnv](https://www.npmjs.com/package/dotenv)

  * [File System](https://nodejs.org/api/fs.html)

## What Each Command Should Do

1. `node liri.js concert-this <artist>`

   * This will search the Bands in Town Artist Events API for an artist and render:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

![concert-this](assets/images/concert-this.png)
Format: ![Alt Text](url)

2. `node liri.js spotify-this-song '<song>'`

   * This will show the following information about the song:

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

![spotify-this](assets/images/spotify-this.png)
Format: ![Alt Text](url)

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

     * It's on Netflix!

![movie-this](assets/images/movie-this.png)
Format: ![Alt Text](url)

4. `node liri.js do-what-it-says`

   * LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

![do-this](assets/images/do-this.png)
Format: ![Alt Text](url)
