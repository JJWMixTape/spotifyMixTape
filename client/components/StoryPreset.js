import React, { PropTypes } from 'react';

const StoryPreset = (props) => {
  const { storyImage } = props;

  return (
    <img src="https://mathbits.com/MathBits/StudentResources/GraphPaper/quadone.gif" className="StoryPreset_pane"/>
  )
}

StoryPreset.propTypes = {
  storyImage: PropTypes.string,
};

export default StoryPreset;