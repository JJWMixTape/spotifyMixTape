import React, { PropTypes } from 'react';
import Plot from './Plot.js';
import StoryPreset from './StoryPreset';
import MetricButton from './MetricButton';

const Visualizer = (props) => {
  const { storiesHidden, storySelectorMethods, enableStoryVisualizers, StoryPreset_images, playlist, metric, type, clickCassetteFuncArray } = props;

  //console.log(StoryPreset_images);

  let StoryPresetArray = [];

  if(!storiesHidden){
    for (let i = 0; i < 6; i+= 1){
      StoryPresetArray.push(<StoryPreset clickCassetteFunc={clickCassetteFuncArray[i]} storyImage={StoryPreset_images[i]}/>);
    }
    return (
      <div id="Visualizer_container">
        <div id="Visualizer_metricButtonContainer">
          <img src="http://i.imgur.com/4OwEZY9.jpg" id="top_label"  className="metricLabel"/>
          <MetricButton metric={metric} id={"Valence"}/>
          <img src="http://i.imgur.com/8XwSW5n.jpg" className="metricLabel"/>
          <MetricButton metric={metric} id={"Danceability"}/>
          <img src="http://i.imgur.com/HgFNO0F.jpg" className="metricLabel"/>
          <MetricButton metric={metric} id={"Energy"}/>
        </div>

        <Plot playlist = {props.playlist} metric = {props.metric} type = {props.type} />
        <div id="Visualizer_toolbar">
          <label>Show Options</label>
          <input id="Visualizer_checkbox" type="checkbox" onClick={enableStoryVisualizers}/>
          <img id="Visualizer_duct_instructions" src="http://i.imgur.com/pUVcGAJ.png"/>
        </div>
        <div id="speakers_and_presets">
          <img className="speaker" src="http://i.imgur.com/YtmT6Em.png"/>
          <div className="StoryPreset_container">
            {StoryPresetArray}
          </div>
          <img className="speaker" src="http://i.imgur.com/YtmT6Em.png"/>
        </div>
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
  clickCassetteFuncArray: PropTypes.array,
};

export default Visualizer;