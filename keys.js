require('dotenv').config();

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  api_key: process.env.OMDB_API_KEY
}

exports.bands_in_town = {
  api_key: process.env.BANDS_IN_TOWN_KEY
}
