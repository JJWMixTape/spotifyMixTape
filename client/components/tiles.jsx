import React, { Component } from 'react';

class Tiles extends Component {
  constructor(props) {
    super(props)
    this.getXPos = this.getXPos.bind(this)
    this.getYPos = this.getYPos.bind(this)
  }

getXPos(energy){
  let grid = Math.round(1400 / 250); 
  let xPos = grid  * energy;
  return xPos;
}

getYPos(tempo){
  let grid = 700;
  let yPos = grid * tempo;
  return yPos;
}

createTiles(){
  for(let i = 0; i < this.props.playlist.length; i++){
    tile.push(this.props.playlist[i]);
  }
}

  render() {
  let tile = [];
  for(let i = 0; i < this.props.playlist.length; i++){
    let y = (this.getYPos(this.props.playlist[i][0])) 
    let x = (this.getXPos(this.props.playlist[i][1])) 
    console.log(y,x)
    let styles = {
      top: y + "px", 
      left: x + "px", 
      backgroundColor:"blue", 
      width: "50px", 
      height: "50px", 
      borderRadius: "50%", 
      position: 'absolute'
    }
    tile.push(<div className="tiles" key = {i} style={styles}></div>)
  }
    return (
      <div>
        {tile}
      </div>
    )
  }
}
export default Tiles