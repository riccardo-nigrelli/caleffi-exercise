const axios = require('axios');

const getArtistSongs = (author, callback) => {
  axios.get(`https://itunes.apple.com/search?term=${author}&entity=song&limit=50`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  })
  .then((response) => {
    callback(response.data.results);
  })
  .catch((err) => {
    callback(err);
  });
}

const tableFilling = (content) => {

}

module.exports.getArtistSongs = getArtistSongs;
module.exports.tableFilling = tableFilling;