const axios = require('axios');

const getArtistSongs = (self, author) => {
  let query = author.trim().toLowerCase().split(/\s+/).join('+');
  axios.get(`https://itunes.apple.com/search?term=${query}&entity=song&limit=50`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  })
  .then((response) => {
    const result = response.data.results;
    self.setState({ result });
  })
  .catch((err) => alert(err));
}

module.exports.getArtistSongs = getArtistSongs;