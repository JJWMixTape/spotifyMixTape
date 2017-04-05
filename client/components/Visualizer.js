import React, { PropTypes } from 'react';
import Plot from './Plot.js'
import StoryPreset from './StoryPreset'

const Visualizer = (props) => {
  const { storiesHidden, storySelectorMethods, enableStoryVisualizers, StoryPreset_images } = props;

  console.log(StoryPreset_images);

  let StoryPresetArray = [];

  if(!storiesHidden){
    for (let i = 0; i < 6; i+= 1){
      StoryPresetArray.push(<StoryPreset storyImage={StoryPreset_images[i]}/>);
    }
    return (
      <div id="Visualizer_container">

        <Plot img="DELETE ME"/>

        <div id="Visualizer_toolbar">
          <label>Enable Story Visualizers</label>
          <input id="Visualizer_checkbox" type="checkbox" onClick={enableStoryVisualizers}/>
        </div>

        <div className="StoryPreset_container">
          {StoryPresetArray}
        </div>
      </div>

    )
  }else {
    
    return (
      <div id="Visualizer_container">

        <Plot img="DELETE ME"/>

        <div id="Visualizer_toolbar">
          <label>Enable Story Visualizers</label>
          <input id="Visualizer_checkbox" type="checkbox" onClick={enableStoryVisualizers}/>
        </div>
      </div>
    )
  }
}

Visualizer.propTypes = {
  storiesHidden: PropTypes.bool.isRequired,
  storySelectorMethods: PropTypes.array,
  enableStoryVisualizers: PropTypes.func,
  StoryPreset_images: PropTypes.array,
};

export default Visualizer;