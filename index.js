const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const spotify = require('./server/spotify');
const fs = require('fs');


// webpack watch
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/', spotify.fetchPlaylist, spotify.fetchSongData, (req, res, next) => {
  console.log("*rendering home page*");

  var allSongs = res.locals.allSongs;
  console.log(allSongs);

  fs.writeFile('./server/cachedPlaylist.json', JSON.stringify(allSongs), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.get('/sendMusic', spotify.fetchPlaylist, (req, res, next) => {
  console.log("*triggering get from Spotify*");
  res.status(200).json({ serverData: res.locals.serverData });
});

app.use(express.static(path.join(__dirname, './dist/')));


app.listen(3000);