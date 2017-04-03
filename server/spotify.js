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
spotifyApi.setAccessToken('BQCKdBAlPq6Cr-nncmHPRy0bnczaTbE-d-0OsA0gmn0rzIrgdH4aFvNdrPVkcjE6AwpGEcPoBRLAOnzFVCHT91Pf0_MUHEFwkVhlTnSsewv4mmCen6bwDOoJf7em5EKaGSGkH5lz41uhF6XzMJz5da8NMbfjus2fHxHaOsYAxj_NFB2Ki1dqRyyoIvIWeociY8LkmE3bRanaaXENjGp429G1LPqmi707Iwcc2toqBR35qiiji8fuUdpaNDCGipVG-pjqpqqc4MioOJK_V5JiW0o4Iv3rXSuR8IlfZe1kve-7PRV6sgcv3Q');

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
