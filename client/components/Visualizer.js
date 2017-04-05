import React, { PropTypes } from 'react';
import Plot from './Plot.js'
import StoryPreset from './StoryPreset'

const Visualizer = (props) => {
  const { storiesHidden, storySelectorMethods, enableStoryVisualizers, StoryPreset_images } = props;

  //console.log(StoryPreset_images);

  let StoryPresetArray = [];

  if(!storiesHidden){
    for (let i = 0; i < 6; i+= 1){
      StoryPresetArray.push(<StoryPreset storyImage={StoryPreset_images[i]}/>);
    }
    return (
      <div id="Visualizer_container">
        <Plot playlist = {props.playlist} metric = {props.metric} type = {props.type} />
        <div id="Visualizer_toolbar">
          <label>Show Options</label>
          <input id="Visualizer_checkbox" type="checkbox" onClick={enableStoryVisualizers}/>
          <img id="Visualizer_duct_instructions" src="http://i.imgur.com/YdMsto0.png"/>
        </div>

        <img className="speaker" src="http://i.imgur.com/YtmT6Em.png"/>
        <div className="StoryPreset_container">
          {StoryPresetArray}
        </div>
        <img className="speaker" src="http://i.imgur.com/YtmT6Em.png"/>
      </div>

    )
  }else {
    
    return (
      <div id="Visualizer_container">
        <Plot playlist = {props.playlist} metric = {props.metric} type = {props.type} />
        <div id="Visualizer_toolbar">
          <label>Show Options</label>
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