import React, { PropTypes } from 'react';
import Select from 'react-select';
import Track from './Track';

const TrackList = (props) => {
  var {playlists, selectedPlaylistName, selectorOnChange} = props;

  //load up array with songs
  let playlist = playlists[0];
  let songs = [];

  for (let i = 0; i < playlist.length; i += 1){
    songs.push(<Track name={playlist[i].name} artist={playlist[i].artist}/>)
  }

  if(!selectedPlaylistName) selectedPlaylistName = "Johnny's Playlist";

  return (
    <div id="TrackList_container">

      <div id="Tracklist_description_container">
        <span>{selectedPlaylistName}</span>
      </div>

      <div id="TrackList_selector_container">
          <div id="list">

            <p onClick={()=>{selectorOnChange("Johnny's Playlist")}} className="playlist_pane">Johnny's Playlist</p>

            <p onClick={()=>{selectorOnChange("Jeffrey's Playlist")}} className="playlist_pane">Jeffrey's Playlist</p>

            <p onClick={()=>{selectorOnChange("Will's Playlist")}} className="playlist_pane">Will's Playlist</p>
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