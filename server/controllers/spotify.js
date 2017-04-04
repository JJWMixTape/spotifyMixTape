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

spotify.fetchPlaylist = (req, res, i, cb) => {
  // initialize collection to send to front-end
  // console.log('ACCESS TOKEN:    ', req.cookies.access_token);
  const spotifyApi = new SpotifyWebApi({ accessToken: req.cookies.access_token });
  // console.log(res.locals.playlists[res.locals.playListInd]);
  let playListId = res.locals.playlists[i].id;
  let playlistOwner = res.locals.playlists[i].owner;
  var allSongs = [];
  var songIdArr = [];
  spotifyApi.getPlaylist(playlistOwner, playListId)
    .then(function (data) {
      console.log('id:' ,playListId, 'owner:' ,playlistOwner);
      var songArr = data.body['tracks']['items'];
      songArr.forEach(function (x) {
        songObj = {};
        songObj['id'] = x['track']['id'];
        songIdArr.push(x['track']['id']);
        songObj['name'] = x['track']['name'];
        songObj['album'] = x['track']['album']['name'];
        songObj['length'] = Math.floor(x['track']['duration_ms'] / 600) / 100;
        songObj['artist'] = x['track']['artists'][0]['name'];
        allSongs.push(songObj);
      });
      cb(req, res, songIdArr, allSongs, spotifyApi);
      // return next();
    })
    .catch((err) => {
      console.log('me:', res.locals.me.id, 'playlist:', playListId);
      res.status(500).send('Error occurred');
      // console.log(err);
    })
}

spotify.fetchSongData = (req, res, songIdArr, allSongs, spotifyApi, ind, resolve) => {
  var allSongsFeatures = [];
  var desiredFeatures = ['id', 'energy', 'valence', 'tempo', 'album'];
  spotifyApi.getAudioFeaturesForTracks(songIdArr)
    .then(function (data) {
      console.log('fetching song data');
      songObj = {};
      var tempSongArr = data.body['audio_features'];
      for (var i = 0; i < allSongs.length; i++) {
        for (var j = 0; j < tempSongArr.length; j++) {
          if (allSongs[i]['id'] === tempSongArr[j]['id']) {
            Object.assign(allSongs[i], tempSongArr[j]);
          }
        }
      }
      //res.locals.allSongs = allSongs;
      res.locals.playlists[ind].tracks.push(allSongs);
      // return next();
      return resolve();
    })
    .catch((err) => {
      console.log('here!!!');
      console.log(err);
    })
}

spotify.getUserPlaylists = (req, res, next) => {
  const spotifyApi = new SpotifyWebApi({ accessToken: req.cookies.access_token });
  spotifyApi.getUserPlaylists(res.locals.me.id)
    .then(function(data) {
      const playlists = [];
      //console.log('Retrieved playlists', data.body);
      data.body.items.forEach((value) => {
        playlists.push({
          name: value.name,
          id: value.id,
          trackTotal: value.tracks.total,
          owner: value.owner.id,
          tracks: [],
        });
      });
      res.locals.playlists = playlists;
      return next();
    },function(err) {
      console.log('Something went wrong!', err);
    });
};


// Client ID
// e232e159695e4d4d9325ef1261920dd2
// Client Secret
// 116b171634f94a42a2f7ca0ff74028ee

module.exports = spotify;
