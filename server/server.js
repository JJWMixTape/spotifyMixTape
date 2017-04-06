const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const spotify = require('./controllers/spotify');
const userController = require('./controllers/userController.js');
const fs = require('fs');
const cookieparser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
// const Uri = 'http://localhost:3000';
const Uri = 'https://jjwmixtape.herokuapp.com';

// webpack watch
app.use(cookieparser());
app.use('/static', express.static(path.join(__dirname, '..', 'dist')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// app.get('/', spotify.fetchPlaylist, spotify.fetchSongData, (req, res, next) => {
//   console.log("*rendering home page*");

//   var allSongs = res.locals.allSongs;
//   console.log(allSongs);

//   fs.writeFile('./server/cachedPlaylist.json', JSON.stringify(allSongs), function (err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log("The file was saved!");
//   });
//   res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
// });

// app.use(cors());
const corsOptions = {
  origin: Uri + '/auth',
};

// NOT USED
app.get('/me', userController.getMe, (req, res) => {
  // console.log('ACCESS TOKEN:    ', req.cookies.access_token);
  res.send(res.locals.me.id);
});

app.get('/sendMusic', spotify.fetchPlaylist, (req, res, next) => {
  console.log("*triggering get from Spotify*");
  res.status(200).json({ serverData: res.locals.allSongs });
});


// USED 
app.get('/', userController.retrieveToken, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// app.get('/songs/:playlistid', userController.getMe, spotify.fetchPlaylist, spotify.fetchSongData, (req, res) => {
//   res.send(res.locals.allSongs);
// });

app.get('/playlists', userController.getMe, spotify.getUserPlaylists, (req, res) => {
  console.log(res.locals.playlists.length);
  const playlistPromises = [];
  for (let i = 0; i < res.locals.playlists.length; i += 1) { //res.locals.playlists.length
    playlistPromises.push(new Promise((resolve, reject) => spotify.fetchPlaylist(req, res, i, (req, res, songIdArr, allSongs, spotifyApi) => spotify.fetchSongData(req, res, songIdArr, allSongs, spotifyApi, i, resolve))));
  }
  Promise.all(playlistPromises).then((data) => {
    res.send(res.locals.playlists);
  });
});

app.get('/auth', cors(corsOptions), userController.requestAuthorization);
app.get('/dashboard', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'dashboard.html'));
});
app.post('/export', userController.getMe, spotify.exportController);


app.listen(PORT);
