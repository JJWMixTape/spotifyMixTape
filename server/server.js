const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const spotify = require('./controllers/spotify');
const userController = require('./controllers/userController.js');
const fs = require('fs');
const cookieparser = require('cookie-parser');


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



app.get('/sendMusic', spotify.fetchPlaylist, (req, res, next) => {
  console.log("*triggering get from Spotify*");
  res.status(200).json({ serverData: res.locals.allSongs });
});

app.get('/', userController.retrieveToken, (req, res) => {

  res.sendFile(path.join(__dirname, '..', 'oath.html'));
});

app.get('/songs/:userid/:playlistid', spotify.fetchPlaylist, spotify.fetchSongData, (req, res) => {
  res.send(res.locals.allSongs);
});

app.get('/me', spotify.getMe, (req, res) => {
  console.log('ACCESS TOKEN:    ', req.cookies.access_token);
  //res.send(res.locals.me);
});

app.get('/playlists', spotify.getUserPlaylists, (req, res) => {
  res.send(res.locals.playlists);
});

app.get('/auth', userController.requestAuthorization);
app.get('/dashboard', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'dashboard.html'));
});

// , (req, res) => {
//   res.send(200);
// })

app.listen(3000);