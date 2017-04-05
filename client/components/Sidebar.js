import React, { PropTypes } from 'react';

const Sidebar = (props) => {

  const playerUrl = (id, owner) => {
    console.log(owner);
    return ("https://embed.spotify.com/?uri=spotify:user:").concat(owner).concat(":playlist:").concat(id); 
  }
  props.selectedPlaylist.id
  return (
    <div id="sidebar">
      <img src="http://i.imgur.com/zlLcuiJ.png" id="spotify_logo"/>
      <iframe src={playerUrl(props.selectedPlaylist.id, props.selectedPlaylist.owner)} width="100%" height="380" frameBorder="0" allowTransparency="true" id = "player">
      </iframe>
    </div>
  )
}

export default Sidebar;