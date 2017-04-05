import React, { PropTypes } from 'react';

const Sidebar = (props) => {
  // props.selectedPlaylist.tracks is array of objects
  const metricsHolder = {
    valence: [],
    danceability: [],
    energy: []
  };

  props.selectedPlaylist.tracks.forEach(obj => {
    metricsHolder.valence.push(obj.valence);
    metricsHolder.danceability.push(obj.danceability);
    metricsHolder.energy.push(obj.energy);
  });

  const calcAvg = (arr) => arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

  const metricsAvg = {
    valence: calcAvg(metricsHolder.valence),
    danceability: calcAvg(metricsHolder.danceability),
    energy: calcAvg(metricsHolder.energy)
  }

  // console.log(metricsAvg);

  const playerUrl = (id, owner) => {
    console.log(owner);
    return ("https://embed.spotify.com/?uri=spotify:user:").concat(owner).concat(":playlist:").concat(id);
  }
  props.selectedPlaylist.id
  return (
    <div id="sidebar">
      <img src="http://i.imgur.com/zlLcuiJ.png" id="spotify_logo" />
      <iframe src={playerUrl(props.selectedPlaylist.id, props.selectedPlaylist.owner)} width="100%" height="380" frameBorder="0" allowTransparency="true" id="player">
      </iframe>
      <div id="metrics">
        <h3>Metrics Average</h3>
        <p>Mood: {metricsAvg.valence.toFixed(3)}</p>
        <p>Danceability: {metricsAvg.danceability.toFixed(3)}</p>
        <p>Energy: {metricsAvg.energy.toFixed(3)}</p>
      </div>
    </div>
  )
}

export default Sidebar;