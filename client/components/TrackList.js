import React, { PropTypes } from 'react';
import Track from './Track';

const TrackList = (props) => {
  var {playlists, selectedPlaylistName, selectorOnChange, selectedPlaylist} = props;


  // load up array with playlists
  let playlistRend = [];
  
  for (let i = 0; i < playlists.length; i += 1) {
    playlistRend.push(<p onClick={()=>{selectorOnChange(playlists[i].name, playlists[i])}} className="playlist_pane">{playlists[i].name}</p>)
  }

  // load up array with songs
  let songs = [];

  for (let i = 0; i < selectedPlaylist.tracks.length; i += 1){
    songs.push(<Track name={selectedPlaylist.tracks[i].name} artist={selectedPlaylist.tracks[i].artist}/>)
  }

  return (
    <div id="TrackList_container">

      <div id="Tracklist_description_container">
        <span style={{"fontSize": "16px", "padding":"20px"}}>{selectedPlaylistName}</span>
      </div>

      <div id="TrackList_selector_container">
          <div id="list">
            {playlistRend}
          </div>
      </div>

      <div id="TrackList_tracks_container">

        <div id="Tracklist_column_label">
          <div className="Tracklist_column_static">
            <span>Song</span>
          </div>

          <div className="Tracklist_column_static">
            <span>Artist</span>
          </div>
        </div>

        <div id="songs">
          {songs}
        </div>

      </div>

    </div>
  );
}

TrackList.propTypes = {
  playlists: PropTypes.array.isRequired,
  selectedPlaylistName: PropTypes.string,
  selectorOnChange: PropTypes.func.isRequired,
};

export default TrackList;
