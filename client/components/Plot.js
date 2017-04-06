import React, { PropTypes } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip } from 'recharts';
// import playlist from './plotlogic.js';
import { organizePlaylist } from './plotlogic.js';

const CustomTooltip  = React.createClass({
  propTypes: {
    payload: PropTypes.array,
  },

  render() {
    const { active } = this.props;

    if (active) {
      const { payload } = this.props;
      console.log(payload);
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[1].payload.artist} : ${payload[0].payload.name}`}</p>
          <p className="label">{`Track #${payload[0].value}, ${payload[1].name} : ${payload[1].value}`}</p>
        </div>
      );
    }

    return null;
  }
});

const Plot = (props) => {
  //console.log(props.playlist);
  if (props.playlist === undefined) {
    return (
      <div>
        Loading. . .
      </div>
    )
  } else {

    let newPlaylist = {}
    // for (let key in props.playlist) {
    //   if (key === 'tracks') {
    //     newPlaylist['tracks'] = [];
    //     let track = {}
    //     for (let i = 0; i < newPlaylist.tracks.length; i += 1) {
    //       for (key in newPlaylist.tracks[i]) {
    //         track[key] = newPlaylist.tracks[i][key];
    //       }
    //       newPlaylist.tracks.push(track);
    //     }
    //   }
    //   newPlaylist[key] = props.playlist[key]; 
    // }
    // console.log("after deepclone", newPlaylist);

    newPlaylist = props.playlist;

    let orig = [];
    for (let i = 0; i < newPlaylist.tracks.length; i += 1) {
      orig.push(newPlaylist.tracks[i].valence);
    }
    console.log(orig);
    console.log(props.type);
    console.log(props.metric);
    const data01 = organizePlaylist(newPlaylist.tracks, props.type, props.metric.toLowerCase());
    
    let newList = [];
    for (let i = 0; i < data01.length; i += 1) {
      newList.push(data01[i].valence);
    }
    console.log(newList);  



    newPlaylist.tracks = data01;
    //console.log('after data01:', newPlaylist.tracks);
    
    props.updatePlaylist("Reordered Playlist", newPlaylist);

    data01.forEach((obj, i) => {
      obj.x = i + 1;
    });
  

    return (
      <div id="Plot_container">
        <div id="ScatterChart_container">
          <ScatterChart width={600} height={500} margin={{top: 20, right: 40, bottom: 20, left: 0}}>
            <XAxis dataKey={'x'} name='Track' unit=''/>
            <YAxis dataKey={props.metric.toLowerCase()} name={props.metric} unit=''/>
            <ZAxis range={[25]}/>
            <CartesianGrid />
            <Tooltip content={<CustomTooltip/>} cursor={{strokeDasharray: '3 3'}}/>
            <Scatter data={data01} fill='#82ca9d' line shape="circle"/>
          </ScatterChart>
        </div>
      </div>
    );
  }
}

export default Plot;