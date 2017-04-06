import React, { PropTypes } from 'react';

const StoryPreset = (props) => {
  const { storyImage, clickCassetteFunc } = props;



  // console.log(storyImage);
  return (
    <img src={storyImage} className="StoryPreset_pane" onClick={clickCassetteFunc}/>
  )
}

StoryPreset.propTypes = {
  storyImage: PropTypes.string,
  clickCassetteFunc: PropTypes.func,
};

export default StoryPreset;