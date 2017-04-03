const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');


const spotify = {};

// setting up OAuth
var spotifyApi = new SpotifyWebApi({
  clientId: '54bedf22a6d14ef7bd7b63ed0c039ee2',
  clientSecret: 'adde660ddced4de5acb268bd5f2d93ad',
  redirectUri: 'http://www.example.com/callback'
});

// get token from https://developer.spotify.com/web-api/console/get-playlist/
// token expires every hour
spotifyApi.setAccessToken('BQDyCxX8_h-RoBt0Ua75tHTVXgazgZeEBqGz8LYv79g9BvH5OAa6-abhzODM1M_eRtt44iS6Qzygvjv1Dr9Vgszqe9TZawrYWCVFBexddgYR9yJ6CRLu1u20kq78_T-1uNRLoYGkL6PNobFJm_ziQpKaqlIyfpAygfon70YLVrqPWy_Lc3jnUE1hqRKn9OMchfDm_f4EFhGU38frVi1WeqT1UoX-v_WGtZJxIHxkNcLC8OA9tJZn');

spotify.fetchPlaylist = (req, res, next) => {
  // initialize collection to send to front-end
  var allSongs = [];
  var songIdArr = [];

  // fetch playlist
  spotifyApi.getPlaylist('thefader', '32iM8mNTbXeWZ7GKl32Heg')
    .then(function (data) {
      var songArr = data.body['tracks']['items'];
      songArr.forEach(function (x) {
        songObj = {};
        songObj['id'] = x['track']['id'];
        songIdArr.push(x['track']['id']);
        songObj['name'] = x['track']['name'];
        songObj['artist'] = x['track']['artists'][0]['name'];
        allSongs.push(songObj);
      });
      res.locals.allSongs = allSongs;
      res.locals.songIdArr = songIdArr;
      return next();
    })
    .catch((err) => {
      res.status(500).send('Error occurred');
      console.log(err);
    })
}

spotify.fetchSongData = (req, res, next) => {
  var songIdArr = res.locals.songIdArr;
  var allSongs = res.locals.allSongs;
  var allSongsFeatures = [];
  var desiredFeatures = ['id', 'energy', 'valence', 'tempo'];
  spotifyApi.getAudioFeaturesForTracks(songIdArr)
    .then(function (data) {
      songObj = {};
      var tempSongArr = data.body['audio_features'];
      for (var i = 0; i < allSongs.length; i++) {
        for (var j = 0; j < tempSongArr.length; j++) {
          if (allSongs[i]['id'] === tempSongArr[j]['id']) {
            Object.assign(allSongs[i], tempSongArr[j]);
          }
        }
      }
      res.locals.allSongs = allSongs;
      return next();
    })
    .catch((err) => {
      console.log(err);
    })
}

module.exports = spotify;
