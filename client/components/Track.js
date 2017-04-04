import React, { PropTypes } from 'react';

const Track = (props) => {
  const {name, artist} = props;

  return (
    <div id="Track_container">
      <div className="Tracklist_column">
        <span>{name}</span>
      </div>
      <div className="Tracklist_column">
        <span>{artist}</span>
      </div>
    </div>
  )
}

Track.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default Track;