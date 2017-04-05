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
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[1].payload.artist} : ${payload[0].payload.name}`}</p>
          <p className="label">{`Track #${payload[0].value}, ${metric} : ${payload[1].value}`}</p>
        </div>
      );
    }

    return null;
  }
});

const Plot = (props) => {
  console.log(props.playlist);
  if (props.playlist === undefined) {
    return (
      <div>
        Loading. . .
      </div>
    )
  } else {
    const data01 = organizePlaylist(props.playlist.tracks, props.type);

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