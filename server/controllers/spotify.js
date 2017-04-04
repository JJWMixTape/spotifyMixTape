const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');


const spotify = {};

// setting up OAuth
// var spotifyApi = new SpotifyWebApi({
//   clientId: '54bedf22a6d14ef7bd7b63ed0c039ee2',
//   clientSecret: 'adde660ddced4de5acb268bd5f2d93ad',
//   redirectUri: 'http://www.example.com/callback',
// });

// get token from https://developer.spotify.com/web-api/console/get-playlist/
// token expires every hour

spotify.fetchPlaylist = (req, res, next) => {
  // initialize collection to send to front-end
  console.log('ACCESS TOKEN:    ', req.cookies.access_token);
  const spotifyApi = new SpotifyWebApi({ accessToken: req.cookies.access_token });

  var allSongs = [];
  var songIdArr = [];

  // fetch playlist
  console.log(req.params.userid);
  console.log(req.params.playlistid);

  spotifyApi.getPlaylist(req.params.userid, req.params.playlistid)
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
  const spotifyApi = new SpotifyWebApi({ accessToken: req.cookies.access_token });
  var songIdArr = res.locals.songIdArr;
  var allSongs = res.locals.allSongs;
  var allSongsFeatures = [];
  var desiredFeatures = ['id', 'energy', 'valence', 'tempo', 'album'];
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

spotify.getUserPlaylists = (req, res, next) => {
  const spotifyApi = new SpotifyWebApi({ accessToken: req.cookies.access_token });
  spotifyApi.getUserPlaylists(12101118259)
    .then(function(data) {
      const playlists = [];
      console.log('Retrieved playlists', data.body);
      data.body.items.forEach((value) => {
        playlists.push({
          name: value.name,
          id: value.id,
          tracks: value.tracks.total,
        });
      });
      res.locals.playlists = playlists;
      return next();
    },function(err) {
      console.log('Something went wrong!', err);
    });
};

spotify.getMe = (req, res, next) => {
  const spotifyApi = new SpotifyWebApi({ accessToken: req.cookies.access_token });
  spotifyApi.getMe()
    .then(function(data) {
      //console.log('Some information about the authenticated user', data.body);
      res.locals.me = data.body;
      return next();
    }, function(err) {
      console.log('Something went wrong!', err);
    });
};


// Client ID
// e232e159695e4d4d9325ef1261920dd2
// Client Secret
// 116b171634f94a42a2f7ca0ff74028ee

module.exports = spotify;
