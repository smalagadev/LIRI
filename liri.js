// Declare dependencies
const Spotify = require('node-spotify-api');
const Axios = require('axios');
const Moment = require('moment');
const Keys = require('./keys.js');
const fs = require('fs');


// Declare variables
const spotify = new Spotify(Keys.spotify);
let command = undefined;
process.argv[2] == undefined ? command = '' : command = process.argv[2].toLowerCase();
const query = process.argv.slice(3);



if(command == 'spotify-this-song'){
  // search
  spotify.search({ type: `track`, query: `${query}`})
  .then(function(response){
    const track = response.tracks.items[0].name;
    const artists = [];
    response.tracks.items[0].artists.forEach(artist => {artists.push(artist.name)});
    const album = response.tracks.items[0].album.name;
    console.log(`'${track}' by ${artists[0]} ${artists.length > 1? 'featuring ' + artists.slice(1).join(', '):'false'}. Appears on '${album}'`);
    console.log(`Preview link: ${response.tracks.items[0].external_urls.spotify}`)
  }).catch(function(err){
    console.log(`'The sign' by Ace of Base. Appeared on 'The Sign'.`);
  });

  // * This will show the following information about the song in your terminal/bash window
  //      * The song's name, Artist(s), The album that the song
  //
  //      * A preview link of the song from SPOTIFY_ID
  //    * A default to "The Sign" by Ace of Base.

}
else if(command == 'do-what-it-says'){
  // `node liri.js do-what-it-says`
  //
  //  * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
  //
  //    * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
  //
  //    * Edit the text in random.txt to test out the feature for movie-this and concert-this.

}
else if(command == 'movie-this'){
  let queryUrl = 'https://www.omdbapi.com/?t=';
  if(query == ''){
    queryUrl += `Mr.+Nobody&y=&plot=short&apikey=${Keys.omdb.api_key}`;
    console.log('If you haven\'t watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>');
    console.log('It\'s on Netflix!');
  }
  else{
    queryUrl += `${query.join('+')}&y=&plot=short&apikey=${Keys.omdb.api_key}`;
  }

  console.log(queryUrl);
  Axios.get(queryUrl).then(function(response){
    console.log('------------------------');
    console.log(`Title: ${response.data.Title}`);
    console.log(`Released: ${Moment(new Date(response.data.Released)).format('MMMM Do, YYYY')}`);
    console.log(`Rated: ${response.data.Rated}`);
    console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
    console.log(`Language: ${response.data.Language}`);
    console.log(`Plot: ${response.data.Plot}`);
    console.log(`Actors: ${response.data.Actors}`);
  })
  .catch(err => {console.log(err);});
  // omdb

  // node liri.js movie-this '<movie name here>'`
  //
  //  * This will output the following information to your terminal/bash window:
  //
  //    ```
  //      * Title of the movie.
  //      * Year the movie came out.
  //      * IMDB Rating of the movie.
  //      * Rotten Tomatoes Rating of the movie.
  //      * Country where the movie was produced.
  //      * Language of the movie.
  //      * Plot of the movie.
  //      * Actors in the movie.
  //    ```

}
else if(command == 'concert-this'){
  Axios.get(`https://rest.bandsintown.com/artists/${query}/events?app_id=${Keys.bands_in_town.api_key}`)
  .then(function(response){
    const dates = [];
    response.data.forEach(date=>{dates.push(date)});
    console.log(`Tour dates for ${query}:`);
    dates.forEach(x =>{
      console.log('------------------------');
      console.log(`Venue: ${(x.venue.name)}`);
      console.log(`Location: ${x.venue.city}, ${x.venue.region} - ${x.venue.country}`);
      console.log(`Date: ${Moment(x.datetime).format('MMMM Do YYYY, h:mm:ss a')}`);
    });
  })
  .catch(err => {console.log(err)});
  // bandsintown

  // `node liri.js concert-this <artist/band name here>`
  //
  //  * This will search the Bands in Town Artist Events API () for an artist and render the following information about each event to the terminal:
  //    * Name of the venue
  //    * Venue location
  //    * Date of the Event (use moment to format this as "MM/DD/YYYY")

}
else if(command == '' || command == 'help'){
  console.log('usage: liri [spotify-this] [concert-this] [movie-this] [do-what-it-says]\n\n');
  console.log('[spotify-this] <track name>\n\n');
  console.log('[concert-this] <artist name>\n\n');
  console.log('[movie-this] <movie title>\n\n');
  console.log('[do-what-it-says]\n\n');

}else{
  console.log(`'${command}' is not a command.`);
  console.log('Enter \'node liri help\' or \'node liri\' for a list commands.');
}

//
// ### BONUS
//
// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
//
// * Make sure you append each command you run to the `log.txt` file.
//
// * Do not overwrite your file each time you run a command.
