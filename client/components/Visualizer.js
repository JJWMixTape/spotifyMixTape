import React, { PropTypes } from 'react';
import Plot from './Plot.js'
import StoryPreset from './StoryPreset'

const Visualizer = (props) => {
  const { storiesHidden, storySelectorMethods } = props;
  let StoryPresetArray = [];

  if(storiesHidden) {
    for (let i = 0; i < 6; i+= 1){
      StoryPresetArray.push(<StoryPreset/>);
    }
  }
  return (
    <div id="Visualizer_container">
      <Plot img="DELETE ME"/>
      <div className="StoryPreset_container">
        {StoryPresetArray}
      </div>
    </div>

  )
}

Visualizer.propTypes = {
  storiesHidden: PropTypes.bool.isRequired,
  storySelectorMethods: PropTypes.array,
};

export default Visualizer;