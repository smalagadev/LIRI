// Declare dependencies
const Spotify = require('node-spotify-api');
const Axios = require('axios');
const Moment = require('moment');
const Keys = require('./keys.js');
const fs = require('fs');


// Declare variables
const spotify = new Spotify(Keys.spotify);
let command = undefined;
const divider = '----------------------------------------------------------';
process.argv[2] == undefined ? command = '' : command = process.argv[2].toLowerCase();
let query = process.argv.slice(3);

//
// ### BONUS
//
// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
//
// * Make sure you append each command you run to the `log.txt` file.
//
// * Do not overwrite your file each time you run a command.

// Function definitions

// spotify-this function
const spotify_this = function(song){
  spotify.search({ type: `track`, query: `${song}`})
  .then(function(response){
    const track = response.tracks.items[0].name;
    const artists = [];
    response.tracks.items[0].artists.forEach(artist => {artists.push(artist.name)});
    const album = response.tracks.items[0].album.name;
    console.log(divider);
    console.log(`'${track}' by ${artists[0]} ${artists.length > 1? 'featuring ' + artists.slice(1).join(', '):'false'}. Appears on '${album}'`);
    console.log(`Preview link: ${response.tracks.items[0].external_urls.spotify}`)
  }).catch(function(err){
    console.log(`'The sign' by Ace of Base. Appeared on 'The Sign'.`);
  });
}

// movie-this function
const movie_this = function(movie){
  let queryUrl = 'https://www.omdbapi.com/?t=';

  if(movie == ''){
    queryUrl += `Mr.+Nobody&y=&plot=short&apikey=${Keys.omdb.api_key}`;
    console.log('If you haven\'t watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>');
    console.log('It\'s on Netflix!');
  }
  else{
    queryUrl += `${movie.join('+')}&y=&plot=short&apikey=${Keys.omdb.api_key}`;
  }
  
  Axios.get(queryUrl).then(function(response){
    console.log(divider);
    console.log(`Title: ${response.data.Title}`);
    console.log(`Released: ${Moment(new Date(response.data.Released)).format('MMMM Do, YYYY')}`);
    console.log(`Rated: ${response.data.Rated}`);
    console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
    console.log(`Language: ${response.data.Language}`);
    console.log(`Plot: ${response.data.Plot}`);
    console.log(`Actors: ${response.data.Actors}`);
  })
  .catch(err => {console.log(err);});
}

// concert-this function
const concert_this = function(artist){
  Axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=${Keys.bands_in_town.api_key}`)
  .then(function(response){
    const dates = [];
    response.data.forEach(date=>{dates.push(date)});
    console.log(`Tour dates for ${query}:`);
    dates.forEach(x =>{
      console.log(divider);
      console.log(`Venue: ${(x.venue.name)}`);
      console.log(`Location: ${x.venue.city}, ${x.venue.region} - ${x.venue.country}`);
      console.log(`Date: ${Moment(x.datetime).format('MMMM Do YYYY, h:mm:ss a')}`);
    });
  })
  .catch(err => {console.log(err)});
}

// do-this function
const do_this = function(file){
  fs.readFile(`${file}`, "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // Split the data by commas (to make it more readable)
  const dataArr = data.split(",");

  command = dataArr[0];
  query = dataArr[1];

  command == 'spotify-this-song' ? spotify_this(query)
  : command == 'movie-this' ? movie_this(query)
  : command == 'concert-this' ? concert_this(query)
  : command == '' || command == 'help'? help()
  : console.log(`'${command}' is not a command.\nEnter 'node liri help' or 'node liri' for a list commands.`);
  });
}

// help Function
const help = function(){
  console.log(divider);
  console.log('usage: liri [spotify-this] [concert-this] [movie-this] [do-what-it-says]\n\n');
  console.log('[spotify-this] <track name>\t Output song information.\n');
  console.log('[concert-this] <artist name>\t Display artist tour information.\n');
  console.log('[movie-this] <movie title>\t Output movie information.\n');
  console.log('[do-what-it-says]\t\t Reads a text file to execute commands.\n');
}

command == 'do-what-it-says' ? do_this(query)
  : command == 'spotify-this-song' ? spotify_this(query)
  : command == 'movie-this' ? movie_this(query)
  : command == 'concert-this' ? concert_this(query)
  : command == '' || command == 'help'? help()
  : console.log(`'${command}' is not a command.\nEnter 'node liri help' or 'node liri' for a list commands.`);
