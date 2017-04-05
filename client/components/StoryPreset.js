import React, { PropTypes } from 'react';

const StoryPreset = (props) => {
  const { storyImage } = props;

  // console.log(storyImage);
  return (
    <img src={storyImage} className="StoryPreset_pane"/>
  )
}

StoryPreset.propTypes = {
  storyImage: PropTypes.string,
};

export default StoryPreset;