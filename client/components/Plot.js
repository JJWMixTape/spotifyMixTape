import React, { PropTypes } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip } from 'recharts';
import playlist from './plotlogic.js';
import { organizePlaylist } from './plotlogic.js';

let metric = 'Valence';
let type = 0;

const data01 = organizePlaylist(playlist, type);

data01.forEach((obj, i) => {
  obj.x = i + 1;
});

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

  return (
    <div id="Plot_container">
      <ScatterChart width={600} height={500} margin={{top: 20, right: 40, bottom: 20, left: 0}}>
      	<XAxis dataKey={'x'} name='Track' unit=''/>
      	<YAxis dataKey={metric.toLowerCase()} name={metric} unit=''/>
        <ZAxis range={[25]}/>
        <CartesianGrid />
      	<Tooltip content={<CustomTooltip/>} cursor={{strokeDasharray: '3 3'}}/>
        <Scatter data={data01} fill='#82ca9d' line shape="circle"/>
      </ScatterChart>
    </div>
  );

}

export default Plot;