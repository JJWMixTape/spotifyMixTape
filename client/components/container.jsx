import React,{Component} from 'react';
import Canvas from './canvas.jsx';

class Container extends Component{
  constructor(props){
  super(props)
  }
  render(){
    return(
      <div>
        <h2>Rendering Container</h2>
        <Canvas playlist ={this.props.playlist} />
      </div>
    )
  }
}

export default Container;